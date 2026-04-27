'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'cookie-consent'

export type CookieConsent = 'all' | 'necessary'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // One-shot sync from localStorage on mount; setVisible runs at most once
    // so it cannot trigger a render cycle.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
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
      <div className="max-w-[1440px] mx-auto px-4 py-2.5 sm:px-6 sm:py-4 flex flex-row items-center gap-3 sm:gap-4">
        {/* Mobile copy — short enough to keep the legal link visible while
            holding the banner ≤90px. Desktop keeps the full sentence. */}
        <p className="text-[11px] sm:text-[13px] font-normal text-white/70 leading-snug sm:leading-relaxed flex-1">
          <span className="sm:hidden">
            Cookies técnicas y de análisis.{' '}
            <Link
              href="/aviso-de-privacidad#cookies"
              className="text-[#0076FF] hover:underline font-medium whitespace-nowrap"
            >
              Aviso de Privacidad
            </Link>
            .
          </span>
          <span className="hidden sm:inline">
            Este sitio utiliza cookies técnicas y de análisis para mejorar tu experiencia.
            Consulta nuestro{' '}
            <Link
              href="/aviso-de-privacidad#cookies"
              className="text-[#0076FF] hover:underline font-medium whitespace-nowrap"
            >
              Aviso de Privacidad
            </Link>
            .
          </span>
        </p>

        {/* Buttons — always horizontal so the mobile banner stays compact */}
        <div className="flex flex-row gap-2 shrink-0">
          <button
            onClick={() => accept('necessary')}
            className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-[11px] sm:text-[13px] font-semibold text-white/60 border border-white/20 hover:border-white/50 hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            Solo necesarias
          </button>
          <button
            onClick={() => accept('all')}
            className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-[11px] sm:text-[13px] font-semibold text-white bg-[#0076FF] hover:bg-[#0052CC] transition-colors duration-200 whitespace-nowrap"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}
