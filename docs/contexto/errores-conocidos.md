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
- **Emulador:** `docs/pruebas/reglas.test.mjs` prueba las reglas de la liga y del progreso con `@firebase/rules-unit-testing` (proyecto `demo-parlo`, nunca producción). Instrucciones en su cabecera. Ojo: `firebase-tools` y el emulador de Firestore exigen **Java 21+**; con el `openjdk@17` de Homebrew no arrancan (`UnsupportedClassVersionError`, class file 65).
- **Ojo:** tras tocar `firestore.rules` hay que `firebase deploy --only firestore:rules` o la app seguirá contra las reglas viejas.

## En `/app` el que scrollea es `<main>`, no el documento
- **Síntoma:** `window.scrollTo(...)`, `window.scrollY` o medir `documentElement.scrollHeight` no hacen nada útil dentro de la app logueada; y al navegar, la pantalla nueva aparecería a media altura si nadie la sube.
- **Causa real:** el armazón es `h-dvh overflow-hidden` a propósito (ver `decisiones.md`), así que el documento nunca scrollea.
- **Solución:** usar `document.querySelector('main')` como scroller (o pasar un ref). El reset al cambiar de ruta ya lo hace `app/app/layout.tsx`; si algún día hay más scrollers, que cada uno se resetee.
- **Al medir con el harness:** comparar `main.scrollHeight - main.clientHeight`, no el del documento, o parecerá que no hay contenido.

## El Chrome del harness sobrevive al `proc.kill()`
- **Síntoma:** una prueba mide algo imposible (por ejemplo «0 peticiones» cuando el código sí las hace) o el usuario aparece ya logueado en un perfil recién creado.
- **Causa real:** si un Chrome de una ejecución anterior sigue escuchando en el puerto de depuración, el nuevo `spawn` no puede abrirlo y el script se conecta al VIEJO, con su `localStorage`, su sesión y sus preferencias.
- **Solución:** `launch()` hace `pkill -f "remote-debugging-port=<puerto>"` antes de arrancar. Si una medida sale rara, comprobar primero que no hay dos Chrome vivos.

## El tutor dejaba de responder tras ~20 intercambios
- **Síntoma:** «No se pudo responder» en todos los mensajes a partir de cierto punto, aunque Gemini funcione.
- **Causa real:** el cliente mandaba el historial entero y el servidor rechaza >40 mensajes o >10.000 caracteres.
- **Solución:** `coachWindow()` (ver `decisiones.md`). Si se cambian los límites, cambiarlos en `lib/coach-window.ts`: cliente y servidor los leen de ahí.

## La voz neural se apagaba 5 minutos en iPhone
- **Síntoma:** en iOS la respuesta del tutor no sonaba y después TODA la app hablaba con la voz del dispositivo un rato.
- **Causa real:** `audio.play()` sin gesto previo da `NotAllowedError` y se trataba como fallo del servidor (cortafuegos de 5 min).
- **Solución:** `unlockAudio()` + elemento compartido; `NotAllowedError` nunca activa el cortafuegos. Ojo al tocar `lib/tts.ts`: no volver a crear un `new Audio()` por frase, iOS sólo deja sonar sin gesto al elemento que ya sonó dentro de uno.

## Texto fantasma tras enviar por voz
- **Síntoma:** después de enviar, la frase reaparecía en el cuadro de texto.
- **Causa real:** `recognition.stop()` todavía entrega el resultado final; llegaba después de vaciar el cuadro.
- **Solución:** `mic.abort()` (quita `onresult` y aborta). `aborted` no se muestra como error.

## El micro no aparece en iPhone con Parlo instalada (es a propósito)
- **Parece roto pero es a propósito:** en iOS en modo standalone `webkitSpeechRecognition` existe pero no funciona, así que se oculta el micro y se sugiere abrir Parlo en Safari. En Safari normal y en la APK de Android (TWA, Chrome) el micro sigue.

