// Single source of truth para descargables de catálogo comercial físico.
// Consumido por Categories.tsx (hero CTA), Footer.tsx (link útil),
// Navbar.tsx (mega-menú). Si cambian los PDFs o se suma un 3º catálogo,
// actualizar solo aquí. Los archivos físicos viven en public/docs/.

export const CATALOG_PDFS = [
  {
    id: 'fibras' as const,
    label: 'Catálogo Fibras',
    labelShort: 'Fibras',
    sizeLabel: 'PDF · 12MB',
    sizeA11y: '12 megabytes',
    url: '/docs/Catalogo_Fibras.pdf',
  },
  {
    id: 'mops' as const,
    label: 'Catálogo Mops',
    labelShort: 'Mops',
    sizeLabel: 'PDF · 3MB',
    sizeA11y: '3 megabytes',
    url: '/docs/Catalogo_Mops.pdf',
  },
] as const

export type CatalogId = typeof CATALOG_PDFS[number]['id']
