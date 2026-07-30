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
- **Voz:** Web Speech API del navegador.
- **Hosting:** Vercel.

## Mapa de carpetas
- `app/` — rutas (App Router), `layout.tsx`, `globals.css`, `manifest.ts`, `sw.ts`, `register-pwa.tsx`.
- `components/ui/` — componentes visuales reutilizables.
- `components/lesson/` — `lesson-teach.tsx` (fase «Aprende») y `lesson-runner.tsx` (práctica).
- `lib/curriculum/` — `levels/*` (ejercicios base), `extra/*` (ejercicios añadidos, mapa `lessonId → Exercise[]`) y `teach/*` (teoría, mapa `lessonId → TeachStep[]`). `data.ts` los compone con `withExtra()`.
- `lib/` — `firebase.ts` (init cliente), `utils.ts` (`cn`), `sfx.ts` (sonidos WebAudio), `dictation.ts` (voz→texto), `tts.ts` (texto→voz, normal y lenta), `pronunciation.ts` (puntuar lectura en voz alta), `league*.ts` (liga: `league-core` es la parte pura y `league` la de Firestore).
- `docs/` — `roadmap-mvp.md` y `docs/contexto/`.

## Flujo de datos
- **Aprendizaje:** currículo curado A1→B2 (24 unidades) → **teoría** (`getTeach`) → lección → ejercicios → progreso/SRS en Firestore.
  Cada lección enseña ANTES de evaluar: `/app/leccion?id=…` arranca en la fase «Aprende» y sólo entra a los
  ejercicios al terminarla (o si `progress.taught` ya la contiene). `?mode=teoria|practica` fuerza una u otra.
- **IA (tutor/corrección):** cliente → Route Handler `/api/...` → Gemini vía AI SDK (streaming) → respuesta. La clave de IA vive solo en el servidor.
- **PWA:** `manifest.ts` sirve `/manifest.webmanifest`; `sw.ts` precachea y da offline parcial (solo en producción).

- **Liga:** el ÚNICO dato compartido. `leagues/{id}` + `leagues/{id}/scores/{uid}` + `leagueCodes/{code}`; sólo viajan alias y XP semanal, y las reglas impiden tocar la entrada de otro.

## Lo que NO existe (descartado)
- **Nada nativo** (sin Expo/React Native): Parlo es SIEMPRE web PWA.
- **Sin Anthropic/OpenAI de pago:** se usa Gemini free tier para no tener coste.
- **Sin i18n de UI (aún):** v1 solo español; strings centralizados para extraer con i18next más adelante.
- **Sin Postgres:** se eligió Firebase.
