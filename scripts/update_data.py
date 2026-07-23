"""
Standalone script: fetches news from RSS feeds and pushes into the backend API.

Usage:
    python scripts/update_data.py

Environment variables:
    BACKEND_URL           (default: http://localhost:8000)
    INGESTION_KEY         (default: dev-ingest-key)
    NEXTJS_URL            (default: http://localhost:3000)
    REVALIDATION_SECRET   (default: dev-revalidation-secret)
"""

import asyncio
import os
import sys

import httpx

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
INGESTION_KEY = os.getenv("INGESTION_KEY", "dev-ingest-key")
NEXTJS_URL = os.getenv("NEXTJS_URL", "http://localhost:3000")

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.tasks.ingestion import (
    fetch_news,
    parse_articles,
    parse_events,
    parse_reactions,
)


async def main():
    print("=" * 50)
    print("STRAW HAT PRESS — Data Update Script")
    print("=" * 50)

    print("\n[1/4] Fetching news from RSS feeds...")
    print("       (21 feeds, filtering for NEET/protest keywords)")
    items = await fetch_news()
    print(f"       Found {len(items)} relevant articles")

    if not items:
        print("  Nothing to ingest. Try again later for fresh content.")
        return

    articles = parse_articles(items)
    reactions = parse_reactions(items)

    print("\n[2/4] Parsed data:")
    print(f"       Articles: {len(articles)}")
    print(f"       Reactions: {len(reactions)}")

    payload = {
        "articles": articles,
        "events": [],
        "reactions": reactions,
    }

    print(f"\n[3/4] Sending to backend at {BACKEND_URL}...")
    try:
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(
                f"{BACKEND_URL}/api/ingest",
                json=payload,
                headers={"X-API-Key": INGESTION_KEY},
            )

            if resp.status_code != 200:
                print(f"       Backend error: {resp.status_code}")
                print(f"       Response: {resp.text[:500]}")
                print("\n       Make sure the backend server is running on port 8000.")
                print("       Start it with: uvicorn app.main:app --reload --port 8000")
                sys.exit(1)

            result = resp.json()
            print("       Backend response:")
            print(
                f"         Articles created: {result['articles_created']} (skipped {len(articles) - result['articles_created']} duplicates)"
            )
            print(
                f"         Events created:   {result['events_created']} (events not auto-generated from RSS)"
            )
            print(
                f"         Reactions created: {result['reactions_created']} (skipped {len(reactions) - result['reactions_created']} duplicates)"
            )
    except httpx.ConnectError:
        print("       ERROR: Cannot connect to backend!")
        print(f"       Make sure the backend server is running on {BACKEND_URL}")
        print("       Start it with: uvicorn app.main:app --reload --port 8000")
        sys.exit(1)

    print("\n[4/4] Triggering Next.js revalidation...")
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                f"{NEXTJS_URL}/api/revalidate",
                json={
                    "tags": ["articles", "timeline", "reactions"],
                    "secret": os.getenv(
                        "REVALIDATION_SECRET", "dev-revalidation-secret"
                    ),
                },
            )
            if resp.status_code == 200:
                print("       Revalidation triggered OK")
            else:
                print(
                    f"       Revalidation skipped: {resp.status_code} (frontend may not be running)"
                )
    except httpx.ConnectError:
        print("       Frontend not running on 3000 — revalidation skipped")
        print("       Start frontend with: npm run dev")

    print("\n" + "=" * 50)
    print("Done. Refresh your browser to see updates.")
    print("=" * 50)


if __name__ == "__main__":
    asyncio.run(main())
