'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

const CONSENT_KEY = 'cookie-consent'

/**
 * Renders Vercel Analytics only when the user has accepted all cookies.
 *
 * Checks localStorage on mount and also listens for the custom
 * 'cookie-consent-updated' event dispatched by CookieBanner when the
 * user accepts in the same session — so Analytics activates immediately
 * without requiring a page reload.
 */
export default function ConsentAwareAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Initial check
    if (localStorage.getItem(CONSENT_KEY) === 'all') {
      setConsented(true)
    }

    // Same-session: CookieBanner dispatches this event on accept
    function onConsentUpdate(e: Event) {
      if ((e as CustomEvent<string>).detail === 'all') setConsented(true)
    }

    window.addEventListener('cookie-consent-updated', onConsentUpdate)
    return () => window.removeEventListener('cookie-consent-updated', onConsentUpdate)
  }, [])

  if (!consented) return null
  return <Analytics />
}
