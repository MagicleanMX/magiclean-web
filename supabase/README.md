# MagicClean — Supabase

Esquema de base de datos versionado con Supabase CLI.

## Estructura

```
supabase/
├── README.md                                      # este archivo
├── config.toml                                    # config local (generado por `supabase init`)
└── migrations/
    └── 20260411000000_leads_table.sql             # tabla `leads` + RLS + policy service_role
```

## Estado actual

- ✅ `supabase init` ejecutado → proyecto local inicializado con `config.toml`.
- ✅ Migración existente (`20260411000000_leads_table.sql`) movida desde la raíz del repo y renombrada con timestamp.
- ⏳ **Proyecto remoto NO está linkeado todavía.** Este paso requiere credenciales del cliente y se documenta abajo.

---

## Pasos pendientes para el cliente

Estos pasos deben ejecutarse UNA VEZ, con las credenciales del proyecto de producción en Supabase.

### 1. Obtener el project ref

1. Entra a `https://supabase.com/dashboard` con la cuenta del proyecto de producción.
2. Abre el proyecto **MagicClean**.
3. Ve a **Settings** → **General**. Copia el **Reference ID** (ej: `abcxyzlmnopqrstuvwx`).

### 2. Login del CLI (una sola vez por máquina)

```bash
supabase login
```

Se abrirá el navegador para autenticar. Al terminar, el CLI queda autenticado.

### 3. Linkear el repo al proyecto remoto

Desde la raíz del repo:

```bash
supabase link --project-ref <REFERENCE_ID_DEL_PASO_1>
```

Esto escribe el `project_id` en `supabase/.temp/project-ref` (no se commitea — está en `supabase/.gitignore`).

### 4. Verificar que la migración ya aplicada coincide

La tabla `leads` ya fue creada manualmente en producción vía SQL Editor (fecha de creación documentada en el plan de auditoría). Hay que alinear el tracking de migraciones:

```bash
# Ver qué migraciones cree el CLI que están aplicadas vs. locales
supabase migration list
```

Si la migración `20260411000000_leads_table.sql` aparece como **local only**, marca que ya está aplicada en remoto sin re-ejecutar el SQL:

```bash
supabase migration repair --status applied 20260411000000
```

Esto sincroniza el tracker sin tocar la tabla existente (evita errores `relation "leads" already exists`).

### 5. Verificar RLS en producción (relacionado con SEC-RLS-01)

Independiente del CLI, confirmar en el dashboard:

1. Ve a **Table Editor** → `leads` → tab **Auth**.
2. Verifica que el toggle **RLS Enabled** está activo.
3. Verifica que la policy `service_role_only` aparece listada con `Command: ALL` y `Role: service_role`.

---

## Flujo futuro de cambios de schema

Cuando necesites modificar el schema (agregar columna, cambiar policy, etc.):

1. Crear migración local:
   ```bash
   supabase migration new <nombre_descriptivo>
   ```
   Esto crea `supabase/migrations/<timestamp>_<nombre>.sql`.

2. Escribir el SQL del cambio.

3. (Opcional) Probar localmente con `supabase start` + `supabase db reset`.

4. Aplicar a remoto:
   ```bash
   supabase db push
   ```

5. Commit de la migración (el SQL queda versionado).

---

## Notas

- **No edites migraciones ya aplicadas.** Crea una migración nueva que revierta o modifique, para mantener el historial lineal.
- **`supabase/.temp/` está gitignoreado** (lo maneja el CLI). El `project_id` se guarda ahí después de `supabase link`.
- **Backups**: Supabase ofrece backups automáticos diarios en el plan Pro. Verificar que el proyecto de producción esté en Pro antes de depender de esto para recovery.
