/**
 * Single source of truth for marketplace storefront URLs + UTM tagging.
 *
 * Consumed by hero CTAs and any future component that links out to a
 * marketplace. Centralizing here means a URL change touches one file.
 */

export const MARKETPLACES = {
  amazon:  'https://www.amazon.com.mx/stores/MAGICLEAN/page/CEC81E69-6144-4477-9A94-954741CB3AA4',
  ml:      'https://www.mercadolibre.com.mx/tienda/magiclean',
  walmart: 'https://www.walmart.com.mx/search?q=Magiclean&facet=brand:Magiclean',
} as const

/**
 * Append standard UTM parameters to a marketplace URL.
 *
 * Existing query params on the URL (e.g. Walmart's `q` + `facet`) are
 * preserved by the URL/searchParams API.
 */
export function withUTM(url: string, source: string, placement: string): string {
  const u = new URL(url)
  u.searchParams.set('utm_source',   source)
  u.searchParams.set('utm_medium',   'organic')
  u.searchParams.set('utm_campaign', 'home_launch_v1')
  u.searchParams.set('utm_content',  placement)
  return u.toString()
}
