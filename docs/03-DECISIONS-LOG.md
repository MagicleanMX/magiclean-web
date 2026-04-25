# 03 — Log de Decisiones Estratégicas MagiClean

**Última actualización:** 2026-04-25

> **Archivo append-only.** Nunca se borra una decisión. Si cambia, se agrega entrada nueva marcando la anterior como "revisada".

## Formato de entrada

```
### [YYYY-MM-DD] — [Título corto]
**Decisor:** [nombre]
**Contexto:** [por qué ahora]
**Decisión:** [qué se decidió]
**Alternativas consideradas:** [otras opciones]
**Consecuencias esperadas:** [qué implica]
**Revisar si:** [cuándo reabrir]
```

---

## Log histórico

### 2026-04-21 — Naming canónico oficial: MagiClean

**Decisor:** Jacobo Levy
**Contexto:** Auditoría detectó 4 variantes conviviendo (MagiClean, MagicClean, Magiclean, magiclean). Riesgo de credibilidad B2B.
**Decisión:** Nombre oficial es **MagiClean** (M mayúscula, C mayúscula, una palabra). Con símbolo ® en contextos formales.
**Alternativas consideradas:** Magiclean (lowercase, packaging actual), MAGICLEAN (todo mayúsculas).
**Consecuencias esperadas:** Actualización de packaging en próxima reimpresión. Replace global de "MagicClean" (doble C) en 43 ocurrencias de copy pendiente para sprint posterior.
**Revisar si:** rediseño total de marca post-BioBase PRO.

---

### 2026-04-21 — Separación razón social vs marca comercial

**Decisor:** Jacobo Levy
**Contexto:** Descubierto durante Sprint A que el código usaba "MagiClean S.A. de C.V." como razón social. Esa entidad NO existe legalmente.
**Decisión:**
- **Razón social:** `Prolim BH, SA de CV` (identidad legal ante SAT, LFPDPPP, IMPI)
- **Marca comercial:** `MagiClean®` (registro IMPI emitido)
- **Tecnología:** `NeoShield™` (IMPI en trámite)
- **RFC:** no se publica en landing por decisión de privacidad
**Alternativas consideradas:** Publicar RFC, usar razón social abreviada.
**Consecuencias esperadas:** Fix legal ejecutado el mismo día (commit `8006f96` en branch `fix/sprint-a-technical-debt`) corrigiendo 14 ocurrencias en layout.tsx, aviso-de-privacidad, terminos-de-uso, Footer, y emails de contact API.
**Revisar si:** cambia la estructura corporativa o se crea nueva entidad.

---

### 2026-04-21 — Arquitectura dual: MagiClean + MagiClean PRO

**Decisor:** Jacobo Levy
**Contexto:** Necesidad de competir con Scotch-Brite sin canibalizar línea actual.
**Decisión:** Adoptar modelo Scotch-Brite Consumer + Professional replicado:
- MagiClean (estándar) → retail masivo, e-commerce
- MagiClean PRO (premium) → distribuidores, HORECA, mayoristas
**Alternativas consideradas:** Marca única evolucionada, rebranding total.
**Consecuencias esperadas:** Dos familias de empaque. BioBase PRO+ entra en línea PRO al llegar de China.
**Revisar si:** canibalización entre líneas post-12 meses.

---

### 2026-04-21 — Voice dual integrado

**Decisor:** Jacobo Levy
**Contexto:** Auditoría Dim 6 detectó copy 100% aspiracional, mal encarado para target B2B distribuidor.
**Decisión:** Voice dual integrado — inspiración + specs técnicos en cada sección.
**Alternativas consideradas:** Voice solo B2B (Ecolab), solo aspiracional (Apple), dual separado por secciones.
**Consecuencias esperadas:** Cada sección futura incorpora ambas capas. Referencias: Tesla, Dyson Professional, Hermès Horizons.
**Revisar si:** métricas post-lanzamiento muestran que una audiencia pesa claramente más.

---

### 2026-04-21 — WordPress se mantiene como CMS headless futuro

**Decisor:** Jacobo Levy
**Contexto:** Empresa planea lanzamientos regulares y necesita autonomía editorial para no-devs.
**Decisión:** WordPress se activa como CMS headless en Sprint F (post-lanzamiento). Next.js queda en Vercel, WP en Kinsta o WP Engine cuando corresponda.
**Alternativas consideradas:** Cortar WP entero, dos sitios separados, CMS alternativo.
**Consecuencias esperadas:** Costo recurrente USD 35-50/mes al activarse. Setup único USD 300-600.
**Revisar si:** cambia estrategia de contenido (ej: no se publican lanzamientos nuevos).

---

### 2026-04-21 — Hosting: Next.js en Vercel, no migrar

