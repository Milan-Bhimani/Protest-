'use client'

import { useState } from 'react'

interface BountyProps {
  id: string
  title: string
  summary: string
  content?: string
  category: string
  type: string
  imageUrl?: string
  publishedAt?: string
}

export default function OnePieceBountyCard({
  id,
  title,
  summary,
  content,
  category,
  type,
  imageUrl,
  publishedAt,
}: BountyProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const imageSrc = imageUrl || '/nta_investigation.jpg'

  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className="wanted-poster group rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-2 relative flex flex-col items-center justify-between cursor-pointer h-full shadow-md hover:shadow-xl text-center"
      >
        <div className="w-full flex flex-col items-center justify-center text-center">
          {/* Photo Frame with Wanted Stamp */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-[#8D7B50] bg-slate-900 mb-3 shadow-inner">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/nta_investigation.jpg'
              }}
            />
            <div className="absolute top-2 right-2 wanted-stamp text-[9px] bg-surface/95 backdrop-blur-sm shadow-sm py-0.5 px-2 text-center">
              {category || 'EVIDENCE'}
            </div>
          </div>

          {/* Article Info */}
          <div className="space-y-1.5 mb-4 w-full flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-[#8D7B50] text-center w-full">
              <span className="font-bold uppercase text-center">#{type?.replace(/_/g, ' ')}</span>
              {publishedAt && (
                <span className="font-bold text-center">
                  • {new Date(publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-base font-black text-[#2D2415] group-hover:text-red transition-colors leading-snug line-clamp-2 text-center w-full">
              {title}
            </h3>

            <p className="text-xs text-[#4A3F28] leading-relaxed line-clamp-2 font-medium text-center w-full">
              {summary}
            </p>
          </div>
        </div>

        {/* Clean Action Bar */}
        <div className="border-t-2 border-[#8D7B50]/40 pt-3 flex flex-col items-center justify-center gap-2 mt-auto w-full text-center">
          <span className="text-[10px] font-mono font-bold text-[#8D7B50] text-center">STRAW HAT PRESS</span>
          <span
            className="inline-flex items-center justify-center text-center rounded-lg bg-[#3D331E] px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-gold group-hover:bg-red group-hover:text-white transition-colors w-full"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            READ DISPATCH &rarr;
          </span>
        </div>
      </article>

      {/* Full Article Lightbox Modal Reader */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn text-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl wanted-poster rounded-3xl border-4 border-[#8D7B50] p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] text-center flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-background border border-[#8D7B50] p-2 text-[#4A3F28] hover:text-red font-bold text-lg"
              aria-label="Close article modal"
            >
              ✕
            </button>

            <div className="flex items-center justify-center gap-2 mb-3 text-center">
              <span className="rounded-md bg-red px-3 py-0.5 text-xs font-black text-white text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                #{type?.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-[#8D7B50] font-mono font-bold text-center">
                {publishedAt ? new Date(publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Verified Report'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#2D2415] mb-4 leading-tight text-center">
              {title}
            </h2>

            <div className="aspect-video w-full overflow-hidden rounded-2xl border-4 border-[#8D7B50] mb-6 bg-slate-900">
              <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="prose-content text-base leading-relaxed text-[#2D2415] space-y-4 text-center">
              <p className="font-bold text-lg text-[#2D2415] leading-relaxed text-center">{summary}</p>
              {content ? (
                <p className="text-[#4A3F28] font-medium leading-relaxed text-center">{content}</p>
              ) : (
                <p className="text-[#8D7B50] italic font-medium text-center">
                  Full article details compiled from verified ground reports and legal briefings. Additional updates will be published as Supreme Court hearings progress.
                </p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t-2 border-[#8D7B50]/40 flex flex-col sm:flex-row items-center justify-between gap-4 w-full text-center">
              <span className="text-xs font-mono font-bold text-[#8D7B50] text-center">STRAW HAT PRESS • VERIFIED REPORT</span>

              <button
                onClick={() => setIsModalOpen(false)}
                className="inline-flex items-center justify-center text-center rounded-xl bg-[#3D331E] px-6 py-2.5 text-xs font-black uppercase text-gold hover:bg-red hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}