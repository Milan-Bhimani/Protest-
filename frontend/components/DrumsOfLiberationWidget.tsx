'use client'

import { useState, useEffect } from 'react'

export default function DrumsOfLiberationWidget() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [beatCount, setBeatCount] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setBeatCount((b) => b + 1)
        playNikaDrum()
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const playNikaDrum = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // Deep drum heartbeat frequency
      const freqs = [120, 85, 95, 140]
      const freq = freqs[beatCount % freqs.length]

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.25)

      gain.gain.setValueAtTime(0.6, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.26)
    } catch {
      // Audio fallback
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-2 rounded-full border-2 border-gold bg-primary/95 px-4 py-2 text-xs font-bold text-gold shadow-xl animate-fadeIn">
          <span className="h-2 w-2 rounded-full bg-red animate-ping" />
          <span className="font-mono uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
            DRUMS OF NIKA ACTIVE • BEAT #{beatCount}
          </span>
        </div>
      )}

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold text-2xl shadow-2xl transition-all duration-300 active:scale-95 ${
          isPlaying
            ? 'bg-gold text-primary drum-beat shadow-gold/50'
            : 'bg-primary text-gold hover:scale-110 hover:border-red'
        }`}
        aria-label={isPlaying ? 'Pause Drums of Liberation' : 'Play Drums of Liberation sound beat'}
        title={isPlaying ? 'Pause Drums of Liberation' : 'Play Drums of Liberation (Gear 5 Rhythm)'}
      >
        <span className="relative z-10">{isPlaying ? '🥁' : '🏴‍☠️'}</span>

        {/* Pulse Ring */}
        <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-40" />
      </button>
    </div>
  )
}
