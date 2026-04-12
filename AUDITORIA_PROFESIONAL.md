# AUDITORÍA PROFESIONAL — MagicClean Web
**URL en producción:** https://magiclean-web.vercel.app  
**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Vercel  
**Fecha de auditoría:** 2026-04-11  

---

## PARTE 1 — AUDITORÍA DE DISEÑO Y UX/UI FRONT-END

### PROMPT PARA AUDITOR DE DISEÑO

Eres un director creativo especialista en landing pages B2B de alto rendimiento y diseño editorial de lujo (referencia: Rolex.com, Dyson.com, Bang & Olufsen).

Audita esta landing page: **https://magiclean-web.vercel.app**

Evalúa los siguientes puntos con nota del 1 al 10 y recomendación accionable:

#### 1. PRIMERA IMPRESIÓN (0–3 segundos)
- ¿El hero comunica claramente qué vende la empresa y a quién?
- ¿El headline principal ("El arte de la limpieza perfecta") es convincente para un comprador B2B?
- ¿La jerarquía visual guía el ojo correctamente (headline → subheadline → CTA)?
- ¿El contraste y tipografía es legible en móvil y desktop?

#### 2. NAVEGACIÓN Y ARQUITECTURA
- ¿El mega menú es intuitivo para un distribuidor que busca un modelo específico?
- ¿Los 4 links (Productos / Tecnología / Distribuidores / Empresa) cubren lo esencial?
- ¿El menú móvil es funcional y usable?
- ¿El scroll flow de la página tiene un storytelling lógico?

#### 3. SECCIÓN PRODUCTOS (6 familias)
- ¿Las tarjetas de familia comunican suficiente información para tomar una decisión de compra?
- ¿El hover overlay es suficientemente visible?
- ¿Los chips con códigos (F1, F2, M1...) son claros para nuevos visitantes?
- ¿Falta alguna información clave en las tarjetas (precio referencial, formato de venta, disponibilidad)?

#### 4. SECCIONES EDITORIALES (ProductHeroF4, NeoShield, ProductHeroM1)
- ¿El storytelling de producto es convincente?
- ¿Las métricas (3×, 99.9%, 0) son creíbles y están bien presentadas?
- ¿Las secciones oscuras (NeoShield, ContactForm) rompen bien el ritmo visual?

#### 5. SECCIÓN NOSOTROS
- ¿Los 4 stats (15+ años, 500+ clientes, 23 modelos, 5 canales) son suficientes?
- ¿Los valores corporativos están bien descritos?
- ¿Falta algún elemento de confianza (certificaciones, premios, clientes conocidos)?

#### 6. FORMULARIO DE CONTACTO
- ¿Los campos son adecuados para una solicitud B2B?
- ¿Falta algún campo relevante (RFC, tipo de cliente, volumen estimado)?
- ¿El flujo de confirmación es claro?

#### 7. FOOTER
- ¿La información de contacto es suficiente?
- ¿Falta alguna sección en el footer?
- ¿Las redes sociales están correctamente posicionadas?

#### 8. ELEMENTOS DE CONFIANZA (TRUST SIGNALS)
- ¿Hay suficientes elementos que generen confianza en compradores nuevos?
- ¿Falta alguno de los siguientes: testimonios, logotipos de clientes, certificaciones, garantías, casos de éxito?

#### 9. LLAMADAS A LA ACCIÓN (CTAs)
- ¿Los CTAs son claros y suficientes?
- ¿Hay demasiados o muy pocos?
- ¿El texto de los botones es convincente ("Solicitar cotización" vs "Ver más")?

#### 10. RESPONSIVE / MÓVIL
- Abre la página en iPhone 14 (375px) y evalúa:
  - ¿El hero se ve bien en vertical?
  - ¿Las tarjetas de producto son suficientemente grandes?
  - ¿El formulario es usable con teclado virtual?

---

## PARTE 2 — AUDITORÍA TÉCNICA FRONT-END Y BACK-END

### PROMPT PARA AUDITOR TÉCNICO

