'use client'

import { useState, useEffect } from 'react'

interface Demand {
  id: string
  number: string
  title: string
  status: 'Under Judicial Review' | 'Demanded' | 'Active Legislation' | 'Partially Met'
  statusColor: string
  summary: string
  details: string
  initialEndorsements: number
}

const demandsData: Demand[] = [
  {
    id: 'demand-1',
    number: '01',
    title: 'Complete Re-Examination for Affected Exam Centers & Batches',
    status: 'Under Judicial Review',
    statusColor: 'bg-amber-100 text-amber-900 border-amber-400',
    summary: 'A fair, standardized re-test for all candidates affected by compromise or paper leaks prior to counseling.',
    details: 'Students at Jantar Mantar argue that grace marks and localized re-tests fail to account for widespread digital distribution of leaks prior to the May 5 exam. A unified re-test supervised by an independent board is requested.',
    initialEndorsements: 98420,
  },
  {
    id: 'demand-2',
    number: '02',
    title: 'Independent Judicial Audit & Restructuring of NTA',
    status: 'Demanded',
    statusColor: 'bg-red/10 text-red border-red/30',
    summary: 'Dissolution or complete structural reform of NTA with oversight from a retired Supreme Court judge.',
    details: 'The systemic failure in exam administration, reliance on third-party test centers, and lack of transparency in grace mark allocation require a root-cause overhaul of NTA leadership and vendor selection procedures.',
    initialEndorsements: 87150,
  },
  {
    id: 'demand-3',
    number: '03',
    title: 'Enforcement of Public Examinations (Prevention of Unfair Means) Act',
    status: 'Active Legislation',
    statusColor: 'bg-emerald-100 text-emerald-900 border-emerald-400',
    summary: 'Strict criminal penalties, non-bailable arrest, and asset seizure for paper-leak syndicates.',
    details: 'Although the Public Examinations Act 2024 was notified in June 2026, students demand retroactive rigorous prosecution of organized solver gangs in Bihar, Gujarat, and Haryana under fast-track special courts.',
    initialEndorsements: 104300,
  },
  {
    id: 'demand-4',
    number: '04',
    title: '100% OMR Sheet & Center-wise Marks Transparency',
    status: 'Partially Met',
    statusColor: 'bg-blue/10 text-blue border-blue/30',
    summary: 'Public release of anonymized center-by-center rank distributions to detect localized score inflation.',
    details: 'Following Supreme Court directives, center-wise marks were published. Students now demand standard deviation anomaly detectors to automatically flag centers with unnatural clusters of 700+ scores.',
    initialEndorsements: 76900,
  },
  {
    id: 'demand-5',
    number: '05',
    title: 'Financial Refund & Aspirant Compensation Cell',
    status: 'Demanded',
    statusColor: 'bg-red/10 text-red border-red/30',
    summary: 'Waiver of re-exam fees, travel subsidies for protest attendees, and dedicated mental health helplines.',
    details: 'Millions of student families spent years of savings on coaching and travel. The platform demands a dedicated relief fund financed by fines collected from compromised examination vendors.',
    initialEndorsements: 91200,
  },
]

