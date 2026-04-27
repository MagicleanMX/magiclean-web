# MagiClean Landing — Briefing para Claude Code

> **Este archivo se lee PRIMERO, antes de cualquier memoria interna o asunción.**
> **Si tu memoria contradice este archivo, el archivo manda.**

## Dónde estás

- **Proyecto:** MagiClean landing page
- **Tipo:** Next.js 16 app, frontend público B2B
- **Ubicación correcta:** `/Users/jacobolevy/Desktop/magicclean`
- **NO es:** `/Projects_magiclean/magiclean-crm` (ese es otro proyecto, el CRM interno, fuera de scope)
- **Dueño del proyecto:** Jacobo Levy, fundador de Prolim BH, SA de CV

## Identidad: empresa vs marca (CRÍTICO)

- **Razón social legal:** `Prolim BH, SA de CV`
- **Marca comercial principal:** `MagiClean®` (registro IMPI emitido, se puede usar ®)
- **Tecnología propia:** `NeoShield™` (en trámite IMPI, usar ™ hasta que emitan título)
- **Entidad ficticia que NO existe (nunca usar):** `MagiClean S.A. de C.V.` ni variantes

**Regla de uso:**
- En copy comercial (hero, headlines, productos): usar `MagiClean` sin símbolo para no saturar visualmente
- En footer, legales, metadata Google, emails firma: usar `MagiClean®` con símbolo
- En menciones de la tecnología: siempre `NeoShield™`
- En contextos legales (aviso, términos, responsable LFPDPPP): siempre `Prolim BH, SA de CV`

## Stack técnico

- Next.js 16.2.3 con Turbopack
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4 (tokens en `src/app/globals.css` vía `@theme`)
- Supabase (tabla `leads` con RLS activo)
- Sentry (errors + replay)
- Resend (transactional email)
- Upstash Redis (rate limit, sliding window 10/hr)
- Vercel Analytics + Speed Insights
- framer-motion para animaciones
- lucide-react para íconos

**NO usamos:** Redux, tRPC, Prisma, React Query, Styled Components, Emotion.

## Hosting y dominios

- **Next.js hosting:** Vercel (project: magiclean-web). NO migrar a SiteGround/Kinsta.
- **WordPress** (si se activa como CMS headless en Sprint F): va a Kinsta o WP Engine, separado del Next.js.
- **Dominio oficial:** `magiclean.mx`
- **Dominio legacy:** `magicleanproducts.com` (a redirigir o dar de baja post-lanzamiento)
- **Dev server local:** puerto 3006

## Comandos clave

- Dev: `npm run dev -- -p 3006`
- Build: `npm run build`
- Lint: `npm run lint` (debe dar 0 errors)
- TypeCheck: `npx tsc --noEmit` (debe dar 0 errors)
- No hay script de tests (deuda conocida)

## Branch strategy

- `main` — intacta, no mergear automático
- `feat/brand-identity` — base de trabajo actual
- Cualquier sprint trabaja en su propia branch derivada de `feat/brand-identity`
- Mergear a `feat/brand-identity` solo con aprobación explícita del dueño

## Reglas inmutables

Estas reglas NO se saltan sin autorización explícita del dueño en el chat activo:

