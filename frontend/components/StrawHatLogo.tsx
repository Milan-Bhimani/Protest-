import Image from 'next/image'

export default function StrawHatLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <div className={`${className} relative overflow-hidden rounded-full`}>
      <Image
        src="/luffy.png"
        alt="Luffy — Straw Hat Press"
        fill
        sizes="(max-width: 768px) 36px, 36px"
        className="object-cover"
      />
    </div>
  )
}

export function JollyRoger({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`${className} relative overflow-hidden rounded-full`}>
      <Image
        src="/luffy-bw.png"
        alt="Luffy — Straw Hat Press"
        fill
        sizes="(max-width: 768px) 24px, 24px"
        className="object-cover"
      />
    </div>
  )
}
