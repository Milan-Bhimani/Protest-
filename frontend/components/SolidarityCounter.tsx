'use client'

import { useState } from 'react'

export default function SolidarityCounter() {
  const [count] = useState(142890)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://strawhatpress.in'
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const shareText = "Demanding transparency & justice for 2.3M NEET aspirants. Check the verified evidence & student stories on Straw Hat Press ✊"
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://strawhatpress.in'

  return (
    <div className="wanted-poster relative rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background Accent */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-gold/30 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-center w-full">
        <div className="space-y-2 max-w-xl flex flex-col items-center justify-center text-center mx-auto">
          <div className="inline-flex items-center justify-center text-center gap-2 rounded-md bg-[#3D331E] px-3 py-1 text-xs font-black uppercase tracking-wider text-gold shadow-sm mx-auto" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="h-2 w-2 rounded-full bg-red animate-pulse" />
            STAND WITH ASPIRANTS • WILL OF D.
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#2D2415] text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            STUDENT SOLIDARITY &amp; DEMANDS
          </h3>
          <p className="text-sm sm:text-base text-[#4A3F28] font-medium leading-relaxed text-center">
            Representing millions of candidate voices demanding accountability, NTA exam restructuring, and legal transparency across India.
          </p>
        </div>

        {/* Counter Only */}
        <div className="flex flex-col items-center justify-center w-full md:w-auto shrink-0 text-center mx-auto">
          <div className="text-center flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl font-black text-[#2D2415] tracking-tight font-mono text-center">
              {count.toLocaleString('en-IN')}
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-[#8D7B50] mt-1 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              Voices United Nationwide
            </p>
          </div>
        </div>
      </div>

      {/* Social Share Bar */}
      <div className="mt-8 pt-6 border-t-2 border-[#8D7B50]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center w-full">
        <span className="text-xs font-black uppercase tracking-wider text-[#8D7B50] text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Spread verified information:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center gap-1.5 rounded-xl border-2 border-[#8D7B50] bg-surface px-3.5 py-1.5 text-xs font-black text-[#2D2415] hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <span>𝕏</span> Share on X
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center gap-1.5 rounded-xl border-2 border-[#8D7B50] bg-surface px-3.5 py-1.5 text-xs font-black text-[#2D2415] hover:bg-emerald-700 hover:text-white transition-all shadow-sm"
          >
            <span>💬</span> WhatsApp
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-center gap-1.5 rounded-xl border-2 border-[#8D7B50] bg-surface px-3.5 py-1.5 text-xs font-black text-[#2D2415] hover:bg-sky-600 hover:text-white transition-all shadow-sm"
          >
            <span>✈️</span> Telegram
          </a>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center text-center gap-1.5 rounded-xl border-2 border-[#8D7B50] bg-surface px-3.5 py-1.5 text-xs font-black text-[#2D2415] hover:border-red hover:text-red transition-all shadow-sm"
          >
            <span>🔗</span> {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  )
}
