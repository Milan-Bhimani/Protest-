import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Documents',
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
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-primary sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>OFFICIAL DOCUMENTS</h1>
        <p className="mt-2 text-muted">Verified official documents including government orders, court filings, public notices, and verified reports related to the NEET-UG 2026 paper leak and Jantar Mantar protests.</p>
      </div>

      {documents.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <p className="text-muted">No documents available yet. Documents will appear here once added through the backend.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {documents.map((doc: any) => (
            <div key={doc.id} className="rounded-xl border border-border bg-surface p-6 transition-all hover:border-red hover:shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red/10">
                  <svg className="h-6 w-6 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-primary">{doc.title}</h2>
                  {doc.description && (
                    <p className="mt-1 text-sm leading-relaxed text-muted">{doc.description}</p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                    {doc.file_type && (
                      <span className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 font-medium uppercase tracking-wider">
                        {doc.file_type}
                      </span>
                    )}
                    {doc.published_at && (
                      <span>
                        {new Date(doc.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  {doc.file_url && (
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-red hover:underline"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      View Document
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>&larr; BACK TO HOME</Link>
      </div>
    </div>
  )
}
