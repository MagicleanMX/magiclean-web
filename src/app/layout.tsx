import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
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
    'Fibras, sistemas de mop y soluciones de limpieza profesional para distribuidores, retail, HORECA e institucional. Tecnología NeoShield™ antibacterial. 15+ años · 500+ clientes · 23 modelos.',
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
    images: [
      {
        url: '/images/hero/hero-main.jpg',
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
    images: ['/images/hero/hero-main.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
