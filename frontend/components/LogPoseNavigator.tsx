'use client'

import { useState } from 'react'

interface Destination {
  id: string
  name: string
  location: string
  status: string
  icon: string
  targetAccountability: string
  keyDemands: string
  coord: string
  linkHref: string
}

const destinations: Destination[] = [
  {
    id: 'jantar-mantar',
    name: 'Jantar Mantar Ground',
    location: 'New Delhi (Protest HQ)',
    status: 'ACTIVE STUDENT RALLY — DAY 48',
    icon: '⛺',
    targetAccountability: 'Public & Government Response',
    keyDemands: 'Immediate Re-Test & Compensation for Aspirant Families',
    coord: '28.6271° N, 77.2166° E',
    linkHref: '/student-stories',
  },
  {
    id: 'supreme-court',
    name: 'Supreme Court Bench',
    location: 'Tilak Marg, New Delhi',
    status: 'JUDICIAL BENCH HEARING',
    icon: '⚖️',
    targetAccountability: 'NTA Administration & Center Data',
    keyDemands: 'Independent Audit by Retired SC Judge',
    coord: '28.6239° N, 77.2399° E',
    linkHref: '/timeline',
  },
  {
    id: 'cbi-patna',
    name: 'CBI Investigation HQ',
    location: 'Patna & Ranchi Module',
    status: 'CHARGESHEET SUBMITTED (13 ARRESTS)',
    icon: '🔎',
    targetAccountability: 'Patna & Hazaribagh Paper Leak Syndicates',
    keyDemands: 'Prosecution under Anti-Paper Leak Act 2024',
    coord: '25.5941° N, 85.1376° E',
    linkHref: '/documents',
  },
  {
    id: 'education-min',
    name: 'Ministry of Education',
    location: 'Shastri Bhawan, New Delhi',
    status: 'UNION MINISTER OFFICE',
    icon: '🏛️',
    targetAccountability: 'Union Minister Dharmendra Pradhan & NTA Chairman',
    keyDemands: 'Structural Reform & NTA Restructuring',
    coord: '28.6186° N, 77.2160° E',
    linkHref: '/articles',
  },
]

export default function LogPoseNavigator() {
  const [activeDest, setActiveDest] = useState<Destination | null>(null)

  const handleSelectDest = (dest: Destination) => {
    if (activeDest?.id === dest.id) {
      setActiveDest(null)
    } else {
      setActiveDest(dest)
    }
  }

  return (
    <div className="wanted-poster rounded-3xl border-4 border-[#8D7B50] p-6 sm:p-8 shadow-2xl overflow-hidden relative text-center">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 text-center">
        {/* Left Compass Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-[#8D7B50] bg-[#3D331E] shadow-xl text-center">
            <span className="compass-needle text-3xl">🧭</span>
            <span className="absolute -top-2 rounded-full bg-red px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-tighter shadow-md" style={{ fontFamily: 'var(--font-heading)' }}>
              LOG POSE
            </span>
          </div>

          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-red text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                GRAND LINE PROTEST COMPASS
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#2D2415] mt-1 text-center sm:text-left" style={{ fontFamily: 'var(--font-heading)' }}>
              {activeDest ? (
                <>LOCATION: <span className="text-red underline decoration-gold underline-offset-4">{activeDest.name}</span></>
              ) : (
                <span>SELECT PROTEST DESTINATION</span>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-[#4A3F28] mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 font-medium text-center sm:text-left">
              {activeDest ? (
                <>
                  <span>📍 {activeDest.location}</span>
                  <span>•</span>
                  <span className="text-red font-black">{activeDest.status}</span>
                </>
              ) : (
                <span>Click any key location below to inspect live coordinates &amp; manifesto demands.</span>
              )}
            </p>
          </div>
        </div>

        {/* Interactive Destination Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 w-full lg:w-auto text-center">
          {destinations.map((dest) => {
            const isSelected = activeDest?.id === dest.id
            return (
              <button
                key={dest.id}
                onClick={() => handleSelectDest(dest)}
                className={`inline-flex items-center justify-center text-center gap-2 rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-md ${
                  isSelected
                    ? 'bg-red text-white scale-105 shadow-red/40 ring-2 ring-gold'
                    : 'bg-[#3D331E] border border-gold text-gold hover:bg-red hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="text-base">{dest.icon}</span>
                <span>{dest.name.split(' ')[0]}</span>
                {isSelected && <span className="text-xs font-bold text-gold">✓</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Expanded Destination Info Box */}
      {activeDest && (
        <div className="mt-6 pt-6 border-t-2 border-[#8D7B50]/40 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm animate-fadeIn text-center">
          <div className="rounded-2xl bg-[#FFFDF5] p-4 border-2 border-[#8D7B50]/40 flex flex-col items-center justify-center text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-[#8D7B50] mb-1 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              ACCOUNTABILITY TARGET:
            </span>
            <p className="font-black text-[#2D2415] leading-snug text-center">{activeDest.targetAccountability}</p>
          </div>

          <div className="rounded-2xl bg-[#FFFDF5] p-4 border-2 border-[#8D7B50]/40 flex flex-col items-center justify-center text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-red mb-1 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              CORE MANIFESTO DEMAND:
            </span>
            <p className="font-bold text-[#4A3F28] leading-snug text-center">{activeDest.keyDemands}</p>
          </div>

          <div className="rounded-2xl bg-[#FFFDF5] p-4 border-2 border-[#8D7B50]/40 flex flex-col items-center justify-center text-center">
            <span className="block text-[10px] font-black uppercase tracking-wider text-[#8D7B50] mb-1 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              NAVIGATE TO MODULE:
            </span>
            <a
              href={activeDest.linkHref}
              className="inline-flex items-center justify-center text-center gap-2 rounded-xl bg-[#3D331E] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-gold hover:bg-red hover:text-white transition-colors mt-2 shadow-sm w-full"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span>INSPECT {activeDest.name.split(' ')[0]} LOGS</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
