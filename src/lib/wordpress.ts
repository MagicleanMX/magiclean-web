/**
 * src/lib/wordpress.ts
 * GraphQL client for WordPress Headless (WPGraphQL).
 *
 * Naming convention:
 *   - Internal (field names, interfaces, variables) → English
 *   - Visible content (strings, copy, CTAs)         → Spanish (comes from WP CMS)
 */

// ─── Base URL ─────────────────────────────────────────────────────────────────

const WP_GRAPHQL_URL = process.env.WP_GRAPHQL_URL

if (!WP_GRAPHQL_URL) {
  throw new Error(
    '[wordpress.ts] WP_GRAPHQL_URL is not defined. ' +
    'Add WP_GRAPHQL_URL=http://magiclean-wordpress.local/graphql to .env.local'
  )
}

// ─── Generic fetch ────────────────────────────────────────────────────────────

interface GQLResponse<T> {
  data?:   T
  errors?: Array<{ message: string }>
}

export async function fetchGraphQL<T>(
  query:      string,
  variables?: Record<string, unknown>,
  revalidate: number | false = 3600
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL as string, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ query, variables }),
    next:    { revalidate },
  })

  if (!res.ok) {
    throw new Error(
      `[WPGraphQL] HTTP ${res.status} ${res.statusText} — URL: ${WP_GRAPHQL_URL}`
    )
  }

  const json: GQLResponse<T> = await res.json()

  if (json.errors?.length) {
    const messages = json.errors.map((e) => e.message).join(' | ')
    throw new Error(`[WPGraphQL] Query errors: ${messages}`)
  }

  if (!json.data) {
    throw new Error('[WPGraphQL] Response has no "data" field.')
  }

  return json.data
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
// All property names are English.
// All string values (content) are Spanish and come from WordPress CMS.
// ─────────────────────────────────────────────────────────────────────────────

export interface WPGeneralSettings {
  title:       string
  description: string
  url:         string
}

export interface WPCta {
  label: string
  url:   string
}

export interface WPStat {
  value: string   // e.g. "3", "23", "ML · AMZ · WMT"
  label: string   // e.g. "Años de crecimiento"
}

export interface WPImage {
  sourceUrl:    string
  altText:      string
  mediaDetails: { width: number; height: number }
}

// ── Hero ──────────────────────────────────────────────────────────────────────
// ACF field group name:     home_hero
// GraphQL field name:       homeHero
// WordPress ACF field names (for reference when creating in WP Admin):
//   hero_eyebrow, hero_headline, hero_subheadline, hero_microtext,
//   hero_primary_cta {label, url}, hero_secondary_cta {label, url},
//   hero_image (Image field), hero_stats repeater {value, label}

export interface WPHero {
  eyebrow:      string
  headline:     string
  subheadline:  string
  microtext:    string
  primaryCta:   WPCta
  secondaryCta: WPCta
  image:        WPImage | null
  stats:        WPStat[]
}

// ── About (Nosotros) ──────────────────────────────────────────────────────────
// ACF field group name:     home_about
// GraphQL field name:       homeAbout
// WordPress ACF field names:
//   about_eyebrow, about_headline, about_body,
//   about_stats repeater {value, label},
//   about_values repeater {number, title, description},
//   about_marketplaces repeater {name},
//   about_cta_label, about_cta_url

export interface WPAboutValue {
  number:      string   // "01", "02" …
  title:       string
  description: string
}

export interface WPAbout {
  eyebrow:      string
  headline:     string
  body:         string
  stats:        WPStat[]
  values:       WPAboutValue[]
  marketplaces: Array<{ name: string }>
  ctaLabel:     string
  ctaUrl:       string
}

// ── Categories (Colección) ────────────────────────────────────────────────────
// ACF field group name:     home_categories
// GraphQL field name:       homeCategories
// WordPress ACF field names:
//   categories_eyebrow, categories_title,
//   categories_items repeater {
//     name, subtitle, description,
//     models (Text CSV: "F1, F2, F3"),
//     channel, badge, background_color, accent_color,
//     anchor, uses (Text CSV: "Cocinas industriales, Ollas")
//   }

export interface WPCategory {
  name:            string
  subtitle:        string
  description:     string
  models:          string   // CSV — parse with .split(',') in component
  channel:         string
  badge:           string
  backgroundColor: string   // hex e.g. "#F0F7F0"
  accentColor:     string   // hex e.g. "#2D7A2D"
  anchor:          string   // e.g. "#fibra-dual-f4"
  uses:            string   // CSV — parse with .split(',') in component
}

export interface WPCategories {
  eyebrow: string
  title:   string
  items:   WPCategory[]
}

