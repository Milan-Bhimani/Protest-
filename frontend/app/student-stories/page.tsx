import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Student Stories',
  description: 'First-person accounts from students at the Jantar Mantar protest. Their voices, their experiences, their demands for justice.',
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getStories() {
  try {
    const res = await fetch(`${API}/api/stories`, { cache: 'no-store' })
    return res.ok ? res.json() : []
  } catch {
    return null
  }
}

export default async function StudentStoriesPage() {
  const apiStories = await getStories()
  const stories = apiStories || []

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">Student Stories</h1>
        <p className="mt-2 text-muted">First-person accounts from students at Jantar Mantar. These are their voices — unedited, unfiltered, sourced from ground reports by independent journalists.</p>
      </div>

      <div className="mb-8 rounded-xl border border-border bg-amber-50 p-4 text-sm text-muted">
        <p><strong>Note:</strong> These stories are compiled from verified ground reports by The Hindu, Indian Express, The South First, Media India Group, and Rediff.com. They represent the genuine voices of students at the protest. If you are a student at Jantar Mantar and would like to share your story, please use the submission form below.</p>
      </div>

      {(!stories || stories.length === 0) ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <p className="text-muted">No stories available yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {stories.map((story: any) => (
            <article key={story.id} className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-sm">
              <h2 className="text-xl font-semibold leading-snug text-primary">{story.title}</h2>
              <div className="mt-3 text-base leading-relaxed text-muted">
                <p>{story.content}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <p className="text-xs font-medium text-blue">{story.author_name || 'Anonymous Student'}</p>
                {story.created_at && (
                  <p className="text-xs text-muted">{new Date(story.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="mt-12 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-xl font-semibold text-primary">Share Your Story</h2>
        <p className="mt-2 text-sm text-muted">If you are a student at Jantar Mantar or have been affected by the NEET paper leak, share your story. We review all submissions for authenticity before publishing.</p>
        <form className="mt-6 space-y-4" action={`${API}/api/stories`} method="POST">
          <div>
            <label htmlFor="story-title" className="block text-sm font-medium text-primary">Title</label>
            <input id="story-title" name="title" required className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue" placeholder="A short headline for your story" />
          </div>
          <div>
            <label htmlFor="story-content" className="block text-sm font-medium text-primary">Your Story</label>
            <textarea id="story-content" name="content" required rows={5} className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue" placeholder="Share your experience..." />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="story-name" className="block text-sm font-medium text-primary">Your Name (optional)</label>
              <input id="story-name" name="author_name" className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue" placeholder="Anonymous" />
            </div>
            <div>
              <label htmlFor="story-email" className="block text-sm font-medium text-primary">Email (not published)</label>
              <input id="story-email" name="author_email" type="email" className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text placeholder:text-muted focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue" placeholder="your@email.com" />
            </div>
          </div>
          <button type="submit" className="rounded-lg bg-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue/90">Submit Story</button>
        </form>
      </section>

      <div className="mt-10">
        <a href="/" className="inline-flex items-center text-sm text-blue hover:underline">&larr; Back to home</a>
      </div>
    </div>
  )
}
