# Decisiones

## Web PWA, nunca nativo
- **Qué:** Parlo es exclusivamente web PWA (Next.js).
- **Por qué:** alcance sin fricción, instalable, un solo código; requisito del dueño.
- **Descartado:** Expo/React Native (Aceternity no corre en RN; añade complejidad innecesaria).
- **Estado:** vigente.

## Next.js 16 + Tailwind v4
- **Qué:** App Router, TypeScript, Tailwind v4, componentes estilo Aceternity + Framer Motion.
- **Por qué:** Aceternity requiere React/Next + Tailwind + Framer Motion; despliegue directo en Vercel.
- **Descartado:** Vite/CRA (menos integrado con Vercel/PWA/SSR).
- **Estado:** vigente.

## Firebase (Auth + Firestore)
- **Qué:** Firebase para autenticación y datos.
- **Por qué:** experiencia previa del dueño (Spendia/Bowlify), rápido de arrancar, gratis en Spark.
- **Descartado:** Neon Postgres (más setup; el modelo de Firestore basta para MVP).
- **Estado:** vigente (revisar si el SRS/consultas complejas piden relacional).

## IA sin coste: Google Gemini free tier
- **Qué:** tutor/correcciones con `@ai-sdk/google` (`gemini-2.5-flash`).
- **Por qué:** requisito explícito de coste cero; free tier generoso y de buena calidad.
- **Descartado:** Anthropic/OpenAI (de pago); Ollama local (necesita servidor propio).
- **Plan B:** Groq free tier.
- **Estado:** vigente.

## Build con webpack (no Turbopack)
- **Qué:** `next build --webpack`.
- **Por qué:** Serwist (InjectManifest) inyecta config webpack, incompatible con el Turbopack por defecto de Next 16.
- **Descartado:** `@serwist/turbopack` (experimental) — reevaluar cuando estabilice.
- **Estado:** vigente.

## i18n con i18next (ES/EN)
- **Qué:** i18next + react-i18next; recursos en `locales/es.json` y `locales/en.json`; todos los textos vía `t()`. Selector `LangToggle` (persiste en localStorage `parlo-lang`).
- **Por qué:** requisito del dueño (como Spendia/Bowlify); NUNCA next-intl.
- **Cómo (SSR):** `lng` fijo 'es' en el primer render; el `I18nProvider` cambia el idioma en cliente tras montar → evita mismatch de hidratación.
- **Estado:** vigente (implementado).

## Tema dark/light manual
- **Qué:** toggle claro/oscuro/sistema; paleta por clase `.dark` en globals.css; store `lib/theme.ts` + `ThemeProvider` + script anti-flash en layout.
- **Por qué:** el dueño quiere elegir el modo, no solo seguir el SO.
- **Estado:** vigente.

## Currículo + progreso local-first (SM-2)
- **Qué:** contenido curado en `lib/curriculum/` (A1); motor de lección `components/lesson/lesson-runner.tsx` (ejercicios choose/bank/type); repaso espaciado SM-2 en `lib/srs.ts`; progreso (xp/gemas/racha/estrellas/cartas SRS) en `lib/progress.ts` (zustand persist en localStorage).
- **Por qué:** entregar el core de aprendizaje funcional YA, sin depender de crear el proyecto Firebase. Runnable y deployable hoy.
- **Descartado (por ahora):** Firestore como store primario — se difiere a una capa de sync futura.
- **Estado:** vigente; migrar/duplicar a Firestore cuando exista proyecto.

## Auth: sesión server-side con cookie httpOnly + proxy.ts
- **Qué:** creds del usuario demo en env server (`DEMO_EMAIL`/`DEMO_PIN`); `/api/login` valida y setea cookie `parlo_session` httpOnly firmada HMAC-SHA256 (`lib/session.ts`, `AUTH_SECRET`); `proxy.ts` (Next 16, runtime Node) protege `/app` server-side. El store cliente solo guarda el email para la UI.
- **Por qué:** sacar las credenciales del bundle del cliente y proteger rutas en servidor (la auditoría lo marcó crítico). `proxy.ts` reemplaza a `middleware.ts` en Next 16.
- **Descartado:** validar en cliente (inseguro); Firebase Auth real (pendiente de crear proyecto → registro multi-usuario aún no).
- **Estado:** vigente para demo single-user; Firebase Auth real = próximo.

