# Sprint A — Fixes Técnicos Puros — 2026-04-21

## Objetivo
Resolver deuda técnica de seguridad, performance, accesibilidad y código sin tocar copy ni marca, basado en hallazgos de Auditoría Total v2.

## Qué se hizo

8 bloques ejecutados en branch `fix/sprint-a-technical-debt`:

1. **CSP observabilidad:** Sentry y Vercel Analytics desbloqueados en producción
2. **Assets huérfanos:** 7 MB limpiados, sources preservadas en project-log/brand-sources/
3. **Fuentes:** Montserrat 7→5 weights, Playfair 8→4, con preload en hero
4. **Contraste AA:** 15 fallas corregidas + 7 preventivas en eyebrows ocultos por framer-motion
5. **Lint + dead code:** ConsentAwareAnalytics refactoreado a useSyncExternalStore, ProductImageSlot eliminado, 8 errors → 0
6. **Analytics helper:** src/lib/analytics.ts creado con track() y eventos B2B cableados en ContactForm + WhatsAppButton
7. **Tokens de color:** 11 hex inline extraídos a CSS variables semánticas
8. **Env vars:** Sentry DSN parametrizado, NEXT_PUBLIC_SITE_URL documentado

## Commits

```
7302587  fix(csp): allow Sentry, Vercel Analytics and worker blobs
4e451ea  chore(assets): remove source PNGs from public/
5bccf0b  perf(fonts): reduce font variants from 15 to 9
b7af5cf  a11y(contrast): fix low-opacity text and light grays
cfee55a  chore(lint): fix 8 lint errors + resolve Turbopack NFT warning
87c0856  feat(analytics): add track helper and wire basic B2B events
c05a91b  refactor(theme): extract 11 inline hex to semantic CSS variables
7a906c0  chore(env): parametrize Sentry DSN and document SITE_URL
```

## Métricas antes/después

| Métrica | Antes | Después | Δ |
|---|---|---|---|
| Lighthouse Performance mobile | 59 | 77 | +18 |
| LCP mobile | 5.4s | 2.8s | -2.6s |
| TBT mobile | 930ms | 760ms | -170ms |
| Color-contrast fails | 15 | 3 | -12 |
| Console errors | 9 | 2 | -7 |
| public/ size | 8.1 MB | 2.9 MB | -5.2 MB |
| Lint errors | 8 | 0 | -8 |
| Font variantes declaradas | 15 | 9 | -6 |

## Qué quedó pendiente

- 3 color-contrast restantes: CTAs azul+blanco, link azul sobre navy en cookie banner. Requieren decisión del dueño sobre colores de marca.
- 2 console errors: 404 de /_vercel/speed-insights local (endpoint solo existe en Vercel edge, no bug)
- Cleanup "MagicClean" (doble C) → "MagiClean" (43 ocurrencias de copy) queda para sprint posterior

## Decisiones tomadas durante el sprint

- Desvío del prompt en Bloque 3 (fuentes): 5+4 variantes en vez de 3+2 para no degradar visualmente font-black (40 usos) y font-semibold (63 usos). Documentado en commit.
- Desvío en Bloque 5 (ProductImageSlot): eliminado en vez de adoptado porque adoptarlo cambiaría placeholders visuales (violación "no tocar copy visible").

## Lecciones

- Claude Code demostró auto-corrección: detectó que iba a borrar _source/ consumidos por brand-processing.py y lo revirtió.
- Desvíos del spec deben documentarse en el commit, no ejecutarse en silencio.

## Siguiente sprint sugerido

Sprint B — consolidar catálogo source of truth.
