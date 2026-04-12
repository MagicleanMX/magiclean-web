import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import ProductHeroF4 from '@/components/ProductHeroF4'
import ProductHeroF123 from '@/components/ProductHeroF123'
import NeoShield from '@/components/NeoShield'
import ProductHeroM1 from '@/components/ProductHeroM1'
import ProductHeroM2 from '@/components/ProductHeroM2'
import HowItWorks from '@/components/HowItWorks'
import Nosotros from '@/components/Nosotros'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import Metrics from '@/components/Metrics'
import { getWPSettings, getHeroSection, getMetrics, getCategoriesSection, getDistribuidoresSection } from '@/lib/wordpress'

/**
 * Orden de secciones — inspirado en rolex.com:
 *
 * 1. Hero              → Full-screen split. Producto estrella + headline Playfair
 * 2. Categories        → La Colección. Grid 3-col, 6 familias reales
 * 3. ProductHeroF4     → Editorial split. Fibra Dual F4
 * 4. NeoShield         → Tecnología. Dark section, stats (#tecnologia)
 * 5. ProductHeroM1     → Editorial split alternado. Sistema Mop M1
 * 6. HowItWorks        → El Proceso. 4 pasos (#como-funciona)
 * 7. Nosotros          → La Empresa. Stats + valores (#nosotros)
 * 8. DistribuidoresCTA → Red de distribuidores (#distribuidores)
 * 9. ContactForm       → Cotización (#contacto)
 * 10. Footer
 */
export default async function Home() {
  // ── WP connection banner (dev only) ──────────────────────────────────────
  const wp = await getWPSettings()

  // ── Section data from WordPress ──────────────────────────────────────────
  const heroData           = await getHeroSection()
  const metricsData        = await getMetrics()
  const categoriesData     = await getCategoriesSection()
  const distribuidoresData = await getDistribuidoresSection()

  return (
    <>
      {/* ── Banner de conexión WP — solo visible mientras se integra el CMS ── */}
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

      <Navbar />
      <main>
        <Hero data={heroData} />
        <Metrics data={metricsData} />
        <Categories data={categoriesData} />
        <ProductHeroF4 />
        <ProductHeroF123 />
        <NeoShield />
        <ProductHeroM1 />
        <ProductHeroM2 />
        <HowItWorks />
        <Nosotros />
        <DistribuidoresCTA data={distribuidoresData} />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
