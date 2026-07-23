import React from 'react'

const CREW_BADGES = [
  { label: 'LUFFY', icon: '👒', title: 'Freedom & Justice' },
  { label: 'ZORO', icon: '⚔️', title: 'Unyielding Resolve' },
  { label: 'NAMI', icon: '🍊', title: 'Truth & Direction' },
  { label: 'USOPP', icon: '🎯', title: 'Courageous Voice' },
  { label: 'SANJI', icon: '🍳', title: 'Compassion & Respect' },
  { label: 'CHOPPER', icon: '🌸', title: 'Healing Aspirants' },
  { label: 'ROBIN', icon: '📖', title: 'Verified History' },
  { label: 'FRANKY', icon: '🔨', title: 'Building Reform' },
  { label: 'BROOK', icon: '🎻', title: 'Unbroken Spirit' },
  { label: 'JINBE', icon: '🌊', title: 'Honor & Equity' },
]

export default function StrawHatCrewBanner() {
  return (
    <div className="w-full bg-primary text-background py-1.5 px-4 overflow-hidden border-b border-gold/30">
      <div className="mx-auto max-w-content flex items-center justify-between gap-4 text-[11px] font-semibold tracking-wider uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
        <div className="flex items-center gap-2 text-gold">
          <span className="text-sm">👒</span>
          <span>STRAW HAT PRESS</span>
          <span className="hidden sm:inline text-muted">• INDEPENDENT STUDENT ADVOCACY ARCHIVE</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-background/80">
          {CREW_BADGES.slice(0, 5).map((crew) => (
            <span key={crew.label} className="inline-flex items-center gap-1 hover:text-gold transition-colors cursor-default" title={`${crew.label}: ${crew.title}`}>
              <span>{crew.icon}</span>
              <span>{crew.label}</span>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-gold/90 text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
          <span>TRUTH • TRANSPARENCY • FREEDOM</span>
        </div>
      </div>
    </div>
  )
}
