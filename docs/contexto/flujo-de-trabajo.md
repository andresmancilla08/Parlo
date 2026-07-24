# Flujo de trabajo

## Antes de tocar código
1. Leer `docs/contexto/` y `docs/roadmap-mvp.md`.
2. Confirmar en qué fase del roadmap cae el cambio.
3. Verificar tokens de diseño existentes antes de crear estilos nuevos.

## Secuencia para implementar
1. Crear rama desde `main` (`feat/...`, `fix/...`).
2. Implementar componente de servidor por defecto; `"use client"` solo si hace falta.
3. Usar tokens (`bg-primary`, `text-muted`…) e iconos Tabler.
4. Animaciones rápidas con Framer Motion (spring stiff ≥ 300, stagger ≤ 0.02s).
5. **Validar toda UI con el equipo visual** antes de darla por terminada (regla del dueño).
6. `pnpm exec tsc --noEmit` y `pnpm lint`.

## Checklist de "terminado"
- [ ] Sin errores de tipos ni lint.
- [ ] `pnpm build` pasa (usa `--webpack`).
- [ ] Responsive (móvil primero) y `prefers-reduced-motion` respetado.
- [ ] Sin strings/colores hardcodeados fuera de tokens.
- [ ] Equipo visual ha firmado la UI.
- [ ] Commit (Conventional Commits, sin mencionar IA).

## Deploy
- `vercel --prod` con la cuenta `andresmancilla08@gmail.com`.
- Variables de entorno cargadas en Vercel (Firebase + `GOOGLE_GENERATIVE_AI_API_KEY`).
- No deployar sin permiso explícito del dueño en ese turno.
