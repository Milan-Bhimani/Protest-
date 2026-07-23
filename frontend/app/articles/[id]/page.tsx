import type { Metadata } from 'next'
import Link from 'next/link'
import { linkify } from '../../../lib/utils'
import LuffySidePointerBadge from '../../../components/LuffySidePointerBadge'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getArticle(id: string) {
  const numericId = parseInt(id, 10)
  if (isNaN(numericId)) return null
  try {
    const res = await fetch(`${API}/api/articles/${numericId}/sources`, {
      cache: 'no-store',
    })
    return res.ok ? res.json() : null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params
  const data = await getArticle(id)
  const article = data?.article
  return {
    title: article?.title || 'Article Not Found',
    description: article?.summary || 'The requested article could not be found.',
  }
}

/** Split raw content into structured blocks: H2 headings and paragraphs */
function parseContent(raw: string): Array<{ type: 'heading' | 'para'; text: string }> {
  const blocks: Array<{ type: 'heading' | 'para'; text: string }> = []
  const lines = raw.split(/\n{2,}|\n/).map((l) => l.trim()).filter(Boolean)

  for (const line of lines) {
    if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', text: line.replace(/^## /, '') })
    } else if (line.length < 80 && line === line.toUpperCase() && line.length > 5) {
      blocks.push({ type: 'heading', text: line })
    } else {
      blocks.push({ type: 'para', text: line })
    }
  }
  return blocks
}

/** Estimate reading time in minutes */
function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const data = await getArticle(id)

  if (!data?.article) {
    return (
      <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-surface p-12 text-center shadow-sm">
        <div className="text-5xl mb-4 leading-none">❓</div>
        <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
          Article Not Found
        </h1>
        <p className="mt-3 text-muted max-w-sm mx-auto text-sm">
          This article does not exist or could not be loaded. It may have been removed or the server is offline.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-red px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red/90"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ← Back to Home
          </Link>
          <Link
            href="/articles"
            className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:border-red hover:text-red"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            All Articles
          </Link>
        </div>
      </div>
    )
  }

  const { article, sources } = data
  const blocks = article.content ? parseContent(article.content) : []
  const mins = article.content ? readingTime(article.content) : null

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
        <Link href="/" className="hover:text-red transition-colors">Home</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-red transition-colors">Articles</Link>
        <span>/</span>
        <span className="text-primary truncate max-w-[240px]">{article.title}</span>
      </nav>

      <article>
        {/* Category badges & Luffy Pointer Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center rounded-full bg-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {article.type?.replace(/_/g, ' ')}
            </span>
            {article.category && (
              <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted border border-border">
                {article.category}
              </span>
            )}
            {article.perspective && article.perspective !== 'neutral' && (
              <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted border border-border">
                Perspective: {article.perspective}
              </span>
            )}
          </div>
          <LuffySidePointerBadge label="Luffy Points To Truth" />
        </div>

        {/* Title */}
        <h1
          className="text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {article.title}
        </h1>

        {/* Subtitle / Summary Callout */}
        {article.summary && (
          <div className="mt-6 rounded-r-xl border-l-4 border-red bg-surface/70 p-5 shadow-sm">
            <p className="text-base sm:text-lg leading-relaxed text-text italic">
              {article.summary}
            </p>
          </div>
        )}

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-muted pb-6 border-b border-border">
          {article.published_at && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
              </svg>
              {new Date(article.published_at).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {mins && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {mins} min read
            </span>
          )}
          {article.updated_at && article.updated_at !== article.published_at && (
            <span className="bg-surface rounded px-2.5 py-0.5 border border-border">
              Updated {new Date(article.updated_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* Hero image */}
        {article.image_url && (
          <div className="mt-8 rounded-2xl overflow-hidden bg-background aspect-video shadow-sm border border-border">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Article Body with .prose-content */}
        {blocks.length > 0 ? (
          <div className="mt-8 prose-content">
            {blocks.map((block, i) =>
              block.type === 'heading' ? (
                <h2 key={i}>{block.text}</h2>
              ) : (
                <p key={i}>{linkify(block.text)}</p>
              )
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-border bg-surface p-6 text-center text-muted text-sm shadow-sm">
            Full article content is available at the original source listed below.
          </div>
        )}

        {/* Original Source link */}
        {article.slug && article.slug.startsWith('http') && (
          <div className="mt-10 rounded-xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-red mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              Original Publication Source
            </p>
            <p className="text-sm text-text leading-relaxed">
              {article.category && <span className="font-semibold">{article.category}: </span>}
              <a
                href={article.slug}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue hover:underline break-all"
              >
                {article.slug}
              </a>
            </p>
          </div>
        )}
      </article>

      {/* Sources Section */}
      {sources && sources.length > 0 && (
        <section className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <h2
            className="text-lg font-bold uppercase tracking-wider text-primary border-b border-border pb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Verified Reference Sources ({sources.length})
          </h2>
          <ul className="mt-4 space-y-3">
            {sources.map((s: any) => (
              <li key={s.id} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-red flex-shrink-0" />
                <div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-blue hover:underline"
                  >
                    {s.title || s.url}
                  </a>
                  {s.citation && (
                    <p className="text-xs text-muted mt-0.5">{s.citation}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Editorial Note */}
      <div className="mt-8 rounded-xl border border-border bg-surface/60 p-5 text-xs text-muted leading-relaxed">
        <strong className="text-primary font-semibold">Editorial Policy &amp; Neutrality Notice:</strong> Straw Hat Press documents reporting from mainstream news outlets regarding the NEET-UG examination controversy and Jantar Mantar student demonstrations. All material is cross-referenced for factual accuracy.
      </div>

      {/* Navigation Footer */}
      <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red hover:underline"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          ← Home
        </Link>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red hover:underline"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          All Articles →
        </Link>
      </div>
    </div>
  )
}

