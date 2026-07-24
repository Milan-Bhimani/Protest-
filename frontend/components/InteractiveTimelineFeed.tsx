'use client'

import { useState } from 'react'
import { linkify } from '../lib/utils'

interface EventItem {
  id: string | number
  title: string
  description: string
  date: string
  sources?: string[]
}

const IST = 'Asia/Kolkata' as const

function formatIST(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: IST,
  })
}

export default function InteractiveTimelineFeed({ events }: { events: EventItem[] }) {
  // Track open accordion IDs. By default, open the first entry so users see an example.
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [events[0]?.id || '1']: true,
  })

  const toggleEvent = (id: string | number) => {
    const key = id.toString()
    setOpenIds((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="relative border-l-4 border-red ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
      {events.map((event, idx) => {
        const idKey = event.id.toString()
        const isOpen = !!openIds[idKey]

        return (
          <div key={event.id} className="relative group">
            {/* Pulsing Node */}
            <div
              onClick={() => toggleEvent(event.id)}
              className="absolute -left-[33px] sm:-left-[49px] top-4 h-5 w-5 rounded-full bg-red ring-4 ring-gold group-hover:scale-125 transition-transform cursor-pointer"
            />

            <div
              className={`wanted-poster rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-md hover:shadow-xl ${
                isOpen ? 'ring-2 ring-gold' : 'opacity-95'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleEvent(event.id)}
                className="cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#8D7B50]/30 pb-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-md bg-[#3D331E] px-3 py-1 text-xs font-black uppercase tracking-wider text-gold font-mono"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    LOG ENTRY #{events.length - idx}
                  </span>
                  <time className="text-xs font-mono font-black text-[#8D7B50]" dateTime={event.date}>
                    {formatIST(event.date)}
                  </time>
                </div>

                <button
                  type="button"
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-[#8D7B50] bg-[#3D331E] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-red hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>{isOpen ? 'COLLAPSE LOG ▲' : 'EXPAND LOG DETAILS ▼'}</span>
                </button>
              </div>

              {/* Title Header */}
              <h2
                onClick={() => toggleEvent(event.id)}
                className="mt-4 text-xl sm:text-2xl font-black tracking-tight text-[#2D2415] hover:text-red transition-colors cursor-pointer leading-snug"
              >
                {event.title}
              </h2>

              {/* Expandable Details Container */}
              {isOpen && (
                <div className="mt-4 pt-4 border-t-2 border-[#8D7B50]/30 space-y-4 animate-fadeIn">
                  <p className="text-base leading-relaxed text-[#4A3F28] font-medium whitespace-pre-wrap">
                    {event.description}
                  </p>

                  {event.sources && event.sources.length > 0 && (
                    <div className="rounded-2xl bg-[#FFFDF5] border-2 border-[#8D7B50]/40 p-4">
                      <p
                        className="text-[11px] font-black uppercase tracking-wider text-[#8D7B50] mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        VERIFIED PRIMARY SOURCES ({event.sources.length}):
                      </p>
                      <ul className="space-y-1.5 text-xs text-[#2D2415] font-bold">
                        {event.sources.map((s: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-red hover:underline">
                            <span>🔗</span>
                            <span>{linkify(s)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
