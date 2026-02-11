"""
scrapers.py — PythonOrgScraper and SimplifyJobsScraper implementations.
"""

from __future__ import annotations

import re
from typing import Any, Optional

from bs4 import BeautifulSoup, Tag
from playwright.async_api import Page, Response

from database import DatabaseManager
from utils import (
    MAX_JOBS_PER_SOURCE,
    extract_salary,
    human_delay,
    infer_experience_level,
    infer_location_requirement,
    logger,
)


# ═══════════════════════════════════════════════════════════════════════════
# PythonOrgScraper
# ═══════════════════════════════════════════════════════════════════════════
class PythonOrgScraper:
    """Scrapes job listings from https://www.python.org/jobs/.

    Server-rendered HTML — no anti-bot protection.
    """

    SOURCE_SITE = "Python.org"
    BASE_URL = "https://www.python.org"
    LISTING_URL = "https://www.python.org/jobs/"

    def __init__(self, page: Page, db: DatabaseManager) -> None:
        self.page = page
        self.db = db

    async def scrape(self) -> int:
        """Run the full scrape pipeline.  Returns count of new rows inserted."""
        logger.info("━━  PythonOrgScraper  ━━  starting …")
        inserted = 0

        try:
            await self.page.goto(self.LISTING_URL, wait_until="domcontentloaded", timeout=30_000)
            await human_delay()
        except Exception as exc:
            logger.error("Failed to load %s: %s", self.LISTING_URL, exc)
            return 0

        # -- collect job cards from the listing page ------------------------
        cards = await self._parse_listing_page()
        logger.info("Found %d job cards on listing page.", len(cards))

        for idx, card in enumerate(cards[:MAX_JOBS_PER_SOURCE]):
            logger.info("  [%d/%d] %s", idx + 1, min(len(cards), MAX_JOBS_PER_SOURCE), card.get("title", "?"))
            try:
                job = await self._enrich_from_detail(card)
                if self.db.insert_job(job):
                    inserted += 1
            except Exception as exc:
                logger.warning("  ⚠  Skipping card %d: %s", idx + 1, exc)
            await human_delay()

        logger.info("━━  PythonOrgScraper  ━━  done.  Inserted %d new jobs.", inserted)
        return inserted

    # -- internal -----------------------------------------------------------

    async def _parse_listing_page(self) -> list[dict[str, Any]]:
        """Extract basic metadata from every <li> in ol.list-recent-jobs."""
        html = await self.page.content()
        soup = BeautifulSoup(html, "lxml")
        ol = soup.select_one("ol.list-recent-jobs")
        if not ol:
            logger.warning("Could not find ol.list-recent-jobs.")
            return []

        results: list[dict[str, Any]] = []
        for li in ol.find_all("li", recursive=False):
            try:
                # Title + URL
                title_link = li.select_one("h2.listing-company a")
                if not title_link:
                    continue
                title = title_link.get_text(strip=True)
                href = title_link.get("href", "")
                source_url = href if href.startswith("http") else f"{self.BASE_URL}{href}"

                # Company name —  extract from <span class="listing-company-name">
                company_span = li.select_one("span.listing-company-name")
                company = ""
                if company_span:
                    full_span_text = company_span.get_text(separator=" ", strip=True)
                    company = full_span_text
                    for child in company_span.children:
                        if isinstance(child, Tag):
                            child_text = child.get_text(strip=True)
                            company = company.replace(child_text, "", 1)
                    company = company.strip().strip("—–-").strip()

                # Location
                loc_tag = li.select_one("span.listing-location a")
                location = loc_tag.get_text(strip=True) if loc_tag else ""

                # Posted at
                time_tag = li.select_one("span.listing-posted time")
                posted_at = ""
                if time_tag:
                    posted_at = time_tag.get("datetime", "") or time_tag.get_text(strip=True)

                results.append({
                    "title": title,
                    "companyName": company or "Unknown",
                    "location": location or "Not specified",
                    "sourceUrl": source_url,
                    "postedAt": posted_at,
                })
            except Exception as exc:
                logger.debug("Skipping malformed <li>: %s", exc)

        return results

    async def _enrich_from_detail(self, card: dict[str, Any]) -> dict[str, Any]:
        """Navigate to the detail page and fill in remaining fields."""
        url = card["sourceUrl"]
        try:
            await self.page.goto(url, wait_until="domcontentloaded", timeout=30_000)
            await human_delay(0.5, 1.5)
        except Exception as exc:
            logger.warning("Could not load detail page %s: %s", url, exc)
            return self._fill_defaults(card, "")

        html = await self.page.content()
        soup = BeautifulSoup(html, "lxml")

        desc_div = soup.select_one("div.job-description")
        description = desc_div.get_text(separator="\n", strip=True) if desc_div else ""

        return self._fill_defaults(card, description)

    @staticmethod
    def _fill_defaults(card: dict[str, Any], description: str) -> dict[str, Any]:
        """Merge card metadata with description-derived fields."""
        title = card.get("title", "")
        location = card.get("location", "Not specified")
        wage = extract_salary(description) if description else None
        exp = infer_experience_level(title, description)
        loc_req = infer_location_requirement(title, location, description)

        return {
            "title": title,
            "companyName": card.get("companyName", "Unknown"),
            "description": description or "No description available.",
            "wage": wage,
            "locationRequirement": loc_req,
            "experienceLevel": exp,
            "location": location,
            "sourceUrl": card.get("sourceUrl", ""),
            "sourceSite": PythonOrgScraper.SOURCE_SITE,
            "postedAt": card.get("postedAt"),
        }


