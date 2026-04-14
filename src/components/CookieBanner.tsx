'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'cookie-consent'

export type CookieConsent = 'all' | 'necessary'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) setVisible(true)
  }, [])

  function accept(value: CookieConsent) {
    localStorage.setItem(CONSENT_KEY, value)
    // Notify ConsentAwareAnalytics in the same session without a page reload
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: value }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#0A1628] border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Text */}
        <p className="text-[13px] font-light text-white/70 leading-relaxed flex-1">
          Este sitio utiliza cookies técnicas y de análisis para mejorar tu experiencia.
          Consulta nuestro{' '}
          <Link
            href="/aviso-de-privacidad"
            className="text-[#0076FF] hover:underline font-medium whitespace-nowrap"
          >
            Aviso de Privacidad
          </Link>
          .
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:shrink-0">
          <button
            onClick={() => accept('necessary')}
            className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white/60 border border-white/20 hover:border-white/50 hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            Solo necesarias
          </button>
          <button
            onClick={() => accept('all')}
            className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white bg-[#0076FF] hover:bg-[#0052CC] transition-colors duration-200 whitespace-nowrap"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
