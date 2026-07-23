"""
Seed script: populates the database with factual, unbiased baseline data
about the NEET-UG 2026 paper leak controversy and the Jantar Mantar protests.

Sources used for content:
- The Hindu (ground reporting by Kulsoom Faiz, July 2026)
- Indian Express (July 2026 protest coverage)
- NDTV live coverage (July 20, 2026)
- Wikipedia: 2026 NEET-UG paper leak
- CBI press statements (PIB)
- Parliamentary records
- PM Modi's statement via Kiren Rijiju
- Medanta Hospital bulletin (Sonam Wangchuk)

Platform principle: Report facts. No organizational affiliation. No bias.
"""

import asyncio
from datetime import datetime, timezone

from app.database import engine, AsyncSessionLocal, Base
from app.models import (
    Article,
    Source,
    Event,
    Document,
    PublicReaction,
    StudentStory,
    FactCheck,
    NewsletterSubscriber,
    AuditLog,
    User,
    Role,
    ArticleType,
    StoryStatus,
    FactCheckStatus,
)
from sqlalchemy import select, delete
from app.auth import hash_password


# ─── ARTICLE CONTENT ──────────────────────────────────────────────────────────
# Each article is written as factual, attributed journalism.
# No party/organization bias. All claims sourced.

ARTICLE_1_CONTENT = """
The NEET-UG (National Eligibility cum Entrance Test for Undergraduate medical admissions) 2026 examination was held on May 3, 2026, for over 2.27 million aspirants across India. It is the sole gateway to MBBS, BDS, and allied medical courses at government and private colleges in India. For millions of students who spend years preparing, it is the most consequential examination of their lives.

## How the Leak Happened

Investigations by the Central Bureau of Investigation (CBI) revealed that the leak originated within the examination supply chain. P.V. Kulkarni, a chemistry lecturer from Pune who was involved in the examination process on behalf of the National Testing Agency (NTA), allegedly obtained access to the confidential question papers.

According to the CBI's remand application filed in court, Kulkarni dictated questions, their options, and answers to select students in "special coaching classes" conducted at his residence in the weeks before the exam. A separate coaching center owner from Latur, Shivraj Raghunath Motegaonkar, was found with 132 handwritten chemistry questions on his mobile phone — of which 111 exactly matched the NTA's master question set.

Students who attended these sessions reportedly had handwritten notes that "exactly tallied" with the official NEET-UG 2026 chemistry paper. The "guess paper" containing approximately 410 questions was allegedly circulated among a select group of aspirants before the examination.

## NTA's Initial Response and Reversal

The National Testing Agency initially maintained that the exam was conducted under strict security protocols including GPS-tracked transport for question papers, AI-assisted CCTV monitoring, and the use of 5G jammers at examination centres. The agency stated there had been no breach.

However, as student reports accumulated and media investigations corroborated them, the NTA escalated the matter to central investigative agencies on May 8, 2026. On May 12, 2026 — nine days after the original exam — the NTA officially cancelled the examination and announced a re-test.

## CBI Investigation and Arrests

The CBI has arrested 13 individuals in connection with the case as of late July 2026. Kulkarni, identified as the alleged "kingpin," was arrested on May 15, 2026. He and co-accused Manisha Waghmare were remanded to 10 days of CBI custody on July 9, 2026, for further interrogation to map the extent of the conspiracy.

The investigation is ongoing. The CBI is examining how question papers were transported, who else had access, whether the leak was isolated or systematic, and whether similar leaks occurred in previous years.

## The Re-Examination

A re-examination was conducted on June 21, 2026, for approximately 19,99,895 candidates. Notably, over 2.7 lakh candidates did not appear for the re-test — the highest number of absentees for such a process in NTA history. Results were declared on July 16, 2026. Over 11.21 lakh candidates qualified and the counselling process began.

However, some candidates subsequently raised concerns about discrepancies in their OMR (Optical Mark Recognition) sheets. The NTA rejected these claims, stating the viral images of OMR sheets circulating on social media were "digitally altered or fabricated." The agency reaffirmed the validity of the declared scores.

## Government Response

On July 22, 2026, Prime Minister Narendra Modi called the NEET paper leak a "ghor paap" (grave sin) and assured strict action against those responsible for "playing with the future of youth." On July 23, his government announced the establishment of fast-track courts to ensure swift and stringent punishment in paper leak cases.

The opposition, led by Congress, demanded the resignation of Union Education Minister Dharmendra Pradhan and an independent judicial investigation into the NTA's functioning.

## Why This Matters

The NEET paper leak represents a systemic failure in India's examination infrastructure. With over 2.27 million students appearing for a single exam, the stakes — and the incentives for malpractice — are enormous. The incident has sparked a national debate about whether a single high-stakes test should determine the medical careers of millions of young Indians, and whether the NTA has adequate safeguards to prevent such breaches.

For students who spent two to four years preparing, the cancellation meant losing months of effort. For those whose leaked-paper competitors scored higher, it represented an injustice that no re-test could fully remedy.
"""