**Decisor:** Jacobo Levy
**Contexto:** Confusión sobre migración a SiteGround/Kinsta.
**Decisión:** Next.js queda en Vercel. SiteGround/Kinsta solo para WordPress cuando se active.
**Alternativas consideradas:** Migrar todo a VPS.
**Consecuencias esperadas:** Costo Vercel Pro ~USD 20/mes post-lanzamiento. Performance óptimo.
**Revisar si:** Vercel cambia pricing o términos.

---

### 2026-04-21 — Dominio canónico: magiclean.mx

**Decisor:** Jacobo Levy
**Contexto:** Coexistencia confusa de dos dominios.
**Decisión:** Dominio oficial es `magiclean.mx`. `magicleanproducts.com` se redirige o da de baja.
**Alternativas consideradas:** Mantener ambos, priorizar magicleanproducts.com.
**Consecuencias esperadas:** Emails migran a @magiclean.mx. SPF/DKIM se configura en magiclean.mx.
**Revisar si:** razón comercial para retomar magicleanproducts.com.

---

### 2026-04-21 — Orden de sprints priorizado al fix legal

**Decisor:** Jacobo Levy
**Contexto:** Durante Sprint A se descubrió que "MagiClean S.A. de C.V." (entidad ficticia) estaba en aviso de privacidad y términos de uso. Riesgo legal.
**Decisión:** Fix legal se ejecuta antes que Sprint 0 (sistema de continuidad). Criterio: lo que expone jurídicamente no espera documentación.
**Alternativas consideradas:** Sprint 0 primero como se había planeado originalmente.
**Consecuencias esperadas:** Fix legal quedó como commit 9 en la misma branch que Sprint A (por decisión técnica de Claude Code para evitar conflictos de merge). Sprint 0 documenta retrospectivamente los 3 sprints.
**Revisar si:** aparece otro fix legal urgente en el futuro.

---

### 2026-04-21 — Símbolos ® vs ™ según estado IMPI

**Decisor:** Jacobo Levy
**Contexto:** Necesidad de uso correcto de símbolos de registro.
**Decisión:**
- `MagiClean®` — título IMPI emitido, usar ® en contextos formales (footer, legales, metadata)
- `NeoShield™` — en trámite IMPI, usar ™ hasta que emitan título
- En copy comercial casual, `MagiClean` sin símbolo para limpieza visual
**Alternativas consideradas:** Omitir símbolos, usar ® en todo.
**Consecuencias esperadas:** Cuando IMPI emita título NeoShield, se hace replace global ™ → ®.
**Revisar si:** IMPI emite título NeoShield, o se registra marca nueva.

---

### 2026-04-21 — Estrategia de branches: branch única cuando hay conflictos técnicos

**Decisor:** Jacobo Levy (validación retrospectiva)
**Contexto:** El fix legal debía ir a branch independiente per instrucción original, pero Claude Code detectó que generaría conflictos con Sprint A y lo agregó como commit 9 a la branch existente.
**Decisión:** Trade-off aceptado: branch única con 9 commits (8 Sprint A + 1 fix legal). Mergeo conjunto cuando dueño autorice.
**Alternativas consideradas:** Separar en 2 branches con rebase manual (más trabajo, sin valor adicional).
**Consecuencias esperadas:** Menos granularidad en merge, pero commits individualmente revertibles. Regla nueva agregada a CLAUDE.md: si branching causa conflictos, Claude Code pregunta antes de decidir.
**Revisar si:** emerge razón de negocio para separar contribuciones técnicas vs legales.

---

### 2026-04-25 — WhatsApp FAB mobile-only por diseño UX B2B

**Decisor:** Jacobo Levy
**Contexto:** Validación visual de PR #16 detectó que el botón flotante de WhatsApp no aparecía en desktop. Discovery posterior reveló que es comportamiento intencional vía clase Tailwind `md:hidden` (oculto en pantallas ≥768px). Riesgo de que futuras auditorías lo clasifiquen como bug.
**Decisión:** Mantener el FAB como mobile-only. Compradores B2B en desktop usan email + form de cotización (canales formales); el FAB sirve al comprador HORECA en mobile (almacén/cocina con celular en mano).
**Alternativas consideradas:** Habilitar el botón también en desktop (quitar `md:hidden`).
**Consecuencias esperadas:** Sin cambios técnicos. Documentación cruzada: `project_magicclean_wip.md` item 10 marcado como RESUELTO. Validado en sesión 2026-04-25 post-merge PR #16 (commit `06c8988`).
**Revisar si:** métricas de conversión muestran que desktop pierde leads que sí completarían vía WhatsApp.

---

### 2026-04-25 — NeoShield™ se posiciona como sello de confianza, no como explicación técnica

