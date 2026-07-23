import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Accessibility statement for Straw Hat Press — our commitment to making this platform usable for everyone.',
}

export default function AccessibilityPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Accessibility</h1>
        <p className="mt-2 text-muted">Our commitment to making this platform usable for everyone.</p>
      </div>

      <div className="space-y-8">
        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Our Commitment</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Straw Hat Press is committed to ensuring digital accessibility for all users, regardless of ability.
            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Accessibility Features</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Skip-to-main-content link at the top of every page for keyboard and screen reader users.</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Semantic HTML structure with proper heading hierarchy (h1, h2, etc.).</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>High contrast color scheme meeting WCAG AA contrast ratios.</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Focus-visible indicators on all interactive elements for keyboard navigation.</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Responsive design that works across screen sizes and zoom levels up to 200%.</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Descriptive alt text on all meaningful images.</span></li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-blue">•</span><span>Reduced-motion support for users who prefer minimal animations.</span></li>
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Ongoing Efforts</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Accessibility is an ongoing process. We regularly review our platform to identify and address
            accessibility barriers. We welcome feedback on how we can improve.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Contact Us</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            If you encounter any accessibility barriers or have suggestions for improvement, please reach out
            through the newsletter subscription form on our homepage.
          </p>
        </section>

        <section className="rounded-xl border border-border bg-surface p-6">
          <h2 className="text-xl font-semibold text-primary">Compatibility</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            This platform is designed to work with modern browsers and assistive technologies including screen
            readers (JAWS, NVDA, VoiceOver), speech recognition software, and keyboard-only navigation.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <a href="/" className="inline-flex items-center text-sm text-blue hover:underline">&larr; Back to home</a>
      </div>
    </div>
  )
}
