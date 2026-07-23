import type { Metadata } from 'next'
import Link from 'next/link'
import { linkify } from '../../lib/utils'

export const metadata: Metadata = {
  title: 'All Articles',
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
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-primary sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>NEWS TIMELINE</h1>
        <p className="mt-2 text-muted">Verified news and analysis gathered from major Indian news sources, displayed in chronological order. Every article links to its original source.</p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <p className="text-muted">No articles yet. Run the data update script to fetch from RSS feeds.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {articles.map((article: any, idx: number) => (
            <article key={article.id} className="rounded-xl border border-border bg-surface overflow-hidden transition-all hover:border-red hover:shadow-sm">
              {article.image_url && (
                <div className="aspect-video w-full overflow-hidden bg-background">
                  <img src={article.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full bg-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red" style={{ fontFamily: 'var(--font-heading)' }}>
                    {article.type?.replace(/_/g, ' ')}
                  </span>
                  {article.category && (
                    <span className="text-xs text-muted">{article.category}</span>
                  )}
                  {article.published_at && (
                    <span className="text-xs text-muted ml-2">
                      {new Date(article.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-primary">{article.title}</h2>
                <p className="mt-1 text-sm text-muted italic">{article.summary}</p>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-text">
                  {article.content ? (
                    article.content.split('\n').filter((p: string) => p.trim()).map((p: string, i: number) => (
                      <p key={i}>{linkify(p)}</p>
                    ))
                  ) : (
                    <p>{article.summary}</p>
                  )}
                </div>
                {article.slug && (
                  <div className="mt-6 border-t border-border pt-3 rounded-lg bg-background p-3">
                    <p className="text-xs font-semibold text-muted mb-1 uppercase tracking-wider">Source</p>
                    <p className="text-xs text-muted">
                      This article is compiled from reporting by <span className="font-medium">{article.category || 'news sources'}</span>.
                      {' '}Original report:{' '}
                      <a href={article.slug} target="_blank" rel="noreferrer" className="text-blue hover:underline break-all">
                        {article.slug}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>&larr; BACK TO HOME</Link>
      </div>
    </div>
  )
}
