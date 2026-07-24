# Parlo 🦜

**Aprende inglés como se debe — desde cero hasta avanzado.**

PWA para hispanohablantes que combina un currículo por niveles (A1 → C2) con un tutor de IA que **corrige tus errores y te explica el porqué en español**, repaso espaciado (SRS), pronunciación y gamificación (retos, racha, gemas, logros).

> Estado: **en construcción** · Web PWA (siempre web, nunca app nativa).

---

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **PWA** con [Serwist](https://serwist.pages.dev/) (instalable + offline parcial)
- **Framer Motion** + componentes visuales estilo **Aceternity**
- **Iconos**: [@tabler/icons-react](https://tabler.io/icons)
- **Auth + DB**: Firebase (Auth + Firestore)
- **IA**: Vercel AI SDK + **Google Gemini** (free tier, sin coste)
- **Voz**: Web Speech API (nativa del navegador)
- **Deploy**: Vercel

## Empezar

```bash
pnpm install
cp .env.example .env.local   # rellena tus claves
pnpm dev                     # http://localhost:3000
```

### Variables de entorno

Copia `.env.example` a `.env.local`:

- `NEXT_PUBLIC_FIREBASE_*` — config del proyecto Firebase.
- `GOOGLE_GENERATIVE_AI_API_KEY` — clave gratis de [Google AI Studio](https://aistudio.google.com/apikey).

## Scripts

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo (Turbopack) |
| `pnpm build` | Build de producción (**webpack**, requerido por Serwist) |
| `pnpm start` | Sirve el build |
| `pnpm lint` | ESLint |

> ⚠️ El build usa `--webpack` a propósito: Serwist (InjectManifest) no es compatible aún con el Turbopack por defecto de Next 16.

## Estructura

```
app/            # rutas (App Router), layout, sw.ts, manifest.ts
components/ui/  # componentes visuales (aurora, gradient-text, botones…)
lib/            # firebase, utils (cn)
docs/           # roadmap-mvp.md + docs/contexto (contexto del proyecto)
```

## Documentación

- [Roadmap y Plan MVP](docs/roadmap-mvp.md)
- [Contexto del proyecto](docs/contexto/) — arquitectura, convenciones, decisiones, glosario, flujo de trabajo, errores conocidos.
