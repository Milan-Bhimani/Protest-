import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import StrawHatLogo from '../components/StrawHatLogo'
import MobileNav from '../components/MobileNav'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://strawhatpress.in'),
  title: {
    default: 'Straw Hat Press',
    template: '%s — Straw Hat Press',
  },
  description: 'An independent, non-partisan information platform documenting the NEET-UG 2026 paper leak controversy and the student-led protests at Jantar Mantar.',
  openGraph: {
    title: 'Straw Hat Press',
    description: 'Independent coverage of the NEET paper leak & Jantar Mantar protests.',
    type: 'website',
  },
  icons: {
    icon: '/luffy-bw.png',
    apple: '/luffy-bw.png',
  },
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/documents', label: 'Documents' },
  { href: '/public-reactions', label: 'Reactions' },
  { href: '/student-stories', label: 'Stories' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} min-h-screen bg-background text-text antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-red focus:px-4 focus:py-2 focus:text-white">
          Skip to main content
        </a>
        <div className="border-b border-border bg-red/5 px-4 py-2 text-center text-xs text-muted leading-relaxed sm:text-sm">
          &ldquo;Democracy has four pillars: <strong className="text-red">Youth</strong>, Media, Government, and Justice. But today, the youth fights for their rights while media and justice protect the government&rsquo;s mistakes.&rdquo; &mdash; Indian Constitution
        </div>
        <header className="sticky top-0 z-40 border-b border-border bg-surface/95">
          <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2.5 group">
              <StrawHatLogo className="w-9 h-9 transition-transform duration-200 group-hover:scale-110" />
              <span className="text-lg font-bold tracking-wide text-primary transition-colors group-hover:text-red" style={{ fontFamily: 'var(--font-heading)' }}>
                STRAW HAT PRESS
              </span>
            </a>
            <nav className="hidden items-center gap-6 text-sm sm:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-red"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <MobileNav />
          </div>
        </header>
        <main id="main-content" className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">{children}</main>
        <footer className="border-t border-border bg-surface">
          <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <StrawHatLogo className="w-7 h-7" />
                  <h3 className="text-sm font-bold tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>STRAW HAT PRESS</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Independent coverage of the NEET-UG 2026 paper leak controversy and the student-led Jantar Mantar protests. We stand with those who seek transparency and justice.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>PAGES</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="hover:text-red transition-colors">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>RESOURCES</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted">
                  <li><a href="/faq" className="hover:text-red transition-colors">FAQ</a></li>
                  <li><a href="/about" className="hover:text-red transition-colors">About</a></li>
                  <li><a href="/documents" className="hover:text-red transition-colors">Documents</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>LEGAL</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted">
                  <li><a href="/privacy" className="hover:text-red transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-red transition-colors">Terms of Use</a></li>
                  <li><a href="/accessibility" className="hover:text-red transition-colors">Accessibility</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 border-t border-border pt-6">
              <p className="text-center text-xs text-muted">
                &copy; {new Date().getFullYear()} Straw Hat Press. An independent, non-partisan information platform.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

