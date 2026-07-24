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
        <div className="fixed inset-0 z-50 flex sm:hidden" style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div className="fixed inset-0" onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} />
          <div className="relative ml-auto flex h-full flex-col shadow-2xl" style={{ position: 'relative', marginLeft: 'auto', height: '100%', width: '280px', maxWidth: '85vw', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
            <div className="flex shrink-0 items-center justify-between border-b px-4 py-3" style={{ display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E8D5A3', padding: '12px 16px', backgroundColor: '#FFFFFF' }}>
              <div className="flex items-center gap-2">
                <StrawHatLogo className="w-6 h-6" />
                <span className="text-xs font-bold tracking-wide" style={{ fontFamily: 'var(--font-heading)', color: '#1A1A2E' }}>
                  STRAW HAT PRESS
                </span>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md p-1" style={{ color: '#8D7B50', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} aria-label="Close menu">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation" style={{ flex: '1 1 0%', overflowY: 'auto', padding: '16px 12px', backgroundColor: '#FFFFFF' }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {navLinks.map((link) => (
                  <li key={link.href} style={{ marginBottom: '2px' }}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
                      style={{ display: 'block', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8D7B50', fontFamily: 'var(--font-heading)', textDecoration: 'none', backgroundColor: '#FFFFFF' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFDF5'; e.currentTarget.style.color = '#D32F2F'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#8D7B50'; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="shrink-0 border-t px-4 py-3" style={{ flexShrink: 0, borderTop: '1px solid #E8D5A3', padding: '12px 16px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                <a href="/faq" onClick={() => setOpen(false)} className="text-xs transition-colors" style={{ fontSize: '12px', color: '#8D7B50', textDecoration: 'none' }}>FAQ</a>
                <a href="/about" onClick={() => setOpen(false)} className="text-xs transition-colors" style={{ fontSize: '12px', color: '#8D7B50', textDecoration: 'none' }}>About</a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}