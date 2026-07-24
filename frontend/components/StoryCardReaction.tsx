'use client'

import { useState, useEffect } from 'react'

export default function StoryCardReaction({ storyId }: { storyId: string }) {
  const [likes, setLikes] = useState(42 + Math.floor(Math.random() * 85))
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(`sh_story_liked_${storyId}`)
    if (saved === 'true') {
      setHasLiked(true)
    }
  }, [storyId])

  const handleLike = () => {
    const nextState = !hasLiked
    setHasLiked(nextState)
    setLikes((prev) => (nextState ? prev + 1 : prev - 1))
    localStorage.setItem(`sh_story_liked_${storyId}`, nextState ? 'true' : 'false')
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm ${
          hasLiked
            ? 'bg-red text-white'
            : 'bg-[#3D331E] border border-gold text-gold hover:bg-red hover:text-white'
        }`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        <span>✊ {hasLiked ? 'SOLIDARITY SHOWN' : 'STAND WITH ASPIRANT'}</span>
        <span className="font-mono ml-0.5">({likes})</span>
      </button>
    </div>
  )
}