## Tokens accesibles (AA) — "inks"
- **Qué:** además de los colores de marca, tokens `--primary-ink/--accent-ink/--success-ink/--danger-ink` (variantes legibles como TEXTO) y `--primary-fg` navy sobre coral. `--muted` oscurecido a ≥4.5:1 sobre bg claro. `--gradient-panel` (panel premium legible en claro y oscuro).
- **Por qué:** auditoría de contraste (hex→ratio) encontró pares <4.5 (blanco sobre coral 2.8, mint sobre mint-soft 1.9, etc.). Regla dura: todo texto ≥4.5:1.
- **Cómo:** usar `text-*-ink` para TEXTO sobre fondos "soft"/tint; el color base (`text-accent`, etc.) queda para íconos/gráficos (≥3:1).
- **Estado:** vigente.

## SEO: metadatos fijos en español (sin rutas por idioma)
- **Qué:** `metadataBase` desde `lib/site.ts`, OpenGraph/Twitter y `robots.index`, más `app/opengraph-image.tsx` (generada con `next/og` en build), `app/robots.ts` y `app/sitemap.ts` (solo rutas públicas; `/app` y `/api` fuera).
- **Por qué:** el idioma de la UI se cambia en cliente (i18next) y no está en la URL, así que no hay locale que servir a los crawlers. Los metadatos van en español (público v1).
- **Descartado:** rutas `/es|/en` con `generateMetadata` por locale — coste alto (mover toda la app a un segmento) para un beneficio nulo hoy.
- **Estado:** vigente; revisar si se abre mercado angloparlante.

## SRS: cada carta se califica con SU ejercicio
- **Qué:** `Exercise.srsKey` marca qué carta evalúa un ejercicio; el runner devuelve `graded[]` (ok + srsKey) y `/app/repaso` llama a `reviewCards` con `qualityFromItem` (acierto 4 / fallo 2).
- **Por qué:** antes el repaso avanzaba TODAS las cartas con calidad fija 4, aunque fallaras: el intervalo crecía igual y el SRS mentía.
- **Nota:** 4 y no 5 porque acertar en opción múltiple es reconocimiento, no recuerdo puro.
- **Estado:** vigente. En las lecciones sigue usándose la calidad agregada (sus ejercicios no apuntan a una sola carta).

## Logros: arte ilustrado + "moneda" de icono
- **Qué:** `BadgeTile` acepta `src` (PNG ilustrado) o `icon` (Tabler). La variante icono se dibuja como moneda: aro `bg-gem` + centro `bg-primary` + icono blanco.
- **Por qué:** los logros nuevos (racha 30, primera conversación, escuchas) no tienen arte generado; la moneda mantiene la familia visual sin bloquear la feature.
- **Estado:** vigente; si se genera arte para esos tres, basta pasar `src`.

## Auth: Firebase con correo + PIN de 4 dígitos
- **Qué:** Firebase Auth (proyecto `parlo-ecdb0`) con correo y PIN de 4 dígitos. Firebase exige 6+ caracteres, así que el PIN se completa con un sufijo fijo (`lib/firebase.ts:pinToPassword` → `pin + "00"`), el mismo patrón que Spendia (`hooks/useAuth.ts`).
- **Por qué:** el PIN es la UX que el dueño quiere en todos sus productos; la entropía real es la del PIN (10⁴) y Firebase corta la fuerza bruta con `too-many-requests`.
- **Descartado:** contraseña de 6+ (rompe la UX pedida); enlace mágico (obliga a salir de la app).
- **Estado:** vigente. Falta activar el proveedor Email/Password en la consola (Spark no permite hacerlo por API).

## `proxy.ts` es gate de UX, no de seguridad
- **Qué:** la cookie `parlo_session` la escribe el cliente al iniciar sesión y sólo marca "hay sesión"; `proxy.ts` la usa para redirigir a `/login` sin parpadeo.
- **Por qué:** con Firebase la sesión vive en el cliente (IndexedDB) y verificarla en el servidor exigiría `firebase-admin` + service account. Ninguna página de `/app` renderiza datos privados en servidor: la frontera real son las reglas de Firestore (`request.auth.uid`), que sí se validan en el servidor de Google.
- **Descartado:** cookie httpOnly firmada tras verificar el ID token (más código y una clave más que custodiar, sin ganancia real).
- **Estado:** vigente. Si algún día se renderizan datos privados en servidor, hay que verificar el ID token de verdad.

## Progreso: local-first con sync a Firestore
- **Qué:** el store sigue siendo la fuente de trabajo (zustand persist en localStorage). Al iniciar sesión, `lib/sync.ts` fusiona local↔`users/{uid}` y escribe con debounce de 1,5 s.
- **Cómo fusiona:** gana lo más avanzado (máximo de xp/gemas/racha/contadores, unión de lecciones, máximo de estrellas, y por carta SRS la de `due` más reciente). Nunca se pierde lo hecho sin red.
- **Estado:** vigente.
