import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import ProductHeroF4 from '@/components/ProductHeroF4'
import NeoShield from '@/components/NeoShield'
import ProductHeroM1 from '@/components/ProductHeroM1'
import ProductHeroM2 from '@/components/ProductHeroM2'
import HowItWorks from '@/components/HowItWorks'
import Nosotros from '@/components/Nosotros'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

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
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <ProductHeroF4 />
        <NeoShield />
        <ProductHeroM1 />
        <ProductHeroM2 />
        <HowItWorks />
        <Nosotros />
        <DistribuidoresCTA />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