Eres un ingeniero full-stack senior especialista en performance web, SEO técnico, accesibilidad y arquitectura Next.js. 

Audita esta aplicación: **https://magiclean-web.vercel.app**  
Repositorio: **https://github.com/MagicleanMX/magiclean-web**  
Stack: Next.js 16.2.1 · TypeScript · Tailwind v4 · Framer Motion · Vercel

#### CHECKLIST TÉCNICO COMPLETO

**A. PERFORMANCE (Core Web Vitals)**
- [ ] Medir LCP (Largest Contentful Paint) — objetivo: < 2.5s
- [ ] Medir FID/INP (Interaction to Next Paint) — objetivo: < 200ms
- [ ] Medir CLS (Cumulative Layout Shift) — objetivo: < 0.1
- [ ] Verificar tamaño total del bundle JS con `next build --analyze`
- [ ] Verificar que imágenes usan `next/image` con `priority` en hero
- [ ] Verificar que fuentes (Playfair Display + Montserrat) tienen `display: swap`
- [ ] ¿Se está usando SSR/SSG correctamente? ¿Hay 'use client' innecesarios?

**B. SEO TÉCNICO**
- [ ] Verificar `<title>` y `<meta description>` en `/app/layout.tsx`
- [ ] Verificar Open Graph tags (og:title, og:description, og:image)
- [ ] Verificar Twitter Card tags
- [ ] ¿Existe `/public/sitemap.xml`? Crear con `next-sitemap`
- [ ] ¿Existe `/public/robots.txt`?
- [ ] Verificar que URLs son amigables (actualmente todo es SPA en `/`)
- [ ] ¿Los headings tienen jerarquía correcta (h1 → h2 → h3)?
- [ ] ¿Las imágenes tienen `alt` text descriptivo?
- [ ] ¿Hay structured data (Schema.org) para productos?

**C. ACCESIBILIDAD (WCAG 2.1 AA)**
- [ ] Verificar ratio de contraste de texto sobre fondos (mínimo 4.5:1)
- [ ] Verificar navegación por teclado (Tab, Enter, Escape)
- [ ] Verificar que el mega menú es accesible con teclado
- [ ] Verificar que formularios tienen `<label>` asociados correctamente
- [ ] Verificar `aria-label` en íconos sin texto (redes sociales, hamburger)
- [ ] Verificar que las animaciones respetan `prefers-reduced-motion`

