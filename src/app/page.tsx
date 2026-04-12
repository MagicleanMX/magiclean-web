import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import ProductHeroF4 from '@/components/ProductHeroF4'
import ProductHeroF123 from '@/components/ProductHeroF123'
import NeoShield from '@/components/NeoShield'
import ProductHeroMop from '@/components/ProductHeroMop'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import HowItWorks from '@/components/HowItWorks'
import Nosotros from '@/components/Nosotros'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { getWPSettings, getHeroSection, getCategoriesSection, getDistribuidoresSection } from '@/lib/wordpress'

/**
 * Orden de secciones:
 *
 * 1. Hero              → Full-screen split. Producto estrella + headline Playfair
 * 2. Categories        → La Colección. Grid 3-col, 6 familias
 * 3. ProductHeroF4     → Editorial split. Fibra Dual F4
 * 4. ProductHeroF123   → Fibras Verdes F1·F2·F3
 * 5. NeoShield         → Tecnología. Dark section, stats (#tecnologia)
 * 6. ProductHeroMop    → Sistemas Mop M1 + M2 comparativo
 * 7. DistribuidoresCTA → Red de distribuidores (#distribuidores)
 * 8. HowItWorks        → El Proceso. 4 pasos (#como-funciona)
 * 9. Nosotros          → La Empresa (#nosotros)
 * 10. ContactForm      → Cotización (#contacto)
 * 11. Footer
 */
export default async function Home() {
  const wp                 = await getWPSettings()
  const heroData           = await getHeroSection()
  const categoriesData     = await getCategoriesSection()
  const distribuidoresData = await getDistribuidoresSection()

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
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
        <Categories data={categoriesData} />
        <ProductHeroF4 />
        <ProductHeroF123 />
        <NeoShield />
        <ProductHeroMop />
        <DistribuidoresCTA data={distribuidoresData} />
        <HowItWorks />
        <Nosotros />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
