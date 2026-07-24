import Link from 'next/link'
import SolidarityCounter from '../components/SolidarityCounter'
import ProtestDemandsTracker from '../components/ProtestDemandsTracker'
import LogPoseNavigator from '../components/LogPoseNavigator'
import OnePieceBountyCard from '../components/OnePieceBountyCard'

export const dynamic = 'force-dynamic'

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

export default async function Home() {
  const [articles, stats] = await Promise.all([getArticles(), getStats()])
  const bountyArticles = articles?.slice(0, 8) || []

  return (
    <div className="space-y-16 text-center">
      {/* Gen-Z & One Piece Bounty Poster Hero Section */}
      <section className="wanted-poster relative rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl text-center flex flex-col items-center justify-center">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-gold/30 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4 text-center">
            <span className="inline-flex items-center justify-center text-center gap-1.5 rounded-full bg-red px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md" style={{ fontFamily: 'var(--font-heading)' }}>
              <span>🏴‍☠️</span> STRAW HAT PRESS • FREEDOM HQ
            </span>
            <span className="inline-flex items-center justify-center text-center rounded-full border-2 border-[#8D7B50] bg-[#3D331E] px-3.5 py-1 text-xs font-black text-gold uppercase tracking-wider shadow-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              ⚡ GEAR 5 DEMANDS FOR EXAM INTEGRITY
            </span>
          </div>

          <h1 className="text-4xl font-black uppercase tracking-tight text-[#2D2415] sm:text-6xl lg:text-7xl leading-[0.95] text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            TRUTH, MERIT &amp; <span className="text-red underline decoration-gold underline-offset-8">THE WILL OF D.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg sm:text-xl leading-relaxed text-[#4A3F28] font-medium text-center mx-auto">
            The world&apos;s premier student-driven, non-partisan press platform documenting the NEET-UG paper leak controversy. Standing firm like the Straw Hat Pirates against exam corruption, unverified rumors, and institutional negligence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4 text-center">
            <a
              href="/timeline"
              className="inline-flex items-center justify-center text-center gap-2 rounded-2xl bg-red px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-red/90 shadow-xl hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>🧭</span>
              <span>LOG POSE TIMELINE</span>
            </a>
            <a
              href="/student-stories"
              className="inline-flex items-center justify-center text-center gap-2 rounded-2xl border-2 border-[#3D331E] bg-[#3D331E] px-6 py-3.5 text-sm font-black uppercase tracking-wider text-gold transition-all hover:bg-[#3D331E]/90 shadow-xl hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>🗣️</span>
              <span>STUDENT VOICES</span>
            </a>
            <a
              href="/documents"
              className="inline-flex items-center justify-center text-center gap-2 rounded-2xl border-2 border-[#8D7B50] bg-surface px-6 py-3.5 text-sm font-black uppercase tracking-wider text-[#2D2415] transition-all hover:border-red hover:text-red hover:-translate-y-0.5 shadow-md"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>📜</span>
              <span>WANTED EVIDENCE</span>
            </a>
          </div>
        </div>
      </section>

      {/* Log Pose Navigation Bar */}
      <LogPoseNavigator />

      {/* Key Metrics Grid */}
      {stats && (
        <section aria-label="Platform and Examination statistics" className="text-center">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-red flex items-center justify-center gap-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
              GRAND LINE CONTROVERSY METRICS
            </h2>
            <span className="text-xs text-[#8D7B50] font-mono font-bold mt-1 text-center">VERIFIED LOGS</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Aspirants Affected" value={stats.total_candidates || "23.3 Lakhs"} tag="Aspirants" />
            <StatCard label="Perfect Scores (720)" value={stats.perfect_scores || 67} tag="Anomaly" />
            <StatCard label="Re-Test Candidates" value={stats.retest_candidates || 1563} tag="NTA Order" />
            <StatCard label="CBI Arrests Made" value={stats.cbi_arrests || 13} tag="Patna Module" />
            <StatCard label="Days of Protest" value={`${stats.days_of_protest || 49} Days`} tag="Jantar Mantar" />
            <StatCard label="Verified Reports" value={stats.total_articles || 106} tag="Press Log" />
          </div>
        </section>
      )}

      {/* Interactive Solidarity Counter */}
      <SolidarityCounter />

      {/* Interactive Student 5-Point Demands Manifesto */}
      <ProtestDemandsTracker />

      {/* 2 Lines of 4 Small Wanted Posters Grid (8 Posters Total) */}
      {bountyArticles.length > 0 && (
        <section className="text-center">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-[#8D7B50] pb-4 text-center">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-red text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                  PRIMARY SOURCES &amp; DISPATCHES
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#2D2415] text-center sm:text-left" style={{ fontFamily: 'var(--font-heading)' }}>
                VERIFIED INVESTIGATIONS &amp; REPORTS
              </h2>
            </div>
            <a href="/articles" className="inline-flex items-center justify-center text-center text-xs font-black uppercase tracking-wider text-red hover:underline gap-1" style={{ fontFamily: 'var(--font-heading)' }}>
              VIEW ALL DISPATCHES &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bountyArticles.map((item: any, idx: number) => (
              <OnePieceBountyCard
                key={item.id}
                id={item.id.toString()}
                title={item.title}
                summary={item.summary}
                content={item.content}
                category={item.category || 'GROUND REPORT'}
                type={item.type || 'NEWS'}
                imageUrl={item.image_url}
                publishedAt={item.published_at}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick Navigation Cards - Wanted Poster Style */}
      <section className="text-center">
        <h2 className="mb-6 text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#2D2415] border-b-4 border-[#8D7B50] pb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          PLATFORM MODULES
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickCard title="CHRONOLOGICAL TIMELINE" desc="Day-by-day sequence of events from exam day to Supreme Court hearings." href="/timeline" badge="TIMELINE" />
          <QuickCard title="VERIFIED DOCUMENTS" desc="Court petitions, NTA press releases, CBI chargesheet extracts, and official notices." href="/documents" badge="EVIDENCE" />
          <QuickCard title="PUBLIC & LEGAL REACTIONS" desc="Official statements from legal advocates, parliamentarians, and medical associations." href="/public-reactions" badge="STATEMENTS" />
          <QuickCard title="STUDENT TESTIMONIES" desc="Unfiltered first-person accounts and experiences from protest attendees." href="/student-stories" badge="GROUND VOICES" />
          <QuickCard title="EXAM FAQ & LEGAL RIGHTS" desc="Clear answers to candidate queries regarding re-exams, counseling, and legal options." href="/faq" badge="EXPLAINER" />
          <QuickCard title="EDITORIAL METHODOLOGY" desc="Our commitment to 100% non-partisan verification and primary sourcing." href="/about" badge="MISSION" />
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value, tag }: { label: string; value: number | string; tag: string }) {
  return (
    <div className="wanted-poster rounded-2xl p-5 transition-all hover:border-gold hover:shadow-lg flex flex-col items-center justify-center text-center">
      <span className="text-[10px] font-black uppercase tracking-wider text-red mb-1 font-mono text-center">{tag}</span>
      <div className="text-2xl font-black tracking-tight text-[#2D2415] sm:text-3xl font-mono text-center">{value}</div>
      <div className="mt-2 text-xs text-[#4A3F28] font-bold leading-tight text-center">{label}</div>
    </div>
  )
}

function QuickCard({ title, desc, href, badge }: { title: string; desc: string; href: string; badge: string }) {
  return (
    <a href={href} className="wanted-poster group rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col items-center justify-between text-center">
      <div className="flex flex-col items-center justify-center text-center w-full">
        <span className="inline-block rounded-md bg-[#3D331E] border border-gold px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-gold mb-3 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          {badge}
        </span>
        <h3 className="text-base font-black text-[#2D2415] group-hover:text-red transition-colors leading-snug text-center">
          {title}
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#4A3F28] font-medium text-center">
          {desc}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-[#8D7B50]/40 text-xs font-black uppercase tracking-wider text-red group-hover:translate-x-1 transition-transform flex items-center justify-center gap-2 w-full text-center" style={{ fontFamily: 'var(--font-heading)' }}>
        <span>EXPLORE MODULE</span>
        <span>&rarr;</span>
      </div>
    </a>
  )
}
