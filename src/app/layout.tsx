import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import CookieBanner from '@/components/CookieBanner'
import ConsentAwareAnalytics from '@/components/ConsentAwareAnalytics'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const siteUrl = 'https://magiclean-web.vercel.app'

export const metadata: Metadata = {
  title: 'MagicClean — Proveedor B2B de Limpieza Profesional en México',
  description:
    'Fibras, sistemas de mop y soluciones de limpieza profesional para distribuidores, retail, HORECA e institucional. Tecnología NeoShield™ antibacterial. Líderes en MercadoLibre y Amazon · 23 modelos · México y LATAM.',
  keywords: [
    'fibras de limpieza profesional',
    'sistemas de mop',
    'proveedor HORECA México',
    'distribuidor productos de limpieza',
    'fibra antibacterial NeoShield',
    'MagicClean México',
    'limpieza industrial',
    'productos de limpieza B2B',
  ],
  authors: [{ name: 'MagicClean S.A. de C.V.' }],
  creator: 'MagicClean',
  publisher: 'MagicClean',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: 'MagicClean',
    title: 'MagicClean — Proveedor B2B de Limpieza Profesional en México',
    description:
      'Fibras, sistemas de mop y soluciones de limpieza profesional para distribuidores, retail, HORECA e institucional en México y LATAM.',
    // TODO: Replace OG image with correct 1200x630 version after photo production.
    // Current asset is 2752x1536 and wrong aspect ratio.
    images: [
      {
        url: '/images/hero/hero-main.png',
        width: 1200,
        height: 630,
        alt: 'MagicClean — Tecnología profesional en limpieza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MagicClean — Proveedor B2B de Limpieza Profesional en México',
    description:
      'Fibras, sistemas de mop y soluciones para distribuidores, retail, HORECA e institucional.',
    images: ['/images/hero/hero-main.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'MagicClean',
  legalName: 'MagicClean S.A. de C.V.',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  telephone: '+525571553635',
  email: 'datos@magicleanproducts.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 3, No. 47, Local 109, Col. Industrial Alce Blanco',
    addressLocality: 'Naucalpan de Juárez',
    addressRegion: 'Estado de México',
    postalCode: '53370',
    addressCountry: 'MX',
  },
  sameAs: [
    'https://www.facebook.com/magiclean',
    'https://www.instagram.com/magiclean',
    'https://www.linkedin.com/company/magiclean',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieBanner />
        <ConsentAwareAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