// ── Distributors CTA ──────────────────────────────────────────────────────────
// ACF field group name:     home_distributors
// GraphQL field name:       homeDistributors
// WordPress ACF field names:
//   distributors_eyebrow, distributors_headline, distributors_body,
//   distributors_cta_label, distributors_cta_url, distributors_note,
//   distributors_zones repeater {city}

export interface WPDistributors {
  eyebrow:  string
  headline: string
  body:     string
  ctaLabel: string
  ctaUrl:   string
  note:     string
  zones:    Array<{ city: string }>
}

// ── Footer (ACF Options Page) ─────────────────────────────────────────────────
// Options page slug:        site-settings
// GraphQL root field:       siteSettings
// ACF field group name:     footer
// WordPress ACF field names:
//   footer_description, footer_email, footer_whatsapp,
//   footer_columns repeater {title, links (Textarea "Label|URL" per line)},
//   footer_social_links repeater {name, url},
//   footer_legal repeater {label, url}

export interface WPFooterColumn {
  title: string
  links: string   // "Label|URL" per line — parse in component
}

export interface WPFooter {
  description:  string
  email:        string
  whatsapp:     string
  columns:      WPFooterColumn[]
  socialLinks:  Array<{ name: string; url: string }>
  legal:        Array<{ label: string; url: string }>
}

// ─────────────────────────────────────────────────────────────────────────────
// QUERIES
// ─────────────────────────────────────────────────────────────────────────────

// ── Phase 1: connection test ──────────────────────────────────────────────────

const SETTINGS_QUERY = /* GraphQL */ `
  query GetSettings {
    generalSettings {
      title
      description
      url
    }
  }
`

export async function getWPSettings(): Promise<WPGeneralSettings> {
  const data = await fetchGraphQL<{ generalSettings: WPGeneralSettings }>(
    SETTINGS_QUERY,
    undefined,
    false   // static — never changes
  )
  return data.generalSettings
}

// ── Hero section ──────────────────────────────────────────────────────────────
// Grows field by field as ACF fields are added to homeHero in WordPress.
// Returns null on any error so Hero.tsx falls back to hardcoded values.

export interface HeroSection {
  eyebrow:       string
  headline:      string
  subheadline:   string
  heroMicrotext: string
}

const HERO_QUERY = /* GraphQL */ `
  query GetHeroSection {
    page(id: "/home", idType: URI) {
      homeHero {
        eyebrow
        headline
        subheadline
        heroMicrotext
      }
    }
  }
`

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const data = await fetchGraphQL<{
      page: { homeHero: HeroSection }
    }>(HERO_QUERY, undefined, 3600)

    return data.page?.homeHero ?? null
  } catch (err) {
    console.error('[getHeroSection] Falling back to defaults:', err)
    return null
  }
}

// ── Home metrics ─────────────────────────────────────────────────────────────
// ACF field group name (WordPress):  home_metrics
// GraphQL field name:                homeMetrics
// ACF field names → GraphQL names:
//   growth_years   → growthYears    (Text)
//   marketplaces   → marketplaces   (Text)
//   models_count   → modelsCount    (Text)

export interface HomeMetrics {
  growthYears:  string   // e.g. "3"
  marketplaces: string   // e.g. "MercadoLibre · Amazon · Walmart"
  modelsCount:  string   // e.g. "23"
}

const METRICS_QUERY = /* GraphQL */ `
  query GetHomeMetrics {
    page(id: "/home", idType: URI) {
      homeMetrics {
        growthYears
        marketplaces
        modelsCount
      }
    }
  }
`

export async function getMetrics(): Promise<HomeMetrics | null> {
  try {
    const data = await fetchGraphQL<{
      page: { homeMetrics: HomeMetrics }
    }>(METRICS_QUERY, undefined, 3600)

    return data.page?.homeMetrics ?? null
  } catch (err) {
    console.error('[getMetrics] Falling back to defaults:', err)
    return null
  }
}

// ── Home Categories (section header) ─────────────────────────────────────────
// ACF field group name:     home_categories   (mu-plugin registered)
// GraphQL field name:       homeCategories
// ACF field names → GraphQL names:
//   categories_eyebrow   → eyebrow    (Text)
//   categories_headline  → headline   (Text)
//   categories_cta_text  → ctaText    (Text)
//   categories_cta_link  → ctaLink    (Text)
//   categories_microtext → microtext  (Text)
//
// Note: individual product cards are design-driven and remain hardcoded.

export interface CategoriesSection {
  eyebrow:  string   // e.g. "La Colección"
  headline: string   // e.g. "Productos MagicClean"
  ctaText:  string   // e.g. "Ver catálogo completo"
  ctaLink:  string   // e.g. "#contacto"
  microtext: string  // e.g. "23 modelos · 2 líneas de producto"
}

