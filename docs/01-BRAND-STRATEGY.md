# 01 — Estrategia de Marca MagiClean

**Última actualización:** 2026-04-21

Este documento consolida las decisiones de marca tomadas por Jacobo Levy el 21 de abril de 2026 durante la sesión de auditoría total y planning. Cualquier cambio futuro se registra también en `03-DECISIONS-LOG.md`.

## 1. Identidad legal vs marca

- **Entidad legal (razón social):** `Prolim BH, SA de CV`
- **Marca principal:** `MagiClean®` (IMPI título emitido)
- **Tecnología:** `NeoShield™` (IMPI en trámite)
- **RFC:** no se publica en landing

Nunca usar `MagiClean S.A. de C.V.` — esa entidad no existe.

## 2. Naming canónico de marca

- **Correcto:** `MagiClean` (M mayúscula, C mayúscula, una palabra)
- **Con símbolo de registro:** `MagiClean®` (en footer, legales, metadata oficial)
- **Variantes históricas incorrectas en código:** `MagicClean` (doble C), `Magiclean` (una palabra todo minúscula), `magiclean` (lowercase técnico)
- **Excepciones válidas al canónico:** dominios (`magiclean.mx`), DSN técnicos, URLs, nombres de repo

## 3. Identidad visual

### Paleta primaria (tokens en `globals.css`)

- Azul primary: `#0076FF`
- Azul primary-dark: `#0052CC` (usar sobre fondos oscuros para pasar AA)
- Rojo accent: `#FF2B2B`
- Navy deep: `#0A1628`
- Navy deep-darker: `#060e1e`

### Paleta neutral

- Ink: `#1A1A1A`
- Ink-legal: `#444444`
- Ink-muted: `#666666`
- Ink-subtle: `#6B7280`
- Surface: `#F5F7FA`
- Surface variants: `#FAFAFA`, `#F0F5FF`, `#FFFBF0`, `#FFF0F0`
- Border: `#E8EAED`
- Border-strong: `#E0E3E8`

### Tipografía

- **Sans:** Montserrat (UI, body) — variantes 400/500/600/700/900
- **Serif:** Playfair Display (headlines editoriales) — 400 y 700, con itálica

### Logo

- Wordmark "Magi" rojo + "Clean" azul
- Tagline histórico: "Dura, Dura y Dura" (packaging)
- SVG vectorial pendiente (hoy es raster PNG 1.1MB)

## 4. Voice y tono

**Dual voice integrado** en cada sección:

- Capa aspiracional → inspiración, historia, emoción → hero, nosotros, valores
- Capa técnica → specs, datos, márgenes, certificaciones → productos, logística, distribuidor

Referencias correctas: **Tesla, Dyson Professional, Hermès Horizons**.

Referencias incorrectas si se aplican solas:
- Solo Apple → pura emoción, sin base B2B
- Solo Ecolab → plano técnico, sin marca diferenciada

## 5. Arquitectura de marca dual

- **MagiClean** (estándar) → retail masivo, e-commerce, consumer final
- **MagiClean PRO** (premium) → distribuidores, HORECA, mayoristas, retail cadenas

Empaques diferenciados, precio diferenciado. Misma marca paraguas. Misma tecnología NeoShield™.

## 6. Posicionamiento estratégico

> **La primera fibra mexicana que le gana a Scotch-Brite en laboratorio, con tecnología NeoShield™ propia y 45% de margen para el canal distribución.**

Claims que respaldan:
- Tecnología propia con patente en trámite
- Margen distribuidor 2-2.5x vs competencia directa
- BioBase PRO+ superando Scotch-Brite P-94 en desarrollo
- Fabricación optimizada México + China

## 7. Audiencia prioritaria

1. **Distribuidores y retail premium** (primary)
2. HORECA (secundaria)
3. Consumer final vía marketplaces (terciaria, prueba social)

## 8. Dominio y comunicaciones

- **Dominio oficial:** `magiclean.mx`
- **Dominio legacy:** `magicleanproducts.com` (redirigir o dar de baja)
- **Emails en implementación:** `hola@`, `ventas@`, `soporte@`, `noreply@` todos en `@magiclean.mx`
- **WhatsApp B2B:** en trámite con telco (número actual en código es placeholder)

## 9. Redes sociales

Handles en verificación. Si no son propios, reservar como defensa antes del lanzamiento:

- Facebook: `facebook.com/magiclean`
- Instagram: `instagram.com/magiclean`
- LinkedIn: `linkedin.com/company/magiclean`
- TikTok: `tiktok.com/@magiclean`

## 10. Cómo aplicar estas decisiones

- **En código:** ver `CLAUDE.md` sección "Reglas inmutables"
- **En copy nuevo:** revisar voice dual antes de publicar
- **En productos nuevos:** respetar arquitectura MagiClean / MagiClean PRO
- **En comunicaciones externas:** usar solo dominio y handles oficiales
- **En legales y metadata:** entidad es Prolim BH, SA de CV
