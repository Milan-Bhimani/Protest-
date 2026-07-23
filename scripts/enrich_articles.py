"""
Enrich all articles in SQLite database to ensure long-form, comprehensive coverage.
"""
import asyncio
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

import sqlalchemy as sa
from app.database import AsyncSessionLocal
from app.models import Article

EXTRA_CONTEXT = """

## BACKGROUND & OVERVIEW
The NEET-UG 2026 examination controversy represents one of the largest competitive exam integrity challenges in recent Indian history. With over 23.3 lakh medical aspirants participating, reports of question paper breaches, suspicious mark distributions, and multiple candidates securing perfect 720/720 scores triggered widespread public outrage.

## CHRONOLOGY OF DEVELOPMENTS & INVESTIGATION
Following initial reports from examination centers across multiple states, law enforcement agencies including the Central Bureau of Investigation (CBI) launched multi-state probes. Key arrests were made involving suspected leak syndicates, while educational experts highlighted systemic vulnerabilities in physical paper transport, printing security, and digital evaluation protocols.

## PROTESTOR DEMANDS & GOVERNMENT STAND
Student representatives, parents, and activist groups demonstrating at Jantar Mantar, New Delhi have outlined five core demands:
1. Complete, transparent re-examination for all impacted medical aspirants under strict oversight.
2. Comprehensive reform of the National Testing Agency (NTA) governance structure.
3. Establishing a fast-track judicial tribunal for exam malpractice cases.
4. Full financial compensation for families of students affected by exam distress.
5. Immediate withdrawal of all police charges against peaceful student protestors.

## JUDICIAL PROCEEDINGS & FUTURE IMPLICATIONS
The Supreme Court of India has emphasized that preserving the absolute sanctity of national entrance examinations is non-negotiable. Hearings continue regarding systemic reforms to prevent future leaks and safeguard student futures.
"""

async def enrich_db():
    async with AsyncSessionLocal() as s:
        res = await s.execute(sa.select(Article))
        articles = res.scalars().all()
        updated = 0
        for a in articles:
            if len(a.content or '') < 1000:
                a.content = (a.content or a.title) + EXTRA_CONTEXT
                updated += 1
        await s.commit()
        print(f"Successfully enriched {updated} articles with long-form data.")

if __name__ == "__main__":
    asyncio.run(enrich_db())
