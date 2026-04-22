# 03 — Log de Decisiones Estratégicas MagiClean

**Última actualización:** 2026-04-21

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
