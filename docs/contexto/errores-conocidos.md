# Errores conocidos

## Build falla con Turbopack (Serwist)
- **Síntoma:** `next build` falla con "This build is using Turbopack, with a webpack config".
- **Causa real:** Serwist (InjectManifest) inyecta configuración webpack; Next 16 usa Turbopack por defecto y aborta al detectar config webpack.
- **Solución:** el script de build usa `next build --webpack` (ya configurado). No quitarlo.

## `Cannot find module '@serwist/window'`
- **Síntoma:** error de tipos en `app/register-pwa.tsx`.
- **Causa real:** pnpm es estricto; `@serwist/window` es transitivo y no resoluble como import directo.
- **Solución:** está instalado como devDependency directa. No eliminar.

## `app/sw.ts` da errores de tipo (ServiceWorkerGlobalScope)
- **Síntoma:** tsc se queja de tipos de webworker en `sw.ts`.
- **Causa real:** el `lib` del tsconfig es DOM, no webworker; Serwist compila `sw.ts` por separado.
- **Solución:** `app/sw.ts` está en `exclude` del `tsconfig.json`. Es a propósito.

## Service worker no cachea en desarrollo
- **Parece roto pero es a propósito:** Serwist está desactivado en dev (`disable: NODE_ENV === "development"`) para no cachear mientras se desarrolla. La PWA solo se activa en producción.

## Iconos PWA faltantes
- **Síntoma:** el manifest referencia `/icon-192.png`, `/icon-512.png`, `/icon-maskable.png` que aún no existen.
- **Causa real:** pendiente de generar (ver TODO en `app/manifest.ts`).
- **Solución:** generar iconos reales (skill picasso) y colocarlos en `public/`.