1. **Forma canónica del nombre: `MagiClean`** (M y C ambas mayúsculas, una sola palabra). La variante histórica `MagicClean` (doble C) fue migrada en Sprint I 2026-04-26 (PR #36) — 25/25 ocurrencias en `src/` reemplazadas. Si volvés a ver `MagicClean` en código nuevo, es regresión: corregilo. Pendiente fuera de scope: email `magicleanproducts.com` (lowercase) — Sprint D, espera DNS Cloudflare.
2. **NO tocar `magiclean-theme/`** (WordPress legacy — decisión sobre su futuro pendiente, Sprint F post-lanzamiento).
3. **NO cambiar copy visible** (hero, headlines, CTAs, labels) sin aprobación explícita.
4. **NO mergear a `main`** desde ninguna branch sin OK explícito.
5. **NO borrar logos, badges o assets de marca** en `public/images/brand/` sin confirmación (excepto `_source/` que ya fueron movidos a `project-log/brand-sources/` en Sprint A).
6. **NO cambiar emails, dominios, WhatsApp sin autorización**. Los valores actuales pueden ser placeholders — verificar con el dueño.
7. **NO modificar `src/lib/products.ts`** sin confirmar con el dueño. Source of truth consolidado en `src/lib/products.json` (23 SKUs activos en landing). Catálogo comercial físico tiene 24 SKUs totales — M7 (Q-Beta) excluido intencional de la landing por descontinuación en curso. `FAMILIAS` deprecated en `products.ts` pendiente de eliminar en T12.
8. **NO escribir `MagiClean S.A. de C.V.`** o variantes (entidad ficticia). Razón social es siempre `Prolim BH, SA de CV`.
9. **NO incluir RFC en la landing pública** (decisión del dueño).
10. **Si una instrucción de branching genera conflictos técnicos**, parar y preguntar al dueño antes de cambiar la estrategia de branch. No decidir solo (lección aprendida en fix legal del 2026-04-21).
11. **Siempre correr `npm run lint` + `npx tsc --noEmit`** antes de cualquier commit final. Build debe pasar sin warnings nuevos.

## Antes de cualquier tarea, leer en este orden

1. **Siempre:** `docs/04-ACTIVE-SPRINTS.md` (qué sprint está activo)
2. **Si es fix técnico:** `project-log/sprints/` (cierres de sprints anteriores para contexto)
3. **Si toca copy o marca:** `docs/01-BRAND-STRATEGY.md`
4. **Si toca productos/SKUs:** `docs/02-PRODUCT-CATALOG.md`
5. **Si es decisión nueva:** agregar entrada en `docs/03-DECISIONS-LOG.md`

## Formato de commits

Conventional commits en inglés:

- `fix(área): descripción`
- `feat(área): descripción`
- `chore(área): descripción`
- `refactor(área): descripción`
- `perf(área): descripción`
- `a11y(área): descripción`
- `docs(área): descripción`

Commit body en inglés para contexto técnico. Si la decisión es estratégica y viene del dueño, mencionarlo.

## Al finalizar cualquier sprint

Crear `project-log/sprints/sprint-[id]-cierre.md` con:

```markdown
# Sprint [id] — [título] — [fecha YYYY-MM-DD]

## Objetivo
[1 línea]

## Qué se hizo
- [bullets]

## Commits
[git log --oneline del sprint]

## Qué quedó pendiente
- [bullets]

## Decisiones tomadas durante el sprint
- [referencia a docs/03-DECISIONS-LOG.md si aplica]

## Lecciones / notas para el futuro
- [observaciones]

## Siguiente sprint sugerido
[nombre]
```

## Información crítica del negocio

- **Empresa:** Prolim BH, SA de CV
- **Fundación:** 16 de junio de 2023
- **Ubicación fábrica:** Calle 3, No 47, Local 109, Col Industrial Alce Blanco, Naucalpan, Estado de México, CP 53370
- **Canales activos:** e-commerce (Amazon México, Mercado Libre, Walmart)
- **Canales en expansión:** distribuidores premium, retail cadenas, HORECA, mayoristas
- **Productos ganadores por volumen:** M1, M2 (mops con cubeta), F5, F6, F7 (fibras)
- **Productos débiles:** F1, F2, F3, F4 (fibras básicas sin calidad Scotch-Brite)
- **Producto en desarrollo:** BioBase PRO + Antibacterial (en China, llegada 2-4 meses, entra a línea PRO)
- **Margen distribuidor:** 40-45% (ventaja vs Scotch-Brite 18%)
- **Competidores:** Scotch-Brite (dominante premium), Vileda/O-Cedar (mops), 3M Commercial (B2B)

## Arquitectura de marca

- **MagiClean** (estándar) — retail masivo, e-commerce consumer
- **MagiClean PRO** (premium) — distribuidores, HORECA, mayoristas, retail cadenas

Modelo Scotch-Brite Consumer + Professional replicado.

## Voice del sitio

**Dual voice integrado** en cada sección:
- Capa aspiracional (Tesla, Dyson Professional, Hermès Horizons) → titulares, hero, historia
- Capa técnica (Ecolab, Diversey, 3M Commercial) → producto, specs, logística, distribuidor

Cada sección combina ambas capas. No separar por sección.

## Audiencia prioritaria

1. Distribuidores y retail premium (primary)
2. HORECA (secundaria)
3. Consumer final vía marketplaces (terciaria, como prueba social)

## Referencias competitivas

| Competidor | Qué imitar | Qué superar |
|---|---|---|
| Scotch-Brite | Sistema marketing, dualidad retail/pro, penetración anaquel | Margen distribuidor (40-45% vs 18%), innovación BioBase |
| Vileda / O-Cedar | Penetración mops retail y e-commerce | Innovación tecnológica, imagen premium |
| 3M Commercial | Seriedad B2B, specs técnicas | Velocidad innovación, marca mexicana |

## Último estado conocido

- **Branch activa al día 2026-04-21:** `fix/sprint-a-technical-debt` con 9 commits desde `feat/brand-identity` (8 de Sprint A + 1 de fix legal), esperando review del dueño
- **Performance mobile Lighthouse:** 77 (post Sprint A, subió desde 59)
- **Color contrast fails:** 3 restantes (requieren decisión del dueño sobre colores de marca)
- **Catálogo de productos:** consolidado en Sprint B (2026-04-23). Source of truth: `src/lib/products.json` con 23 SKUs activos. Catálogo comercial físico tiene 24 totales (M7 excluido intencional de landing — descontinuación en curso). Copy público dice "23 soluciones".

---

## Recordatorio final

Si algo no está en este archivo ni en `docs/`, **NO asumas. Preguntá al dueño en el chat activo antes de actuar.**

Última actualización: 2026-04-26
Próxima revisión sugerida: al inicio de cada sprint nuevo o cuando cambie una decisión estratégica.
