-- ─────────────────────────────────────────────────────────────────
-- MagicClean — Tabla de leads
-- Ejecuta este SQL en: Supabase → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────

create table if not exists public.leads (
  id          uuid         primary key default gen_random_uuid(),
  nombre      text         not null,
  empresa     text         not null,
  email       text         not null,
  telefono    text,
  canal       text         not null,  -- distribuidor | horeca | retail | institucional | hogar | otro
  ciudad      text         not null,
  mensaje     text,
  fuente      text         default 'web_contacto',
  creado_en   timestamptz  default now()
);

-- Índices útiles para filtrar en el dashboard de Supabase
create index if not exists leads_canal_idx      on public.leads (canal);
create index if not exists leads_creado_en_idx  on public.leads (creado_en desc);

-- Row Level Security: solo el service role puede insertar/leer
alter table public.leads enable row level security;

-- Política: solo service_role puede hacer todo (el cliente público NO tiene acceso)
create policy "service_role_only"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

-- ─────────────────────────────────────────────────────────────────
-- LISTO. Después de ejecutar esto, la tabla aparece en Table Editor.
-- ─────────────────────────────────────────────────────────────────
