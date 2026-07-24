import type { Metadata } from 'next'
import Link from 'next/link'
import InteractiveStorySubmitModal from '../../components/InteractiveStorySubmitModal'
import StoryCardReaction from '../../components/StoryCardReaction'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Student Stories & Ground Voices',
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
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="wanted-poster rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-red" style={{ fontFamily: 'var(--font-heading)' }}>
              GROUND TESTIMONIALS
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-[#2D2415]" style={{ fontFamily: 'var(--font-heading)' }}>
            STUDENT STORIES &amp; VOICES OF PROTEST
          </h1>
          <p className="mt-3 text-[#4A3F28] text-base leading-relaxed font-medium">
            First-person accounts from students, parents, and droppers at Jantar Mantar. These are raw, verified testimonies of resilience, sacrifice, and the persistent demand for exam integrity.
          </p>
        </div>

        <div className="shrink-0">
          <InteractiveStorySubmitModal />
        </div>
      </div>

      <div className="wanted-poster rounded-2xl p-5 text-xs sm:text-sm text-[#4A3F28] leading-relaxed flex items-start gap-3">
        <span className="text-base shrink-0">📌</span>
        <p className="font-medium">
          <strong className="text-[#2D2415]">Editorial Commitment:</strong> Stories are curated from ground reporting at Jantar Mantar and verified student submissions. Personal identifiers are protected upon request to preserve candidate privacy.
        </p>
      </div>

      {(!stories || stories.length === 0) ? (
        <div className="wanted-poster rounded-3xl p-12 text-center shadow-md">
          <div className="text-4xl mb-3">🗣️</div>
          <h2 className="text-xl font-black text-[#2D2415] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>No Stories Loaded Yet</h2>
          <p className="text-[#4A3F28] max-w-md mx-auto text-sm">Be the first to share your experience from the ground using the submission button above.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {stories.map((story: any) => (
            <article
              key={story.id}
              className="wanted-poster group rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-md bg-[#3D331E] px-3 py-1 text-xs font-black uppercase tracking-wider text-gold" style={{ fontFamily: 'var(--font-heading)' }}>
                  #JANTARMANTAR
                </span>
                <span className="text-xs text-[#8D7B50] font-mono font-bold ml-auto">
                  {story.created_at ? new Date(story.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Verified Dispatch'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black leading-snug text-[#2D2415] group-hover:text-red transition-colors">
                {story.title}
              </h2>

              <div className="mt-4 text-base leading-relaxed text-[#4A3F28] font-medium whitespace-pre-wrap">
                <p>{story.content}</p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-[#8D7B50]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-black text-[#2D2415]">
                  <span className="h-7 w-7 rounded-full bg-red text-white flex items-center justify-center font-black">
                    {(story.author_name || 'A')[0].toUpperCase()}
                  </span>
                  <span>{story.author_name || 'Anonymous Student'}</span>
                </div>

                <StoryCardReaction storyId={story.id.toString()} />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Submission Card fallback */}
      <section className="wanted-poster rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black uppercase text-[#2D2415]" style={{ fontFamily: 'var(--font-heading)' }}>
              HAVE A TESTIMONY TO SHARE?
            </h2>
            <p className="mt-1 text-sm text-[#4A3F28] font-medium">
              Submit your report directly to our editorial team for review.
            </p>
          </div>
          <InteractiveStorySubmitModal />
        </div>
      </section>

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
