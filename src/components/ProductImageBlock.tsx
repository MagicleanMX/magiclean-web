import Image from 'next/image'

type Props = {
  imagePath: string | null
  alt: string
  sku: string
  productName: string
  className?: string
}

// Shows the product photo if `imagePath` is set; otherwise renders the
// editorial typography placeholder (same pattern as ProductHeroMop's
// pre-photo fallback). Photo coverage is filled in progressively as the
// owner authorizes assets — the component does not need to change.
export default function ProductImageBlock({
  imagePath,
  alt,
  sku,
  productName,
  className,
}: Props) {
  return (
    <div
      className={`relative bg-deep aspect-square overflow-hidden rounded-2xl ${className ?? ''}`}
    >
      {imagePath ? (
        <Image
          src={imagePath}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-contain p-8"
          priority
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none px-6">
          <p className="text-white/15 text-[0.85rem] sm:text-[1rem] font-medium uppercase tracking-[0.35em] mb-4 text-center leading-tight">
            {productName.toUpperCase()}
          </p>
          <p className="font-black leading-none tracking-tight text-white/30 text-[6rem] sm:text-[7rem] text-center">
            {sku}
          </p>
        </div>
      )}
    </div>
  )
}
