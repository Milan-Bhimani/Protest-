'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Gear5HakiEffect() {
  const [isActive, setIsActive] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)

  const quotes = [
    "“I'm gonna be the King of the Pirates — and no paper leak syndicate will steal our future!” — Luffy",
    "“The Drums of Liberation are sounding for 2.3 Million Aspirants across India!” — Straw Hat Press",
    "“If you don't take risks, you can't create a future!” — Monkey D. Luffy",
    "“When does a student's dream die? Never!” — Dr. Hiriluk",
    "“There is no crime in existing and demanding honest exams!” — Franky",
  ]

  const triggerHaki = () => {
    setIsActive(true)
    setQuoteIndex((prev) => (prev + 1) % quotes.length)

    // Pure Conqueror's Haki Thunder Sound Effect Synthesis
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        const ctx = new AudioCtx()
        const hakiOsc = ctx.createOscillator()
        const hakiGain = ctx.createGain()

        hakiOsc.type = 'sawtooth'
        hakiOsc.frequency.setValueAtTime(160, ctx.currentTime)
        hakiOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.5)

        hakiGain.gain.setValueAtTime(0.9, ctx.currentTime)
        hakiGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55)

        hakiOsc.connect(hakiGain)
        hakiGain.connect(ctx.destination)

        hakiOsc.start()
        hakiOsc.stop(ctx.currentTime + 0.56)
      }
    } catch {
      // Audio fallback
    }
  }

  return (
    <>
      {/* Interactive Trigger Button */}
      <button
        onClick={triggerHaki}
        className="group relative inline-flex items-center justify-center text-center gap-2 rounded-full border-2 border-gold bg-[#1A1A2E] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-gold shadow-md hover:bg-gold hover:text-[#1A1A2E] transition-all active:scale-95 cursor-pointer"
        style={{ fontFamily: 'var(--font-heading)' }}
        title="Unleash Conqueror's Haki Pulse!"
      >
        <span className="relative h-5 w-5 overflow-hidden rounded-full shrink-0 border border-gold/40">
          <Image src="/luffy.png" alt="Luffy" fill className="object-cover" />
        </span>
        <span className="hidden sm:inline">HAKI PULSE</span>
        <span className="text-red font-mono">⚡</span>
      </button>

      {/* Screen-Wide Conqueror's Haki Lightbox Modal Overlay */}
      {isActive && (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn text-center"
          onClick={() => setIsActive(false)}
        >
          {/* Fullscreen Corner Lightning Blast & Shockwaves */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full border-[12px] border-red/40 haki-pulse-trigger" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-red/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red/20 blur-3xl rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[800px] aspect-square rounded-full border-4 border-gold opacity-50 haki-pulse-trigger" />
          </div>

          {/* Centered Wanted Poster Lightbox Modal */}
          <div
            className="relative z-10 wanted-poster border-4 border-[#8D7B50] rounded-3xl p-6 sm:p-8 max-w-xl w-full text-center flex flex-col items-center justify-center shadow-2xl space-y-5 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsActive(false)}
              className="absolute top-3 right-4 text-[#2D2415] hover:text-red font-black text-xl p-2 cursor-pointer transition-colors"
              aria-label="Close Haki Pulse"
            >
              ✕
            </button>

            <div className="flex items-center justify-center gap-3 text-center">
              <span className="text-2xl">⚡</span>
              <span className="text-sm sm:text-base font-black uppercase tracking-[0.25em] text-[#3D331E] text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                CONQUEROR&apos;S HAKI PULSE
              </span>
              <span className="text-2xl">⚡</span>
            </div>

            <div className="bg-[#3D331E] text-gold py-1.5 px-4 rounded-md text-xs font-black uppercase tracking-wider inline-block border border-gold/30 text-center">
              WILL OF D. • STRAW HAT PRESS
            </div>

            <div className="bg-[#FFFDF5] border-2 border-[#8D7B50]/40 rounded-2xl p-5 shadow-inner w-full text-center flex flex-col items-center justify-center">
              <p className="text-lg sm:text-xl font-black text-[#2D2415] leading-relaxed tracking-wide text-center">
                {quotes[quoteIndex]}
              </p>
            </div>

            <div className="pt-4 border-t-2 border-[#8D7B50]/40 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
              <span className="text-xs font-black text-[#8D7B50] uppercase tracking-wider font-mono text-center">DEMOCRACY &amp; EXAM INTEGRITY</span>
              <button
                onClick={() => setIsActive(false)}
                className="inline-flex items-center justify-center text-center rounded-xl bg-red px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-red/90 transition-all shadow-md active:scale-95 cursor-pointer"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DISMISS [✕]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
