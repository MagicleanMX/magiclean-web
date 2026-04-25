import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/Hero'
import ElProblema from '@/components/ElProblema'
import NeoShield from '@/components/NeoShield'
import BeneficiosClave from '@/components/BeneficiosClave'
import HeroFibras from '@/components/HeroFibras'
import ProductHeroMop from '@/components/ProductHeroMop'
import SocialProof from '@/components/SocialProof'
import HowItWorks from '@/components/HowItWorks'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import Logistica from '@/components/Logistica'
import Nosotros from '@/components/Nosotros'
import ContactForm from '@/components/ContactForm'
import CatalogDownloadsHome from '@/components/CatalogDownloadsHome'
import Footer from '@/components/Footer'
import StickyCtaBar from '@/components/StickyCtaBar'
import { getWPSettings, getHeroSection, getDistribuidoresSection } from '@/lib/wordpress'

/**
 * Orden de secciones — narrativa de marca:
 *
 *  1. Hero                  → Promesa de marca
 *  2. ElProblema            → Por qué elegirnos: value-first multi-market
 *  3. NeoShield             → Sello de confianza antibacterial (#tecnologia)
 *  4. BeneficiosClave       → 3 pilares: durabilidad, cero contaminación cruzada, eco-friendly
 *  5. HeroFibras            → Showcase 2×2 de fibras destacadas (F4, F1, F6, F7)
 *  6. ProductHeroMop        → Sistemas Mop M1 + M2 consolidados (#sistemas-mop-m1)
 *  7. SocialProof           → Presencia verificada · marketplaces · métricas
 *  8. HowItWorks            → El proceso, simple y transparente (#como-funciona)
 *  9. Logistica             → Operación honesta: tiempos, cobertura, presentaciones (#logistica)
 * 10. DistribuidoresCTA     → CTA red B2B (#distribuidores)
 * 11. Nosotros              → Historia de marca (#nosotros)
 * 12. ContactForm           → Formulario de cierre (#contacto)
 * 13. CatalogDownloadsHome  → PDFs descargables + link a /productos
 * 14. Footer
 *
 * WordPress/GraphQL fetches are skipped entirely when WP_GRAPHQL_URL is not
 * set (e.g. Vercel production without a connected WP instance). Components
 * receive null and render their hardcoded fallback content directly.
 * This guarantees the SSR HTML is identical to the client-rendered HTML —
 * no failed network calls, no empty states, correct content for crawlers/SEO.
 */

const WP_CONNECTED = !!process.env.WP_GRAPHQL_URL

export default async function Home() {
  // Only hit WordPress when the env var is actually configured.
  // When missing, skip fetches and let every component use its static fallback.
  const [wp, heroData, distribuidoresData] = await Promise.all([
    WP_CONNECTED ? getWPSettings()            : Promise.resolve({ title: '', description: '', url: '' }),
    WP_CONNECTED ? getHeroSection()           : Promise.resolve(null),
    WP_CONNECTED ? getDistribuidoresSection() : Promise.resolve(null),
  ])

  return (
    <>
      {process.env.NODE_ENV === 'development' && WP_CONNECTED && (
        <div
          style={{
            position: 'fixed', bottom: 12, left: 12, zIndex: 9999,
            background: '#0A1628', border: '1px solid #0076FF33',
            borderRadius: 10, padding: '8px 14px',
            fontFamily: 'monospace', fontSize: 11, color: '#74B9FF',
            pointerEvents: 'none',
          }}
        >
          <span style={{ color: '#2D7A2D', marginRight: 6 }}>●</span>
          WP conectado · <strong style={{ color: '#fff' }}>{wp.url}</strong>
          {wp.title && (
            <> · título: <em style={{ color: '#ccc' }}>{wp.title}</em></>
          )}
        </div>
      )}

      <Navbar />
      <main>
        <Hero data={heroData} />
        <ElProblema />
        <NeoShield />
        <BeneficiosClave />
        <HeroFibras />
        <ProductHeroMop />
        <SocialProof />
        <HowItWorks />
        <Logistica />
        <DistribuidoresCTA data={distribuidoresData} />
        <Nosotros />
        <ContactForm />
        <CatalogDownloadsHome />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyCtaBar />
    </>
  )
}
