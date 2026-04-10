import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'MagiClean — Limpieza de precisión',
  description:
    'Proveedor B2B de productos de limpieza premium para retail, mayoreo, HORECA e institucional en México. Tecnología NeoShield™.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
