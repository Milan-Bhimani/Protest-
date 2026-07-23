"""
Force re-seed: wipes all content and re-seeds from scratch.

Run from ANYWHERE in the project:
    python scripts/reseed.py

No app.* imports — runs everything as clean subprocesses from backend/.
"""

import asyncio
import os
import subprocess
import sys

BACKEND_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "backend")
)
PYTHON = sys.executable


def run(code: str) -> subprocess.CompletedProcess:
    """Run a Python snippet inside the backend virtualenv, from BACKEND_DIR."""
    return subprocess.run(
        [PYTHON, "-c", code],
        cwd=BACKEND_DIR,
        capture_output=True,
        text=True,
    )


def banner(msg: str):
    print(f"\n{'=' * 60}")
    print(f"  {msg}")
    print(f"{'=' * 60}")


def step(n: int, msg: str):
    print(f"\n[{n}/3] {msg}")


def ok(msg: str):
    print(f"       [OK]  {msg}")


def err(msg: str):
    print(f"       [ERR] {msg}")


def main():
    banner("STRAW HAT PRESS — Force Re-Seed")
    print()
    print("  WARNING: Deletes ALL articles, events, documents,")
    print("           reactions, stories, and fact-checks.")
    print("           Admin users are preserved.\n")

    try:
        answer = input("  Type 'yes' to continue: ").strip().lower()
    except EOFError:
        answer = "yes"
        print("yes  (non-interactive)")

    if answer != "yes":
        print("\n  Aborted — nothing changed.")
        sys.exit(0)

    # ── Step 1: Clear all content tables ─────────────────────────────────────
    step(1, "Clearing existing content...")

    CLEAR_CODE = """
import asyncio
from sqlalchemy import delete
from app.database import AsyncSessionLocal
from app.models import (
    Article, Source, Event, Document, PublicReaction,
    StudentStory, FactCheck, NewsletterSubscriber, AuditLog,
)

TABLES = [Source, Article, Event, Document, PublicReaction,
          StudentStory, FactCheck, NewsletterSubscriber, AuditLog]

async def clear():
    async with AsyncSessionLocal() as db:
        for t in TABLES:
            r = await db.execute(delete(t))
            print(f"{t.__tablename__}:{r.rowcount}")
        await db.commit()

asyncio.run(clear())
"""
    result = run(CLEAR_CODE)

    if result.returncode != 0:
        print(f"\n  ERROR during clear:\n{result.stderr}")
        sys.exit(1)

    for line in result.stdout.strip().splitlines():
        if ":" in line:
            table, count = line.split(":", 1)
            ok(f"{table:<32} {count} rows deleted")

    # ── Step 2: Re-seed ───────────────────────────────────────────────────────
    step(2, "Seeding fresh data...")

    SEED_CODE = """
import asyncio
from app.seed.seed import seed
asyncio.run(seed())
"""
    result = run(SEED_CODE)

    if result.returncode != 0:
        print(f"\n  ERROR during seed:\n{result.stderr}")
        sys.exit(1)

    for line in result.stdout.strip().splitlines():
        print(f"       {line}")

    # ── Step 3: Summary ───────────────────────────────────────────────────────
    step(3, "Database now contains:")

    COUNT_CODE = """
import asyncio
from sqlalchemy import select, func
from app.database import AsyncSessionLocal
from app.models import Article, Event, Document, PublicReaction, StudentStory, FactCheck

async def count():
    async with AsyncSessionLocal() as db:
        for t in [Article, Event, Document, PublicReaction, StudentStory, FactCheck]:
            r = await db.execute(select(func.count()).select_from(t))
            print(f"{t.__tablename__}:{r.scalar_one()}")

asyncio.run(count())
"""
    result = run(COUNT_CODE)
    for line in result.stdout.strip().splitlines():
        if ":" in line:
            table, count = line.split(":", 1)
            ok(f"{table:<32} {count} records")

    banner("Done!")
    print("""
  Next steps:
    1. Backend is already running — data is live immediately.
    2. Hard-refresh your browser (Ctrl+Shift+R) to see fresh data.
    3. Fetch latest news anytime:
         python scripts/update_data.py
""")


if __name__ == "__main__":
    main()
