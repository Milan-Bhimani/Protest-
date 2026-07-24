'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import StrawHatLogo from './StrawHatLogo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/documents', label: 'Documents' },
  { href: '/public-reactions', label: 'Reactions' },
  { href: '/student-stories', label: 'Stories' },
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
        className="ml-auto inline-flex items-center justify-center rounded-lg border border-[#E8D5A3] bg-[#FFFDF5] p-2 text-muted transition-colors hover:bg-white hover:text-red focus:outline-none md:hidden"
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
          className="fixed inset-0 z-[99999] flex w-full h-full flex-col bg-[#FFFDF5] md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FFFDF5',
            color: '#1A1A2E',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Menu Header */}
          <div
            className="flex shrink-0 items-center justify-between border-b border-[#E8D5A3] px-5 py-4 bg-[#FFFDF5]"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #E8D5A3',
              padding: '16px 20px',
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
              className="rounded-lg p-2 text-muted transition-colors hover:bg-white hover:text-red"
              aria-label="Close menu"
              style={{ background: 'transparent', border: '1px solid #E8D5A3', cursor: 'pointer', borderRadius: '8px' }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Main Content (No Internal Scroll) */}
          <div
            className="flex-1 flex flex-col justify-between px-6 py-6 bg-[#FFFDF5]"
            style={{
              flex: '1 1 0%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px',
              backgroundColor: '#FFFDF5',
            }}
          >
            <nav aria-label="Mobile navigation" className="flex-1 flex flex-col justify-center">
              <ul className="space-y-3" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl border border-[#E8D5A3] bg-white px-5 py-3.5 text-base font-bold uppercase tracking-wider text-[#1A1A2E] shadow-sm transition-colors hover:bg-[#F5E6C4] hover:text-red hover:border-red"
                      style={{
                        display: 'block',
                        borderRadius: '12px',
                        padding: '14px 20px',
                        fontSize: '16px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#1A1A2E',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E8D5A3',
                        fontFamily: 'var(--font-heading)',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label} &rarr;
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Links Footer */}
            <div className="border-t border-[#E8D5A3] pt-5 mt-4" style={{ borderTop: '1px solid #E8D5A3', paddingTop: '20px' }}>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#8D7B50]">
                <a href="/faq" onClick={() => setOpen(false)} className="hover:text-red transition-colors">FAQ</a>
                <span>•</span>
                <a href="/about" onClick={() => setOpen(false)} className="hover:text-red transition-colors">About</a>
                <span>•</span>
                <a href="/terms" onClick={() => setOpen(false)} className="hover:text-red transition-colors">Terms</a>
                <span>•</span>
                <a href="/privacy" onClick={() => setOpen(false)} className="hover:text-red transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

