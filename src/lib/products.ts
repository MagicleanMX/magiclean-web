/**
 * editorial-content.ts (legacy filename: products.ts)
 *
 * Editorial copy y datos hardcoded usados en componentes
 * del landing. NO contiene products — los productos viven
 * en src/lib/products.json (consolidado en Sprint B).
 *
 * Exports activos:
 * - CANALES, MARKETPLACES, NEOSHIELD_STATS, NEOSHIELD_FEATURES
 * - PROBLEMAS, BENEFICIOS, PASOS, METRICAS
 * - NOSOTROS_STATS, NOSOTROS_VALORES
 *
 * DEUDA Sprint D: renombrar archivo a editorial-content.ts
 * para reflejar contenido real (8 imports a actualizar).
 */

// ─── Brand ────────────────────────────────────────────────────────────────────
export const CANALES = ['HOGAR', 'RETAIL', 'HORECA', 'INDUSTRIAL', 'INSTITUCIONAL'] as const

export const MARKETPLACES = ['MercadoLibre', 'Amazon', 'Walmart'] as const

// ─── NeoShield™ ───────────────────────────────────────────────────────────────
// Only tech-differentiating stats live here. Portfolio breadth (23 solutions) and
// distribution reach (3 marketplaces) are owned by Hero/SocialProof/Nosotros.
export const NEOSHIELD_STATS = [
  { target: 99,  suffix: '%', label: 'Eliminación de bacterias' },
  { target: 3,   suffix: '×', label: 'Mayor duración vs competencia' },
  { target: 0,   suffix: '',  label: 'Químicos adicionales' },
  { target: 100, suffix: '%', label: 'Producción profesional certificada' },
] as const

export const NEOSHIELD_FEATURES = [
  'Acción antibacterial activa entre lavados',
  'Validado por laboratorio certificado independiente',
  'Compatible con todos los protocolos HORECA',
] as const

// ─── Por qué elegirnos ────────────────────────────────────────────────────────
export const PROBLEMAS = [
  {
    titulo: 'Calidad que se sostiene',
    desc: 'Fibras profesionales con tecnología NeoShield™. Mantienen rendimiento más allá del primer uso. Menos reposición para tu cliente final.',
  },
  {
    titulo: 'Estructura comercial competitiva',
    desc: 'Precio por caja optimizado. Mejor costo unitario que multinacionales. Margen saludable para distribuidores y retailers.',
  },
  {
    titulo: 'Un solo proveedor para todo el ciclo',
    desc: '23 soluciones profesionales. Fibras, sistemas mop, accesorios y repuestos. Un catálogo. Un equipo. Un estándar.',
  },
] as const

// ─── Beneficios Clave ─────────────────────────────────────────────────────────
export const BENEFICIOS = [
  {
    numero: '3×',
    titulo: 'Durabilidad',
    descripcion: 'Más duración que una fibra convencional. Abrasividad constante de inicio a fin. Sin deterioro con el uso. Menos reposición, mejor costo por unidad.',
  },
  {
    numero: '0%',
    titulo: 'Cero contaminación cruzada',
    descripcion: 'Diseño profesional certificado. Cumple con protocolos HACCP, ISO 22000 y normativas sanitarias para operaciones HORECA e institucionales.',
  },
  {
    numero: '30%',
    titulo: 'Eco-Friendly',
    descripcion: 'Materiales eco-friendly en cada producto. Menos reposición equivale a menos desperdicio. Rendimiento profesional con responsabilidad ambiental.',
  },
] as const

// ─── How It Works ─────────────────────────────────────────────────────────────
export const PASOS = [
  {
    num: '01',
    titulo: 'Consulta',
    desc: 'Cuéntanos las necesidades específicas de tu negocio. Analizamos tu canal y volumen.',
  },
  {
    num: '02',
    titulo: 'Propuesta',
    desc: 'Recibe tu cotización personalizada en menos de 24 horas hábiles.',
  },
  {
    num: '03',
    titulo: 'Entrega',
    desc: 'Logística eficiente a todo México. Tu pedido en tiempo y forma.',
  },
  {
    num: '04',
    titulo: 'Soporte',
    desc: 'Acompañamiento técnico continuo y reposición garantizada.',
  },
] as const

// ─── Social Proof ─────────────────────────────────────────────────────────────
export const METRICAS = [
  { n: '3+',               label: 'Marketplaces activos' },
  { n: '23',               label: 'Soluciones en portafolio' },
  { n: 'CDMX · GDL · MTY', label: 'Cobertura nacional' },
] as const

// ─── Nosotros ─────────────────────────────────────────────────────────────────
export const NOSOTROS_STATS = [
  { n: '3',  label: 'Años de crecimiento acelerado' },
  { n: '23', label: 'Soluciones especializadas' },
  { n: '3',  label: 'Marketplaces líderes' },
  { n: '5+', label: 'Líneas de producto activas' },
] as const

export const NOSOTROS_VALORES = [
  {
    num: '01',
    titulo: 'Tecnología NeoShield™ — Desarrollada para ganar',
    desc: 'Fibra antibacterial con micropartículas integradas al polímero. No se lava, no se deteriora. La misma tecnología que nos llevó a liderar en MercadoLibre y Amazon.',
  },
  {
    num: '02',
    titulo: 'Del e-commerce al canal profesional.',
    desc: 'Nuestro M2 es uno de los mops más vendidos en Amazon México. El M1 crece con fuerza. Y apenas estamos empezando en retail y distribución.',
  },
  {
    num: '03',
    titulo: '23 soluciones. Un portafolio para cada canal.',
    desc: 'Fibras, sistemas mop y accesorios para hogar, retail, HORECA e institucional. Cada producto diseñado con propósito — no fabricamos volumen, fabricamos soluciones.',
  },
  {
    num: '04',
    titulo: 'Crecimiento con respaldo real',
    desc: 'Presencia activa en MercadoLibre, Amazon y Walmart Marketplace. Cada distribuidor tiene seguimiento directo con nuestro equipo comercial — sin intermediarios, sin formularios perdidos.',
  },
] as const