const CATEGORIES_QUERY = /* GraphQL */ `
  query GetHomeCategoriesSection {
    page(id: "/home", idType: URI) {
      homeCategories {
        eyebrow
        headline
        ctaText
        ctaLink
        microtext
      }
    }
  }
`

export async function getCategoriesSection(): Promise<CategoriesSection | null> {
  try {
    const data = await fetchGraphQL<{
      page: { homeCategories: CategoriesSection }
    }>(CATEGORIES_QUERY, undefined, 3600)

    return data.page?.homeCategories ?? null
  } catch (err) {
    console.error('[getCategoriesSection] Falling back to defaults:', err)
    return null
  }
}

// ── Home Distributors CTA ─────────────────────────────────────────────────────
// ACF field group name:     home_distributors  (mu-plugin registered)
// GraphQL field name:       homeDistributors
// ACF field names → GraphQL names:
//   distributors_eyebrow   → eyebrow   (Text)
//   distributors_headline  → headline  (Text)
//   distributors_body      → body      (Textarea)
//   distributors_cta_label → ctaLabel  (Text)
//   distributors_cta_url   → ctaUrl    (Text)
//   distributors_note      → note      (Text)
//   distributors_zones     → zones     (Text — comma-separated cities)

export interface DistribuidoresSection {
  eyebrow:  string   // e.g. "Únete a la red"
  headline: string   // e.g. "Conviértete en distribuidor MagicClean"
  body:     string   // main paragraph
  ctaLabel: string   // e.g. "Quiero ser distribuidor"
  ctaUrl:   string   // e.g. "#contacto"
  note:     string   // e.g. "+ 24 zonas más disponibles a nivel nacional"
  zones:    string   // comma-separated: "CDMX, Guadalajara, Monterrey, ..."
}

const DISTRIBUIDORES_QUERY = /* GraphQL */ `
  query GetHomeDistributors {
    page(id: "/home", idType: URI) {
      homeDistributors {
        eyebrow
        headline
        body
        ctaLabel
        ctaUrl
        note
        zones
      }
    }
  }
`

export async function getDistribuidoresSection(): Promise<DistribuidoresSection | null> {
  try {
    const data = await fetchGraphQL<{
      page: { homeDistributors: DistribuidoresSection }
    }>(DISTRIBUIDORES_QUERY, undefined, 3600)

    return data.page?.homeDistributors ?? null
  } catch (err) {
    console.error('[getDistribuidoresSection] Falling back to defaults:', err)
    return null
  }
}

// ── Phase 2: full home in one request ─────────────────────────────────────────
// Uncomment once ACF Field Groups are created in WordPress Admin.
//
// GraphQL field names below match the "GraphQL Field Name" you set in each
// ACF Field Group settings panel (Show in GraphQL → GraphQL Field Name).
//
// ACF field name        →  GraphQL field name (camelCase, WPGraphQL converts automatically)
// hero_eyebrow          →  eyebrow
// hero_primary_cta      →  primaryCta  { label url }
// about_body            →  body
// distributors_zones    →  zones       { city }
// footer_social_links   →  socialLinks { name url }
// ... (all follow the same snake_case → camelCase rule)

/*
const HOME_QUERY = /* GraphQL * / `
  query GetHomePage {
    page(id: "/home", idType: URI) {

      homeHero {
        eyebrow
        headline
        subheadline
        microtext
        primaryCta   { label url }
        secondaryCta { label url }
        image { sourceUrl altText mediaDetails { width height } }
        stats { value label }
      }

      homeAbout {
        eyebrow
        headline
        body
        stats        { value label }
        values       { number title description }
        marketplaces { name }
        ctaLabel
        ctaUrl
      }

      homeCategories {
        eyebrow
        title
        items {
          name subtitle description
          models channel badge
          backgroundColor accentColor anchor uses
        }
      }

      homeDistributors {
        eyebrow
        headline
        body
        ctaLabel ctaUrl note
        zones { city }
      }
    }

    siteSettings {
      footer {
        description email whatsapp
        columns     { title links }
        socialLinks { name url }
        legal       { label url }
      }
    }
  }
`

interface HomeData {
  page: {
    homeHero:         WPHero
    homeAbout:        WPAbout
    homeCategories:   WPCategories
    homeDistributors: WPDistributors
  }
  siteSettings: { footer: WPFooter }
}

export async function getHomePage(): Promise<HomeData> {
  return fetchGraphQL<HomeData>(HOME_QUERY, undefined, 3600)
}
*/
