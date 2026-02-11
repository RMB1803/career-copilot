"""
browser.py — Stealth Playwright browser launcher with anti-bot measures.
"""

from __future__ import annotations

import random
from typing import Optional

from fake_useragent import UserAgent
from playwright.async_api import (
    Browser,
    BrowserContext,
    Page,
    Playwright,
)

from utils import VIEWPORT_POOL, logger


# ═══════════════════════════════════════════════════════════════════════════
# StealthBrowser
# ═══════════════════════════════════════════════════════════════════════════
class StealthBrowser:
    """Context manager that yields a stealth Playwright ``Page``.

    Anti-bot measures:
    • Randomised User-Agent via ``fake-useragent``
    • Randomly chosen realistic viewport
    • ``--disable-blink-features=AutomationControlled``
    • Extra Accept-Language / Sec-CH-UA headers
    """

    def __init__(self, playwright: Playwright) -> None:
        self._pw = playwright
        self._browser: Optional[Browser] = None
        self._context: Optional[BrowserContext] = None
        self.page: Optional[Page] = None

    async def launch(self) -> Page:
        ua = UserAgent(browsers=["chrome", "edge", "firefox"])
        user_agent: str = ua.random
        viewport = random.choice(VIEWPORT_POOL)

        self._browser = await self._pw.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-dev-shm-usage",
            ],
        )
        self._context = await self._browser.new_context(
            user_agent=user_agent,
            viewport=viewport,
            locale="en-US",
            extra_http_headers={
                "Accept-Language": "en-US,en;q=0.9",
                "Sec-CH-UA-Platform": '"Linux"',
            },
        )
        self.page = await self._context.new_page()
        logger.info(
            "Browser launched  UA=%s…  viewport=%sx%s",
            user_agent[:50], viewport["width"], viewport["height"],
        )
        return self.page

    async def close(self) -> None:
        if self._context:
            await self._context.close()
        if self._browser:
            await self._browser.close()
        logger.info("Browser closed.")
