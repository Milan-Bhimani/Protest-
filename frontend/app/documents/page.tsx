import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Verified Official Documents',
  description: 'Verified official documents, reports, government orders, court filings, and statements regarding the NEET-UG 2026 paper leak and Jantar Mantar protests.',
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getDocuments() {
  try {
    const res = await fetch(`${API}/api/documents`, { cache: 'no-store' })
    return res.ok ? res.json() : []
  } catch {
    return []
  }
}

export default async function DocumentsPage() {
  const documents = await getDocuments()

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="wanted-poster rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-red" style={{ fontFamily: 'var(--font-heading)' }}>
            PRIMARY EXHIBIT ARCHIVE
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-[#2D2415]" style={{ fontFamily: 'var(--font-heading)' }}>
          OFFICIAL DOCUMENTS &amp; COURT EXHIBITS
        </h1>
        <p className="mt-3 text-[#4A3F28] text-base sm:text-lg max-w-3xl leading-relaxed font-medium">
          Verified government notifications, Supreme Court filings, NTA official releases, and CBI chargesheet extracts related to the NEET-UG 2026 investigation.
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="wanted-poster rounded-3xl p-12 text-center shadow-md">
          <div className="text-4xl mb-3">📜</div>
          <h2 className="text-xl font-black text-[#2D2415] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>No Documents Loaded Yet</h2>
          <p className="text-[#4A3F28] text-sm font-medium">Verified document filings will appear here as court proceedings advance.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {documents.map((doc: any) => (
            <div key={doc.id} className="wanted-poster group rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3D331E] border-2 border-gold text-gold font-black text-xl shadow-md">
                  📜
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {doc.file_type && (
                      <span className="rounded-md bg-red px-3 py-0.5 text-xs font-black text-white uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                        {doc.file_type}
                      </span>
                    )}
                    {doc.published_at && (
                      <span className="text-xs text-[#8D7B50] font-mono font-bold">
                        {new Date(doc.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-[#2D2415] group-hover:text-red transition-colors">{doc.title}</h2>
                  
                  {doc.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[#4A3F28] font-medium">{doc.description}</p>
                  )}

                  {doc.file_url && (
                    <div className="mt-5 pt-3 border-t-2 border-[#8D7B50]/40 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#8D7B50]">PRIMARY COURT FILING</span>
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#3D331E] px-4 py-2 text-xs font-black uppercase tracking-wider text-gold hover:bg-red hover:text-white transition-colors shadow-sm"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        <span>VIEW DOCUMENT EXHIBIT</span>
                        <span>&rarr;</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-6 border-t-2 border-[#8D7B50]/40">
        <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>
          &larr; BACK TO HOME
        </Link>
      </div>
    </div>
  )
}
