import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/Hero'
import MarketplacesRibbon from '@/components/MarketplacesRibbon'
import HeroFibras from '@/components/HeroFibras'
import ProductHeroMop from '@/components/ProductHeroMop'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import NeoShield from '@/components/NeoShield'
import BeneficiosClave from '@/components/BeneficiosClave'
import Logistica from '@/components/Logistica'
import Nosotros from '@/components/Nosotros'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { getWPSettings, getHeroSection, getDistribuidoresSection } from '@/lib/wordpress'

/**
 * Orden de secciones — home restructure (launch):
 *
 *  1. Hero                  → Promesa de marca + 3 CTAs (Amazon, ML, catálogo)
 *  2. MarketplacesRibbon    → "Disponible en:" — apoyo directo a e-commerce
 *  3. HeroFibras            → Showcase 2×2 de fibras destacadas (F4, F1, F5, F7)
 *  4. ProductHeroMop        → Sistemas Mop M1 + M2 (#sistemas-mop-m1)
 *  5. DistribuidoresCTA     → Conversión B2B + descarga catálogo PDF (#distribuidores)
 *  6. NeoShield             → Tecnología antibacterial propia (#tecnologia)
 *  7. BeneficiosClave       → 3 pilares (#como-funciona — anchor preservado)
 *  8. Logistica             → Operación honesta: tiempos, cobertura (#logistica)
 *  9. Nosotros              → Historia de marca (#nosotros)
 * 10. ContactForm           → Formulario de cierre (#contacto)
 *
 * Componentes deprecados (archivos conservados, sin importar):
 *   - ElProblema, HowItWorks, SocialProof, CatalogDownloadsHome
 *   Limpieza física pendiente para sprint posterior.
 *
 * WordPress/GraphQL fetches are skipped entirely when WP_GRAPHQL_URL is not
 * set (e.g. Vercel production without a connected WP instance). Components
 * receive null and render their hardcoded fallback content directly.
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
        <MarketplacesRibbon />
        <div style={{ paddingTop: 80, paddingBottom: 80, background: '#fff' }}><HeroFibras /></div>
        <div style={{ paddingTop: 80, paddingBottom: 80 }}><ProductHeroMop /></div>
        <div style={{ paddingTop: 80, paddingBottom: 80 }}><DistribuidoresCTA data={distribuidoresData} /></div>
        <div style={{ paddingTop: 80, paddingBottom: 80 }}><NeoShield /></div>
        <div style={{ paddingTop: 80, paddingBottom: 80, background: '#fff' }}><BeneficiosClave /></div>
        <div style={{ paddingTop: 80, paddingBottom: 80, background: '#fff' }}><Logistica /></div>
        <div style={{ paddingTop: 80, paddingBottom: 80, background: '#fff' }}><Nosotros /></div>
        <div style={{ paddingTop: 80, paddingBottom: 80 }}><ContactForm /></div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
