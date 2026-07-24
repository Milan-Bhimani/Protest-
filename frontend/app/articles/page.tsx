import type { Metadata } from 'next'
import Link from 'next/link'
import InteractiveArticlesFeed from '../../components/InteractiveArticlesFeed'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'All Dispatches & Wanted Reports',
  description: 'Verified news articles about the NEET-UG 2026 paper leak controversy and Jantar Mantar protests.',
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getArticles() {
  try {
    const res = await fetch(`${API}/api/articles`, { cache: 'no-store' })
    return res.ok ? res.json() : []
  } catch {
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="rounded-3xl border-4 border-gold bg-surface p-8 sm:p-12 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-red" style={{ fontFamily: 'var(--font-heading)' }}>
            DOCUMENTED COVERAGE
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
          WANTED DISPATCHES &amp; EVIDENCE
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
          Verified investigative reports, government briefings, and ground testimonies. Every entry targets institutional accountability for 2.3 Million medical aspirants.
        </p>
      </div>

      <InteractiveArticlesFeed articles={articles} />

      <div className="pt-6 border-t border-border flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-red hover:underline"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          &larr; BACK TO HOME
        </Link>
      </div>
    </div>
  )
}
