"""
scraper_engine.py — Lightweight entry-point for the job scraping microservice.

Orchestrates PythonOrgScraper and SimplifyJobsScraper via a StealthBrowser,
inserting results into PostgreSQL through DatabaseManager.
"""

from __future__ import annotations

import asyncio
import sys

from playwright.async_api import async_playwright

from browser import StealthBrowser
from database import DatabaseManager
from scrapers import PythonOrgScraper, SimplifyJobsScraper
from utils import human_delay, logger


async def main() -> None:
    logger.info("═══════════════════════════════════════════════════════════")
    logger.info("  Job Scraper Engine — starting run")
    logger.info("═══════════════════════════════════════════════════════════")

    db = DatabaseManager()
    try:
        db.connect()
    except Exception:
        logger.critical("Cannot proceed without database. Exiting.")
        sys.exit(1)

    total_inserted = 0

    async with async_playwright() as pw:
        stealth = StealthBrowser(pw)
        try:
            page = await stealth.launch()

            # Source 1: Python.org
            try:
                python_scraper = PythonOrgScraper(page, db)
                total_inserted += await python_scraper.scrape()
            except Exception as exc:
                logger.error("PythonOrgScraper failed: %s", exc, exc_info=True)

            await human_delay(2.0, 4.0)

            # Source 2: Simplify.jobs
            try:
                simplify_scraper = SimplifyJobsScraper(page, db)
                total_inserted += await simplify_scraper.scrape()
            except Exception as exc:
                logger.error("SimplifyJobsScraper failed: %s", exc, exc_info=True)

        finally:
            await stealth.close()

    db.close()

    logger.info("═══════════════════════════════════════════════════════════")
    logger.info("  Run complete — %d new jobs inserted in total.", total_inserted)
    logger.info("═══════════════════════════════════════════════════════════")


if __name__ == "__main__":
    asyncio.run(main())
