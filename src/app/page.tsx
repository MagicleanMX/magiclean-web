import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/Hero'
import ElProblema from '@/components/ElProblema'
import NeoShield from '@/components/NeoShield'
import BeneficiosClave from '@/components/BeneficiosClave'
import Categories from '@/components/Categories'
import ProductHeroF4 from '@/components/ProductHeroF4'
import ProductHeroMop from '@/components/ProductHeroMop'
import SocialProof from '@/components/SocialProof'
import HowItWorks from '@/components/HowItWorks'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import Nosotros from '@/components/Nosotros'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import { getWPSettings, getHeroSection, getCategoriesSection, getDistribuidoresSection } from '@/lib/wordpress'

/**
 * Orden de secciones — narrativa de marca:
 *
 *  1. Hero              → Promesa de marca
 *  2. ElProblema        → Por qué necesitas algo mejor
 *  3. NeoShield         → La tecnología que lo resuelve (#tecnologia)
 *  4. BeneficiosClave   → Los 3 pilares: durabilidad, antibacterial, eco-friendly
 *  5. Categories        → Amplitud del portafolio (#productos)
 *  6. ProductHeroF4     → El más vendido como prueba viva (#fibra-dual-f4)
 *  7. ProductHeroMop    → Sistemas Mop M1 + M2 consolidados (#sistemas-mop-m1)
 *  8. SocialProof       → Presencia verificada · marketplaces · métricas
 *  9. HowItWorks        → El proceso, simple y transparente (#como-funciona)
 * 10. DistribuidoresCTA → CTA red B2B (#distribuidores)
 * 11. Nosotros          → Historia de marca (#nosotros)
 * 12. ContactForm       → Formulario de cierre (#contacto)
 * 13. Footer
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
        <ElProblema />
        <NeoShield />
        <BeneficiosClave />
        <Categories data={categoriesData} />
        <ProductHeroF4 />
        <ProductHeroMop />
        <SocialProof />
        <HowItWorks />
        <DistribuidoresCTA data={distribuidoresData} />
        <Nosotros />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
