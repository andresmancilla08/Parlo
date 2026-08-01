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

## `ImageResponse` (OG image) falla el build con "Expected <div> to have explicit display: flex"
- **Síntoma:** `Error occurred prerendering page "/opengraph-image"` al construir.
- **Causa real:** satori (el motor de `next/og`) exige `display: flex` explícito en cualquier `div` con más de un hijo, y soporta un CSS reducido.
- **Solución:** poner `display: "flex"` en esos contenedores. Evitar radiales grandes: dejan una costura visible en el borde de la caja (se usa un `linear-gradient` de fondo).

## Chrome headless no baja de 500px de viewport
- **Síntoma:** al validar UI con `--window-size=360,…` la captura parece desbordada (columnas cortadas).
- **Causa real:** el viewport real se queda en 500px; la captura solo recorta la imagen. `innerWidth` lo confirma (`--dump-dom` con un script que escriba el ancho en el `title`).
- **Solución:** simular el ancho con un contenedor fijo (`<div style="width:360px">`) dentro de un viewport de 500px. Los breakpoints `sm:` (640px) siguen sin aplicar, así que el resultado es válido.

## Check del currículo
- **Cómo correr:** `node --experimental-strip-types lib/curriculum/data.check.ts`. Valida ids únicos, que la respuesta de `choose` esté entre las opciones y que la de `bank` se pueda formar con las fichas. Correr SIEMPRE tras tocar `lib/curriculum/data.ts`.

## El tutor responde 404 `NOT_FOUND` con un modelo de Gemini
- **Síntoma:** `This model models/gemini-2.5-flash is no longer available to new users`.
- **Causa real:** Google retiró los modelos 2.5 para cuentas creadas después de cierta fecha. La clave es válida; el modelo no está disponible para esa cuenta. `models.list` los sigue listando, así que listar NO sirve para saber si puedes usarlos: hay que probar `generateContent`.
- **Solución:** usar el alias `gemini-flash-latest` (verificado). Alternativas que también responden: `gemini-3-flash-preview`, `gemini-3.1-flash-lite`. `gemini-2.0-flash` devuelve cuota agotada.

## Check de la teoría y del test de nivel
- **Cómo correr:** `node --experimental-strip-types lib/curriculum/teach.check.ts` y `… lib/placement.check.ts`. El primero exige que TODA lección tenga teoría propia (≥3 pasos, uno de ejemplos) y que ningún ejemplo en inglés lleve caracteres españoles (se pronuncia con voz inglesa).

## Medir desborde horizontal con animaciones en curso
- **Síntoma:** `scrollWidth` 3px mayor que `clientWidth` justo después de cambiar de paso o de pantalla.
- **Causa real:** la tarjeta entra desde `x: 24`; mientras dura la animación el documento es más ancho. No es un defecto de layout.
- **Solución:** medir con la animación terminada (≥1,5 s tras el clic). Si sale desborde con la interfaz quieta, entonces sí es real.

## El dev server del puerto 3000 puede ser OTRO proyecto
- **Síntoma:** las capturas de «Parlo» muestran una pantalla de login que no es la de Parlo.
- **Causa real:** en esta máquina hay varios proyectos y el :3000 suele estar ocupado por otro.
- **Solución:** para validar visualmente, `pnpm build` y `pnpm exec next start -p 3100`, y apuntar el harness a `http://localhost:3100`. Comprobarlo con `curl -s localhost:3100/login | grep inputmode` (el PIN de 4 dígitos solo existe en Parlo).

## El dictado por voz no existe en Firefox
- **Síntoma:** en Practicar no aparece el botón de micrófono.
- **Causa real:** Firefox no implementa `SpeechRecognition`; es correcto que no se muestre.
- **Solución:** ninguna, es a propósito. El campo de texto sigue funcionando igual.

## El desborde de 3px al cambiar de pantalla no es un bug
- **Síntoma:** `scrollWidth` 3px mayor que `clientWidth` justo tras pulsar «Siguiente».
- **Causa real:** la tarjeta entra animada desde `x: 24`; mientras dura, el documento es más ancho.
- **Solución:** medir con la interfaz quieta (≥1,5 s). Con animación en curso, el dato miente.

## El combo de aciertos empujaba el título (ya corregido)
- **Síntoma:** a partir del tercer acierto seguido, la página desbordaba 23px en móvil.
- **Causa real:** el chip «3 seguidas» y el título competían en una fila con `pl-12` y sin `min-w-0`.
- **Solución:** título con `min-w-0 flex-1 line-clamp-1`; el chip `shrink-0`. Patrón a repetir siempre que se añada algo al lado de un texto largo.

## Los tipos de mammoth no valen para el navegador
- **Síntoma:** `TS7016: Could not find a declaration file for module 'mammoth/mammoth.browser'`.
- **Causa real:** el paquete tipa el build de Node (que importa `fs`); el de navegador va sin tipos.
- **Solución:** `types/mammoth-browser.d.ts` declara sólo `extractRawText`. No cambiar el import a `"mammoth"` a secas: eso mete Node en el bundle del cliente.

## `setState` en efectos: el lint lo prohíbe, también en cargas asíncronas
- **Síntoma:** `react-hooks/set-state-in-effect` al llamar desde un efecto a una función que hace `setState`, aunque sea `async`.
- **Causa real:** la regla mira la llamada, no si el `setState` ocurre tras un `await`.
- **Solución:** poner los `setState` dentro de callbacks de promesa (`fetchX().then((data) => setX(data))`), como ya hacía el lector. Y derivar el estado de carga (`league === undefined`) en vez de un `setLoading(true/false)`.

## Las reglas de la liga se prueban con la app, no con asserts
- **Cómo:** `lib/league.check.ts` cubre alias, códigos, XP semanal y ranking (lógica pura). Lo que las reglas permiten o no se comprueba usando la app con el usuario ficticio: crear liga, ver el marcador y salir.
- **Ojo:** tras tocar `firestore.rules` hay que `firebase deploy --only firestore:rules` o la app seguirá contra las reglas viejas.

## En `/app` el que scrollea es `<main>`, no el documento
- **Síntoma:** `window.scrollTo(...)`, `window.scrollY` o medir `documentElement.scrollHeight` no hacen nada útil dentro de la app logueada; y al navegar, la pantalla nueva aparecería a media altura si nadie la sube.
- **Causa real:** el armazón es `h-dvh overflow-hidden` a propósito (ver `decisiones.md`), así que el documento nunca scrollea.
- **Solución:** usar `document.querySelector('main')` como scroller (o pasar un ref). El reset al cambiar de ruta ya lo hace `app/app/layout.tsx`; si algún día hay más scrollers, que cada uno se resetee.
- **Al medir con el harness:** comparar `main.scrollHeight - main.clientHeight`, no el del documento, o parecerá que no hay contenido.
