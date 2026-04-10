import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProductHero from '@/components/ProductHero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import WhyUs from '@/components/WhyUs'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductHero />
        <Services />
        <HowItWorks />
        <WhyUs />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
