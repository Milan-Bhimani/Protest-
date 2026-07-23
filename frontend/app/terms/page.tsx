import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Straw Hat Press — rules and guidelines for using this platform.',
}

export default function TermsPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Terms of Use</h1>
        <p className="mt-2 text-muted">Rules and guidelines for accessing and using this platform.</p>
      </div>

      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Acceptance of Terms</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            By accessing or using Straw Hat Press, you agree to be bound by these Terms of Use. If you do not
            agree with any part of these terms, you should not use this platform.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Educational Purpose</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            This platform is provided for educational and informational purposes only. It is an independent,
            non-partisan student-supporter archive documenting the NEET-UG 2026 controversy and related protests.
            We do not provide legal, medical, or professional advice.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Content Usage</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            All content on this platform is either original or attributed to verified sources with proper citations.
            You may share, reference, or quote our content for non-commercial purposes provided you attribute the
            source. You may not reproduce substantial portions of our content for commercial purposes without
            permission.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">User Conduct</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            When submitting content such as student stories, you agree not to submit false, misleading, or harmful
            information. We reserve the right to review, moderate, and remove any user-submitted content that
            violates these terms.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Disclaimer</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            While we strive for accuracy, we make no guarantees about the completeness, reliability, or currency
            of the information presented. We are not affiliated with any political party, student organization,
            NGO, or government entity.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Changes to Terms</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            We reserve the right to modify these terms at any time. Continued use of the platform after changes
            constitutes acceptance of the new terms.
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
