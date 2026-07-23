import React from 'react'
import Image from 'next/image'

export default function SideLuffyBanner() {
  return (
    <aside
      aria-label="Luffy Figure"
      className="hidden xl:block fixed bottom-6 right-6 z-30 w-52 sm:w-64 select-none pointer-events-none"
    >
      <div className="relative w-full aspect-[3/4]">
        <Image
          src="/chatgpt_luffy_idol.png"
          alt="Luffy"
          fill
          sizes="(max-width: 1280px) 0px, 256px"
          className="object-contain"
          priority
        />
      </div>
    </aside>
  )
}
