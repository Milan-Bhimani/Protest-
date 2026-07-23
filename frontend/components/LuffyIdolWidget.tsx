'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface StrawHatMember {
  name: string
  role: string
  color: string
  quote: string
}

const STRAW_HATS: StrawHatMember[] = [
  {
    name: 'Monkey D. Luffy',
    role: 'Captain',
    color: '#D32F2F',
    quote: 'If you don\'t take risks, you can\'t create a future! Stand for what\'s right!',
  },
  {
    name: 'Roronoa Zoro',
    role: 'Swordsman',
    color: '#16A34A',
    quote: 'When the world pushes you around, you\'ve just gotta stand up and push back.',
  },
  {
    name: 'Nami',
    role: 'Navigator',
    color: '#D97706',
    quote: 'Life is like a storm, but perseverance always finds the clear sky.',
  },
  {
    name: 'Usopp',
    role: 'Sniper',
    color: '#CA8A04',
    quote: 'There comes a time when a person has to stand up and fight for their cause!',
  },
  {
    name: 'Vinsmoke Sanji',
    role: 'Cook',
    color: '#2563EB',
    quote: 'Never doubt the determination of those who seek the truth.',
  },
  {
    name: 'Tony Tony Chopper',
    role: 'Doctor',
    color: '#EC4899',
    quote: 'I\'ll heal the pain and support anyone who needs help!',
  },
  {
    name: 'Nico Robin',
    role: 'Archaeologist',
    color: '#7C3AED',
    quote: 'Fools who don\'t respect the past are likely to repeat it. Document the truth!',
  },
  {
    name: 'Franky',
    role: 'Shipwright',
    color: '#0284C7',
    quote: 'No matter what happens, build a future you can be proud of!',
  },
  {
    name: 'Brook',
    role: 'Musician',
    color: '#475569',
    quote: 'Neither rain nor storm can stop the voice of those who sing for freedom!',
  },
  {
    name: 'Jinbe',
    role: 'Helmsman',
    color: '#0891B2',
    quote: 'Stop counting what you have lost! What is left is your resolve!',
  },
]

export default function LuffyIdolWidget() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const currentMember = STRAW_HATS[currentIndex]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % STRAW_HATS.length)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 select-none">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Return to top"
          aria-label="Scroll back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-lg transition-transform duration-200 hover:scale-110 hover:border-red hover:text-red"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}

      {/* Quote Dialog Card */}
      {isOpen && (
        <div className="w-72 sm:w-80 rounded-2xl border-2 border-gold/40 bg-surface p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full animate-pulse"
                style={{ backgroundColor: currentMember.color }}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                {currentMember.name}
              </span>
              <span className="text-[10px] font-semibold text-muted">({currentMember.role})</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-red transition-colors text-xs p-1"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-text italic">
            &ldquo;{currentMember.quote}&rdquo;
          </p>

          <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/60">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
              STRAW HAT CREW WISDOM
            </span>
            <button
              onClick={nextQuote}
              className="inline-flex items-center gap-1 rounded-full bg-red/10 px-2.5 py-1 text-[10px] font-bold text-red transition-colors hover:bg-red hover:text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              NEXT CREW MEMBER ↻
            </button>
          </div>
        </div>
      )}

      {/* Floating Luffy Idol Mascot Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Click Luffy for Straw Hat Pirates Wisdom!"
          className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-surface p-1 shadow-xl transition-all duration-300 hover:scale-110 hover:border-red focus:outline-none focus:ring-2 focus:ring-red"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red via-gold to-red opacity-30 blur group-hover:opacity-75 transition duration-300" />
          
          <div className="relative h-full w-full overflow-hidden rounded-full border border-border">
            <Image
              src="/luffy.png"
              alt="Luffy Idol — Straw Hat Press Mascot"
              fill
              sizes="56px"
              className="object-cover transition-transform duration-300 group-hover:rotate-6"
            />
          </div>

          {/* Straw Hat Crown Icon Badge */}
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red text-[10px] font-bold text-white shadow">
            👒
          </div>
        </button>

        {/* Hover Tooltip if closed */}
        {!isOpen && (
          <div className="absolute right-16 top-2 hidden sm:block whitespace-nowrap rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            Straw Hat Pirates Inspiration ✨
          </div>
        )}
      </div>
    </div>
  )
}
