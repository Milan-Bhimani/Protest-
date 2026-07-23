# Student Awareness Platform - Frontend

Next.js frontend for the Student Awareness Platform. Designed for Vercel deployment.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

## Environment

Create `.env.local` if your backend is not on the default URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Build

```bash
npm run build
```

This creates a static export in `out/` suitable for Vercel or any static host.
