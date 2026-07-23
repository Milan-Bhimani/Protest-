import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getArticles() {
  try {
    const res = await fetch(`${API}/api/articles`, { cache: 'no-store' })
    return res.ok ? await res.json() : []
  } catch {
    return []
  }
}

async function getStats() {
  try {
    const res = await fetch(`${API}/api/statistics`, { cache: 'no-store' })
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
}

async function getDocuments() {
  try {
    const res = await fetch(`${API}/api/documents`, { cache: 'no-store' })
    return res.ok ? await res.json() : []
  } catch {
    return []
  }
}

export default async function Home() {
  const [articles, stats, documents] = await Promise.all([getArticles(), getStats(), getDocuments()])
  const featured = articles?.[0]
  const latest = articles?.slice(1, 4) || []

  return (
    <div>
      <section className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-red" style={{ fontFamily: 'var(--font-heading)' }}>THE FIGHT FOR FREEDOM</p>
        <h1 className="text-4xl font-bold uppercase tracking-wide text-primary sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-heading)' }}>
          The NEET Paper Leak &amp; Jantar Mantar Protests
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          An independent, non-partisan information platform documenting the NEET-UG 2026 paper leak controversy, the student-led protests at Jantar Mantar, and the broader calls for accountability in India&apos;s examination system. We stand with students seeking transparency and justice.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/timeline" className="inline-flex items-center rounded-lg bg-red px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red/90" style={{ fontFamily: 'var(--font-heading)' }}>
            View Timeline
          </a>
          <a href="/documents" className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:bg-background hover:text-red" style={{ fontFamily: 'var(--font-heading)' }}>
            BROWSE DOCUMENTS
          </a>
          <a href="/student-stories" className="inline-flex items-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:bg-background hover:text-red" style={{ fontFamily: 'var(--font-heading)' }}>
            STUDENT VOICES
          </a>
        </div>
      </section>

      {stats && (
        <section className="mt-12" aria-label="Platform and Examination statistics">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-red" style={{ fontFamily: 'var(--font-heading)' }}>KEY CONTROVERSY &amp; PROTEST METRICS</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Aspirants Affected" value={stats.total_candidates || "23.3 Lakhs"} />
            <StatCard label="Perfect Scores (720)" value={stats.perfect_scores || 67} />
            <StatCard label="Re-Test Candidates" value={stats.retest_candidates || 1563} />
            <StatCard label="CBI Arrests Made" value={stats.cbi_arrests || 13} />
            <StatCard label="Days of Protest" value={`${stats.days_of_protest} Days`} />
            <StatCard label="Verified Coverage" value={stats.total_articles} />
          </div>
        </section>
      )}

      {featured && (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>FEATURED ANALYSIS</h2>
            <a href="/articles" className="text-sm font-semibold uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>VIEW ALL &rarr;</a>
          </div>
          <div className="group rounded-2xl border border-border bg-surface overflow-hidden transition-all hover:border-red hover:shadow-sm">
            {featured.image_url && (
              <Link href={`/articles/${featured.id}`} className="aspect-video w-full overflow-hidden bg-background block">
                <img src={featured.image_url} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </Link>
            )}
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red" style={{ fontFamily: 'var(--font-heading)' }}>
                  {featured.type?.replace(/_/g, ' ')}
                </span>
                {featured.category && (
                  <span className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium text-muted">
                    {featured.category}
                  </span>
                )}
              </div>
              <Link href={`/articles/${featured.id}`} className="text-2xl font-bold text-primary transition-colors hover:text-red block">{featured.title}</Link>
              <p className="mt-3 text-base leading-relaxed text-muted">{featured.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                {featured.published_at && (
                  <p className="text-xs text-muted">
                    Published {new Date(featured.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
                <Link href={`/articles/${featured.id}`} className="text-xs font-semibold uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>
                  READ MORE &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {latest.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>LATEST UPDATES</h2>
            <a href="/articles" className="text-sm font-semibold uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>VIEW ALL &rarr;</a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {latest.map((item: any) => (
              <div key={item.id} className="group rounded-xl border border-border bg-surface overflow-hidden transition-all hover:border-red hover:shadow-sm">
                {item.image_url && (
                  <Link href={`/articles/${item.id}`} className="aspect-video w-full overflow-hidden bg-background block">
                    <img src={item.image_url} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  </Link>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-red/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-red" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.type?.replace(/_/g, ' ')}
                    </span>
                    {item.category && (
                      <span className="text-xs text-muted">{item.category}</span>
                    )}
                  </div>
                  <Link href={`/articles/${item.id}`} className="text-base font-bold leading-snug text-primary transition-colors hover:text-red block">{item.title}</Link>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{item.summary}</p>
                  <div className="mt-3 flex items-center justify-between">
                    {item.published_at && (
                      <span className="text-xs text-muted">
                        {new Date(item.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    <Link href={`/articles/${item.id}`} className="text-xs font-semibold uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>
                      READ MORE &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>QUICK LINKS</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/timeline" className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-red hover:shadow-sm">
            <h3 className="text-lg font-bold text-primary group-hover:text-red transition-colors">TIMELINE OF EVENTS</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Day-by-day chronology of the NEET paper leak controversy and the Jantar Mantar protests.</p>
          </a>
          <a href="/documents" className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-red hover:shadow-sm">
            <h3 className="text-lg font-bold text-primary group-hover:text-red transition-colors">OFFICIAL DOCUMENTS</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Verified reports, government orders, court filings, and official statements.</p>
          </a>
          <a href="/public-reactions" className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-red hover:shadow-sm">
            <h3 className="text-lg font-bold text-primary group-hover:text-red transition-colors">PUBLIC REACTIONS</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Verified statements from public figures, political leaders, and organizations.</p>
          </a>
          <a href="/student-stories" className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-red hover:shadow-sm">
            <h3 className="text-lg font-bold text-primary group-hover:text-red transition-colors">STUDENT STORIES</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">First-person accounts from students at Jantar Mantar — their voices, their demands.</p>
          </a>
          <a href="/faq" className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-red hover:shadow-sm">
            <h3 className="text-lg font-bold text-primary group-hover:text-red transition-colors">FAQ</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Answers to common questions about the NEET paper leak and the protest movement.</p>
          </a>
          <a href="/about" className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-red hover:shadow-sm">
            <h3 className="text-lg font-bold text-primary group-hover:text-red transition-colors">ABOUT THIS PLATFORM</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Our mission, methodology, and commitment to verified information.</p>
          </a>
        </div>
      </section>

      {articles.filter((a: any) => a.image_url).length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold uppercase tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>LIVE FROM THE GROUND</h2>
            <a href="/articles" className="text-sm font-semibold uppercase tracking-wider text-red hover:underline" style={{ fontFamily: 'var(--font-heading)' }}>VIEW ALL &rarr;</a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {articles.filter((a: any) => a.image_url).slice(0, 8).map((article: any) => (
              <div key={article.id} className="group relative aspect-video rounded-lg overflow-hidden border border-border bg-background">
                <img src={article.image_url} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-xs text-white font-medium line-clamp-2">{article.category || 'Coverage'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 rounded-2xl border border-border bg-surface p-8 sm:p-12">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-primary" style={{ fontFamily: 'var(--font-heading)' }}>STAY INFORMED</h2>
        <p className="mt-2 text-sm text-muted">Subscribe to receive verified updates about the NEET protest and examination reforms directly in your inbox.</p>
        <form className="mt-6 flex max-w-md gap-3" action={`${API}/api/newsletter`} method="POST">
          <label htmlFor="email-input" className="sr-only">Email address</label>
          <input
            id="email-input"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
          />
          <button type="submit" className="rounded-lg bg-red px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red/90" style={{ fontFamily: 'var(--font-heading)' }}>
            Subscribe
          </button>
        </form>
      </section>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-sm">
      <div className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-muted font-medium">{label}</div>
    </div>
  )
}
