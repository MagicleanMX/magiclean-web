/**
 * Analytics helper — thin wrapper around Vercel Analytics `track()`.
 *
 * Why a wrapper:
 *   - Single place to enforce event-name and property-name shapes.
 *   - Fails silently if Analytics is not yet loaded (pre-consent) or the
 *     SDK import fails — the UI should never crash because of telemetry.
 *   - Event name constants are exported so callsites can import them
 *     instead of stringly-typed names (fewer typos, easier rename).
 *
 * Consent gating:
 *   Analytics itself is mounted by ConsentAwareAnalytics only after the
 *   user accepts all cookies. If the user never consents, `track()` here
 *   is a no-op because the SDK never registered a handler.
 */

import { track as vercelTrack } from '@vercel/analytics'

// ─── Event name constants ────────────────────────────────────────────────────
export const AnalyticsEvents = {
  ContactFormSubmit:    'contact_form_submit',
  WhatsAppClick:        'whatsapp_click',
  CatalogDownload:      'catalog_download',
} as const

export type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]

// Primitives accepted by Vercel's track() — matches the SDK signature.
export type AnalyticsProperty = string | number | boolean | null

export interface ContactFormSubmitProps {
  channel: string          // distribuidor | horeca | retail | institucional | hogar | otro
  source?: string          // e.g. 'hero_cta' | 'nav_cta' | 'sticky_bar' — optional
}

export interface WhatsAppClickProps {
  location: 'sticky_fab' | 'tooltip_cta'
}

export interface CatalogDownloadProps {
  catalog: 'fibras' | 'mops' | 'complete'
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fire a tracked event. Never throws.
 *
 * Accepts a typed event name + a matching property shape. Unknown or
 * malformed events are silently ignored — telemetry must never break UX.
 */
export function track(
  event: AnalyticsEventName,
  properties?: Record<string, AnalyticsProperty>
): void {
  try {
    vercelTrack(event, properties)
  } catch {
    // Intentionally swallowed — analytics errors must not surface to users.
  }
}
