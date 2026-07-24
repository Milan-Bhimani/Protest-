'use client'

import { useState } from 'react'

const tickerItems = [
  { tag: 'LIVE', text: 'Supreme Court hearing on NEET-UG paper leak controversy underway in New Delhi.', date: 'Just now' },
  { tag: 'DEMAND', text: 'Over 2.3 Million aspirants demand complete re-examination and NTA restructuring.', date: '10m ago' },
  { tag: 'PROTEST', text: 'Student rally at Jantar Mantar enters Day 45 with multi-state student delegation.', date: '25m ago' },
  { tag: 'CBI', text: 'CBI files supplementary chargesheet naming 13 key suspects in Patna paper leak module.', date: '1h ago' },
  { tag: 'STATEMENT', text: 'Education Ministry announces high-level committee to review exam security protocols.', date: '3h ago' },
]

export default function LiveProtestTicker() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className="border-b border-red/20 bg-primary text-white overflow-hidden relative select-none">
      <div className="mx-auto max-w-content flex items-center">
        {/* Live Badge Label */}
        <div className="shrink-0 bg-red px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 z-10 shadow-md" style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="relative flex h-2 w-2">
            <span className="badge-pulse-dot absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span>LIVE BULLETIN</span>
        </div>

        {/* Marquee Container */}
        <div 
          className="flex-1 overflow-hidden relative py-2 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setIsPaused(!isPaused)}
          title="Click or hover to pause/play live updates"
        >
          <div className={`flex whitespace-nowrap ${isPaused ? '' : 'animate-marquee'}`}>
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-3 px-6 text-xs text-slate-200">
                <span className="rounded bg-red/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-red-300 border border-red/30">
                  #{item.tag}
                </span>
                <span className="font-medium tracking-wide text-slate-100">{item.text}</span>
                <span className="text-[10px] text-slate-400 font-mono">({item.date})</span>
                <span className="text-slate-600 font-bold ml-2">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pause/Play indicator */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="hidden sm:flex shrink-0 px-3 py-2 text-[10px] font-semibold text-slate-400 hover:text-white transition-colors items-center gap-1 border-l border-slate-800"
          aria-label={isPaused ? 'Resume live ticker' : 'Pause live ticker'}
        >
          {isPaused ? '▶ PLAY' : '❚❚ PAUSE'}
        </button>
      </div>
    </div>
  )
}
