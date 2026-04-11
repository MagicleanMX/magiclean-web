import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import ProductHeroF4 from '@/components/ProductHeroF4'
import NeoShield from '@/components/NeoShield'
import ProductHeroM1 from '@/components/ProductHeroM1'
import HowItWorks from '@/components/HowItWorks'
import DistribuidoresCTA from '@/components/DistribuidoresCTA'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

/**
 * Orden de secciones — inspirado en rolex.com:
 *
 * 1. Hero            → Full-screen split. Producto estrella + headline Playfair
 * 2. Categories      → La Colección. Grid 3-col, aspect 4/5, hover overlay
 * 3. ProductHeroF4   → Editorial split izq/der. Producto F4 destacado
 * 4. NeoShield       → Nuestra Tecnología. Dark section, stats + storytelling
 * 5. ProductHeroM1   → Editorial split der/izq (alternado). Producto M1
 * 6. HowItWorks      → El Proceso. 4 pasos horizontales
 * 7. DistribuidoresCTA → Únete a la red. Banner azul full-width
 * 8. ContactForm     → Cotización. Dark section formulario
 * 9. Footer          → 4 columnas: Brand / Productos / Empresa / Contacto LATAM
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
        <HowItWorks />
        <DistribuidoresCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
