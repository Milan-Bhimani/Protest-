import type { Metadata } from 'next'
import Link from 'next/link'
import InteractiveTimelineFeed from '../../components/InteractiveTimelineFeed'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Chronological Timeline',
  description: 'Complete chronological timeline of the NEET-UG 2026 paper leak controversy and the Jantar Mantar protests.',
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getStats() {
  try {
    const res = await fetch(`${API}/api/statistics`, { cache: 'no-store' })
    return res.ok ? res.json() : null
  } catch {
    return null
  }
}

async function getTimeline() {
  try {
    const res = await fetch(`${API}/api/timeline`, { cache: 'no-store' })
    return res.ok ? res.json() : []
  } catch {
    return []
  }
}

const IST = 'Asia/Kolkata' as const

export default async function TimelinePage() {
  const [apiEvents, stats] = await Promise.all([getTimeline(), getStats()])
  const events = apiEvents || []
  const days = stats?.days_of_protest || 48
  const todayStr = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: IST,
  })

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="wanted-poster rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-red" style={{ fontFamily: 'var(--font-heading)' }}>
            LOG POSE CHRONOLOGY
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-[#2D2415]" style={{ fontFamily: 'var(--font-heading)' }}>
          NEET-UG 2026 &amp; PROTEST TIMELINE
        </h1>
        <p className="mt-3 text-[#4A3F28] text-base sm:text-lg max-w-3xl leading-relaxed font-medium">
          A step-by-step chronological log documenting the paper leak discovery, initial police FIRs, Supreme Court proceedings, and the ongoing Jantar Mantar student movement. Click any entry to expand its detailed log.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-xl border-2 border-[#8D7B50] bg-[#3D331E] px-4 py-2.5 text-xs sm:text-sm font-black text-gold shadow-md">
          <span className="font-mono">DAY {days} OF MOVEMENT</span>
          <span className="text-gold/40">•</span>
          <span>Last Verified: {todayStr}</span>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="wanted-poster rounded-3xl p-12 text-center shadow-md">
          <div className="text-4xl mb-3">⏱️</div>
          <h2 className="text-xl font-black text-[#2D2415] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Timeline Loading...</h2>
          <p className="text-[#4A3F28] text-sm font-medium">Fetching verified chronological data from the archive.</p>
        </div>
      ) : (
        <InteractiveTimelineFeed events={events} />
      )}

      {/* Back to top & Home */}
      <div className="pt-6 border-t-2 border-[#8D7B50]/40 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-black uppercase tracking-wider text-red hover:underline"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          &larr; BACK TO HOME
        </Link>
      </div>
    </div>
  )
}
