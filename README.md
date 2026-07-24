# 🏴‍☠️ Straw Hat Press — One Piece Civic Freedom Platform

> **"There is no crime in existing and demanding honest exams!"** — *Straw Hat Press Manifesto*

**Straw Hat Press** is an independent, student-driven, non-partisan civic press platform documenting the **NEET-UG 2026 paper leak controversy** and the student movement at **Jantar Mantar, New Delhi**. Built with a **One Piece Wanted Poster aesthetic**, high-performance Web Audio API sound synthesis, and real-time interactive tracking modules.

---

## ⚡ Key Platform Features

### 🎴 1. One Piece Wanted Poster Theme
- **Parchment Design System:** Authentic aged parchment background (`#F8F3E3`), dark wood ink typography (`#2D2415`), double-dashed inner borders, and red angled **WANTED** stamps.
- **Accountability Targeting:** Wanted Poster cards mapping responsibility to institutional entities (*National Testing Agency*, *Union Education Ministry*, and *Patna Paper Leak Syndicates*).
- **Interactive Lightbox Reader:** Full-screen modal dispatch reader for verified news dispatches and legal briefings.

### 🧭 2. Log Pose Protest Compass Navigator
- **Location Selector:** Real-time navigation compass tracking 4 primary protest nodes:
  - ⛺ **Jantar Mantar Ground:** Protest HQ & Active Student Rally
  - ⚖️ **Supreme Court Bench:** Judicial Hearing & Audit Briefings
  - 🔎 **CBI Investigation HQ:** Patna & Ranchi Paper Leak Module
  - 🏛️ **Ministry of Education:** Shastri Bhawan Reform Petitions
- **Interactive Accordion:** Click any location pill to inspect live coordinates, accountability targets, and manifesto demands.

### 🥁 3. Gear 5 Conqueror's Haki Shockwave & Audio Synthesis
- **Web Audio API Engine:** Native sound synthesis generating low-frequency sawtooth Conqueror's Haki thunder shockwaves (160Hz ➔ 30Hz decay).
- **Centered Haki Lightbox:** Screen-wide corner lightning shockwaves and centered quote lightbox displaying inspirational freedom quotes.

### 📊 4. Grand Line Controversy Metrics & Solidarity Counter
- **Verified Metrics Grid:** Real-time tracking of candidate impact (23.3 Lakh aspirants, 67 perfect scores, 1,563 re-test orders, 13 CBI arrests, 49 protest days).
- **Nationwide Voice Counter:** Interactive tally representing over 142,000+ candidate voices with 1-click social sharing to 𝕏 (Twitter), WhatsApp, and Telegram.

### 📜 5. 5-Point Student Manifesto & Log Pose Timeline
- **Interactive Demand Tracker:** Endorsable manifesto cards covering Re-Tests, NTA Overhaul, Anti-Paper Leak Act Enforcement, OMR Transparency, and Aspirant Compensation.
- **Click-to-Expand Timeline:** Chronological step-by-step log of events from exam day to Supreme Court rulings with primary source citations.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript / React 18 |
| **Styling** | Vanilla CSS Tokens & Tailwind CSS |
| **Typography** | Oswald (Google Fonts) & Monospace |
| **Audio Engine** | Browser Web Audio API (`AudioContext` Oscillators & Gain Nodes) |
| **Backend API** | Python (FastAPI) |
| **Data Storage** | PostgreSQL / SQLite |
| **Deployment** | Vercel / Railway |

---

## 📁 Repository Architecture

```text
├── frontend/
│   ├── app/
│   │   ├── layout.tsx                # Master layout with topbar, navbar & footer
│   │   ├── page.tsx                  # Home page & 4-column Wanted Poster grid
│   │   ├── globals.css               # One Piece design system & text-centering utilities
│   │   ├── articles/                 # Filterable Wanted Dispatches feed
│   │   ├── timeline/                 # Interactive Log Pose Timeline accordion
│   │   ├── documents/                # Official Court Exhibits & PDF repository
│   │   ├── public-reactions/         # Verified statements & legal reactions
│   │   └── student-stories/          # First-person student ground voices
│   ├── components/
│   │   ├── Gear5HakiEffect.tsx       # Conqueror's Haki pulse & Web Audio API engine
│   │   ├── LogPoseNavigator.tsx      # Interactive 4-node location compass
│   │   ├── OnePieceBountyCard.tsx    # Compact Wanted Poster dispatch cards
│   │   ├── ProtestDemandsTracker.tsx # 5-Point Manifesto endorsement tracker
│   │   ├── SolidarityCounter.tsx     # Voice counter & social share bar
│   │   └── InteractiveTimelineFeed.tsx # Expandable timeline feed
│   └── public/
│       ├── nta_investigation.jpg     # Primary court exhibit asset
│       └── luffy.png                 # Luffy profile avatar
└── README.md
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Frontend Installation & Launch

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Launch Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application live.

### 3. Environment Configuration

If connecting to a custom backend API server, create a `frontend/.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## ⚖️ Editorial & Verification Policy

1. **100% Non-Partisan Verification:** All news dispatches, timeline entries, and public statements are cross-verified against official parliamentary transcripts, Supreme Court exhibit filings, or CBI chargesheets.
2. **Privacy Protection:** Personal student identifiers are anonymized upon request to preserve candidate confidentiality.

---

## 📄 License

This repository is maintained under the **MIT License**. Created for civic awareness and student empowerment.
