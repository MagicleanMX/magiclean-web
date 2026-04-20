export const siteUrl = (() => {
  const url = process.env.NEXT_PUBLIC_SITE_URL
  if (url) return url.replace(/\/$/, '')

  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[config] NEXT_PUBLIC_SITE_URL not set in production. Using Vercel subdomain fallback. Configure the env var in Vercel to use the canonical domain.'
    )
  }

  return 'https://magiclean-web.vercel.app'
})()
