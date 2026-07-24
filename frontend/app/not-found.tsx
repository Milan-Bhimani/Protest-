import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="rounded-full bg-red/10 px-4 py-1.5 text-xs font-bold text-red uppercase tracking-widest mb-4">
        404 — Page Not Found
      </div>
      <h1 className="text-4xl font-bold uppercase text-primary sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
        Democracy Demands Truth
      </h1>
      <p className="mt-4 max-w-md text-muted text-base">
        The page or article you are looking for could not be found or has been relocated.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red/90"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Return Home
        </Link>
        <Link
          href="/articles"
          className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-bold uppercase tracking-wider text-text transition-colors hover:bg-background hover:text-red"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          View Articles
        </Link>
      </div>
    </div>
  )
}
