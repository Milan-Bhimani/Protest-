import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Straw Hat Press — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-muted">How we collect, use, and protect your personal information.</p>
      </div>

      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Information We Collect</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We collect minimal personal information. If you subscribe to our newsletter, we store your email address
            for the sole purpose of sending you updates. If you submit a student story, we store the name and email
            you voluntarily provide.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We do not use cookies for tracking, analytics, or advertising. We do not serve ads. We do not sell,
            rent, or share your personal information with third parties.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">How We Use Your Data</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Newsletter emails are used only to send you updates about new content on this platform.</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Student story submissions are displayed publicly with only the author name you choose to share. Email addresses are never published.</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>We retain your data only as long as necessary to provide our service. You can request deletion at any time.</span></li>
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Data Security</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We implement appropriate technical and organizational measures to protect your personal data against
            unauthorized access, alteration, disclosure, or destruction. All data transmission occurs over
            encrypted connections (HTTPS).
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Your Rights</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            You have the right to access, correct, or delete your personal data at any time. To exercise these
            rights, please contact us through the newsletter form or reach out via the platform. We will respond
            within 30 days.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Changes to This Policy</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We may update this privacy policy from time to time. Any changes will be posted on this page with an
            updated effective date. We encourage you to review this policy periodically.
          </p>
          <p className="mt-2 text-sm text-muted">Last updated: July 2026</p>
        </section>
      </div>

      <div className="mt-10">
        <a href="/" className="inline-flex items-center text-sm text-blue hover:underline">&larr; Back to home</a>
      </div>
    </div>
  )
}
