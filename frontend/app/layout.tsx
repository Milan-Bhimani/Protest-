import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import StrawHatLogo from '../components/StrawHatLogo'
import MobileNav from '../components/MobileNav'
import LiveProtestTicker from '../components/LiveProtestTicker'
import Gear5HakiEffect from '../components/Gear5HakiEffect'
import DrumsOfLiberationWidget from '../components/DrumsOfLiberationWidget'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://strawhatpress.in'),
  title: {
    default: 'Straw Hat Press — One Piece Civic Freedom Platform',
    template: '%s — Straw Hat Press',
  },
  description: 'An independent, non-partisan information platform documenting the NEET-UG 2026 paper leak controversy and the student-led protests at Jantar Mantar.',
  openGraph: {
    title: 'Straw Hat Press — One Piece Civic Freedom Platform',
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
        <LiveProtestTicker />

        {/* Centered Constitutional Quote Topbar */}
        <div className="border-b-2 border-[#8D7B50] bg-[#3D331E] px-4 py-2.5 text-center text-xs text-gold leading-relaxed sm:text-sm shadow-sm font-medium">
          <p className="max-w-4xl mx-auto text-center font-mono">
            &ldquo;Democracy has four pillars: <strong className="text-white underline decoration-red underline-offset-2">Youth</strong>, Media, Government, and Justice. But today, the youth fights for their rights while media and justice protect the government&rsquo;s mistakes.&rdquo;
          </p>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 border-b-2 border-[#8D7B50] bg-[#FDF5DF]/95 backdrop-blur-md shadow-md">
          <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group min-w-0">
              <StrawHatLogo className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="text-base sm:text-lg font-black tracking-widest text-[#3D331E] truncate transition-colors group-hover:text-red" style={{ fontFamily: 'var(--font-heading)' }}>
                STRAW HAT PRESS
              </span>
            </a>

            {/* Desktop Navigation Links (Hidden on Mobile) */}
            <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-black uppercase tracking-widest text-[#3D331E] transition-colors hover:text-red"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Haki Pulse Button: Visible ONLY on Desktop */}
              <div className="hidden md:block">
                <Gear5HakiEffect />
              </div>

              {/* 3-Lines Hamburger Menu Button: Visible ONLY on Mobile */}
              <div className="block md:hidden">
                <MobileNav />
              </div>
            </div>
          </div>
        </header>

        <main id="main-content" className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">{children}</main>

        <DrumsOfLiberationWidget />

        {/* Footer */}
        <footer className="border-t-4 border-[#8D7B50] bg-[#FDF6E2] text-[#2D2415]">
          <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex items-center gap-2 mb-3">
                  <StrawHatLogo className="w-7 h-7" />
                  <h3 className="text-base font-black tracking-wide text-[#2D2415]" style={{ fontFamily: 'var(--font-heading)' }}>STRAW HAT PRESS</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#4A3F28] leading-relaxed font-medium">
                  Independent coverage of the NEET-UG 2026 paper leak controversy and the student-led Jantar Mantar protests. We stand with those who seek transparency and justice.
                </p>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D7B50]" style={{ fontFamily: 'var(--font-heading)' }}>PLATFORM PAGES</h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm font-bold text-[#3D331E]">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="hover:text-red transition-colors">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D7B50]" style={{ fontFamily: 'var(--font-heading)' }}>RESOURCES &amp; DATA</h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm font-bold text-[#3D331E]">
                  <li><a href="/faq" className="hover:text-red transition-colors">FAQ &amp; Rights</a></li>
                  <li><a href="/about" className="hover:text-red transition-colors">About Platform</a></li>
                  <li><a href="/documents" className="hover:text-red transition-colors">Court Documents</a></li>
                </ul>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D7B50]" style={{ fontFamily: 'var(--font-heading)' }}>LEGAL &amp; PRIVACY</h3>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm font-bold text-[#3D331E]">
                  <li><a href="/privacy" className="hover:text-red transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-red transition-colors">Terms of Use</a></li>
                  <li><a href="/accessibility" className="hover:text-red transition-colors">Accessibility Statement</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t-2 border-[#8D7B50]/40 pt-6 text-center">
              <p className="text-xs font-mono font-bold text-[#8D7B50] text-center">
                &copy; {new Date().getFullYear()} Straw Hat Press • An Independent Civic Freedom Platform • The Will of D.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
