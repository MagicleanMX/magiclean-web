# Configuración de `NEXT_PUBLIC_SITE_URL` en Vercel

Guía operativa para el equipo MagicClean: cuando el dominio final (ej: `magiclean.mx`) esté listo y apuntado a Vercel, configura la env var de producción para que canonical URL, sitemap, robots, JSON-LD y Open Graph usen el dominio correcto.

Hasta que esto se haga, la aplicación seguirá sirviéndose bajo `https://magiclean-web.vercel.app` y cada build emitirá este warning en los logs:

```
[config] NEXT_PUBLIC_SITE_URL not set in production. Using Vercel subdomain fallback.
Configure the env var in Vercel to use the canonical domain.
```

---

## Pasos

1. **Entrar al dashboard de Vercel**
   → Abre `https://vercel.com/dashboard` y selecciona el proyecto **`magiclean-web`**.

2. **Abrir Settings del proyecto**
   → En la barra superior del proyecto, click en la pestaña **Settings**.

3. **Ir a Environment Variables**
   → En el menú lateral izquierdo de Settings, click en **Environment Variables**.

4. **Agregar la variable**
   → Click en el botón **Add New** (o **Add Another** si ya hay otras).
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://magiclean.mx` (o el dominio final acordado, sin trailing slash)
   - **Environments**: marca **Production** (mínimo). Opcional: también marca **Preview** si quieres que los deploys de preview usen el dominio canónico — recomendado dejarlo SÓLO en Production para que los previews sigan usando la URL de Vercel.

5. **Guardar**
   → Click en **Save**.

6. **Redeploy**
   → La variable aplica a los **siguientes** builds. Fuerza un redeploy para que los cambios tomen efecto:
   - Ve a la pestaña **Deployments**
   - En el deploy de producción más reciente, click en los tres puntos → **Redeploy**
   - Confirma con **Redeploy** (sin cache, si quieres estar 100% seguro)

7. **Verificar**
   Después del redeploy, comprueba que los siguientes recursos ya usan el dominio nuevo:
   - `https://magiclean.mx/sitemap.xml` → las URLs dentro del XML deben empezar con `https://magiclean.mx/`
   - `https://magiclean.mx/robots.txt` → la línea `Sitemap:` debe apuntar a `https://magiclean.mx/sitemap.xml`
   - Ver el HTML de la home: el `<link rel="canonical">` y el JSON-LD embebido deben referenciar el dominio nuevo
   - Ya no debe aparecer el warning `[config] NEXT_PUBLIC_SITE_URL not set` en los logs del build

---

## Checklist post-configuración

- [ ] Env var configurada en Production
- [ ] Redeploy ejecutado
- [ ] sitemap.xml verificado con dominio correcto
- [ ] robots.txt verificado con dominio correcto
- [ ] Canonical URL en `<head>` verificado
- [ ] Warning ausente en logs de build
- [ ] Submit del sitemap actualizado a Google Search Console (`https://magiclean.mx/sitemap.xml`)

---

## Notas

- **Sin trailing slash**. `https://magiclean.mx` sí, `https://magiclean.mx/` no. El código normaliza el trailing slash pero es mejor no incluirlo de entrada.
- **Variable pública**. El prefijo `NEXT_PUBLIC_` expone el valor al cliente (necesario porque se usa en metadata e inline JSON-LD). No incluir secrets aquí.
- **Orden de precedencia**. La app usa `process.env.NEXT_PUBLIC_SITE_URL` → si no existe, cae al subdominio Vercel con warning. No hay archivo de configuración adicional.
