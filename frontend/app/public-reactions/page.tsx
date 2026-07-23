import type { Metadata } from 'next'
import { linkify } from '../../lib/utils'

export const metadata: Metadata = {
  title: 'Public Reactions',
  description: 'Verified statements from public figures, political leaders, and organizations regarding the NEET paper leak and Jantar Mantar protests.',
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getPublicReactions() {
  try {
    const res = await fetch(`${API}/api/public-reactions`, { cache: 'no-store' })
    return res.ok ? res.json() : []
  } catch {
    return []
  }
}

export default async function PublicReactionsPage() {
  const reactions = await getPublicReactions()

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Public Reactions</h1>
        <p className="mt-2 text-muted">Verified statements from public figures, political leaders, activists, and organizations regarding the NEET paper leak and Jantar Mantar protests. Sources cited for every entry.</p>
      </div>

      {(!reactions || reactions.length === 0) ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <p className="text-muted">No verified public reactions yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Person</th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Category</th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Statement</th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Date</th>
                  <th scope="col" className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted">Source</th>
                </tr>
              </thead>
              <tbody>
                {reactions.map((r: any) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-background/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-primary">{r.person_name}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted">
                        {r.category || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-primary max-w-md">{r.statement_summary}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted">
                      {new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      {r.original_source ? (
                        <span className="text-xs text-muted break-all">{linkify(r.original_source)}</span>
                      ) : (
                        <span className="italic text-muted">Not specified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
        <p><strong>Methodology:</strong> All statements are sourced from verified news reports, official social media accounts, parliamentary proceedings, and press conferences. Where direct quotes are unavailable, statements are summarized from verified sources.</p>
      </div>

      <div className="mt-10">
        <a href="/" className="inline-flex items-center text-sm text-blue hover:underline">&larr; Back to home</a>
      </div>
    </div>
  )
}
