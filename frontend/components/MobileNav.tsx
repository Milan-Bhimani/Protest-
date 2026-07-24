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
        className="ml-auto inline-flex items-center justify-center rounded-lg border border-border bg-surface p-2 text-muted transition-colors hover:bg-background hover:text-red focus:outline-none focus-visible:ring-2 focus-visible:ring-red sm:hidden"
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
        <div className="fixed inset-0 z-[100] flex sm:hidden" style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
          {/* Dark Overlay Backdrop */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer Menu Panel */}
          <div
            className="relative ml-auto flex h-[100dvh] w-[300px] max-w-[85vw] flex-col border-l border-border bg-surface shadow-2xl"
            style={{
              position: 'relative',
              marginLeft: 'auto',
              height: '100dvh',
              width: '300px',
              maxWidth: '85vw',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--surface, #FFFFFF)',
              borderLeft: '1px solid var(--border, #E8D5A3)',
              color: 'var(--text, #1A1A2E)',
            }}
          >
            {/* Header */}
            <div
              className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4"
              style={{
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border, #E8D5A3)',
                padding: '16px 20px',
                backgroundColor: 'var(--surface, #FFFFFF)',
              }}
            >
              <a href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <StrawHatLogo className="h-7 w-7" />
                <span className="text-sm font-bold tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary, #1A1A2E)' }}>
                  STRAW HAT PRESS
                </span>
              </a>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-red"
                aria-label="Close menu"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation List */}
            <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Mobile navigation" style={{ flex: '1 1 0%', overflowY: 'auto', padding: '20px 16px' }}>
              <ul className="space-y-1.5" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:bg-background hover:text-red"
                      style={{
                        display: 'block',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--muted, #6B7280)',
                        fontFamily: 'var(--font-heading)',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer Quick Links */}
            <div
              className="shrink-0 border-t border-border px-5 py-4"
              style={{
                flexShrink: 0,
                borderTop: '1px solid var(--border, #E8D5A3)',
                padding: '16px 20px',
                backgroundColor: 'var(--surface, #FFFFFF)',
              }}
            >
              <div className="flex items-center gap-4 text-xs font-medium text-muted">
                <a href="/faq" onClick={() => setOpen(false)} className="hover:text-red transition-colors">FAQ</a>
                <span>•</span>
                <a href="/about" onClick={() => setOpen(false)} className="hover:text-red transition-colors">About</a>
                <span>•</span>
                <a href="/terms" onClick={() => setOpen(false)} className="hover:text-red transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}