ARTICLE_2_CONTENT = """
On July 20, 2026 — the 45th day of the Jantar Mantar protest and the opening day of Parliament's Monsoon Session — thousands of students, youth, and supporters marched from Jantar Mantar toward Parliament in what organizers called the "Sansad Chalo" (March to Parliament) procession. The day ended with police lathi charges, tear gas, over 100 injured, dozens detained, and national outrage.

## Background: Why Parliament's Opening Day?

Protest leaders deliberately chose the first day of the Monsoon Session to maximize political pressure. Parliament was to debate a budget session agenda, but protesters wanted NEET accountability placed at the top of the order. They believed the simultaneous gathering at Parliament and outside it would be impossible for legislators to ignore.

The Delhi Police, under the union government's authority, had denied permission for the march citing security concerns and the prohibitory order under Section 163 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) — the successor to Section 144 CrPC — which restricts assembly of five or more persons in the New Delhi district.

## Morning: Assembling at Jantar Mantar

By 8 AM, the protest site at Jantar Mantar was swelling beyond its usual numbers. Students who had travelled overnight from UP, Bihar, Haryana, Rajasthan, MP, Maharashtra, and Assam filled the area around the monument. Many carried handmade posters with the names of NEET aspirants who had died by suicide after the paper leak. Others held their chemistry textbooks — a symbol that had become emblematic of the protest.

Sonam Wangchuk, by then on his 23rd day of an indefinite hunger strike, was present in a weakened state. Reports from that morning describe him being persuaded by the father of Riya Thapa — a NEET aspirant who had died — to lead the march to Parliament rather than continue his fast alone.

## Afternoon: The March and Police Action

At approximately 1:30 PM, the march began moving from Jantar Mantar toward Parliament Street. Several metro stations — Rajiv Chowk, Patel Chowk, Mandi House, and Central Secretariat — were closed by the Delhi Metro Rail Corporation (DMRC) to manage crowds.

As the procession reached barricades near the Press Club of India, Shastri Bhawan, and Raisina Road, security forces attempted to stop the march. Accounts from reporters present on the ground — including correspondents from The South First, Media India Group, and Rediff — describe what followed:

Protesters who pushed against the barricades were met with baton charges. Tear gas shells were fired. Students and journalists were caught in the chaos. Over 100 people were injured, including several who suffered head and limb injuries. Dozens were detained. Mobile internet services were suspended in parts of Central Delhi.

Delhi Police later stated that 118 police personnel were also injured and that 20+ police vehicles were damaged. Both accounts were disputed by some protesters, who said the police figures were inflated.

## Evening: Political Fallout

The use of force against students — many of them minors — drew immediate national reaction. The Supreme Court Bar Association (SCBA) called for an impartial judicial inquiry into the police action. Opposition MPs raised the issue in both Houses of Parliament. Several adjournments were called as the Opposition walked out.

At approximately 6 PM, in what was described as a first breakthrough in 45 days, CJP (Cockroach Janta Party, the student group organizing the protest) spokespersons Saurav Das and Ashutosh Ranka were invited to meet Union Health Minister JP Nadda at his residence. The 10-minute meeting produced no commitments. Nadda received a memorandum with three demands and said he would discuss it internally.

Rahul Gandhi and Priyanka Gandhi Vadra staged a sit-in outside PM Modi's residence on Lok Kalyan Marg in solidarity with students the following morning and were forcibly removed by police.

## What Students Said

Multiple students who were at the march gave accounts to journalists afterward. Nedhi, a student from Delhi, described the experience: "We were sitting peacefully when they threw tear gas and beat us. We aren't criminals, we are students." Neha from Bihar said: "They beat the girls too. I fell down and lost my slippers."

## The Larger Question

The July 20 lathi charge transformed the NEET paper leak from an examination controversy into a question of civil liberties. Whether the police action was proportionate — against students marching peacefully or violently breaching barricades — is contested and is under judicial scrutiny. What is not contested is that the day marked a turning point, and the images and videos of students being beaten spread rapidly across social media, drawing the movement international attention.
"""

ARTICLE_3_CONTENT = """
Sonam Wangchuk, 57, is best known internationally as one of the inspirations for the character "Phunsukh Wangdu" in the Bollywood film 3 Idiots. He is a mechanical engineer, climate activist, and founder of the SECMOL (Students' Educational and Cultural Movement of Ladakh) alternative school. He holds no elected office and is not affiliated with any political party.

On June 28, 2026, Wangchuk began an indefinite hunger strike at Jantar Mantar, New Delhi, in solidarity with students protesting the NEET-UG 2026 paper leak. By July 23, 2026, he was on the 26th day of his fast and receiving treatment in the Intensive Care Unit at Medanta Hospital in Gurugram.

## Why He Joined

Wangchuk has been a vocal critic of India's examination system for years. Speaking before beginning his fast, he argued that the NEET paper leak was not an isolated incident but a symptom of a deeper rot in how India conducts high-stakes examinations, and that the students' demands for accountability were legitimate and urgent.

His core demands as stated in his own words:
- No punitive or retaliatory legal action against students who participated in the protests, including the July 20 Sansad Chalo march.
- Adequate compensation for the families of students who died by suicide following the paper leak.
- A meaningful parliamentary debate on education system accountability, including the role of the NTA.

Wangchuk has separately raised issues related to Ladakh's constitutional status, but for this hunger strike, his stated focus was the student protest movement and examination reform.

## The Hunger Strike: Day by Day

By Day 20 of his fast (July 17), Wangchuk's health had begun to visibly deteriorate. Ph.D. student Manish Kumar from Allahabad University, who had been fasting for 18 days alongside him, described the scene at Jantar Mantar: "Every morning more people arrive. The government can pretend not to see us. But every day Wangchuk-ji is there, they cannot pretend the country is not watching."

On July 19, Delhi Police removed Wangchuk from the protest site and took him to Safdarjung Hospital, citing deteriorating health. His wife, Gitanjali Angmo, subsequently filed a plea in the Delhi High Court alleging that his transfer was involuntary and that his safety was at risk. The court ordered his transfer to Medanta Hospital in Gurugram on July 21.

Medanta Hospital issued a bulletin confirming he was in the ICU but stable, under the care of a multidisciplinary team. He was receiving IV fluids and medical monitoring.

## His Conditions to End the Fast

In a written statement issued from Medanta Hospital on July 21, Wangchuk said: "I will end my fast only when I receive an unequivocal assurance from the government that no punitive or retaliatory legal action will be taken against the students and youth who participated in these protests."

Union Ministers JP Nadda and Jitendra Singh visited him at the hospital and reportedly assured him the government would positively consider his demands. As of July 23, Wangchuk had not ended his fast, pending written confirmation of those assurances.

## Public and Political Response

Wangchuk's hunger strike drew support from across the political and cultural spectrum — an unusual occurrence in polarized India. Actors Prakash Raj and Shabana Azmi were present at Jantar Mantar during the protest. Several MPs from both the ruling coalition and the opposition visited him in hospital. Opposition leaders urged him to end his fast for health reasons. Students at the protest site held candlelight vigils.

The government's position throughout was that discussions would happen, but no formal commitment was made until the hospital visits.

## What His Presence Meant for the Movement

Wangchuk's 25-day fast — and the images of a 57-year-old man growing visibly weaker while seated in solidarity with students — gave the NEET protest movement a moral authority and media visibility it might not otherwise have had. His participation also helped depoliticize the movement in public perception: Wangchuk holds no party affiliation and had no electoral ambitions, making it harder to dismiss the protest as a partisan exercise.

Whether his conditions will be met and whether the government's assurances will translate into formal policy remains to be seen as of July 23, 2026.
"""

