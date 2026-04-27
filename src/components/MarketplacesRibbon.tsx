import { MARKETPLACES } from '@/lib/products'

// Display labels — applied at render time so the underlying constant in
// products.ts stays untouched. Ensures "Mercado Libre" renders with a space
// while every marketplace is treated as a peer (no badges, no emphasis).
const DISPLAY_LABEL: Record<(typeof MARKETPLACES)[number], string> = {
  MercadoLibre: 'Mercado Libre',
  Amazon:       'Amazon',
  Walmart:      'Walmart',
}

export default function MarketplacesRibbon() {
  return (
    <section
      aria-label="Marketplaces donde MagiClean está disponible"
      className="bg-white border-y border-[#E8EAED] py-6"
    >
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <p className="label-eyebrow text-ink-muted">Disponible en marketplaces líderes</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 list-none m-0 p-0">
            {MARKETPLACES.map((m) => (
              <li
                key={m}
                className="text-[1rem] lg:text-[1.05rem] font-bold text-[#1A1A1A] tracking-tight leading-none"
              >
                {DISPLAY_LABEL[m]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
