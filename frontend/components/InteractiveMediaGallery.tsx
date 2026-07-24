'use client'

import { useState } from 'react'

interface MediaItem {
  id: string
  title: string
  category: 'Jantar Mantar' | 'Supreme Court' | 'Press Conf' | 'Evidence'
  imageUrl: string
  caption: string
  date: string
}

const mediaItems: MediaItem[] = [
  {
    id: 'm1',
    title: 'Student Delegation & Aspirants Rally',
    category: 'Jantar Mantar',
    imageUrl: '/nta_investigation.jpg',
    caption: 'Thousands of medical aspirants gathering at Jantar Mantar New Delhi demanding a standardized re-test.',
    date: 'June 2026',
  },
  {
    id: 'm2',
    title: 'Supreme Court Bench Hearing Briefing',
    category: 'Supreme Court',
    imageUrl: '/nta_investigation.jpg',
    caption: 'Advocates representing 2.3M aspirants presenting center-wise mark distribution anomalies.',
    date: 'July 2026',
  },
  {
    id: 'm3',
    title: 'Joint Press Conference by Student Unions',
    category: 'Press Conf',
    imageUrl: '/nta_investigation.jpg',
    caption: 'Representatives of major student groups releasing the 5-Point Exam Reform Charter.',
    date: 'June 2026',
  },
  {
    id: 'm4',
    title: 'CBI Investigation Chargesheet Evidence',
    category: 'Evidence',
    imageUrl: '/nta_investigation.jpg',
    caption: 'Burnt question paper remnants and Telegram solver chat logs submitted as court exhibit.',
    date: 'May 2026',
  },
]

export default function InteractiveMediaGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null)

  const categories = ['All', 'Jantar Mantar', 'Supreme Court', 'Press Conf', 'Evidence']

  const filteredItems = activeCategory === 'All'
    ? mediaItems
    : mediaItems.filter((item) => item.category === activeCategory)

  return (
    <section className="wanted-poster mt-16 rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 border-b-4 border-[#8D7B50] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-red" style={{ fontFamily: 'var(--font-heading)' }}>
              VERIFIED VISUAL REPOSITORY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#2D2415]" style={{ fontFamily: 'var(--font-heading)' }}>
            GROUND DISPATCHES &amp; EVIDENCE
          </h2>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                  isActive
                    ? 'bg-red text-white scale-105 shadow-red/30 ring-2 ring-gold'
                    : 'bg-[#3D331E] border border-gold text-gold hover:bg-red hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {cat} {isActive && `(${filteredItems.length})`}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bounty Poster Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="wanted-poster group cursor-pointer rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              {/* Image Frame */}
              <div className="aspect-video relative overflow-hidden rounded-xl border-2 border-[#8D7B50] bg-slate-900 mb-3 shadow-inner">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-105"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 wanted-stamp text-[10px] bg-surface/95 backdrop-blur-sm">
                  {item.category}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-[#2D2415] group-hover:text-red transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#4A3F28] line-clamp-2 leading-relaxed font-medium">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-[#8D7B50]/40 flex items-center justify-between text-[11px] font-mono text-[#8D7B50]">
              <span className="font-bold">{item.date}</span>
              <span className="font-black text-red group-hover:underline flex items-center gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
                VIEW EXHIBIT &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-3xl wanted-poster rounded-3xl border-4 border-[#8D7B50] p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-[#4A3F28] hover:text-red text-xl font-bold p-2 z-10"
              aria-label="Close image lightbox"
            >
              ✕
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 mb-5 border-4 border-[#8D7B50]">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md bg-red px-3 py-0.5 text-xs font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {activeItem.category}
              </span>
              <span className="text-xs text-[#8D7B50] font-mono font-bold">{activeItem.date}</span>
            </div>

            <h3 className="text-2xl font-black text-[#2D2415] mb-2">{activeItem.title}</h3>
            <p className="text-sm text-[#4A3F28] leading-relaxed font-medium">{activeItem.caption}</p>

            <div className="mt-6 pt-4 border-t-2 border-[#8D7B50]/40 flex items-center justify-between">
              <span className="text-xs text-[#8D7B50] font-mono font-bold">Straw Hat Press • Primary Verified Exhibit</span>
              <button
                onClick={() => setActiveItem(null)}
                className="rounded-xl bg-[#3D331E] px-5 py-2.5 text-xs font-black text-gold uppercase tracking-wider hover:bg-red hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                CLOSE EXHIBIT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