ARTICLE_4_CONTENT = """
For 47 days — from June 6 to July 23, 2026 — a growing number of students, parents, and citizens have maintained a continuous presence at Jantar Mantar, the historic protest site in New Delhi. They come from every state in India. They are of every age. They sleep on footpaths, eat community meals, and wake each morning to chant slogans outside Parliament.

This article documents their voices, gathered from ground reporting by journalists from The Hindu, Indian Express, and The South First between July 17 and July 22, 2026.

## "Why Should I Wait for the System to Fail Me?"

Inayat, a Class 12 student, arrived with her sister from UP. She had two years of NEET preparation behind her and a re-exam result she was still anxious about. "I have seen the system fail multiple times already," she told a reporter. "Why should I wait until it happens to me personally before I speak up?"

## A PhD Student Who Has Not Eaten in 18 Days

Manish Kumar, a PhD student in Chemistry from Allahabad University, was on Day 18 of his own personal hunger strike when he spoke to The Hindu on July 17. "Whether it is NEET, UPSC, or any other competitive exam — the government is not taking any accountability," he said. "I am a chemistry student. I know what Kulkarni allegedly did. I know how paper security should work. This was not an accident. This was a system that someone exploited because no one was watching."

## Travelling Overnight With a Textbook

Suryaprakash Singh, a Master's student in Chemistry from Indore, took an overnight train to Delhi without telling his parents. He carried his Class 12 Chemistry NCERT textbook as a symbol. "When a paper leak leads to an exam being cancelled, it isn't just an exam that is lost. Your time, your energy, your resources, your parents' money — everything goes with it. The time you lose can never be returned."

## First Protests, Fresh Anger

A group of humanities students — attending their first protest — described their reason for coming: "The government should be afraid of the people, not the other way around." They were standing near a group of students from Punjab who had driven through the night. None of them had appeared for NEET. "This is not about just NEET students," one said. "This is about every student who prepares for any exam in this country."

## A Delhi Student After the Lathi Charge

Nedhi, from Delhi, was at the July 20 Sansad Chalo march. "We were sitting peacefully when they threw tear gas and beat us," she told The South First. "We aren't criminals. We are students. I don't understand why they beat us."

Siddhanth Raj, 21, a Philosophy student at Dayal Singh College, Delhi University, was at his first-ever protest. "It's not about one paper leak. Every leak puts our future at stake, yet no one is held accountable. How long are we supposed to keep enduring this?"

## A Woman from Bihar, After Losing Her Slippers in the Crowd

Neha from Bihar, who had come specifically because paper leaks are "normal" in her home state, described what happened when the lathi charge began: "They beat the girls too. I fell down and lost my slippers. Back home, paper leaks happen all the time. If we don't gather like this, how will anyone even hear us?"

## A Miranda House Student — For Her Cousin

Sana Parveen, a student at Miranda House, University of Delhi, came for her cousin who had spent three years preparing for NEET. "The National Education Policy's implementation is zero everywhere. The education system is collapsing. And my cousin gave three years of her life to something that was compromised before she even sat in the exam hall."

## A Parent Who Had No Stake — Except Conscience

Lata Pandey, 51 years old, mother of two children who have nothing to do with NEET, came because she read about the student suicides. "Should we wait until it happens to our own children?" she asked. "When I read that children are dying, I cannot sit at home."

## A Father Who Lost His Daughter

Ravindra Kumar, in his sixties, whose daughter scored well in 2024's NEET only for the exam to be cancelled due to irregularities: "Our entire family went into depression. She worked so hard. The cancellation was like being told: your effort doesn't matter. Now she is preparing again. I came here for her, and for every other child in her position."

## What They Want

Across hundreds of conversations documented by journalists at Jantar Mantar, the demands are consistent: accountability for the NEET-UG 2026 paper leak, action against those responsible, compensation for families of students who died, and structural reform of the NTA to prevent future leaks. Most students are emphatic that their protest is not political — they are not affiliated with any party, and they are not asking any political party to lead them. "We came because of what happened to us, not because a party told us to," said one student from Lucknow.
"""

ARTICLE_5_CONTENT = """
From the first student reports on social media in early May 2026 to the Prime Minister's statement on July 22, the government's response to the NEET-UG 2026 paper leak has followed a familiar pattern: initial denial, escalation to investigation, acknowledgment, and eventually, political engagement under pressure.

This is a chronological record of official statements and actions.

## May 3, 2026: Exam Day

NEET-UG 2026 is conducted for 2.27 million aspirants across India. The NTA states the exam was conducted under strict security including GPS-tracked paper transport, AI-assisted CCTV monitoring, and 5G jammers at examination centres.

## May 4–7: Social Media Reports Emerge

Students on Reddit (r/JEENEETards, r/indianmedschool) and Twitter begin posting that a significant portion of the chemistry section appeared identical to a "guess paper" that had been circulated before the exam. Coaching institutes in Latur, Maharashtra, and parts of UP are named in social media discussions. The NTA does not issue a public response.

## May 8: NTA Escalates to CBI

The NTA escalates the matter to the CBI for independent investigation, in what is widely interpreted as an implicit acknowledgment that something went wrong. The NTA's official statement says the agency is committed to examination integrity and is cooperating fully with investigative agencies.

## May 12: Official Cancellation

The NTA officially cancels the NEET-UG 2026 examination. Education Minister Dharmendra Pradhan states that a re-examination will be conducted and that those responsible for the leak will be brought to justice. He does not directly address demands for his resignation.

## May 15: CBI Arrests Kulkarni

The CBI arrests P.V. Kulkarni, identified as the alleged kingpin, a chemistry lecturer from Pune. PIB (Press Information Bureau) issues a brief statement confirming the arrest. No ministerial statement accompanies the announcement.

## June 6: First Major Jantar Mantar Protest

Students hold the first organized protest at Jantar Mantar. The government does not respond. Pradhan's office does not issue a comment. The protest is not covered prominently in most national newspapers initially.

## June 21: Re-Examination Conducted

The re-examination takes place. 19,99,895 students appear. 2.7 lakh students who were eligible do not appear — some citing distrust of the process, others due to logistical reasons. Pradhan tweets that the re-exam was successfully conducted and thanks the students for their participation.

## June 28: Sonam Wangchuk Begins Hunger Strike

Wangchuk's hunger strike begins at Jantar Mantar. The government does not respond publicly. Pradhan does not acknowledge the fast.

## July 16: Re-Exam Results Declared

Results are announced. The NTA rejects allegations of OMR sheet tampering. Pradhan says the NEET process has been "strengthened" and the re-exam demonstrates the government's commitment to fair examinations.

## July 17–19: Wangchuk's Health Deteriorates

No ministerial response. Delhi Police begin increased deployment around Jantar Mantar. On July 19, police remove Wangchuk from the site and take him to Safdarjung Hospital. The government does not comment on the removal.

## July 20: Sansad Chalo — Lathi Charge

The government imposes Section 163 BNSS across New Delhi district. As protests turn to a march, police use lathi charges and tear gas. Over 100 injured. Mobile internet suspended in parts of Central Delhi.

Pradhan's office later states that the government is "100% committed to discussing NEET" and accuses the Congress of using students as "political tools."

At 6 PM, JP Nadda meets CJP spokespersons for 10 minutes, receives a memorandum, and makes no commitments.

## July 21: Rahul Gandhi Removed from PM Residence Sit-In

Congress leaders Rahul Gandhi and Priyanka Gandhi Vadra stage a sit-in outside PM Modi's residence on Lok Kalyan Marg and are forcibly removed by police. Pradhan calls it a "political spectacle."

Delhi High Court orders Wangchuk's transfer to Medanta Hospital.

## July 22: PM Modi Calls it a 'Grave Sin'

Parliamentary Affairs Minister Kiren Rijiju tells Parliament that PM Modi has called the NEET paper leak a "ghor paap" (grave sin) and has assured strict action against those responsible for "playing with the future of youth." Modi says the issue "should not be a matter of partisan politics."

The statement is welcomed cautiously by some protest leaders and dismissed as insufficient by others, who note that no concrete demand — including the minister's resignation — has been addressed.

## July 23: Fast-Track Courts Announced

The government announces the establishment of fast-track courts for paper leak cases. Union Ministers Nadda and Jitendra Singh visit Wangchuk at Medanta Hospital. No written assurances are provided as of July 23.

Protest continues at Jantar Mantar. Students say they will not leave until formal, written commitments are made.

## Assessment

The government's response has been reactive rather than proactive at every stage: acknowledging the leak only after cancellation was unavoidable, making political statements only after the protest grew impossible to ignore, and beginning dialogue only after the July 20 violence generated international attention. Whether the fast-track courts and promised discussions will lead to structural reform of the NTA remains to be seen.
"""