# ═══════════════════════════════════════════════════════════════════════════
# SimplifyJobsScraper
# ═══════════════════════════════════════════════════════════════════════════
class SimplifyJobsScraper:
    """Scrapes job listings from https://simplify.jobs/.

    Primary strategy: intercept XHR/Fetch API responses to capture structured
    JSON data.  Fallback: parse the rendered DOM.
    """

    SOURCE_SITE = "SimplifyJobs"
    SEARCH_URL = "https://simplify.jobs/jobs?query=software+engineer"

    def __init__(self, page: Page, db: DatabaseManager) -> None:
        self.page = page
        self.db = db
        self._api_jobs: list[dict[str, Any]] = []

    async def scrape(self) -> int:
        """Run the full scrape pipeline.  Returns count of new rows inserted."""
        logger.info("━━  SimplifyJobsScraper  ━━  starting …")
        inserted = 0

        # Register API response interceptor BEFORE navigation
        self.page.on("response", self._on_response)

        try:
            await self.page.goto(self.SEARCH_URL, wait_until="networkidle", timeout=60_000)
            await human_delay(2.0, 4.0)
        except Exception as exc:
            logger.warning("Page load issue (may still have data): %s", exc)

        # Scroll down to trigger lazy-loading of more results
        for _ in range(3):
            await self.page.evaluate("window.scrollBy(0, window.innerHeight)")
            await human_delay(1.0, 2.5)

        # Decide strategy based on intercepted data
        if self._api_jobs:
            logger.info("Intercepted %d jobs from API responses.", len(self._api_jobs))
            jobs = self._api_jobs[:MAX_JOBS_PER_SOURCE]
            for idx, job in enumerate(jobs):
                logger.info("  [%d/%d] %s", idx + 1, len(jobs), job.get("title", "?"))
                try:
                    mapped = self._map_api_job(job)
                    if self.db.insert_job(mapped):
                        inserted += 1
                except Exception as exc:
                    logger.warning("  ⚠  Skipping API job %d: %s", idx + 1, exc)
        else:
            logger.info("No API data intercepted — falling back to DOM parsing.")
            inserted = await self._scrape_from_dom()

        logger.info("━━  SimplifyJobsScraper  ━━  done.  Inserted %d new jobs.", inserted)
        return inserted

    # -- API interception ---------------------------------------------------

    async def _on_response(self, response: Response) -> None:
        """Callback for every network response. Captures JSON job data."""
        try:
            url = response.url
            if response.status != 200:
                return
            content_type = response.headers.get("content-type", "")
            if "application/json" not in content_type:
                return

            body = await response.json()
            self._extract_jobs_from_json(body, url)
        except Exception:
            pass  # Silently skip non-JSON or unreadable responses

    def _extract_jobs_from_json(self, data: Any, url: str) -> None:
        """Recursively look for job-like objects in the JSON payload."""
        if isinstance(data, dict):
            if "company_name" in data or "companyName" in data:
                if "title" in data or "name" in data:
                    self._api_jobs.append(data)
                    return

            for key in ("jobs", "results", "data", "items", "listings", "hits"):
                if key in data and isinstance(data[key], list):
                    for item in data[key]:
                        self._extract_jobs_from_json(item, url)
                    return

            for value in data.values():
                if isinstance(value, (dict, list)):
                    self._extract_jobs_from_json(value, url)

        elif isinstance(data, list):
            for item in data:
                self._extract_jobs_from_json(item, url)

    def _map_api_job(self, raw: dict[str, Any]) -> dict[str, Any]:
        """Map an intercepted API job object to our DB schema."""
        title = raw.get("title") or raw.get("name") or "Untitled"
        company = (
            raw.get("company_name")
            or raw.get("companyName")
            or raw.get("company", {}).get("name", "Unknown")
            if isinstance(raw.get("company"), dict)
            else raw.get("company_name") or raw.get("companyName") or "Unknown"
        )

        description = (
            raw.get("description")
            or raw.get("body")
            or raw.get("details")
            or "No description available."
        )

        wage = raw.get("salary") or raw.get("wage") or raw.get("compensation")
        if isinstance(wage, dict):
            lo = wage.get("min") or wage.get("low") or ""
            hi = wage.get("max") or wage.get("high") or ""
            currency = wage.get("currency", "USD")
            wage = f"{currency} {lo}–{hi}" if lo or hi else None
        elif isinstance(wage, (int, float)):
            wage = f"${wage:,.0f}"
        elif isinstance(wage, str) and wage:
            pass  # keep as-is
        else:
            wage = extract_salary(str(description))

        location = (
            raw.get("location")
            or raw.get("city")
            or raw.get("locations", ["Not specified"])[0]
            if isinstance(raw.get("locations"), list) and raw.get("locations")
            else raw.get("location") or "Not specified"
        )
        if isinstance(location, dict):
            location = location.get("name") or location.get("city") or "Not specified"
        if isinstance(location, list):
            location = ", ".join(str(l) for l in location) or "Not specified"

        loc_req = raw.get("locationRequirement") or raw.get("work_type") or ""
        if not loc_req:
            loc_req = infer_location_requirement(title, str(location), str(description))

        exp = raw.get("experienceLevel") or raw.get("experience_level") or raw.get("seniority")
        if not exp:
            exp = infer_experience_level(title, str(description))

        job_id = raw.get("id") or raw.get("_id") or raw.get("slug") or ""
        slug = raw.get("slug") or re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
        source_url = raw.get("url") or raw.get("apply_url") or raw.get("sourceUrl")
        if not source_url and job_id:
            source_url = f"https://simplify.jobs/p/{job_id}/{slug}"
        if not source_url:
            source_url = f"https://simplify.jobs/jobs?query={title.replace(' ', '+')}"

        posted_at = raw.get("postedAt") or raw.get("posted_at") or raw.get("created_at") or ""

        return {
            "title": str(title),
            "companyName": str(company),
            "description": str(description),
            "wage": str(wage) if wage else None,
            "locationRequirement": str(loc_req),
            "experienceLevel": str(exp) if exp else None,
            "location": str(location),
            "sourceUrl": str(source_url),
            "sourceSite": self.SOURCE_SITE,
            "postedAt": str(posted_at) if posted_at else None,
        }

    # -- DOM fallback -------------------------------------------------------

    async def _scrape_from_dom(self) -> int:
        """Parse rendered DOM when API interception yields no results."""
        inserted = 0

        try:
            await self.page.wait_for_selector("h3", timeout=15_000)
        except Exception:
            logger.warning("Timed out waiting for job card elements.")
            return 0

        html = await self.page.content()
        soup = BeautifulSoup(html, "lxml")

        cards = soup.select("button:has(h3)")
        logger.info("DOM fallback found %d potential job cards.", len(cards))

        for idx, card in enumerate(cards[:MAX_JOBS_PER_SOURCE]):
            try:
                job = self._parse_dom_card(card, idx)
                if job and self.db.insert_job(job):
                    inserted += 1
            except Exception as exc:
                logger.warning("  ⚠  DOM card %d error: %s", idx, exc)

        return inserted

    def _parse_dom_card(self, card: Tag, idx: int) -> Optional[dict[str, Any]]:
        """Extract fields from a single DOM card element."""
        h3 = card.select_one("h3")
        title = h3.get_text(strip=True) if h3 else None
        if not title:
            return None

        # Company — usually a <span> following an <img> (logo)
        all_spans = card.select("span")
        company = "Unknown"
        for span in all_spans:
            text = span.get_text(strip=True)
            if text and text != title and len(text) > 1 and not text.startswith("$"):
                company = text
                break

        # Wage — look for salary-like <p> elements
        wage = None
        for p in card.select("p"):
            text = p.get_text(strip=True)
            if "/yr" in text or "/hr" in text or "$" in text:
                wage = text
                break

        # Location & requirement
        location = "Not specified"
        loc_req = "Not specified"
        for p in card.select("p"):
            text = p.get_text(strip=True)
            if any(kw in text.lower() for kw in ("remote", "in person", "hybrid", "on-site")):
                loc_req = text
            elif "," in text and len(text) < 80 and "$" not in text:
                location = text

        # Experience level
        exp = None
        for p in card.select("p"):
            text = p.get_text(strip=True)
            if text.lower() in ("intern", "junior", "mid", "senior", "lead", "entry", "expert", "staff"):
                exp = text.capitalize()
                break

        source_url = f"https://simplify.jobs/jobs?query=software+engineer#card-{idx}"

        return {
            "title": title,
            "companyName": company,
            "description": f"Job listing for {title} at {company}.",
            "wage": wage,
            "locationRequirement": loc_req or infer_location_requirement(title, location, ""),
            "experienceLevel": exp,
            "location": location,
            "sourceUrl": source_url,
            "sourceSite": self.SOURCE_SITE,
            "postedAt": None,
        }
