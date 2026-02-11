"""
utils.py — Shared constants and helper functions for the job scraper.
"""

from __future__ import annotations

import asyncio
import logging
import random
import re
from typing import Optional

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  [%(levelname)s]  %(name)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("scraper_engine")

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
MAX_JOBS_PER_SOURCE = 15
HUMAN_DELAY_MIN = 1.0
HUMAN_DELAY_MAX = 4.0

VIEWPORT_POOL: list[dict[str, int]] = [
    {"width": 1920, "height": 1080},
    {"width": 1366, "height": 768},
    {"width": 1536, "height": 864},
    {"width": 1440, "height": 900},
    {"width": 1280, "height": 720},
]


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------
async def human_delay(lo: float = HUMAN_DELAY_MIN, hi: float = HUMAN_DELAY_MAX) -> None:
    """Sleep a random interval to mimic human pacing."""
    await asyncio.sleep(random.uniform(lo, hi))


def extract_salary(text: str) -> Optional[str]:
    """Best-effort regex to pull a salary / wage string from free text."""
    patterns = [
        r"\$[\d,]+(?:\s*[-–—to]+\s*\$?[\d,]+)?(?:\s*(?:per\s+)?(?:year|yr|annum|annually|hour|hr|month|mo))?",
        r"(?:USD|EUR|GBP)\s*[\d,]+(?:\s*[-–—to]+\s*[\d,]+)?",
        r"[\d,]+\s*(?:USD|EUR|GBP)",
    ]
    for pat in patterns:
        match = re.search(pat, text, re.IGNORECASE)
        if match:
            return match.group(0).strip()
    return None


def infer_experience_level(title: str, description: str) -> Optional[str]:
    """Keyword-match experience level from title or description."""
    combined = f"{title} {description}".lower()
    if re.search(r"\b(?:intern|internship)\b", combined):
        return "Intern"
    if re.search(r"\bjunior\b|entry[\s-]?level", combined):
        return "Junior"
    if re.search(r"\bmid[\s-]?level\b|\bintermediate\b", combined):
        return "Mid"
    if re.search(r"\bsenior\b|\bsr\.?\b", combined):
        return "Senior"
    if re.search(r"\b(?:lead|principal|staff)\b", combined):
        return "Lead"
    if re.search(r"\b(?:director|head of|vp|vice president)\b", combined):
        return "Director"
    return None


def infer_location_requirement(title: str, location: str, description: str) -> str:
    """Decide Remote / Hybrid / On-site from available text."""
    combined = f"{title} {location} {description}".lower()
    if "remote" in combined or "telecommut" in combined:
        return "Remote"
    if "hybrid" in combined:
        return "Hybrid"
    return "On-site"
