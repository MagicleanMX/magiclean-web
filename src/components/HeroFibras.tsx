import FibraHeroPanel from '@/components/FibraHeroPanel'
import productsData from '@/lib/products.json'

const SHOWCASE_ORDER = ['F4', 'F1', 'F5', 'F7'] as const

type ShowcaseData = {
  titleMain: string
  titleAccent: string
  tagline: string
  slotType: string
  image: string
  accentColor: string
  bgGradient: string
  shadowFilter?: string
}

type Product = {
  sku: string
  showcase?: ShowcaseData
}

const products = productsData as Product[]

const showcaseProducts = SHOWCASE_ORDER.map((sku) => products.find((p) => p.sku === sku)).filter(
  (p): p is Product & { showcase: ShowcaseData } => !!p && !!p.showcase,
)

const SHOWCASE_STYLES = `
.fhp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 8px;
  width: 100%;
  background: #fbfbfd;
}
@media (max-width: 700px) {
  .fhp-grid { grid-template-columns: 1fr; }
  .fhp-slot {
    aspect-ratio: 1 / 1.15 !important;
    padding: clamp(32px, 5vw, 40px) clamp(20px, 4vw, 28px) !important;
  }
  .fhp-h2 {
    font-size: clamp(22px, 6vw, 32px) !important;
    line-height: 1.1 !important;
  }
  .fhp-product img {
    max-width: 65% !important;
  }
  .fhp-btn {
    padding: 8px 16px !important;
    font-size: 12px !important;
  }
  .fhp-ctas { gap: 8px !important; }
}
`

export default function HeroFibras() {
  return (
    <section className="bg-white py-16">
      <style>{SHOWCASE_STYLES}</style>
      <div className="fhp-grid">
        {showcaseProducts.map((p) => (
          <FibraHeroPanel key={p.sku} sku={p.sku} showcase={p.showcase} />
        ))}
      </div>
    </section>
  )
}
