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
