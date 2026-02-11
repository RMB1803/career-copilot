"""
database.py — PostgreSQL connection manager and upsert logic.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Optional

import psycopg2
import psycopg2.extras
from dotenv import load_dotenv

from utils import logger

# ---------------------------------------------------------------------------
# Resolve the project-root .env file
# ---------------------------------------------------------------------------
_PROJECT_ROOT = Path(__file__).resolve().parent.parent
_ENV_PATH = _PROJECT_ROOT / ".env"
load_dotenv(dotenv_path=_ENV_PATH)

# ---------------------------------------------------------------------------
# SQL
# ---------------------------------------------------------------------------
UPSERT_SQL = """
INSERT INTO scraped_jobs (
    title, "companyName", description, wage,
    "locationRequirement", "experienceLevel", location,
    "sourceUrl", "sourceSite", "postedAt"
) VALUES (
    %(title)s, %(companyName)s, %(description)s, %(wage)s,
    %(locationRequirement)s, %(experienceLevel)s, %(location)s,
    %(sourceUrl)s, %(sourceSite)s, %(postedAt)s
)
ON CONFLICT ("sourceUrl") DO NOTHING;
"""


# ═══════════════════════════════════════════════════════════════════════════
# DatabaseManager
# ═══════════════════════════════════════════════════════════════════════════
class DatabaseManager:
    """Manages PostgreSQL connections and performs upsert operations.

    Constructs the DSN from individual env vars (DB_HOST, DB_PORT, …) exactly
    mirroring the logic in src/data/env/server.ts.
    """

    def __init__(self) -> None:
        self.host = os.getenv("DB_HOST", "localhost")
        self.port = os.getenv("DB_PORT", "5432")
        self.user = os.getenv("DB_USER", "postgres")
        self.password = os.getenv("DB_PASSWORD", "")
        self.dbname = os.getenv("DB_NAME", "career-copilot")
        self.conn: Optional[psycopg2.extensions.connection] = None

    # -- connection helpers -------------------------------------------------

    def _dsn(self) -> str:
        """Build a psycopg2-compatible DSN string."""
        return (
            f"host={self.host} port={self.port} dbname={self.dbname} "
            f"user={self.user} password={self.password}"
        )

    def connect(self) -> None:
        """Open a persistent connection (idempotent)."""
        if self.conn and not self.conn.closed:
            return
        try:
            self.conn = psycopg2.connect(self._dsn())
            self.conn.autocommit = True
            logger.info(
                "Connected to PostgreSQL  %s@%s:%s/%s",
                self.user, self.host, self.port, self.dbname,
            )
        except psycopg2.Error as exc:
            logger.error("Failed to connect to PostgreSQL: %s", exc)
            raise

    def close(self) -> None:
        """Close the connection if open."""
        if self.conn and not self.conn.closed:
            self.conn.close()
            logger.info("PostgreSQL connection closed.")

    # -- data operations ----------------------------------------------------

    def insert_job(self, job: dict[str, Any]) -> bool:
        """Insert a single job dict into *scraped_jobs*.

        Uses ``ON CONFLICT ("sourceUrl") DO NOTHING`` so duplicate runs are
        harmless.  Returns ``True`` if a new row was inserted.
        """
        if not self.conn or self.conn.closed:
            self.connect()

        try:
            with self.conn.cursor() as cur:  # type: ignore[union-attr]
                cur.execute(UPSERT_SQL, job)
                inserted = cur.rowcount > 0
                if inserted:
                    logger.info("  ✓ Inserted: %s", job.get("title", "?"))
                else:
                    logger.debug("  ⊘ Skipped (duplicate): %s", job.get("title", "?"))
                return inserted
        except psycopg2.Error as exc:
            logger.error("DB insert error for '%s': %s", job.get("title", "?"), exc)
            if self.conn and not self.conn.closed:
                self.conn.rollback()
            return False
