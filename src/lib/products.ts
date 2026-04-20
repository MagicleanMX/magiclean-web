// ─── Brand ────────────────────────────────────────────────────────────────────
export const CANALES = ['HOGAR', 'RETAIL', 'HORECA', 'INDUSTRIAL', 'INSTITUCIONAL'] as const

export const MARKETPLACES = ['MercadoLibre', 'Amazon', 'Walmart'] as const

// ─── NeoShield™ ───────────────────────────────────────────────────────────────
// Only tech-differentiating stats live here. Portfolio breadth (23 models) and
// distribution reach (3 marketplaces) are owned by Hero/SocialProof/Nosotros.
export const NEOSHIELD_STATS = [
  { target: 99,  suffix: '%',     label: 'Eliminación de bacterias' },
  { target: 3,   suffix: '×',     label: 'Mayor duración vs competencia' },
  { target: 3,   suffix: ' años', label: 'De I+D en laboratorio' },
  { target: 100, suffix: '%',     label: 'Protección permanente' },
] as const

export const NEOSHIELD_FEATURES = [
  'Micropartículas de plata coloidal integradas al polímero',
  'Acción antibacterial permanente — no se lava, no se deteriora',
  'Validado por laboratorio certificado independiente',
  'Compatible con todos los protocolos de higiene HORECA',
] as const

// ─── El Problema ──────────────────────────────────────────────────────────────
export const PROBLEMAS = [
  {
    titulo: 'Se deterioran en días',
    desc: 'La abrasividad de una fibra convencional cae un 40% en la primera semana. Reemplazas más. Gastas más. Y el resultado es el mismo.',
  },
  {
    titulo: 'Acumulan lo que deberían eliminar',
    desc: 'Sin protección antibacterial, cada uso redistribuye contaminación en vez de eliminarla. Limpiar no es lo mismo que desinfectar.',
  },
  {
    titulo: 'Un proveedor para cada cosa',
    desc: 'Fibras de un lado, mops de otro, accesorios de otro. Sin estándar, sin soporte, sin una sola llamada que lo resuelva.',
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
    numero: '99%',
    titulo: 'Antibacterial',
    descripcion: 'Bacterias eliminadas. Micropartículas de plata coloidal integradas al polímero. No se lavan, no se deterioran. Sin químicos adicionales. Certificado por laboratorio independiente.',
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
  { n: '23',               label: 'Modelos en portafolio' },
  { n: 'CDMX · GDL · MTY', label: 'Cobertura nacional' },
] as const

// ─── Nosotros ─────────────────────────────────────────────────────────────────
export const NOSOTROS_STATS = [
  { n: '3',  label: 'Años de crecimiento acelerado' },
  { n: '23', label: 'Modelos especializados' },
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
    titulo: '23 modelos. Un portafolio para cada canal.',
    desc: 'Fibras, sistemas mop y accesorios para hogar, retail, HORECA e institucional. Cada producto diseñado con propósito — no fabricamos volumen, fabricamos soluciones.',
  },
  {
    num: '04',
    titulo: 'Crecimiento con respaldo real',
    desc: 'Presencia activa en MercadoLibre, Amazon y Walmart Marketplace. Cada distribuidor tiene seguimiento directo con nuestro equipo comercial — sin intermediarios, sin formularios perdidos.',
  },
] as const

// ─── Portafolio — Familias ────────────────────────────────────────────────────
export const FAMILIAS = [
  {
    id: 'fibras-verdes',
    anchor: '#contacto',
    nombre: 'Fibras Verdes',
    subtitulo: 'Limpieza Pesada y Profunda',
    descripcion: 'Alta abrasividad para cocinas industriales. Modelos F1, F2 y F3 en tres tamaños.',
    modelos: ['F1', 'F2', 'F3'],
    canal: 'HORECA · Industrial · Hogar',
    badge: null,
    color: '#F0F7F0',
    accentColor: '#2D7A2D',
    abrasividad: 5,
    usos: ['Cocinas industriales', 'Ollas y sartenes', 'Superficies de acero'],
  },
  {
    id: 'fibra-dual',
    anchor: '#fibra-dual-f4',
    nombre: 'Fibra Esponja Dual F4',
    subtitulo: 'Dualidad Inteligente',
    descripcion: 'Fibra verde de alta abrasividad por un lado, esponja suave por el otro. El más versátil.',
    modelos: ['F4'],
    canal: 'Hogar · Retail · HORECA',
    badge: 'Más popular',
    color: '#FFFBF0',
    accentColor: '#B45309',
    abrasividad: 5,
    usos: ['Vajilla', 'Ollas y sartenes', 'Encimeras de cocina'],
  },
  {
    id: 'fibras-especiales',
    anchor: '#contacto',
    nombre: 'Fibras Especiales',
    subtitulo: 'Para Cada Superficie',
    descripcion: 'F5 Negra para parrillas y hornos. F6 Blanca para baños. F7 Azul sin rayas para superficies delicadas.',
    modelos: ['F5', 'F6', 'F7'],
    canal: 'Hogar · HORECA · Institucional',
    badge: null,
    color: '#F0F4FF',
    accentColor: '#0052CC',
    abrasividad: null,
    usos: ['Parrillas y hornos', 'Baños', 'Cristal y cerámica'],
  },
  {
    id: 'borradores',
    anchor: '#contacto',
    nombre: 'Borradores Mágicos',
    subtitulo: 'Borra lo Imposible',
    descripcion: 'F8 con esponja para limpieza profunda. F9 el borrador puro. Eliminan manchas sin esfuerzo.',
    modelos: ['F8', 'F9'],
    canal: 'Hogar · Retail',
    badge: null,
    color: '#F5F0FF',
    accentColor: '#6D28D9',
    abrasividad: null,
    usos: ['Manchas difíciles', 'Paredes', 'Electrodomésticos'],
  },
  {
    id: 'sistemas-mop',
    anchor: '#sistemas-mop-m1',
    nombre: 'Sistemas Mop',
    subtitulo: 'Trapeado Profesional',
    descripcion: 'Turbo Magic M1 con pedal, Spin Magic M2 sin pedal, Rectangular M5, Doble Función M6, Atomizador M9.',
    modelos: ['M1', 'M2', 'M5', 'M6', 'M9'],
    canal: 'HORECA · Industrial · Hogar',
    badge: 'HORECA Ready',
    color: '#EFF6FF',
    accentColor: '#0076FF',
    abrasividad: null,
    usos: ['Pisos comerciales', 'Hoteles y restaurantes', 'Uso doméstico'],
  },
  {
    id: 'accesorios',
    anchor: '#contacto',
    nombre: 'Accesorios',
    subtitulo: 'Complementos del Sistema',
    descripcion: 'Cubetas, cepillos, trapeador de silicón, recogedor-escoba y repuestos para todos los modelos.',
    modelos: ['M3', 'M4', 'M7', 'M16', 'M17', 'M18'],
    canal: 'Todos los canales',
    badge: null,
    color: '#F5F7FA',
    accentColor: '#ADB3BA',
    abrasividad: null,
    usos: ['Repuestos mopa', 'Cepillo de baño', 'Cubeta plegable'],
  },
] as const