## /api/coach, /api/translate o /api/tts responden 401
- **Causa real:** desde esta rama exigen el ID token de Firebase (`apiFetch` o, en TTS, `x-parlo-token`). Un `fetch('/api/...')` a pelo ya no vale.
- **Ojo en local:** el servidor necesita `NEXT_PUBLIC_FIREBASE_PROJECT_ID` (si falta responde 503) y salida a `www.googleapis.com` para bajar las claves. Para probar sin cuenta, los 401 se ven con `curl`; el camino feliz necesita una sesión real.

## La liga no se puede probar con una sola cuenta
- **Síntoma:** todo parece funcionar, pero entrar por código falla en producción.
- **Causa real:** las reglas distinguen miembro de no miembro. Con una sola cuenta (la que crea la liga) nunca se ejecuta el camino del que entra.
- **Solución:** `cdp-multi.mjs` abre dos contextos de navegador aislados (cada uno con su `localStorage` y su sesión de Firebase) y los conduce por CDP con `sessionId`. Es la única forma de ver el adelantamiento y el alta por código.

## Todas las rutas salían dinámicas (ƒ) en el build
- **Síntoma:** `pnpm build` marca `/`, `/login` y todas las de `/app` como ƒ aunque no lean nada del servidor.
- **Causa real:** `app/not-found.tsx` usaba `cookies()`. El not-found raíz forma parte del árbol de cada página, así que una API dinámica ahí contagia a todas.
- **Solución:** el not-found es de cliente y redirige a `/` (el proxy hace el resto). No usar `cookies()`/`headers()` en el layout raíz ni en el not-found raíz.

## «ChunkLoadError» / «Loading chunk N failed» tras desplegar
- **Síntoma:** una pestaña abierta o la PWA instalada muestra «Algo salió mal» justo después de un despliegue.
- **Causa real:** el JS de la versión vieja pide un trozo que ya no existe en la nueva.
- **Solución:** `error.tsx` y `global-error.tsx` recargan UNA vez (`lib/chunk-reload.ts`); la marca en `sessionStorage` evita el bucle si el fallo es otro (sin red de verdad). Parece raro, pero es a propósito.

## `permission-denied` al entrar en una liga se muestra como «llena»
- **Síntoma:** al entrar por código sale «la liga está llena» y no lo está.
- **Causa real:** quien aún no es miembro no puede leer la liga, así que el único dato es el código del error. `joinLeague` traduce `permission-denied` a `full` porque, si el alias llega validado, el tope es lo único que queda por rechazar. Si los límites del alias en `validateAlias` y en `firestore.rules` (2-16) se desalinean, el rechazo por alias se verá como «llena».
- **Solución:** cambiar los límites del alias en los dos sitios a la vez (`league.check.ts` comprueba los de `validateAlias`; el de las reglas va comentado junto a `validMember`).

## El progreso «salta» tras guardar
- **Síntoma:** al terminar una lección, la XP o las gemas cambian unos segundos después.
- **Causa real:** no es un bug: tras cada escritura, el resultado de la transacción vuelve al store y trae lo que se hizo en OTRO dispositivo del mismo usuario.
- **Solución:** ninguna; es el sync funcionando (ver «Progreso: local-first» en `decisiones.md`).

## `pdfjs-dist` 6 no tiene `isEvalSupported`
- **Síntoma:** recomendaciones de seguridad antiguas piden `getDocument({ isEvalSupported: false })`.
- **Causa real:** la opción se eliminó; el build de la serie 6 no usa `eval` ni `new Function` (comprobado con grep en `build/pdf*.mjs`).
- **Solución:** la mitigación es la versión (`>= 6.2.108`); `lib/reader/parse.ts` pasa sólo `enableXfa: false`.

