import Link from 'next/link'

type FibraHeroPanelProps = {
  sku: string
  nombre: string
  tagline: string
  color: string
  gradientStart: string
  gradientEnd: string
}

export default function FibraHeroPanel({
  sku,
  nombre,
  tagline,
  color,
  gradientStart,
  gradientEnd,
}: FibraHeroPanelProps) {
  return (
    <article className="group">
      <Link href={`/productos/${sku}`}>
        <div
          className="relative aspect-[4/3] rounded-3xl border border-[#E8EAED] overflow-hidden transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1"
          style={{ background: `linear-gradient(160deg, ${gradientStart} 0%, ${gradientEnd} 75%)` }}
        >
          <span
            className="absolute top-5 left-5 inline-flex items-center justify-center min-w-[44px] h-8 px-3 rounded text-[12px] font-black text-white z-10"
            style={{ backgroundColor: color }}
          >
            {sku}
          </span>

          <p
            className="absolute inset-0 flex items-center justify-center font-medium text-[1rem] md:text-[1.125rem] uppercase tracking-[0.2em] text-center px-8 select-none pointer-events-none"
            style={{ color: `${color}66` }}
          >
            {nombre.toUpperCase()}
          </p>
        </div>
      </Link>

      <div className="mt-6">
        <h3 className="font-medium text-[1.5rem] text-[#1A1A1A] mb-2">{nombre}</h3>
        <p className="text-[1rem] text-ink-muted mb-5 leading-relaxed">{tagline}</p>
        <div className="flex gap-3">
          <Link
            href={`/productos/${sku}`}
            className="px-6 py-3 rounded-full bg-[#0076FF] text-white text-[14px] font-medium hover:bg-[#0052CC] transition-colors"
          >
            Más información
          </Link>
          <Link
            href={`/#contacto?producto=${sku}`}
            className="px-6 py-3 rounded-full border border-[#E0E3E8] text-[#1A1A1A] text-[14px] font-medium hover:bg-[#F5F7FA] transition-colors"
          >
            Cotizar
          </Link>
        </div>
      </div>
    </article>
  )
}
