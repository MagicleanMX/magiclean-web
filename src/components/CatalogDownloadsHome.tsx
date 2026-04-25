import Link from 'next/link'
import { Download } from 'lucide-react'
import { CATALOG_PDFS } from '@/lib/catalog-assets'

export default function CatalogDownloadsHome() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <p className="label-eyebrow text-[#0076FF] mb-3">La colección completa</p>
        <h2 className="font-serif text-[2.4rem] md:text-[3.2rem] leading-tight text-[#1A1A1A] mb-10">
          Catálogo profesional disponible
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {CATALOG_PDFS.map((pdf) => (
            <a
              key={pdf.id}
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Descargar ${pdf.label} en PDF, ${pdf.sizeA11y}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#E0E3E8] text-[#1A1A1A] text-[14px] font-medium hover:border-[#0076FF] hover:text-[#0076FF] transition-colors"
            >
              <Download size={16} />
              {pdf.label} ({pdf.sizeLabel})
            </a>
          ))}
          <Link
            href="/productos"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#0076FF] text-white text-[14px] font-medium hover:bg-[#0052CC] transition-colors"
          >
            Ver portafolio completo
          </Link>
        </div>
      </div>
    </section>
  )
}