## El stream del coach se quedaba colgado minutos (`pull` que vuelve sin encolar)
- **Síntoma:** `/api/coach` respondía 200 y el cliente esperaba para siempre (3,5 min en el log hasta que se cortó).
- **Causa real:** en un `ReadableStream`, si `pull()` vuelve sin `enqueue` ni `close` (llegó una parte que no es texto: `start-step`, `finish`…), el navegador no lo vuelve a llamar y la lectura pendiente no se resuelve nunca.
- **Solución:** `pull` itera `result.stream` hasta encolar texto, cerrar o fallar. No volver a un `pull` de «una parte por llamada».

## El tutor responde «ai_busy» con 120 s pero no vuelve en 2 minutos
- **Causa real:** el free tier de `gemini-flash-latest` tiene un tope de ~20 peticiones AL DÍA por proyecto (`generate_content_free_tier_requests`); Google pide esperar horas. El plazo que enseña el cliente está topado a 120 s. La clave es la misma para todo (tutor, traducción, y lo que añada la fase 3), así que se agota entre todos.
- **Solución:** ante el tope diario la ruta pasa a `gemini-flash-lite-latest` (ver `decisiones.md`). Si también se agota, sigue el aviso normal.

## La primera frase se LEE en ~1,5 s pero SUENA a los ~5 s
- **Parece roto pero es el coste de la voz neural:** el texto llega en 1,2-1,7 s, pero `/api/tts` (Gemini TTS) tarda 2,6-5,6 s en generar cada frase y el free tier del modelo de voz admite muy pocas peticiones por minuto (dos a la vez ya daban 429). La CDN sólo ayuda con frases repetidas.
- **Opciones si se quiere bajar:** apagar la voz neural en el perfil (la del dispositivo suena al instante) o leer la PRIMERA frase con la del dispositivo y el resto con la neural (mezcla dos voces en la misma respuesta; no se hizo).

## Manos libres y «Dilo tú» no se pueden probar de verdad en el harness
- El Chrome headless de `shots.mjs` no lleva `--use-fake-ui-for-media-stream`, así que el reconocimiento da `not-allowed` (así se probó el estado de error de manos libres). La escucha real, el envío por silencio y la reapertura tras hablar el tutor están SIN verificar con micrófono: probar en un Android/Chrome real.
## La llamada no reanuda o «Token has been used too many times»
- **Síntoma:** tras un corte, la llamada vuelve pero el personaje no recuerda nada, o el WebSocket cierra con `1011 Token has been used too many times`.
- **Causa real:** un token efímero de `uses: 1` no sirve para reconectar (en contra de lo que dice la doc), y con un token nuevo el `sessionResumption.handle` que manda el cliente se ignora porque el setup del token está bloqueado.
- **Solución:** reconectar SIEMPRE pidiendo token nuevo a `/api/live-token` con el `handle`; el servidor lo mete en el setup del token (`liveSetup({ handle })`).

## `getUserMedia` da `NotAllowedError` sin preguntar nada
- **Causa real:** la cabecera `Permissions-Policy: microphone=()` lo prohíbe en toda la app. Ahora es `microphone=(self)` en `next.config.ts`. Si se vuelve a tocar esa cabecera, comprobar el modo llamada.

## Modo llamada en iPhone (sin verificar en dispositivo)
- **A vigilar:** con el micro abierto iOS puede mandar el audio al auricular (se oye bajísimo). Se pide `navigator.audioSession.type = "play-and-record"` (Safari 16.4+) y el `AudioContext` se crea dentro del toque; falta confirmarlo en un iPhone real, también con Parlo instalada (standalone: `getUserMedia` funciona desde iOS 14.3, a diferencia del dictado).
- **Eco:** sin auriculares el modelo puede oírse a sí mismo e interrumpirse; `echoCancellation` lo reduce, por eso la pantalla recomienda auriculares.

## Probar `/api/live-token` sin emulador
- `next dev -p <puerto>` con `NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-…` y `FIREBASE_AUTH_EMULATOR_HOST` puesto (no hace falta que el emulador corra): la guarda acepta un JWT sin firma con `aud` = proyecto y `sub`. En dev, abrir la app por `localhost` y no por `127.0.0.1`: Next bloquea los recursos de dev a otros orígenes y la página no hidrata.
