# Convenciones

## Estilo
- **Formateador:** Prettier por defecto (config de Next) + ESLint flat config.
- **Naming:** componentes `PascalCase`, hooks `useX`, utilidades `camelCase`, archivos de componente en `kebab-case.tsx` dentro de `components/ui/`.
- **Imports:** alias `@/*` (raíz del proyecto). Agrupar: libs externas → `@/components` → `@/lib`.
- **Idioma del código:** UI y comentarios en español; código/identificadores en inglés.

## Patrones que SÍ usamos
- Componentes de servidor por defecto; `"use client"` solo cuando hay interactividad/animación.
- `cn()` de `@/lib/utils` para clases condicionales (nunca template strings de clases).
- Tokens de diseño vía variables CSS + Tailwind (`bg-primary`, `text-muted`, `rounded-pill`…). Nunca hex hardcodeado en componentes.
- Animaciones con Framer Motion: **rápidas** — spring `stiffness ≥ 300`, tweens `≤ 150ms`, `stagger ≤ 0.02s`. Respetar `prefers-reduced-motion`.
- Iconos siempre desde `@tabler/icons-react`.
- Botones con texto: fondo sólido (primario `bg-primary`; secundario/ghost `bg-surface` + borde). Pill (`rounded-pill`).
- Secretos solo en el servidor; nunca `NEXT_PUBLIC_` para claves de IA.

## Patrones PROHIBIDOS
- Nada nativo (Expo/RN).
- Emojis o SVG sueltos como iconos de UI (usar Tabler).
- Colores hex directos en JSX (usar tokens).
- Strings de clases sin `cn`.

## Tests
- Ubicación: junto al archivo (`*.test.ts(x)`) — pendiente de configurar runner.
- Obligatorio testear: algoritmo SRS, cálculo de XP/gemas/racha, parsers de correcciones de IA.

## Commits
- Formato: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`…).
- **Nunca** mencionar a Claude/IA en el mensaje.
- Autor: `andresmancilla08@gmail.com` (proyecto personal).
