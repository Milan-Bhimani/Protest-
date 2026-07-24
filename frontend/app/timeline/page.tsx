import type { Metadata } from 'next'
import { linkify } from '../../lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Timeline',
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

export default async function TimelinePage() {
  const [apiEvents, stats] = await Promise.all([getTimeline(), getStats()])
  const events = apiEvents || []
  const days = stats?.days_of_protest || 48
  const todayStr = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Timeline of Events</h1>
        <p className="mt-2 text-muted">A chronological record of the NEET-UG 2026 paper leak controversy and the student-led Jantar Mantar protests. Sources cited for every entry.</p>
      </div>

      <div className="mb-8 rounded-xl border border-border bg-blue/5 p-4 text-sm text-muted">
        <p><strong>Day {days} of the protest</strong> — Last updated: {todayStr}. This timeline is compiled from verified news reports, ground coverage by independent journalists, and official statements. Sources are listed for each event.</p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <p className="text-muted">Loading timeline data...</p>
        </div>
      ) : (
        <ol className="relative border-l border-border" role="list">
          {events.map((event: any, idx: number) => (
            <li key={event.id} className="mb-10 ml-8">
              <div className="absolute -left-2.5 mt-1.5 h-5 w-5 rounded-full border-4 border-background bg-blue" />
              <div className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-sm">
                <time className="text-sm font-medium text-blue" dateTime={event.date}>
                  {new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </time>
                <h2 className="mt-2 text-xl font-semibold tracking-tight text-primary">{event.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted">{event.description}</p>
                {event.sources && event.sources.length > 0 && (
                  <div className="mt-4 rounded-lg bg-background p-3">
                    <p className="text-xs font-semibold text-muted mb-1.5 uppercase tracking-wider">Sources ({event.sources.length})</p>
                    <ul className="space-y-1 text-xs text-muted">
                      {event.sources.map((s: string, i: number) => (
                        <li key={i} className="before:content-['•'] before:mr-1.5 before:text-blue text-blue/80">{linkify(s)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-10 rounded-xl border border-border bg-surface p-6">
        <h3 className="text-lg font-semibold text-primary">Key Demands of Protesters</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-blue">1.</span>
            <span>Resignation of Union Education Minister <strong>Dharmendra Pradhan</strong> over alleged NEET-UG 2026 paper leak irregularities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-blue">2.</span>
            <span>Unconditional release of activist <strong>Sonam Wangchuk</strong> with no restriction on his movement</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-blue">3.</span>
            <span>INR 1 crore compensation for families of all NEET aspirants who died by suicide following the paper leak</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-blue">4.</span>
            <span>Systemic reform of examination processes to prevent future leaks and ensure transparency</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-blue">5.</span>
            <span>Accountability for the police action on 20 July 2026 — withdrawal of all FIRs against protesters</span>
          </li>
        </ul>
      </div>

      <div className="mt-10">
        <a href="/" className="inline-flex items-center text-sm text-blue hover:underline">&larr; Back to home</a>
      </div>
    </div>
  )
}
