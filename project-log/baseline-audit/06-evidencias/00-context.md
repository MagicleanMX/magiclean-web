# CONTEXTO DE AUDITORÍA — EVIDENCIAS

**Fecha de ejecución:** 20 de abril de 2026  
**Ejecutor:** Claude Code  
**Proyecto:** magiclean-landing  
**Directorio:** `/Users/jacobolevy/Desktop/magicclean/`  
**Repositorio:** https://github.com/MagicleanMX/magiclean-web.git  

## Estado del repositorio al momento de la auditoría

**Rama:** `main`  
**Último commit:** `da4ed14162b018befaa8ea2ba4c7179e0564e06c`  
**Fecha commit:** 2026-04-18 11:15:40 -0600  
**Mensaje:** `fix: add responsive sizes to hero image`  

## Últimos 10 commits
```
da4ed14 fix: add responsive sizes to hero image
e486afe fix: enable avif/webp and responsive image sizes
e1bd709 fix: replace missing logo.png with svg logo in json-ld
db33d3d fix: add robots and sitemap via app router
74cef43 fix: add favicon and apple touch icon
a7701ef fix: correct framer motion initial opacity (7 files)
c32a220 fix: correct OG image extension and add TODO for proper OG asset
bd5d7d3 design: Apple/Rolex container audit — aspect ratios, image slots, hover effects (#9)
5e6df48 a11y: WCAG AA contrast fixes + typography readability improvements
02020bf fix: change 99.9% to 99% across all components
```

## Stack verificado
- Next.js 16.2.3 (Turbopack)
- React 19.2.4
- Tailwind CSS v4 (CSS-first config)
- Supabase JS 2.103.0
- Resend 6.10.0
- Framer Motion 12.38.0
- Lucide React 0.577.0
- @vercel/analytics 2.0.1
- @vercel/speed-insights 2.0.0

## Archivos de configuración verificados
- `next.config.ts` — headers de seguridad ✅
- `.gitignore` — cubre todos los `.env*` ✅
- `.env.example` — solo placeholders, no secretos reales ✅
- `src/app/globals.css` — tokens de diseño definidos ✅
- `tsconfig.json` — strict mode activado ✅
- `supabase_leads_table.sql` — RLS policy definida en código ✅ (no verificada en producción)

## Comandos ejecutados

| Comando | Resultado |
|---------|-----------|
| `git log --all -- '.env*'` | Sin commits de archivos .env |
| `tsc --noEmit` | 0 errores |
| `npm run build` | ✅ Build exitoso, 0 warnings |
| `npm audit --production` | 0 vulnerabilidades |
| `npm run lint` | ❌ Error de configuración (next lint --dir flag) |
| `grep -rn "NEXT_PUBLIC_" src/` | 0 variables NEXT_PUBLIC_ en uso |
| `grep -rn "ts-ignore\|eslint-disable" src/` | 0 supresiones |
| `grep -rn "console.log" src/` | 0 console.log (solo console.error en API route) |
| `grep -rn "ErrorBoundary\|error.tsx" src/` | 0 error boundaries |
| `grep -r "sentry" src/` | 0 — Sentry no instalado |
| `sips hero-main.png` | 2752×1536px (OG debe ser 1200×630) |
