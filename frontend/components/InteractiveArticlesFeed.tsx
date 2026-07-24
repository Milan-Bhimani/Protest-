'use client'

import { useState } from 'react'
import OnePieceBountyCard from './OnePieceBountyCard'

interface Article {
  id: number | string
  title: string
  summary: string
  content?: string
  category?: string
  type?: string
  image_url?: string
  published_at?: string
}

export default function InteractiveArticlesFeed({ articles }: { articles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = ['All', 'Official Statement', 'Investigation', 'Supreme Court', 'Jantar Mantar']

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => {
        const cat = (a.category || '').toLowerCase()
        const type = (a.type || '').toLowerCase()
        const title = (a.title || '').toLowerCase()
        const target = activeCategory.toLowerCase()

        return cat.includes(target) || type.includes(target) || title.includes(target)
      })

  return (
    <div className="space-y-8 text-center">
      {/* Interactive Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b-4 border-[#8D7B50] text-center">
        <span className="text-xs font-black uppercase tracking-wider text-[#8D7B50] mr-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          FILTER DISPATCHES:
        </span>
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`inline-flex items-center justify-center text-center rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                isActive
                  ? 'bg-red text-white scale-105 shadow-red/30 ring-2 ring-gold'
                  : 'bg-[#3D331E] border border-gold text-gold hover:bg-red hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              #{cat} {isActive && `(${filteredArticles.length})`}
            </button>
          )
        })}
      </div>

      {/* Grid of Small Wanted Posters: 4 per row */}
      {filteredArticles.length === 0 ? (
        <div className="wanted-poster rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
          <div className="text-4xl mb-3 text-center">🏴‍☠️</div>
          <h2 className="text-xl font-black text-[#2D2415] mb-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>No Matching Dispatches Found</h2>
          <p className="text-[#4A3F28] text-sm text-center">Try selecting a different filter category above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <OnePieceBountyCard
              key={article.id}
              id={article.id.toString()}
              title={article.title}
              summary={article.summary}
              content={article.content}
              category={article.category || 'OFFICIAL REPORT'}
              type={article.type || 'NEWS'}
              imageUrl={article.image_url}
              publishedAt={article.published_at}
            />
          ))}
        </div>
      )}
    </div>
  )
}
