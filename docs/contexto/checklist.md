# Parlo — Checklist maestro

Estado de todo lo pedido. Actualizado 2026-07-25.

## ✅ Hecho
- Idea + nombre **Parlo**; plan MVP (`docs/roadmap-mvp.md`); repo en GitHub.
- Scaffold Next.js 16 PWA (web-only) + Tailwind v4; manifest + service worker (Serwist) + instalable.
- Iconos Tabler; `Button`/`Card`/`lib/motion`; lint y tsc verdes.
- IA sin coste → **Gemini free**; tutor con streaming, endurecido (validación, límites, estado de error + reintento).
- **i18n** i18next ES/EN (todas las pantallas con `t()`), **tema** claro/oscuro/sistema.
- Marca: paleta definitiva, logo en headers, favicon, iconos PWA, mascota en paleta (+ pose «celebrar»), decorativos en parallax del hero.
- **Home editorial** (titular bicolor, panel de la lección de hoy, ruta como lista numerada) y **tokens accesibles AA** (`*-ink`).
- **Core de aprendizaje real** (fin del mock): currículo curado, motor de lecciones (choose/bank/type) con explicación en español, SRS SM-2, progreso local-first (XP, gemas, racha, estrellas, cartas).
- **Seguridad server-side**: credenciales en env, cookie `parlo_session` httpOnly firmada (HMAC), `proxy.ts` protege `/app`.
- **Contenido**: 6 unidades / 18 lecciones / 90 ejercicios (A1 saludos, números, día a día, familia; A2 rutinas y pasado). Check: `node --experimental-strip-types lib/curriculum/data.check.ts`.
- **SRS por ejercicio**: cada carta avanza con el resultado de su ejercicio (acierto 4 / fallo 2), no con una calidad fija.
- **SEO**: OG image generada, `robots.ts`, `sitemap.ts`, OpenGraph/Twitter.
- **Logros**: 6 insignias (nivel, racha 3, 10 palabras, racha 30, primera conversación, 20 escuchas) con progreso real; nivel del perfil calculado (A1/A2…).
- Títulos de unidad/lección en el idioma activo (ya no fijos en español).

## ⏳ Pendiente
1. **Firebase real** (bloqueado: falta crear el proyecto) — auth multi-usuario, registro real y sync de progreso/SRS a Firestore. Hoy: demo single-user + localStorage.
2. **Más contenido** A2 avanzado y B1, misma forma de datos en `lib/curriculum/data.ts`.
3. **Poses extra de la mascota** (pensar/saludar/oops) — las genera Andrés (base #10); solo «celebrar» convergió con IA.
4. **Arte propio** para las tres insignias nuevas (hoy usan la variante «moneda» de icono).
5. **Dominio** «parlo» (sin decidir) → fijar `NEXT_PUBLIC_SITE_URL` cuando exista.
6. CVEs de dependencias transitivas (sharp/postcss vía next) con `pnpm.overrides`.
7. Rate-limit / anti prompt-injection en `/api/tutor` (impacto bajo hoy).
