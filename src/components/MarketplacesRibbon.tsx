import { MARKETPLACES } from '@/lib/products'

export default function MarketplacesRibbon() {
  return (
    <section
      aria-label="Marketplaces donde MagiClean está disponible"
      className="bg-white border-y border-[#E8EAED] py-6"
    >
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <p className="label-eyebrow text-ink-muted">Disponible en:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {MARKETPLACES.map((m) => (
              <span
                key={m}
                className="text-[1rem] lg:text-[1.05rem] font-bold text-[#1A1A1A] tracking-tight"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
