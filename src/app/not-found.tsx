import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Página no encontrada — MagicClean',
  description: 'La página que buscas no existe o fue movida.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="bg-white min-h-screen flex flex-col">
        {/* Hero 404 */}
        <div className="flex-1 flex items-center justify-center bg-[#0A1628] px-6 py-32">
          <div className="max-w-lg w-full text-center">

            {/* Número grande */}
            <p
              className="font-black text-[#0076FF] leading-none mb-6 select-none"
              style={{ fontSize: 'clamp(7rem, 20vw, 10rem)', opacity: 0.15 }}
              aria-hidden="true"
            >
              404
            </p>

            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-widest text-white/50 uppercase mb-4 -mt-10">
              Error 404
            </p>

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 leading-tight">
              Página no encontrada
            </h1>

            {/* Subtítulo */}
            <p className="text-base font-normal text-white/50 leading-relaxed mb-10">
              La página que buscas no existe o fue movida.
              <br />
              Verifica la URL o regresa al inicio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-[#0076FF] hover:bg-[#0052CC] text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200 w-full sm:w-auto"
              >
                ← Volver al inicio
              </Link>
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/50 text-white/60 hover:text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-colors duration-200 w-full sm:w-auto"
              >
                Contáctanos
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