async def seed(*, force: bool = False):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        existing = await db.execute(select(Article).limit(1))
        if existing.scalar_one_or_none() and not force:
            print("Data already seeded. Run scripts/reseed.py to force re-seed.")
            return

        print("Seeding database with factual NEET protest data...")

        # Clear all tables (child tables first to respect PostgreSQL FK constraints)
        for table in [
            Source,
            Article,
            Event,
            Document,
            PublicReaction,
            StudentStory,
            FactCheck,
            NewsletterSubscriber,
            AuditLog,
        ]:
            await db.execute(delete(table))

        # ── Admin User ────────────────────────────────────────────────────────
        role = await db.execute(select(Role).where(Role.name == "admin"))
        role = role.scalar_one_or_none()
        if not role:
            role = Role(name="admin", permissions={"all": True})
            db.add(role)
            await db.flush()

        admin = await db.execute(select(User).where(User.email == "admin@example.com"))
        admin = admin.scalar_one_or_none()
        if not admin:
            admin = User(
                email="admin@example.com",
                hashed_password=hash_password("admin123"),
                full_name="Admin",
                role_id=role.id,
                is_active=True,
            )
            db.add(admin)
            await db.flush()

        # ── Timeline Events ───────────────────────────────────────────────────
        events = [
            Event(
                date=datetime(2026, 5, 3, tzinfo=timezone.utc),
                title="NEET-UG 2026 Examination Conducted",
                description="NEET-UG 2026 is held for 2.27 million aspirants across India. The NTA states the exam was conducted with GPS-tracked paper transport, AI-assisted CCTV, and 5G jammers. Within hours, students on social media begin reporting that chemistry questions appeared identical to a pre-circulated 'guess paper'.",
                sources=[
                    "NTA official notification",
                    "Student reports on r/JEENEETards",
                    "r/indianmedschool Reddit threads",
                ],
            ),
            Event(
                date=datetime(2026, 5, 8, tzinfo=timezone.utc),
                title="NTA Refers Paper Leak Allegations to CBI",
                description="After mounting social media reports and media investigations, the National Testing Agency refers the matter to the Central Bureau of Investigation for independent investigation. The NTA says it is committed to examination integrity. The referral is widely read as an implicit acknowledgment of irregularities.",
                sources=[
                    "NTA official statement",
                    "PIB press release",
                    "The Hindu reporting",
                ],
            ),
            Event(
                date=datetime(2026, 5, 12, tzinfo=timezone.utc),
                title="NEET-UG 2026 Officially Cancelled",
                description="The NTA officially cancels the May 3 examination. Education Minister Dharmendra Pradhan announces a re-examination will be held and promises action against those responsible. Over 2.27 million students who appeared must prepare to sit the exam again.",
                sources=[
                    "NTA cancellation notice",
                    "Dharmendra Pradhan statement",
                    "All major national newspapers",
                ],
            ),
            Event(
                date=datetime(2026, 5, 15, tzinfo=timezone.utc),
                title="CBI Arrests Alleged Kingpin P.V. Kulkarni",
                description="The Central Bureau of Investigation arrests P.V. Kulkarni, a Pune-based chemistry lecturer identified as the alleged mastermind of the paper leak. Kulkarni had access to question papers through his involvement in the NTA examination process and allegedly dictated questions to students at his residence. Co-accused Manisha Waghmare is also arrested.",
                sources=["CBI press statement via PIB", "Mumbai Mirror", "The Hindu"],
            ),
            Event(
                date=datetime(2026, 6, 6, tzinfo=timezone.utc),
                title="First Major Student Protest at Jantar Mantar",
                description="Students, parents, and youth from across India hold the first organized protest at Jantar Mantar, New Delhi, demanding accountability for the NEET-UG 2026 paper leak, resignation of Education Minister Pradhan, and compensation for families of students who died by suicide. A 16-year-old aspirant holding a Class 12 Chemistry textbook becomes one of the defining images. Multiple student organizations participate — including SFI, AISA, AISF, and others.",
                sources=[
                    "Indian Express ground report",
                    "The Hindu",
                    "NDTV live coverage",
                ],
            ),
            Event(
                date=datetime(2026, 6, 21, tzinfo=timezone.utc),
                title="NEET-UG Re-Examination Held",
                description="The re-examination is conducted for approximately 19,99,895 candidates. Over 2.7 lakh eligible students do not appear — the highest absentee rate for a re-examination in NTA history. Many cite distrust of the process; others face logistical barriers. The exam proceeds without fresh incident.",
                sources=["NTA official announcement", "The Hindu", "Times of India"],
            ),
            Event(
                date=datetime(2026, 6, 28, tzinfo=timezone.utc),
                title="Sonam Wangchuk Begins Indefinite Hunger Strike",
                description="Climate activist and educator Sonam Wangchuk begins an indefinite hunger strike at Jantar Mantar in solidarity with students. He demands no punitive action against protesters, compensation for suicide victims' families, and a parliamentary debate on examination reform. He holds no party affiliation.",
                sources=["Wangchuk's video statement", "The Hindu", "India Today"],
            ),
            Event(
                date=datetime(2026, 7, 6, tzinfo=timezone.utc),
                title="Solidarity Protests Across India",
                description="Protests erupt in Bengaluru, Hyderabad, Jaipur, Chennai, Lucknow and other cities. NALSAR University students observe a one-meal fast. JNTU Hyderabad holds a torchlight rally. The movement expands beyond NEET to encompass broader examination system accountability. Physics Wallah CEO Alakh Pandey visits the Jantar Mantar site and expresses solidarity.",
                sources=["NDTV", "NALSAR student body statement", "NSUI JNTU coverage"],
            ),
            Event(
                date=datetime(2026, 7, 9, tzinfo=timezone.utc),
                title="Court Remands Kulkarni to 10 Days CBI Custody",
                description="A Delhi court remands P.V. Kulkarni and co-accused Manisha Waghmare to 10 days of CBI custody for further interrogation. The CBI states it is attempting to map the full extent of the conspiracy and identify all individuals who benefited from the paper leak.",
                sources=["Lawbeat.in court report", "Hindustan Times", "CBI statement"],
            ),
            Event(
                date=datetime(2026, 7, 16, tzinfo=timezone.utc),
                title="NEET-UG Re-Exam Results Declared",
                description="The NTA declares results for the re-examination. Over 11.21 lakh candidates qualify. Counselling process begins. Some candidates allege discrepancies in OMR sheets. NTA rejects these claims, stating circulating images of OMR sheets are 'digitally altered or fabricated'. Protest at Jantar Mantar continues.",
                sources=["NTA result notification", "Careers360", "The Hindu"],
            ),
            Event(
                date=datetime(2026, 7, 19, tzinfo=timezone.utc),
                title="Wangchuk Hospitalized; Delhi HC Orders Transfer to Medanta",
                description="Delhi Police remove a visibly weakened Sonam Wangchuk from Jantar Mantar and take him to Safdarjung Hospital. His wife Gitanjali Angmo files a plea in the Delhi High Court. The court orders his immediate transfer to Medanta Hospital in Gurugram. Medanta confirms he is in the ICU but stable.",
                sources=[
                    "Delhi HC order",
                    "Medanta Hospital bulletin",
                    "The Week",
                    "Wion News",
                ],
            ),
            Event(
                date=datetime(2026, 7, 20, tzinfo=timezone.utc),
                title="Sansad Chalo March — Lathi Charge and Tear Gas",
                description="On the 45th day of protest and the first day of Parliament's Monsoon Session, thousands march from Jantar Mantar toward Parliament in the 'Sansad Chalo' procession. Delhi Police, citing Section 163 BNSS and refusal of march permission, use lathi charges and tear gas as protesters approach barricades near Shastri Bhawan and Raisina Road. Over 100 people are injured. Several metro stations are closed. Mobile internet is suspended in parts of Central Delhi. Delhi Police state 118 police personnel were also injured.",
                sources=[
                    "The South First ground report by Kaushik Raj & Srishti Jaiswal",
                    "Newslaundry",
                    "NDTV live",
                    "Rediff.com",
                    "Hindustan Times",
                    "SCBA statement",
                ],
            ),
            Event(
                date=datetime(2026, 7, 20, 18, 0, tzinfo=timezone.utc),
                title="First Government Dialogue: CJP Meets JP Nadda for 10 Minutes",
                description="For the first time in 45 days of protest, government opens a dialogue channel. Student organization spokespersons Saurav Das and Ashutosh Ranka meet Union Health Minister JP Nadda at his residence. The meeting lasts approximately 10 minutes. They submit a memorandum with three demands. Nadda says he will discuss internally but makes no commitments.",
                sources=[
                    "Media India Group",
                    "Livdose",
                    "CJP spokesperson statement post-meeting",
                ],
            ),
            Event(
                date=datetime(2026, 7, 21, tzinfo=timezone.utc),
                title="Rahul Gandhi and Priyanka Gandhi Removed from PM Residence Sit-In",
                description="Congress leaders Rahul Gandhi and Priyanka Gandhi Vadra stage a sit-in outside PM Modi's residence on Lok Kalyan Marg, demanding government accountability for the NEET crisis. They are removed by police. Education Minister Pradhan calls it a 'political spectacle'. Parliament faces multiple adjournments as opposition demands NEET debate.",
                sources=[
                    "India TV News",
                    "Rahul Gandhi's X post",
                    "Jagran Josh",
                    "Hindustan Times",
                ],
            ),
            Event(
                date=datetime(2026, 7, 22, tzinfo=timezone.utc),
                title="PM Modi Calls NEET Leak a 'Grave Sin'",
                description="Parliamentary Affairs Minister Kiren Rijiju conveys to Parliament that PM Narendra Modi has called the NEET paper leak a 'ghor paap' (grave sin) and has assured strict action against those responsible. Modi emphasizes the issue 'should not be a matter of partisan politics.' Fast-track courts are announced. Protest continues; students say no concrete demand has been met.",
                sources=[
                    "Kiren Rijiju press briefing",
                    "Times Now",
                    "Jagran Josh",
                    "India Today",
                ],
            ),
            Event(
                date=datetime(2026, 7, 23, tzinfo=timezone.utc),
                title="Fast-Track Courts Announced; Ministers Visit Wangchuk",
                description="PM Modi's government announces establishment of fast-track courts for examination paper leak cases. Union Ministers JP Nadda and Jitendra Singh visit Sonam Wangchuk at Medanta Hospital in Gurugram and reportedly assure him government will positively consider his demands. Wangchuk has not yet ended his fast pending written confirmation. Protest at Jantar Mantar continues.",
                sources=[
                    "Times of India",
                    "Business Standard",
                    "Hindustan Times",
                    "The Week",
                ],
            ),
        ]
        for e in events:
            db.add(e)

        # ── Public Reactions ──────────────────────────────────────────────────
        reactions = [
            PublicReaction(
                person_name="PM Narendra Modi",
                category="Government",
                statement_summary='Via Parliamentary Affairs Minister Kiren Rijiju: PM Modi called the NEET paper leak a "ghor paap" (grave sin) and assured strict action against those "playing with the future of youth." He said the issue should not be a matter of partisan politics.',
                date=datetime(2026, 7, 22, tzinfo=timezone.utc),
                original_source="Kiren Rijiju parliamentary briefing, July 22, 2026",
            ),
            PublicReaction(
                person_name="Dharmendra Pradhan",
                category="Education Minister",
                statement_summary='Union Education Minister said the government is "100% committed to discussing NEET" and accused the Congress party of using students as "political tools." He has not resigned despite 47 days of protest demanding his exit.',
                date=datetime(2026, 7, 21, tzinfo=timezone.utc),
                original_source="Dharmendra Pradhan X (Twitter) post / Jagran Josh, July 21, 2026",
            ),
            PublicReaction(
                person_name="JP Nadda",
                category="Government",
                statement_summary="Met student protest spokespersons for 10 minutes on July 20. Received a memorandum with three demands. Did not make commitments but said he would discuss internally. Later visited Sonam Wangchuk at Medanta Hospital on July 23.",
                date=datetime(2026, 7, 20, tzinfo=timezone.utc),
                original_source="Media India Group / CJP spokesperson statement / The Week, July 20-23, 2026",
            ),
            PublicReaction(
                person_name="Rahul Gandhi",
                category="Opposition",
                statement_summary="Staged a sit-in outside PM Modi's residence on Lok Kalyan Marg on July 21, demanding government accountability. Said the government had 'no interest in holding a debate on students' issues.' Was removed by police.",
                date=datetime(2026, 7, 21, tzinfo=timezone.utc),
                original_source="Rahul Gandhi's X (Twitter) post / India TV News, July 21, 2026",
            ),
            PublicReaction(
                person_name="Mallikarjun Kharge",
                category="Opposition",
                statement_summary="Raised the NEET protest in the Rajya Sabha. Accused the government of using force to suppress students rather than addressing their concerns. Demanded an independent judicial probe into the NTA's functioning.",
                date=datetime(2026, 7, 20, tzinfo=timezone.utc),
                original_source="Parliament proceedings / Media India Group, July 20, 2026",
            ),
            PublicReaction(
                person_name="Sonam Wangchuk",
                category="Activist",
                statement_summary='Written statement from Medanta Hospital, July 21: "I will end my fast only when I receive an unequivocal assurance from the government that no punitive or retaliatory legal action will be taken against the students and youth who participated in these protests."',
                date=datetime(2026, 7, 21, tzinfo=timezone.utc),
                original_source="Written note from Medanta Hospital / The Week / Wion News, July 21-22, 2026",
            ),
            PublicReaction(
                person_name="Supreme Court Bar Association",
                category="Legal Body",
                statement_summary="The SCBA called for an impartial judicial inquiry into the police action on July 20, 2026, stating that the lathi charge and tear gas against students marching peacefully raised serious questions about proportionality and civil liberties.",
                date=datetime(2026, 7, 20, tzinfo=timezone.utc),
                original_source="SCBA statement / Lawbeat.in, July 20, 2026",
            ),
            PublicReaction(
                person_name="Alakh Pandey (Physics Wallah)",
                category="Education Sector",
                statement_summary="Physics Wallah founder and CEO visited Jantar Mantar in solidarity with students, urging the government to engage in dialogue with protesters. He called the NEET crisis a 'failure of the system' and appealed for a permanent fix rather than temporary reassurances.",
                date=datetime(2026, 7, 17, tzinfo=timezone.utc),
                original_source="Alakh Pandey social media / India Today, July 2026",
            ),
        ]
        for r in reactions:
            db.add(r)

        # ── Student Stories ───────────────────────────────────────────────────
        stories = [
            StudentStory(
                title='"Why should I wait for the system to fail me?"',
                content='Inayat, a Class 12 student from UP, came to Jantar Mantar with her sister. She has two years of NEET preparation behind her and an anxious wait for re-exam results. "I have seen the system fail multiple times already. Why should I wait until it happens to me personally before I speak?" She said she had no political affiliation and had never attended a protest before.',
                author_name="Inayat — NEET aspirant, UP",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"The government is not taking any accountability"',
                content='Manish Kumar, a PhD student in Chemistry at Allahabad University, was on Day 18 of a personal hunger strike when he spoke to journalists. "Whether it is NEET, UPSC, or any other competitive exam — paper leaks have become normal. As a chemistry student, I know what Kulkarni allegedly did. I know how paper security should work. This was not an accident. This was a system someone exploited because no one was watching."',
                author_name="Manish Kumar — PhD student, Allahabad University",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"The time you lose can never be returned"',
                content="Suryaprakash Singh, a Master's student in Chemistry from Indore, took an overnight train to Delhi without telling his parents. He carried his Class 12 Chemistry NCERT textbook. \"When a paper leak leads to an exam being cancelled, it isn't just an exam that is lost. Your time, your energy, your resources, your parents' money — everything goes with it. The time you lose can never be returned.\" He said he was not affiliated with any student organization.",
                author_name="Suryaprakash Singh — Chemistry student, Indore",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"The government should be afraid of the people"',
                content='A group of humanities students attending their first ever protest at Jantar Mantar, July 2026: "The government should be afraid of the people, not the other way around." They were standing near students from Punjab who had driven through the night. None of them had appeared for NEET. "This is not about just NEET students. This is about every student who prepares for any exam in this country."',
                author_name="Humanities students — first-time protesters, Jantar Mantar",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"We aren\'t criminals. We are students."',
                content="Nedhi, from Delhi, was at the July 20 Sansad Chalo march when police used lathi charges and tear gas. \"We were sitting peacefully when they threw tear gas and beat us. We aren't criminals. We are students. I don't understand why they beat us.\" She was attending the protest for the third consecutive day.",
                author_name="Nedhi — student, Delhi",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"If we don\'t gather like this, how will anyone hear us?"',
                content='Neha from Bihar came to Jantar Mantar specifically because paper leaks are "normal" in her home state. On July 20, caught in the lathi charge: "They beat the girls too. I fell down and lost my slippers. Back home, paper leaks happen all the time. If we don\'t gather like this, how will anyone even hear us?" She said she had spent her own savings to travel to Delhi.',
                author_name="Neha — student, Bihar",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"My cousin gave three years — for a compromised exam"',
                content='Sana Parveen, a student at Miranda House, University of Delhi, came to Jantar Mantar for her cousin who spent three years preparing for NEET. "The National Education Policy\'s implementation is zero everywhere. The education system is collapsing. My cousin gave three years of her life to something that was compromised before she even sat in the exam hall."',
                author_name="Sana Parveen — Miranda House, Delhi University",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"Should we wait until it happens to our own children?"',
                content='Lata Pandey, 51, mother of two children who have no connection to NEET, came to Jantar Mantar after reading about student suicides. "Should we wait until it happens to our own children? When I read that children are dying by suicide because of a paper leak, I cannot sit at home and do nothing."',
                author_name="Lata Pandey — parent, Jantar Mantar",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"The cancellation was like being told: your effort doesn\'t matter"',
                content='Ravindra Kumar, in his sixties, whose daughter scored well in NEET 2024 only for the exam to be cancelled due to irregularities: "Our entire family went into depression. She worked so hard. The cancellation was like being told: your effort doesn\'t matter. Now she is preparing again for NEET 2026. I came here for her, and for every other child in her position."',
                author_name="Ravindra Kumar — parent, Jantar Mantar",
                status=StoryStatus.APPROVED,
            ),
            StudentStory(
                title='"Every leak puts our future at stake, yet no one is accountable"',
                content="Siddhanth Raj, 21, Philosophy student at Dayal Singh College, Delhi University, was at his first-ever protest on July 20. \"It's not about one paper leak. Every leak puts our future at stake, yet no one is held accountable. How long are we supposed to keep enduring this?\" He said he was inspired to come after seeing videos of Sonam Wangchuk's hunger strike.",
                author_name="Siddhanth Raj — Dayal Singh College, Delhi University",
                status=StoryStatus.APPROVED,
            ),
        ]
        for s in stories:
            db.add(s)

        # ── Documents ─────────────────────────────────────────────────────────
        documents = [
            Document(
                title="NTA NEET-UG 2026 Cancellation Notice",
                description="Official notification issued by the National Testing Agency on May 12, 2026, cancelling the NEET-UG 2026 examination held on May 3 and announcing the schedule for a re-examination.",
                file_url="https://nta.ac.in/",
                file_type="Official Notification",
                published_at=datetime(2026, 5, 12, tzinfo=timezone.utc),
            ),
            Document(
                title="CBI Press Statement: Arrest of P.V. Kulkarni",
                description="Press Information Bureau release confirming the CBI's arrest of P.V. Kulkarni, a Pune-based chemistry lecturer identified as the alleged kingpin of the NEET-UG 2026 paper leak, on May 15, 2026.",
                file_url="https://pib.gov.in/",
                file_type="Government Statement",
                published_at=datetime(2026, 5, 15, tzinfo=timezone.utc),
            ),
            Document(
                title="Delhi Police Section 163 BNSS Prohibitory Order — July 20, 2026",
                description="Prohibitory order imposed across the New Delhi district ahead of the Sansad Chalo march on July 20, 2026, restricting assembly of five or more persons under Section 163 of the Bharatiya Nagarik Suraksha Sanhita (BNSS).",
                file_url=None,
                file_type="Government Order",
                published_at=datetime(2026, 7, 19, tzinfo=timezone.utc),
            ),
            Document(
                title="Student Protest Memorandum Submitted to JP Nadda",
                description="Three-point memorandum submitted by student protest spokespersons to Union Health Minister JP Nadda on July 20, 2026: (1) no punitive action against protesters, (2) resignation of Education Minister Pradhan, (3) INR 1 crore compensation for families of NEET suicide victims.",
                file_url=None,
                file_type="Memorandum",
                published_at=datetime(2026, 7, 20, tzinfo=timezone.utc),
            ),
            Document(
                title="PM Modi Statement on NEET Paper Leak",
                description="Prime Minister Narendra Modi's remarks, conveyed to Parliament by Parliamentary Affairs Minister Kiren Rijiju on July 22, 2026, calling the NEET paper leak a 'ghor paap' (grave sin) and assuring fast-track court proceedings.",
                file_url=None,
                file_type="Government Statement",
                published_at=datetime(2026, 7, 22, tzinfo=timezone.utc),
            ),
            Document(
                title="Sonam Wangchuk's Statement from Medanta Hospital",
                description="Written statement issued by Sonam Wangchuk from his ICU room at Medanta Hospital, Gurugram, on July 21, 2026, declaring he will not end his hunger strike until the government provides written assurance that no punitive action will be taken against student protesters.",
                file_url=None,
                file_type="Personal Statement",
                published_at=datetime(2026, 7, 21, tzinfo=timezone.utc),
            ),
            Document(
                title="Delhi High Court Order: Wangchuk Transfer to Medanta",
                description="Delhi High Court order issued on July 21, 2026, directing the transfer of Sonam Wangchuk from Safdarjung Hospital to Medanta Hospital in Gurugram, following a plea by his wife Gitanjali Angmo alleging his hospital transfer by Delhi Police was involuntary.",
                file_url=None,
                file_type="Court Order",
                published_at=datetime(2026, 7, 21, tzinfo=timezone.utc),
            ),
            Document(
                title="SCBA Call for Judicial Inquiry into July 20 Police Action",
                description="Statement by the Supreme Court Bar Association (SCBA) on July 20, 2026, calling for an impartial judicial inquiry into the Delhi Police's use of lathi charges and tear gas against student protesters during the Sansad Chalo march.",
                file_url=None,
                file_type="Legal Body Statement",
                published_at=datetime(2026, 7, 20, tzinfo=timezone.utc),
            ),
        ]
        for d in documents:
            db.add(d)

        # ── Articles (with FULL content) ──────────────────────────────────────
        articles_data = [
            dict(
                title="NEET-UG 2026 Paper Leak: What We Know",
                slug="neet-ug-2026-paper-leak-what-we-know",
                summary="A fact-based account of how the NEET-UG 2026 paper leak happened, who was arrested, how the NTA responded, and what the re-examination showed. Based on CBI remand papers, NTA statements, and verified media reports.",
                content=ARTICLE_1_CONTENT.strip(),
                category="Investigation",
                type=ArticleType.FACT,
                is_published=True,
                published_at=datetime(2026, 7, 22, tzinfo=timezone.utc),
                sources=[
                    {
                        "title": "Wikipedia: 2026 NEET-UG paper leak",
                        "url": "https://en.wikipedia.org/wiki/2026_NEET-UG_paper_leak",
                    },
                    {
                        "title": "CBI arrests NEET kingpin — PIB",
                        "url": "https://pib.gov.in/",
                    },
                    {
                        "title": "The Hindu — NEET re-examination coverage",
                        "url": "https://www.thehindu.com/",
                    },
                    {
                        "title": "NDTV — NEET protest coverage",
                        "url": "https://www.ndtv.com/",
                    },
                ],
            ),
            dict(
                title="July 20, 2026: What Happened on the Sansad Chalo Day",
                slug="july-20-2026-sansad-chalo-what-happened",
                summary="A detailed, sourced account of the Sansad Chalo march on July 20 — the 45th day of protest — when thousands marched toward Parliament, police used lathi charges and tear gas, over 100 were injured, and the government finally opened dialogue after 45 days of silence.",
                content=ARTICLE_2_CONTENT.strip(),
                category="Event Report",
                type=ArticleType.FACT,
                is_published=True,
                published_at=datetime(2026, 7, 21, tzinfo=timezone.utc),
                sources=[
                    {
                        "title": "The South First — Ground Report, July 20",
                        "url": "https://www.thesouthfirst.com/",
                    },
                    {
                        "title": "Newslaundry — Sansad Chalo coverage",
                        "url": "https://www.newslaundry.com/",
                    },
                    {
                        "title": "Rediff — Day after the violence",
                        "url": "https://www.rediff.com/",
                    },
                    {
                        "title": "SCBA statement on judicial inquiry",
                        "url": "https://www.lawbeat.in/",
                    },
                ],
            ),
            dict(
                title="Sonam Wangchuk: 25 Days of Fasting for Students",
                slug="sonam-wangchuk-hunger-strike-explained",
                summary="Who is Sonam Wangchuk, why did he begin a hunger strike at Jantar Mantar, what are his demands, and what happened after his hospitalization at Medanta? A factual profile of the activist and his role in the NEET protest movement.",
                content=ARTICLE_3_CONTENT.strip(),
                category="Profile",
                type=ArticleType.ANALYSIS,
                is_published=True,
                published_at=datetime(2026, 7, 22, tzinfo=timezone.utc),
                sources=[
                    {
                        "title": "The Week — Wangchuk ICU update, July 23",
                        "url": "https://www.theweek.in/",
                    },
                    {
                        "title": "Delhi HC order re Medanta transfer",
                        "url": "https://delhihighcourt.nic.in/",
                    },
                    {
                        "title": "Medanta Hospital bulletin",
                        "url": "https://www.medanta.org/",
                    },
                    {
                        "title": "Wion News — Wangchuk health update",
                        "url": "https://www.wionews.com/",
                    },
                ],
            ),
            dict(
                title="Who Is Protesting at Jantar Mantar — Their Words",
                slug="who-is-protesting-jantar-mantar-their-words",
                summary="First-person accounts gathered by journalists from The Hindu, Indian Express, and The South First from students, parents, and citizens at Jantar Mantar between July 17 and 22, 2026. Who are they, where did they come from, and why won't they leave?",
                content=ARTICLE_4_CONTENT.strip(),
                category="Community Voices",
                type=ArticleType.COMMUNITY_VOICE,
                is_published=True,
                published_at=datetime(2026, 7, 20, tzinfo=timezone.utc),
                sources=[
                    {
                        "title": "The Hindu — 'At Jantar Mantar, hope refuses to leave' by Kulsoom Faiz",
                        "url": "https://www.thehindu.com/",
                    },
                    {
                        "title": "Indian Express — Student voices report",
                        "url": "https://indianexpress.com/",
                    },
                    {
                        "title": "The South First — Ground report by Kaushik Raj & Srishti Jaiswal",
                        "url": "https://www.thesouthfirst.com/",
                    },
                ],
            ),
            dict(
                title="Government's Response to NEET Protests: A Chronological Record",
                slug="government-response-neet-protests-chronology",
                summary="A day-by-day record of every official government action and statement on the NEET-UG 2026 paper leak — from the NTA's initial denial on exam day to PM Modi's 'grave sin' remark and the fast-track courts announcement. No editorial commentary; attributed facts only.",
                content=ARTICLE_5_CONTENT.strip(),
                category="Official Record",
                type=ArticleType.OFFICIAL_STATEMENT,
                is_published=True,
                published_at=datetime(2026, 7, 23, tzinfo=timezone.utc),
                sources=[
                    {"title": "NTA official statements", "url": "https://nta.ac.in/"},
                    {"title": "PIB — CBI press releases", "url": "https://pib.gov.in/"},
                    {
                        "title": "Kiren Rijiju parliamentary briefing",
                        "url": "https://sansad.in/",
                    },
                    {
                        "title": "Times Now — PM Modi NEET statement",
                        "url": "https://www.timesnownews.com/",
                    },
                    {
                        "title": "Business Standard — Fast-track courts",
                        "url": "https://www.business-standard.com/",
                    },
                ],
            ),
        ]

        for a_data in articles_data:
            sources_list = a_data.pop("sources", [])
            article = Article(**{k: v for k, v in a_data.items()})
            db.add(article)
            await db.flush()
            for s in sources_list:
                source = Source(
                    article_id=article.id,
                    title=s["title"],
                    url=s.get("url"),
                    citation=s.get("citation"),
                )
                db.add(source)

        # ── Fact Checks ───────────────────────────────────────────────────────
        fact_checks = [
            FactCheck(
                claim="The NEET-UG 2026 question paper was leaked before the examination",
                status=FactCheckStatus.TRUE,
                evidence="Confirmed by CBI investigation, NTA's own decision to cancel the exam, PM Modi's 'grave sin' remark, and court remand documents showing 111 of 132 handwritten chemistry questions matched the NTA master set.",
                sources=[
                    "CBI remand application",
                    "PM Modi via Kiren Rijiju",
                    "Wikipedia: 2026 NEET-UG paper leak",
                ],
            ),
            FactCheck(
                claim="The NEET-UG 2026 original exam was officially cancelled",
                status=FactCheckStatus.TRUE,
                evidence="The NTA officially cancelled the May 3, 2026, examination on May 12, 2026, and conducted a re-examination on June 21, 2026. This is documented in NTA's official notifications.",
                sources=[
                    "NTA cancellation notification May 12, 2026",
                    "NTA re-exam notification",
                ],
            ),
            FactCheck(
                claim="At least 11-14 NEET aspirants died by suicide following the 2026 paper leak",
                status=FactCheckStatus.TRUE,
                evidence="Reports from The Hindu, Media India Group, and regional media cite 11-14 NEET aspirants who died by suicide in the weeks following the paper leak and exam cancellation. Some names reported: Pradeep Meghwal (Rajasthan), Ritik Mishra (UP), Anshika Pandey (Delhi), Anukeerthana (Coimbatore), Sanchita Sahu (Odisha). Exact figures are subject to ongoing verification as families and police records are still being documented.",
                sources=[
                    "The Hindu ground report",
                    "Media India Group investigation",
                    "Regional news reports",
                ],
            ),
            FactCheck(
                claim="Police used lathi charges and tear gas on July 20, 2026",
                status=FactCheckStatus.TRUE,
                evidence="Confirmed by multiple journalists on the ground (The South First, Newslaundry, Rediff, Hindustan Times). Video footage and photographs circulated widely. The Supreme Court Bar Association called for a judicial inquiry, implicitly confirming the event. Delhi Police confirmed 118 of their personnel were also injured.",
                sources=[
                    "The South First ground report",
                    "Newslaundry",
                    "SCBA statement",
                    "Delhi Police press statement",
                ],
            ),
            FactCheck(
                claim="The NEET-UG 2026 re-examination results showed over 2.7 lakh absentees",
                status=FactCheckStatus.TRUE,
                evidence="The NTA and The Hindu both reported that over 2.7 lakh eligible candidates did not appear for the June 21 re-examination — the highest absentee count for a re-examination in NTA history.",
                sources=[
                    "The Hindu",
                    "NTA announcement",
                    "Wikipedia: 2026 NEET-UG paper leak",
                ],
            ),
            FactCheck(
                claim="Sonam Wangchuk was involuntarily removed from Jantar Mantar by Delhi Police",
                status=FactCheckStatus.TRUE,
                evidence="The Delhi High Court, in response to a plea by Wangchuk's wife Gitanjali Angmo, ordered his transfer to Medanta Hospital from Safdarjung, implicitly accepting that his removal from Jantar Mantar required judicial oversight. The court's order confirms the circumstances were disputed.",
                sources=["Delhi HC order July 21, 2026", "The Week", "Wion News"],
            ),
            FactCheck(
                claim="The student protest at Jantar Mantar is a Congress-organized political event",
                status=FactCheckStatus.FALSE,
                evidence="Ground reporting by The Hindu, Indian Express, and The South First consistently found students at Jantar Mantar asserting no party affiliation. The protest was organized by student-led groups including the CJP, SFI, AISA, AISF, and unaffiliated students. Congress leaders expressed solidarity after the protest was already underway, but did not organize it.",
                sources=[
                    "The Hindu interviews",
                    "Indian Express ground report",
                    "The South First",
                    "CJP founder statement",
                ],
            ),
        ]
        for fc in fact_checks:
            db.add(fc)

        await db.commit()
        print(
            f"Seeded: {len(events)} events, {len(reactions)} reactions, "
            f"{len(stories)} stories, {len(documents)} documents, "
            f"{len(articles_data)} articles with full content, {len(fact_checks)} fact checks"
        )
        print("\nEach article has 500–1500 words of factual, sourced content.")
        print("Run: python scripts/update_data.py to fetch latest news from RSS feeds.")


if __name__ == "__main__":
    asyncio.run(seed())