export default function ProtestDemandsTracker() {
  const [expandedId, setExpandedId] = useState<string | null>('demand-1')
  const [endorsements, setEndorsements] = useState<Record<string, number>>({})
  const [userEndorsed, setUserEndorsed] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const savedEndorsements = localStorage.getItem('sh_demand_endorsements')
    const savedUserStatus = localStorage.getItem('sh_user_endorsed_demands')
    
    if (savedEndorsements) {
      setEndorsements(JSON.parse(savedEndorsements))
    } else {
      const initialMap: Record<string, number> = {}
      demandsData.forEach((d) => (initialMap[d.id] = d.initialEndorsements))
      setEndorsements(initialMap)
    }

    if (savedUserStatus) {
      setUserEndorsed(JSON.parse(savedUserStatus))
    }
  }, [])

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleEndorse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const isCurrentlyEndorsed = userEndorsed[id]
    const updatedCount = (endorsements[id] || 0) + (isCurrentlyEndorsed ? -1 : 1)
    const updatedUserStatus = { ...userEndorsed, [id]: !isCurrentlyEndorsed }
    const updatedEndorsements = { ...endorsements, [id]: updatedCount }

    setEndorsements(updatedEndorsements)
    setUserEndorsed(updatedUserStatus)

    localStorage.setItem('sh_demand_endorsements', JSON.stringify(updatedEndorsements))
    localStorage.setItem('sh_user_endorsed_demands', JSON.stringify(updatedUserStatus))
  }

  return (
    <section className="wanted-poster rounded-3xl p-6 sm:p-10 shadow-xl text-center">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b-4 border-[#8D7B50] pb-6 text-center">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-red text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              STRAW HAT MANIFESTO 2026
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#2D2415] text-center sm:text-left" style={{ fontFamily: 'var(--font-heading)' }}>
            THE 5 CORE DEMANDS FOR EXAM JUSTICE
          </h2>
        </div>
        <div className="text-xs text-[#4A3F28] font-bold bg-[#3D331E] text-gold px-4 py-2 rounded-xl border border-gold/40 text-center inline-flex items-center justify-center shadow-sm">
          Interactive Tracker • Click any demand to inspect &amp; endorse
        </div>
      </div>

      <div className="space-y-4 text-center">
        {demandsData.map((demand) => {
          const isExpanded = expandedId === demand.id
          const currentCount = endorsements[demand.id] ?? demand.initialEndorsements
          const hasEndorsed = !!userEndorsed[demand.id]

          return (
            <div
              key={demand.id}
              className={`rounded-2xl border-2 transition-all duration-200 ${
                isExpanded ? 'border-red bg-surface shadow-md' : 'border-[#8D7B50]/60 bg-surface/70 hover:border-gold'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleExpand(demand.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none text-center md:text-left"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                  <span
                    className="text-2xl sm:text-3xl font-black text-red shrink-0 font-mono text-center"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {demand.number}
                  </span>
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5 text-center">
                      <span className={`inline-flex items-center justify-center text-center rounded-md px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider border ${demand.statusColor}`} style={{ fontFamily: 'var(--font-heading)' }}>
                        {demand.status}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#2D2415] leading-snug text-center md:text-left">
                      {demand.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A3F28] mt-1 leading-relaxed font-medium text-center md:text-left">
                      {demand.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#8D7B50]/40 shrink-0 text-center">
                  <button
                    onClick={(e) => handleEndorse(demand.id, e)}
                    className={`inline-flex items-center justify-center text-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                      hasEndorsed
                        ? 'bg-red text-white shadow-md'
                        : 'bg-surface border-2 border-[#8D7B50] text-[#2D2415] hover:border-red hover:text-red'
                    }`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <span>{hasEndorsed ? '✓ ENDORSED' : '✍️ ENDORSE'}</span>
                    <span className="font-mono ml-1 opacity-90">({currentCount.toLocaleString('en-IN')})</span>
                  </button>

                  <span className="text-xs font-black text-[#8D7B50] hover:text-red transition-colors flex items-center justify-center gap-1 text-center">
                    {isExpanded ? 'LESS ▲' : 'MORE ▼'}
                  </span>
                </div>
              </div>

              {/* Expanded Details Body */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-[#8D7B50]/30 text-sm text-[#2D2415] leading-relaxed text-center md:text-left">
                  <div className="rounded-xl bg-[#FFFDF5] p-5 border-2 border-[#8D7B50]/40 text-center md:text-left flex flex-col items-center md:items-start">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#8D7B50] mb-2 text-center md:text-left" style={{ fontFamily: 'var(--font-heading)' }}>
                      GROUND CONTEXT &amp; LEGAL RATIONALE:
                    </h4>
                    <p className="text-[#4A3F28] leading-relaxed text-sm font-medium text-center md:text-left">
                      {demand.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
