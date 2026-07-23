import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about the NEET-UG 2026 paper leak, the Jantar Mantar protests, and the CJP movement.',
}

const faqs = [
  {
    q: 'What is the NEET-UG 2026 paper leak?',
    a: 'The NEET-UG (National Eligibility cum Entrance Test for Undergraduate) 2026 examination, conducted by the National Testing Agency (NTA), was allegedly compromised when the question paper was leaked before the exam. This led to widespread protests from students who had spent years preparing, fearing their hard work had been undermined by systemic corruption.',
  },
  {
    q: 'What is the Cockroach Janata Party (CJP)?',
    a: 'CJP is a youth-led movement that started as an online satirical platform founded by Abhijeet Dipke on May 16, 2026. It evolved into a mass protest movement after the NEET paper leak. The "cockroach" branding symbolizes resilience and the idea that, like cockroaches, students will survive and persist despite attempts to crush their voices. The movement is non-political in origin, though it has drawn support from opposition parties.',
  },
  {
    q: 'Who is Sonam Wangchuk and why is he on hunger strike?',
    a: 'Sonam Wangchuk is a renowned climate activist and educator from Ladakh, known for his work in education reform and his role as the inspiration for the film "3 Idiots" (Phunsukh Wangdu). He began an indefinite hunger strike at Jantar Mantar on June 28, 2026, in solidarity with students demanding education reforms and accountability for the NEET paper leak. He was hospitalized after 20 days when his health deteriorated.',
  },
  {
    q: 'What happened on July 20, 2026 (Sansad Chalo)?',
    a: 'On the 30th day of the protest, thousands of students and parents attempted to march to Parliament (Sansad) to present their demands. Delhi Police had imposed Section 163 BNSS and shut down nearby metro stations. As protesters pushed forward, police resorted to lathi (baton) charges and tear gas shells near Press Club of India, Shastri Bhawan, and Raisina Road. Over 118 police personnel were reportedly injured and 20+ police vehicles damaged. The government opened its first communication channel that day when JP Nadda met CJP spokespersons.',
  },
  {
    q: 'What are the main demands of the protesters?',
    a: 'The protesters have five key demands: (1) Resignation of Union Education Minister Dharmendra Pradhan, (2) Unconditional release of Sonam Wangchuk, (3) INR 1 crore compensation for families of all NEET aspirants who died by suicide after the paper leak, (4) Systemic reform of examination processes to prevent future leaks, and (5) Withdrawal of all FIRs against protesters and accountability for the police action on July 20.',
  },
  {
    q: 'Has the government responded to the protests?',
    a: 'On July 20, Union Health Minister JP Nadda met CJP spokespersons for 10 minutes and received a memorandum but made no commitments. On July 22, PM Modi called the paper leak a "grave sin" and assured action. Education Minister Pradhan stated the government is "100% committed to discussing NEET." However, protesters say these are empty assurances as no concrete action has been taken and Pradhan has not resigned.',
  },
  {
    q: 'Is this protest politically affiliated?',
    a: 'The CJP originated as a non-political youth movement. While opposition parties including Congress (Rahul Gandhi, Priyanka Gandhi) and Samajwadi Party (Akhilesh Yadav) have shown solidarity, the core protesters emphasize this is about students\' rights, not party politics. Many students we spoke to said they are not affiliated with any political party.',
  },
  {
    q: 'Where can I verify the information on this platform?',
    a: 'Every piece of information on this platform is sourced from verified news reports. We primarily cite reports from The Hindu, Indian Express, Rediff.com, Media India Group, The South First, and other independent journalists who reported from the ground at Jantar Mantar. We explicitly avoid unverified social media claims and mainstream news channels that the user has identified as unreliable. Sources are listed for every timeline entry and public reaction.',
  },
  {
    q: 'How can I support the students?',
    a: 'You can support by: (1) Sharing verified information about the protest to counter misinformation, (2) Submitting your story if you are a student at Jantar Mantar, (3) Subscribing to our newsletter for verified updates, and (4) Engaging with the issues — read the official documents, understand the demands, and form your own informed opinion.',
  },
  {
    q: 'Has this happened before?',
    a: 'Yes. Paper leaks have been a recurring issue in Indian competitive examinations. Notable prior incidents include the 2024 NEET-UG paper leak controversy (which led to the cancellation of several exams), repeated UPSC leaks, and state-level examination irregularities in Bihar, Uttar Pradesh, and other states. Students say this pattern of systemic failure is what drove them to protest — it is not about one exam, but about a broken system.',
  },
]

export default function FAQPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted">Clear answers to common questions about the NEET-UG 2026 paper leak, the Jantar Mantar protests, and the broader movement for examination reform.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group rounded-xl border border-border bg-surface transition-shadow hover:shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between p-5 text-base font-medium text-primary">
              {faq.q}
              <span className="ml-4 flex-shrink-0 text-muted transition-transform group-open:rotate-180">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-border px-5 py-4">
              <p className="text-sm leading-relaxed text-muted">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-10">
        <a href="/" className="inline-flex items-center text-sm text-blue hover:underline">&larr; Back to home</a>
      </div>
    </div>
  )
}
