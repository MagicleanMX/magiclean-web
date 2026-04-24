'use client'

import Logo from '@/components/Logo'
import { track, AnalyticsEvents } from '@/lib/analytics'
import { CATALOG_PDFS, type CatalogId } from '@/lib/catalog-assets'

type FooterLink = {
  label: string
  href: string
  external?: boolean
  analyticsId?: CatalogId
}

type FooterCol = {
  titulo: string
  links: FooterLink[]
}

const cols: FooterCol[] = [
  {
    titulo: 'Productos',
    links: [
      { label: 'Fibras Verdes F1 · F2 · F3', href: '#productos' },
      { label: 'Fibra Esponja Dual F4', href: '#productos' },
      { label: 'Fibras Especiales F5 · F6 · F7', href: '#productos' },
      { label: 'Borradores Mágicos F8 · F9', href: '#productos' },
      { label: 'Sistemas Mop M1 · M2 · M5', href: '#productos' },
      { label: 'Accesorios y Repuestos', href: '#productos' },
    ],
  },
  {
    titulo: 'Empresa',
    links: [
      { label: 'Quiénes somos', href: '#nosotros' },
      { label: 'Tecnología NeoShield™', href: '#tecnologia' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Red de Distribuidores', href: '#distribuidores' },
      ...CATALOG_PDFS.map((pdf) => ({
        label: `${pdf.label} (${pdf.sizeLabel})`,
        href: pdf.url,
        external: true,
        analyticsId: pdf.id,
      })),
    ],
  },
  {
    titulo: 'Contacto LATAM',
    links: [
      { label: 'ventas@magiclean.mx', href: 'mailto:ventas@magiclean.mx' },
      { label: 'CDMX · Guadalajara · Monterrey', href: '#contacto' },
      { label: 'Exportaciones LATAM', href: '#contacto' },
      { label: 'Solicitar cotización', href: '#contacto' },
    ],
  },
]

const socialLinks = [
  {
    nombre: 'TikTok',
    href: 'https://www.tiktok.com/@magicleanmx',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-deep text-white">

      {/* Main footer content */}
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 lg:gap-8">

          {/* Brand column */}
          <div>
            {/* Logo */}
            <a href="#" aria-label="MagiClean — inicio" className="inline-flex items-center mb-6 group">
              <Logo
                variant="white"
                className="h-10"
              />
            </a>

            <p className="text-[13px] font-semibold text-white/70 leading-snug max-w-[220px] mb-2">
              Fibras que duran. Tecnología que protege.
            </p>
            <p className="text-[13px] font-normal text-white/50 leading-relaxed max-w-[220px] mb-6">
              Proveedor B2B de soluciones de limpieza profesional para retail,
              mayoreo, HORECA e institucional en México y LATAM.
            </p>

            {/* Badges */}
            <div className="flex flex-col gap-2 mb-8">
              <span className="inline-flex items-center gap-2 self-start">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#0076FF" aria-hidden="true">
                  <path d="M12 2L3.5 6.5V12c0 5.1 3.84 9.87 8.5 11.1C16.66 21.87 20.5 17.1 20.5 12V6.5L12 2z"/>
                </svg>
                <span className="label-eyebrow text-white/70 text-[10px] font-normal">NeoShield™ Technology</span>
              </span>
              <span className="inline-flex items-center gap-2 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0076FF]" />
                <span className="label-eyebrow text-white/70 text-[10px] font-normal">MercadoLibre · Amazon · Walmart</span>
              </span>
            </div>

            {/* Redes sociales */}
            <div>
              <p className="label-eyebrow text-white/70 text-[10px] font-normal mb-3">Síguenos</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.nombre}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.nombre}
                    className="w-8 h-8 rounded-full bg-white/8 hover:bg-[#0076FF] flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.titulo}>
              <p className="label-eyebrow text-white/70 mb-6">{col.titulo}</p>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                      {...(link.analyticsId && {
                        onClick: () => track(AnalyticsEvents.CatalogDownload, { catalog: link.analyticsId as CatalogId }),
                      })}
                      className="text-[13px] font-normal text-white/50 hover:text-white transition-colors duration-200 leading-snug block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1440px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
              { label: 'Términos de uso', href: '/terminos-de-uso' },
              { label: 'Cookies', href: '/aviso-de-privacidad#cookies' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-normal text-white/70 hover:text-white/60 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
          <p className="text-[11px] font-normal text-white/70">
            © {new Date().getFullYear()} Prolim BH, SA de CV · MagiClean® marca registrada · México
          </p>
        </div>
      </div>
    </footer>
  )
}
