import type { Metadata } from 'next'
import Link from 'next/link'
import { linkify } from '../../lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Public & Legal Reactions',
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
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="wanted-poster rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-red" style={{ fontFamily: 'var(--font-heading)' }}>
            VERIFIED STATEMENTS LOG
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-[#2D2415]" style={{ fontFamily: 'var(--font-heading)' }}>
          PUBLIC &amp; LEGAL REACTIONS
        </h1>
        <p className="mt-3 text-[#4A3F28] text-base sm:text-lg max-w-3xl leading-relaxed font-medium">
          Verified statements from parliamentarians, legal advocates, medical associations, and public figures regarding the NEET paper leak controversy and Jantar Mantar protests.
        </p>
      </div>

      {(!reactions || reactions.length === 0) ? (
        <div className="wanted-poster rounded-3xl p-12 text-center shadow-md">
          <div className="text-4xl mb-3">⚖️</div>
          <h2 className="text-xl font-black text-[#2D2415] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>No Verified Reactions Loaded</h2>
          <p className="text-[#4A3F28] text-sm">Fetching legal &amp; public statements from archive.</p>
        </div>
      ) : (
        <div className="wanted-poster rounded-3xl overflow-hidden p-6 sm:p-8 shadow-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b-4 border-[#8D7B50] bg-[#3D331E] text-gold">
                  <th scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>PUBLIC FIGURE / LEGAL REP</th>
                  <th scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>CATEGORY</th>
                  <th scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>VERIFIED STATEMENT</th>
                  <th scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>DATE</th>
                  <th scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>CITATIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#8D7B50]/30">
                {reactions.map((r: any) => (
                  <tr key={r.id} className="hover:bg-[#F5E6C4]/60 transition-colors">
                    <td className="px-5 py-4 font-black text-[#2D2415] text-base">{r.person_name}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-md bg-[#3D331E] px-3 py-1 text-xs font-black uppercase text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
                        {r.category || 'STATEMENTS'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[#4A3F28] max-w-md font-medium leading-relaxed">{r.statement_summary}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-[#8D7B50] font-mono font-bold text-xs">
                      {new Date(r.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      {r.original_source ? (
                        <span className="text-xs font-bold text-red break-all">{linkify(r.original_source)}</span>
                      ) : (
                        <span className="italic text-[#8D7B50] text-xs">Official Record</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="wanted-poster rounded-2xl p-5 text-xs text-[#4A3F28] font-medium leading-relaxed">
        <p><strong>Editorial Sourcing:</strong> All statements are verified from parliamentary transcripts, official press conferences, court exhibit filings, and verified social media handles.</p>
      </div>

      <div className="pt-6 border-t border-[#8D7B50]/40">
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