**Decisor:** Jacobo Levy
**Contexto:** El comprador de productos de limpieza no estudia plata coloidal ni procesos de producción para tomar una decisión. Compra basado en confianza de marca, igual que un consumidor compra una laptop por "Intel Inside" o un Mac por "Apple Silicon" sin entender arquitectura de procesadores. NeoShield™ debe funcionar como ese sello: si el producto lo lleva, el comprador confía.
**Decisión:** Toda comunicación de NeoShield™ se posiciona como sello de confianza inspiracional, no como explicación técnica. Eslogan core: "Si lo trae el producto, sabes que está protegido." La explicación técnica (plata coloidal, polímeros, etc.) se elimina del copy público — queda como respaldo de laboratorio si alguien pregunta, no como argumento de venta.
**Próximo paso (NO en este PR):** Convertir NeoShield™ en icono visual recurrente. Badge en cada producto que lo lleva — en cards de home, en cards de catálogo, en páginas individuales. Reusar campo `antibacterial_neoshield: bool` ya existente en `products.json`. Ese trabajo merece PR separado (futuro PR #23 o posterior).
**Alternativas consideradas:** Mantener explicación técnica de plata coloidal y procesos. Descartado: la gente que compra limpieza no entiende ni le interesa el cómo, le interesa el qué.
**Consecuencias esperadas:** Todo copy futuro de NeoShield™ respeta el principio: lenguaje inspiracional sobre protección y confianza, no lenguaje técnico de procesos. Frases aceptables: "tecnología antibacterial que define...", "si lo trae, está protegido", "compromiso de calidad MagiClean". Frases a evitar: explicaciones de plata coloidal, descripciones de procesos químicos, claims de duración cronométrica.
**Revisar si:** se identifica un mercado B2B técnico-especializado (laboratorios, hospitales) que sí valora la explicación científica. Para ese segmento, la explicación técnica puede vivir en una página separada tipo `/tecnologia` o `/ciencia`, sin saturar el mensaje principal del sitio.

---

### 2026-04-25 — Hero copy rework: jerarquía Hero vs ElProblema, sin tope numérico

**Decisor:** Jacobo Levy
**Contexto:** Post-PR #23. Validación visual detectó conflicto rítmico entre Hero ("Fibras que duran. Tecnología que protege.") y ElProblema ("Producto que rinde. Margen que respeta. Rotación que vende.") — ambos usaban el mismo patrón binario "X que Y" en secciones consecutivas, eco molesto al scrollear. Adicionalmente, el subheadline citaba "23 soluciones profesionales" — el catálogo crece y un número fijo en el Hero envejece mal.
**Decisión:** Reescribir Hero con tres principios:
- **Headline** = "Limpieza profesional, repensada." Registro Apple-tier ("categoría, repensada") que cede el ritmo binario a ElProblema.
- **Subheadline** = "Solución integral con NeoShield™ en cada producto. Más duración. Cero contaminación cruzada. Para HORECA, retail e institucional." Sin "23". Reposiciona MagiClean como solución, no como lista de SKUs. "NeoShield™ en cada producto" alinea con el eslogan sello-de-confianza del PR #22.
- **heroMicrotext** = "México · LATAM". Solo geografía. Los segmentos B2B viven en el sub.

Jerarquía nueva: **Hero = qué vendemos** (categoría + sello). **ElProblema = por qué te conviene** (business case B2B).
**Alternativas consideradas:** mantener "Fibras que duran. Tecnología que protege." (descartado por eco con ElProblema); Opción 1 — "23 soluciones, una sola tecnología" (descartado por tope numérico); Opciones C/D/E del sub con distintas combinaciones de claims (descartadas por mantener el sello universal único en lugar de fragmentar el mensaje).
**Consecuencias esperadas:** Hero escalable sin update de copy cuando crezca el catálogo. La rítmica binaria queda como firma exclusiva de ElProblema. Si en el futuro se introducen sub-líneas con tecnologías distintas, el sub del Hero ("NeoShield™ en cada producto") puede necesitar ajuste.
**Revisar si:** cambia el posicionamiento de NeoShield™, o si MagiClean lanza sub-líneas con tecnología distinta a NeoShield™ (ej. BioBase PRO+ cuando llegue de China), o si los segmentos B2B se simplifican/expanden.

---

### 2026-04-25 — Regla operativa: NeoShield™ seal variantes por tamaño

**Decisor:** Jacobo Levy
**Contexto:** Sesión Claude web 2026-04-25. Validación visual sobre `neoshield_compare.png` mostró que la variante COMPLETA del seal (con texto "SURFACE PROTECCIÓN — REMUEVE EL 99% DE BACTERIAS" alrededor del escudo) se vuelve ilegible bajo 300px. Sin regla clara, futuras integraciones podrían embeber la variante incorrecta.
**Decisión:** regla operativa por tamaño del badge renderizado:
- **≤120px** (Navbar, cards de catálogo, thumbnails) → variante **COMPACTA** (escudo solo, sin texto perimetral)
- **≥300px** (Hero, banners grandes, secciones dedicadas) → variante **COMPLETA** (escudo + texto perimetral)
- **Zona muerta 120-300px** → **COMPACTA por default** (priorizar legibilidad sobre claim explícito)
**Alternativas consideradas:** forzar variante COMPLETA en todos los tamaños (descartado por ilegibilidad); diseñar variante intermedia con texto reducido (descartado por complejidad de mantenimiento — dos variantes son mantenibles, tres no).
**Consecuencias esperadas:** PR #25 (NeoShield badge en cards de productos) implementa COMPACTA. Toda integración futura del seal aplica esta regla. Si emerge un tamaño nuevo (ej. footer signature, watermark de PDF) se asigna a una de las dos variantes según la regla.
**Revisar si:** el badge se rediseña visualmente, surge una variante intermedia justificada por uso específico, o si métricas de reconocibilidad muestran que la COMPACTA pierde signal de marca.

---

### 2026-04-25 — Verb discipline en CTAs B2B

**Decisor:** Jacobo Levy
**Contexto:** PR #23 (CTA cleanup) detectó saturación de "Solicitar cotización" repetido en home. La unificación a "Hablar con ventas" en HowItWorks + Nosotros + ProductHeroMop ("Cotizar este sistema") cerró el problema puntual, pero sin guideline futuras secciones repetirían la saturación.
**Decisión:** tres verbos según contexto, codificados:
- **"Hablar con ventas"** — conversación general, sin objeto. Para secciones narrativas (HowItWorks, Nosotros, futuras Distribuidores/Empresa).
- **"Cotizar [X específico]"** — CTA producto-específico, con objeto. Ej: "Cotizar este sistema", "Cotizar fibras", "Cotizar volumen".
- **"Cotizar"** sin objeto — exclusivo de form submit (`ContactForm`) y links útiles (Footer).
**Alternativas consideradas:** unificar todo a "Solicitar cotización" (descartado, motivo del PR #23); reducir todo a "Contactar" (descartado por pérdida de specificity producto-específica que tracciona conversión B2B).
**Consecuencias esperadas:** futuros CTAs siguen el patrón sin re-discusión. Mantenimiento sostenido del balance entre claridad y diferenciación. Si una nueva sección no encaja en ninguno de los tres slots, se evalúa caso por caso.
**Revisar si:** emerge un contexto nuevo (campañas marketing, landing dedicadas) que requiere CTA fuera del patrón; o si métricas A/B muestran que un verbo específico subperforma; o si "Solicitar cotización" (vivo en Hero + Navbar post-PR #23 sin decisión explícita) requiere unificación con este patrón.

---

### 2026-04-25 — Política sobre el conteo de SKUs en copy

**Decisor:** Jacobo Levy
**Contexto:** PR #24 (Hero copy rework). El subheadline original citaba "23 soluciones profesionales" — el catálogo crece (24, 25 SKUs proyectados; BioBase PRO+ entra cuando llegue de China) y un número fijo en el Hero envejece mal. Pero el número sigue siendo útil en surfaces operativos para crawlers/SEO/usuarios buscando alcance.
**Decisión:** política sobre el conteo de SKUs:
- **Eliminado** del Hero — la marca = solución integral, no conteo de SKUs. Hero debe ser estable cuando crece el catálogo.
- **Mantenido** en surfaces operativos: `/productos` header (count auto-derivado de `products.json` con `estado === 'activo'`), catálogos descargables PDF, `metadata.description` de `layout.tsx`, mega-menú del Navbar.
- **Single source of truth** del conteo: `products.json` filtrado por `estado === 'activo'`. Cualquier mención literal del número se desactualiza al crecer el catálogo.
**Alternativas consideradas:** eliminar el número de todos los surfaces (descartado por pérdida de signal SEO + información operativa relevante); mantener "23" en el Hero (descartado, motivo del PR #24); auto-derivar el conteo en el Hero (descartado — no aporta a la marca).
**Consecuencias esperadas:** cuando el catálogo crezca a 24/25/30 SKUs, solo se actualizan los surfaces operativos (idealmente derivando del JSON). Marca queda estable. La descripción del Hero no requiere update al cambiar el conteo.
**Revisar si:** el catálogo se reduce drásticamente (ej. 23 → 8 por descontinuación masiva) y el conteo deja de ser útil para SEO; o si una sub-línea separada (PRO, BioBase) requiere conteos distintos por audiencia.

---
