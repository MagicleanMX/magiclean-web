'use client'

import { useSyncExternalStore } from 'react'
import { Analytics } from '@vercel/analytics/react'

const CONSENT_KEY = 'cookie-consent'

// External store: reads localStorage synchronously, re-reads when
// CookieBanner dispatches `cookie-consent-updated` (same-session activation).
function subscribe(callback: () => void): () => void {
  window.addEventListener('cookie-consent-updated', callback)
  return () => window.removeEventListener('cookie-consent-updated', callback)
}

function getSnapshot(): string | null {
  return localStorage.getItem(CONSENT_KEY)
}

function getServerSnapshot(): null {
  return null
}

/**
 * Renders Vercel Analytics only when the user has accepted all cookies.
 *
 * Uses useSyncExternalStore instead of useState + useEffect to avoid the
 * react-hooks/set-state-in-effect lint rule while still reacting in real
 * time to the same-session consent-updated event.
 */
export default function ConsentAwareAnalytics() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  if (consent !== 'all') return null
  return <Analytics />
}
