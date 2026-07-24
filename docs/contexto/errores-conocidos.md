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

## `Date.now()` / setState en efecto → error de lint (Next 16 react-hooks)
- **Síntoma:** `react-hooks/purity` ("Cannot call impure function during render") con `Date.now()` en render; `react-hooks/set-state-in-effect` al hacer setState en un `useEffect` de montaje.
- **Causa real:** reglas nuevas de React/Next 16.
- **Solución:** leer `Date.now()` en inicializador perezoso de `useState(() => Date.now())`. Las páginas bajo `/app` montan solo en cliente (el layout gatea por auth), así que el inicializador corre client-side con el store ya rehidratado. Ver `app/app/page.tsx`, `app/app/repaso/page.tsx`.

## Color de TEXTO sobre fondos "soft"/tint
- **Síntoma:** texto de marca ilegible (p.ej. mint `text-accent` sobre `bg-accent-soft` = 1.9:1; blanco sobre coral = 2.8:1).
- **Causa real:** los colores de marca están pensados como acentos, no como texto sobre sus propios tints.
- **Solución:** usar los tokens `text-*-ink` para TEXTO; reservar `text-accent`/`text-success`/etc. para íconos/gráficos. `primary-fg` es navy (no blanco) sobre coral.

## Check de `lib/srs.ts`
- **Cómo correr:** `node --experimental-strip-types lib/srs.check.ts`. Los `*.check.ts` están excluidos del tsconfig (usan import con extensión `.ts` que Node exige pero tsc rechaza). No romper esa exclusión.
