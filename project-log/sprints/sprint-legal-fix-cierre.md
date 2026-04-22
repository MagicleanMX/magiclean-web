# Fix Legal — Entity Separation — 2026-04-21

## Objetivo
Separar la razón social real (Prolim BH, SA de CV) de la marca comercial (MagiClean®) en todos los contextos legales y metadata del sitio.

## Contexto crítico
Durante Sprint A se detectó que el código referenciaba "MagiClean S.A. de C.V." como razón social en aviso de privacidad, términos de uso, footer, JSON-LD de Google y emails transaccionales. Esa entidad NO EXISTE. El catch lo hizo el dueño durante el review.

## Qué se hizo

1. **layout.tsx:** JSON-LD de Schema.org reestructurado con legalName = Prolim BH, SA de CV y brand = { name: MagiClean } separados
2. **aviso-de-privacidad:** Responsable LFPDPPP cambiado a Prolim BH, SA de CV
3. **terminos-de-uso:** 9 menciones corregidas + sección III reescrita como "Propiedad intelectual y marcas registradas" con atribución explícita a IMPI
4. **Footer:** copyright con entidad legal + marca registrada
5. **api/contact:** emails firman como "MagiClean · Prolim BH" con dominio correcto

## Commit

```
8006f96  fix(legal): separate legal entity Prolim BH, SA de CV from commercial brand MagiClean
```

Branch: `fix/sprint-a-technical-debt` (commit 9 agregado por Claude Code para evitar conflictos con Sprint A).

## Verificación

- grep "MagicClean S\.A\. de C\.V\." → 0 ocurrencias (antes 14)
- build + lint + tsc limpios

## Decisión de branching

Claude Code decidió agregar el commit a la branch existente en vez de crear una nueva `fix/legal-entity-separation` como pedía el prompt original, porque los archivos editados ya habían sido tocados por Sprint A y una branch nueva generaría conflictos de merge.

Trade-off aceptado por el dueño retrospectivamente. Regla nueva agregada a CLAUDE.md: si una instrucción de branching causa conflictos técnicos, Claude Code debe parar y preguntar antes de decidir.

## Qué quedó pendiente

- Cleanup de "MagicClean" (doble C) → "MagiClean" en 43 ocurrencias de copy comercial (sprint posterior)
- Agregar RFC al aviso de privacidad si cambia la decisión (hoy fuera)
- Verificar folio exacto de registro IMPI MagiClean® para cita textual en términos de uso

## Siguiente acción sugerida

Sprint 0 (sistema de continuidad) para documentar todo lo hecho. Después merge conjunto de los 9 commits a feat/brand-identity.
