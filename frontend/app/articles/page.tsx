import type { Metadata } from 'next'
import Link from 'next/link'

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-red"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-red" style={{ fontFamily: 'var(--font-heading)' }}>DOCUMENTED COVERAGE</span>
        </div>
        <h1 className="text-3xl font-bold uppercase tracking-wide text-primary sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
          NEWS TIMELINE & ARTICLES
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          Verified news and in-depth analysis gathered from major Indian news outlets, displayed chronologically with full context and source citations.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-12 text-center shadow-sm">
          <div className="text-4xl mb-3">📰</div>
          <h2 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>No Articles Loaded</h2>
          <p className="text-muted max-w-md mx-auto text-sm">No news articles found in the database. Run the backend crawler or verify the API endpoint.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {articles.map((article: any) => {
            const articleUrl = `/articles/${article.id}`
            const excerpt = article.summary || (article.content ? article.content.slice(0, 240) + '...' : '')

            return (
              <article
                key={article.id}
                className="group rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-200 hover:border-red hover:shadow-md flex flex-col md:flex-row"
              >
                {article.image_url && (
                  <Link href={articleUrl} className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden bg-background relative block">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                )}
                <div className={`p-6 sm:p-8 flex flex-col justify-between flex-1 ${!article.image_url ? 'w-full' : ''}`}>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center rounded-full bg-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red" style={{ fontFamily: 'var(--font-heading)' }}>
                        {article.type?.replace(/_/g, ' ')}
                      </span>
                      {article.category && (
                        <span className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted border border-border">
                          {article.category}
                        </span>
                      )}
                      {article.published_at && (
                        <span className="text-xs text-muted ml-auto">
                          {new Date(article.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-red transition-colors leading-tight">
                      <Link href={articleUrl}>{article.title}</Link>
                    </h2>

                    {excerpt && (
                      <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                        {excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted font-medium">
                      {article.category ? `Source: ${article.category}` : 'Verified Report'}
                    </span>
                    <Link
                      href={articleUrl}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red hover:translate-x-0.5 transition-transform"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      READ FULL ARTICLE &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}

      <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-red hover:underline"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          &larr; BACK TO HOME
        </Link>
      </div>
    </div>
  )
}

