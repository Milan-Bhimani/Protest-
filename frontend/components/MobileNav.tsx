'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import StrawHatLogo from './StrawHatLogo'

const mainLinks = [
  { href: '/', label: 'Home', desc: 'Platform homepage & breaking updates' },
  { href: '/articles', label: 'Articles', desc: 'Verified news coverage & deep-dives' },
  { href: '/timeline', label: 'Timeline', desc: 'Day-by-day protest chronology' },
  { href: '/documents', label: 'Documents', desc: 'Court filings, affidavits & orders' },
  { href: '/public-reactions', label: 'Reactions', desc: 'Public figures & political response' },
  { href: '/student-stories', label: 'Stories', desc: 'Voices from Jantar Mantar ground' },
]

const subLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About Platform' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/accessibility', label: 'Accessibility' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="ml-auto inline-flex items-center justify-center rounded-lg border border-border bg-background p-2 text-muted transition-colors hover:bg-surface hover:text-red focus:outline-none focus-visible:ring-2 focus-visible:ring-red md:hidden"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[999] flex w-full h-full flex-col bg-[#FFFDF5] md:hidden"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: '#FFFDF5',
            color: '#1A1A2E',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Menu Top Bar */}
          <div
            className="flex shrink-0 items-center justify-between border-b border border-border px-4 py-3 bg-[#FFFDF5]"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #E8D5A3',
              padding: '12px 16px',
              backgroundColor: '#FFFDF5',
            }}
          >
            <a href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <StrawHatLogo className="h-7 w-7" />
              <span className="text-base font-bold tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A2E' }}>
                STRAW HAT PRESS
              </span>
            </a>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-muted transition-colors hover:bg-[#F5E6C4] hover:text-red"
              aria-label="Close menu"
              style={{ background: 'transparent', border: '1px solid #E8D5A3', cursor: 'pointer', borderRadius: '8px' }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Scrollable Body */}
          <div
            className="flex-1 overflow-y-auto px-5 py-6 bg-[#FFFDF5] flex flex-col justify-between"
            style={{
              flex: '1 1 0%',
              overflowY: 'auto',
              padding: '24px 20px',
              backgroundColor: '#FFFDF5',
            }}
          >
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-red" style={{ fontFamily: 'var(--font-heading)' }}>
                NAVIGATION MENU
              </p>

              <nav aria-label="Mobile navigation">
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {mainLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex flex-col rounded-xl border border-[#E8D5A3] bg-surface p-3.5 transition-all hover:border-red hover:bg-[#F5E6C4]/50"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '12px',
                          border: '1px solid #E8D5A3',
                          padding: '14px 16px',
                          textDecoration: 'none',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <span
                          className="text-sm font-bold uppercase tracking-wider text-primary group-hover:text-red transition-colors"
                          style={{
                            fontFamily: 'var(--font-heading)',
                            color: '#1A1A2E',
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {link.label} &rarr;
                        </span>
                        <span className="mt-1 text-xs text-muted leading-snug" style={{ color: '#8D7B50', fontSize: '11px' }}>
                          {link.desc}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Quick Links Footer */}
            <div className="mt-8 border-t border-[#E8D5A3] pt-6" style={{ borderTop: '1px solid #E8D5A3', marginTop: '32px', paddingTop: '24px' }}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted" style={{ fontFamily: 'var(--font-heading)' }}>
                INFORMATION &amp; LEGAL
              </p>
              <div className="flex flex-wrap gap-2.5">
                {subLinks.map((sub) => (
                  <a
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center rounded-lg border border-[#E8D5A3] bg-surface px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:bg-red hover:text-white hover:border-red"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      borderRadius: '8px',
                      border: '1px solid #E8D5A3',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#1A1A2E',
                      textDecoration: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
              <p className="mt-6 text-center text-[11px] text-muted">
                &copy; {new Date().getFullYear()} Straw Hat Press. Independent Journalism.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}