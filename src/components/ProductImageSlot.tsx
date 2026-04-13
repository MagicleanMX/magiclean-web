import Image from 'next/image'

interface ProductImageSlotProps {
  src?: string
  alt: string
  placeholder?: React.ReactNode
  className?: string
}

// Swap-ready image slot. When src is set → renders next/image.
// When src is absent → renders placeholder (custom node or built-in fallback).
// Future swap: add src prop — zero layout changes needed.
export default function ProductImageSlot({
  src,
  alt,
  placeholder,
  className = '',
}: ProductImageSlotProps) {
  if (src) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    )
  }

  if (placeholder) {
    return <>{placeholder}</>
  }

  // Built-in placeholder — typographic, keeps layout intact
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <div className="text-center select-none pointer-events-none">
        <p
          className="font-black leading-none opacity-10"
          style={{ fontSize: 'clamp(4rem, 20vw, 8rem)', color: 'currentColor' }}
        >
          {alt.slice(0, 2).toUpperCase()}
        </p>
        <p className="text-[9px] font-bold uppercase tracking-[0.25em] opacity-20 mt-2">
          imagen próximamente
        </p>
      </div>
    </div>
  )
}
