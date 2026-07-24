'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import StrawHatLogo from './StrawHatLogo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/documents', label: 'Documents' },
  { href: '/public-reactions', label: 'Reactions' },
  { href: '/student-stories', label: 'Stories' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-muted hover:bg-background hover:text-red focus:outline-none focus-visible:ring-2 focus-visible:ring-red sm:hidden"
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

      {open && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative ml-auto flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <StrawHatLogo className="w-6 h-6" />
                <span className="text-xs font-bold tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                  STRAW HAT PRESS
                </span>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md p-1 text-muted hover:text-red" aria-label="Close menu">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto bg-white px-3 py-4" aria-label="Mobile navigation">
              <ul className="space-y-0.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:bg-background hover:text-red"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="shrink-0 border-t border-border bg-white px-4 py-3">
              <div className="flex flex-row gap-3">
                <a href="/faq" onClick={() => setOpen(false)} className="text-xs text-muted hover:text-red transition-colors">FAQ</a>
                <a href="/about" onClick={() => setOpen(false)} className="text-xs text-muted hover:text-red transition-colors">About</a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}