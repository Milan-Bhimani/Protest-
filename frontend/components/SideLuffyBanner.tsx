import React from 'react'
import Image from 'next/image'

export default function SideLuffyBanner() {
  return (
    <aside
      aria-label="Luffy pointing at news"
      className="hidden lg:block fixed bottom-0 left-0 z-30 w-48 sm:w-56 select-none pointer-events-none"
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src="/luffy_pointing_news.jpg"
          alt="Luffy pointing at the news"
          fill
          sizes="(max-width: 1024px) 0px, 224px"
          className="object-contain object-left-bottom"
          priority
        />
      </div>
    </aside>
  )
}
