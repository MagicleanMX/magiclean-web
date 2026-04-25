import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/config'
import productsData from '@/lib/products.json'

type ProductMin = {
  sku: string
  estado: 'activo' | 'descontinuado' | 'en_desarrollo'
}

const activeSkus = (productsData as ProductMin[])
  .filter((p) => p.estado === 'activo')
  .map((p) => p.sku)

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/productos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...activeSkus.map((sku) => ({
      url: `${siteUrl}/productos/${sku}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/aviso-de-privacidad`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terminos-de-uso`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
