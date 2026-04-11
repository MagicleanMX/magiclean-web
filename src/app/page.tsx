import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProductHeroF4 from '@/components/ProductHeroF4'
import Categories from '@/components/Categories'
import ProductHeroM1 from '@/components/ProductHeroM1'
import NeoShield from '@/components/NeoShield'
import HowItWorks from '@/components/HowItWorks'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductHeroF4 />
        <Categories />
        <ProductHeroM1 />
        <NeoShield />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
