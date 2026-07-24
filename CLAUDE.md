@AGENTS.md

# Parlo

PWA (siempre web, nunca nativo) para aprender inglés. Contexto completo en:

- `docs/roadmap-mvp.md` — visión, alcance MVP, fases.
- `docs/contexto/arquitectura.md` · `convenciones.md` · `decisiones.md` · `glosario.md` · `flujo-de-trabajo.md` · `errores-conocidos.md`

Reglas rápidas:
- IA sin coste: Google Gemini free tier (`@ai-sdk/google`). No usar Anthropic/OpenAI de pago.
- `pnpm build` usa `--webpack` (Serwist). No cambiar a Turbopack en build.
- Iconos Tabler, tokens de diseño (no hex), animaciones rápidas, validar UI con el equipo visual.
- Commits: Conventional Commits, sin mencionar IA, autor `andresmancilla08@gmail.com`.
