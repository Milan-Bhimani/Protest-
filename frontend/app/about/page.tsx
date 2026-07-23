import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About the Student Awareness Platform — our mission, methodology, and commitment to verified information.',
}

export default function AboutPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">About This Platform</h1>
        <p className="mt-2 text-muted">Our mission, methodology, and commitment to providing verified information.</p>
      </div>

      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Our Mission</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            This platform was created to provide clear, verified, and unbiased information about the NEET-UG 2026 paper leak controversy and the student-led protests at Jantar Mantar. In an information landscape dominated by partisan news channels and unverified social media claims, we aim to be a trusted source where anyone — students, parents, citizens — can understand what is actually happening.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We stand with students. We do not stand with any political party, government, or opposition. Our only allegiance is to facts, verified sources, and the truth.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Our Sources</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We rely exclusively on verified, cross-checked sources. Our primary sources include:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">•</span>
              <span><strong>Ground reports</strong> from independent journalists at Jantar Mantar (The Hindu, The South First, Media India Group, Rediff.com)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">•</span>
              <span><strong>Official statements</strong> from government officials, opposition leaders, and protest organizers via verified social media accounts and press conferences</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">•</span>
              <span><strong>Student testimonials</strong> collected by journalists who spoke directly with protesters at Jantar Mantar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">•</span>
              <span><strong>Official documents</strong> including government orders, court filings, and public notices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">•</span>
              <span><strong>Reddit communities</strong> (r/JEENEETards, r/indianmedschool, r/CBSE, r/india) where students share their experiences directly</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            <strong>What we avoid:</strong> Mainstream news channels with proven bias. Unverified social media rumors. Anonymous claims without corroboration. Partisan commentary presented as fact.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Content Categories</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Every piece of content on this platform is clearly labeled so you know exactly what you are reading:
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-background p-4">
              <span className="inline-flex items-center rounded-full bg-blue/10 px-2.5 py-0.5 text-xs font-medium text-blue">Fact</span>
              <p className="mt-2 text-sm text-muted">Verified factual claims with traceable sources. These are statements that can be independently verified.</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <span className="inline-flex items-center rounded-full bg-blue/10 px-2.5 py-0.5 text-xs font-medium text-blue">Official Statement</span>
              <p className="mt-2 text-sm text-muted">Direct quotes or summaries of statements made by government officials, political leaders, and public figures.</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <span className="inline-flex items-center rounded-full bg-blue/10 px-2.5 py-0.5 text-xs font-medium text-blue">Analysis</span>
              <p className="mt-2 text-sm text-muted">Contextual analysis that connects facts and events. Clearly marked as interpretation, not raw fact.</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <span className="inline-flex items-center rounded-full bg-blue/10 px-2.5 py-0.5 text-xs font-medium text-blue">Community Voice</span>
              <p className="mt-2 text-sm text-muted">First-person accounts from students and citizens. These represent personal experiences, verified for authenticity but presented as individual perspectives.</p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Editorial Principles</h2>
          <ul className="mt-3 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">✓</span>
              <span><strong>Transparency:</strong> Every claim is accompanied by its source. You can verify everything yourself.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">✓</span>
              <span><strong>Corrections:</strong> If we get something wrong, we correct it openly and maintain a correction history.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">✓</span>
              <span><strong>Non-partisanship:</strong> We do not endorse any political party or ideology. We report facts and let you decide.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">✓</span>
              <span><strong>Student-first:</strong> We prioritize the voices and perspectives of students, who are the most affected by this crisis.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-blue">✓</span>
              <span><strong>Human dignity:</strong> We report on sensitive topics (including student suicides) with respect and without sensationalism.</span>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Contact</h2>
          <p className="mt-3 text-sm text-muted">
            This is an independent platform. If you have verified information to share, a correction to suggest, or a student story to submit, please use the submission form on the Student Stories page or reach out through the newsletter subscription.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <a href="/" className="inline-flex items-center text-sm text-blue hover:underline">&larr; Back to home</a>
      </div>
    </div>
  )
}
