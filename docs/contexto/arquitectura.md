# Arquitectura

## En una frase
PWA web que enseña inglés a hispanohablantes con currículo por niveles + tutor de IA que corrige y conversa.

## Stack
- **Lenguaje/runtime:** TypeScript, Node 20+, React 19.
- **Framework:** Next.js 16 (App Router) + Tailwind CSS v4.
- **PWA:** Serwist (`@serwist/next`), service worker en `app/sw.ts`.
- **UI/animación:** Framer Motion + componentes estilo Aceternity; iconos `@tabler/icons-react`.
- **Estado cliente:** Zustand.
- **Auth + BD:** Firebase (Auth + Firestore).
- **IA:** Vercel AI SDK (`ai`) + `@ai-sdk/google` (Gemini free tier). Rutas de IA en el servidor (Route Handlers).
- **Voz:** Web Speech API del navegador; Gemini TTS (`/api/tts`); Gemini Live por WebSocket (modo llamada, sin SDK).
- **Hosting:** Vercel.

## Mapa de carpetas
- `app/` — rutas (App Router), `layout.tsx`, `globals.css`, `manifest.ts`, `sw.ts`, `register-pwa.tsx`.
- `components/ui/` — componentes visuales reutilizables.
- `components/lesson/` — `lesson-teach.tsx` (fase «Aprende») y `lesson-runner.tsx` (práctica).
- `app/api/tts/` — voz neural (Gemini TTS) devuelta como WAV. GET a propósito: la misma frase es la misma URL y la cachea la CDN. Exige sesión vía `x-parlo-token`.
- `lib/api-guard.ts` + `lib/firebase-token.ts` — puerta de las rutas de IA (IP → ID token de Firebase → límite por uid). Cliente: `lib/api-client.ts` (`apiFetch`).
- `lib/live/` — modo llamada (Gemini Live). Puros y con `.check.ts`: `protocol.ts` (modelo, URL, setup del token, mensajes in/out), `pcm.ts` (remuestreo a 16 kHz, PCM16, base64, medidor), `transcript.ts` (transcripción en vivo y texto a revisar), `prompt.ts` (instrucciones por escenario y nivel). De navegador: `session.ts` (`LiveCall`: micro, WebSocket, cola de reproducción, reanudación) y `mic-worklet.ts` (AudioWorklet desde Blob). Servidor: `app/api/live-token/` (token efímero). UI: `app/app/llamada/` + `components/app/llamada/` (vistas sin lógica) + `components/app/call-entry-card.tsx` (entrada para el selector de práctica).
- `lib/guide/` — sección de consulta: `irregulars.ts`, `phrasals.ts`, `false-friends.ts`, `regulars.ts` (datos bilingües) y `conjugate.ts` (motor puro de los 15 tiempos). `index.ts` cablea motor + tabla; los `.check.ts` corren con node y por eso `conjugate.ts` NO importa la tabla.
- `lib/curriculum/` — `levels/*` (ejercicios base), `extra/*` (ejercicios añadidos, mapa `lessonId → Exercise[]`) y `teach/*` (teoría, mapa `lessonId → TeachStep[]`). `data.ts` los compone con `withExtra()`.
- `lib/` — `firebase.ts` (init cliente), `utils.ts` (`cn`), `sfx.ts` (sonidos WebAudio), `dictation.ts` (voz→texto), `tts.ts` (texto→voz, normal y lenta), `pronunciation.ts` (puntuar lectura en voz alta), `league*.ts` (liga: `league-core` es la parte pura y `league` la de Firestore), `sync.ts` + `progress-merge.ts` (sync del progreso por transacción; la fusión es pura), `local-data.ts` (qué se borra del dispositivo al cerrar sesión), `chunk-reload.ts` (recarga ante `ChunkLoadError`).
- `docs/` — `roadmap-mvp.md` y `docs/contexto/`.

## Flujo de datos
- **Aprendizaje:** currículo curado A1→B2 (24 unidades) → **teoría** (`getTeach`) → lección → ejercicios → progreso/SRS en Firestore.
  Cada lección enseña ANTES de evaluar: `/app/leccion?id=…` arranca en la fase «Aprende» y sólo entra a los
  ejercicios al terminarla (o si `progress.taught` ya la contiene). `?mode=teoria|practica` fuerza una u otra.
- **Llamada (voz en tiempo real):** botón «Llamar» → `/api/live-token` (sesión Firebase) → token efímero → el navegador abre el WebSocket de Gemini Live directamente (micro PCM 16 kHz ↑, voz PCM 24 kHz ↓, transcripciones) → al colgar, lo dicho va a `/api/coach` y se muestran las correcciones.
- **IA (tutor/corrección):** cliente → Route Handler `/api/...` → Gemini vía AI SDK (streaming) → respuesta. La clave de IA vive solo en el servidor.
- **PWA:** `manifest.ts` sirve `/manifest.webmanifest`; `sw.ts` precachea y da offline parcial (solo en producción).

- **Liga:** el ÚNICO dato compartido. `leagues/{id}` + `leagues/{id}/scores/{uid}` + `leagueCodes/{code}`; sólo viajan alias y XP semanal, y las reglas impiden tocar la entrada de otro.

## Lo que NO existe (descartado)
- **Nada nativo** (sin Expo/React Native): Parlo es SIEMPRE web PWA.
- **Sin Anthropic/OpenAI de pago:** se usa Gemini free tier para no tener coste.
- **Sin i18n de UI (aún):** v1 solo español; strings centralizados para extraer con i18next más adelante.
- **Sin Postgres:** se eligió Firebase.
