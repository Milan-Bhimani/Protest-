import React from 'react'
import Image from 'next/image'

export default function SideLuffyBanner() {
  return (
    <aside
      aria-label="Luffy pointing at news"
      className="hidden lg:block fixed bottom-0 left-0 z-30 w-36 sm:w-44 select-none pointer-events-none"
    >
      <div className="relative w-full" style={{ aspectRatio: '200/320' }}>
        <Image
          src="/luffy-pointing.svg"
          alt="Luffy pointing at the news"
          fill
          sizes="(max-width: 1024px) 0px, 176px"
          className="object-contain"
          priority
        />
      </div>
    </aside>
  )
}