**D. SEGURIDAD**
- [ ] Verificar headers HTTP de seguridad en `next.config.js`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Content-Security-Policy`
- [ ] Verificar que el formulario tiene protección CSRF
- [ ] Verificar que no hay variables de entorno expuestas al cliente
- [ ] Verificar que dependencias no tienen vulnerabilidades (`npm audit`)

**E. FORMULARIO Y BACK-END**
- [ ] El formulario actual es FAKE (solo cambia estado local)
- [ ] Conectar a Supabase o similar para guardar leads
- [ ] Alternativamente: integrar Resend o SendGrid para emails
- [ ] Implementar validación de campos en servidor (Zod)
- [ ] Implementar rate limiting para evitar spam
- [ ] Agregar reCAPTCHA v3 o similar
- [ ] Enviar email de confirmación al usuario
- [ ] Enviar notificación al equipo de ventas

**F. FUNCIONALIDADES FALTANTES**
- [ ] **Filtro por canal** en sección productos (HOGAR / HORECA / INDUSTRIAL)
- [ ] **Filtro por categoría** (Fibras / Mops / Accesorios)
- [ ] **Buscador de productos** por código o nombre
- [ ] **Localizador de distribuidores** por estado/ciudad (mapa o lista)
- [ ] **Catálogo PDF descargable** como lead magnet
- [ ] **Chat en vivo** o WhatsApp Business flotante
- [ ] **Sistema de analytics** (Google Analytics 4 o Plausible)
- [ ] **Página 404 personalizada**
- [ ] **Política de privacidad y cookies** (requerido por ley en México)
- [ ] **Aviso de privacidad** completo (LFPDPPP México)

**G. INFRAESTRUCTURA Y CI/CD**
- [ ] ¿Existe `CLAUDE.md` o `README.md` con instrucciones del proyecto?
- [ ] ¿Hay GitHub Actions para linting y type-check en PRs?
- [ ] ¿Hay preview deployments en Vercel para cada PR?
- [ ] ¿Está configurado el dominio personalizado en Vercel?
- [ ] ¿Hay certificado SSL activo?
- [ ] ¿Hay backup/versionado del contenido?
- [ ] ¿Está configurado monitoring (Sentry, Vercel Analytics)?

**H. NEXT.JS ESPECÍFICO**
- [ ] ¿Está configurado `next.config.js` con optimizaciones?
- [ ] ¿Hay caché de imágenes configurado correctamente?
- [ ] ¿Se usa `Suspense` correctamente donde aplica?
- [ ] ¿El bundle incluye dependencias innecesarias?
- [ ] Verificar `eslint` y `typescript` sin errores en build

---

## PARTE 3 — CHECKLIST DE CONTENIDO

### LO QUE FALTA COMPLETAR

**Datos reales pendientes de confirmación:**
- [ ] Teléfono de contacto real (actualmente placeholder)
- [ ] Email real (actualmente `contacto@magicleanproducts.com` — confirmar)
- [ ] Dirección física de la empresa
- [ ] RFC de la empresa
- [ ] Año de fundación exacto
- [ ] Número exacto de clientes activos
- [ ] Handles reales de redes sociales (Facebook, Instagram, LinkedIn, TikTok)
- [ ] Zonas/estados de cobertura exactos
- [ ] Nombre del representante de ventas o contacto principal

**Secciones de contenido pendientes:**
- [ ] Fotos reales de productos integradas en el sitio
- [ ] Casos de éxito o testimonios de clientes
- [ ] Certificaciones o reconocimientos
- [ ] Política de precios/descuentos para distribuidores
- [ ] Condiciones de pago y entrega
- [ ] Logotipos de clientes o retailers que ya distribuyen

---

## ESTADO ACTUAL DEL SITIO

| Sección | Estado | Notas |
|---|---|---|
| Hero | ✅ Funcional | Falta imagen real |
| Categorías | ✅ Completo | 6 familias reales |
| ProductHeroF4 | ✅ Funcional | Falta imagen |
| NeoShield | ✅ Funcional | Falta imagen |
| ProductHeroM1 | ✅ Funcional | Falta imagen |
| HowItWorks | ✅ Funcional | — |
| Nosotros | ✅ Nuevo | Stats placeholder |
| Distribuidores CTA | ✅ Funcional | — |
| Contacto | ⚠️ Fake | Sin backend |
| Footer | ✅ Completo | Redes sociales = placeholders |
| Navbar mega menú | ✅ Completo | 23 modelos reales |
| SEO | ❌ Pendiente | Sin meta tags, sin sitemap |
| Analytics | ❌ Pendiente | Sin GA4 |
| Imágenes reales | ❌ Pendiente | En proceso con fal.ai |
| Backend formulario | ❌ Pendiente | Supabase recomendado |
| Dominio propio | ❌ Pendiente | Actualmente en vercel.app |
| Localizador dist. | ❌ Pendiente | Feature futura |
| Filtros productos | ❌ Pendiente | Feature futura |

---

## PRIORIDADES RECOMENDADAS

### Fase inmediata (esta semana)
1. Integrar imágenes reales (fal.ai + fotos)
2. Conectar formulario a Supabase + email
3. Agregar meta tags SEO básicos

### Fase 2 (próximas 2 semanas)
4. Configurar dominio personalizado
5. Agregar Google Analytics 4
6. Políticas de privacidad y aviso legal
7. WhatsApp Business flotante

### Fase 3 (próximo mes)
8. Filtros de productos por canal
9. Localizador de distribuidores
10. Catálogo PDF descargable
11. Testimonios y casos de éxito

---

*Generado por MagicClean Web Project — Cowork AI*
