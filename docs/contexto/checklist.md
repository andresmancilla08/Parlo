# Parlo — Checklist maestro

Estado de todo lo pedido. Actualizado 2026-07-24.

## ✅ Hecho
- Idea + nombre **Parlo**; plan MVP (`docs/roadmap-mvp.md`).
- Scaffold Next.js 16 PWA (web-only) + Tailwind v4; subido a GitHub.
- Iconos Tabler; visual estilo Aceternity (aurora, gradient text).
- IA sin costo → **Gemini free**; tutor con streaming.
- Auth demo correo + PIN (hardcodeado).
- App: login/registro, shell, home/ruta, tutor, perfil, stub lección.
- Responsive base: sidebar desktop / bottom nav móvil.
- Botón naranja shimmer **suave**; hover con token.
- Arquitectura componetizada: `Button`, `Card`, `lib/motion`; lint verde.
- Paleta de marca definitiva + copy (brief ChatGPT, `docs/brief-marca-ia.md`).
- **i18n** i18next ES/EN + selector; todas las pantallas con `t()`.
- **Tema** dark/light/sistema manual; paleta en ambos modos.
- Mascota integrada; imágenes estáticas; hero por capas.
- **Logo** en headers + **favicon** + iconos PWA (símbolo P+loro).
- PWA: manifest + service worker + instalable.
- **Botón back** en auth → inicio.
- Credenciales demo **eliminadas** del login.
- Badge de logro en perfil.

## ⏳ Pendiente (decidido, por implementar)
1. **App bar / header tras login** (app bar + sidebar desktop + bottom nav móvil) **y arreglar el responsive en desktop ancho** (hoy queda un hueco enorme a la derecha; sidebar debe ir pegado al borde y el contenido centrado).
2. **Recolorear mascota + poses a la paleta** (mint-verde #27C7A8 + coral + ámbar, como el logo). La azul actual no va.
3. **Generar con Picasso** (PNG transparente HQ, EN PALETA): poses mascota, decorativos parallax (nubes/plumas/sparkles/burbujas), badges (racha 7/30, 1ª conversación, 100 palabras, pronunciación), empty states.
4. **Home ORIGINAL** (no clon de Duolingo) — validar con equipo visual.
5. **Mejorar mucho el parallax** (multicapa).
6. Validar TODO con el equipo visual.

## ⏳ Pendiente (de fondo / plan MVP)
7. Currículo + motor de lecciones + SRS + gamificación en Firestore.
8. Auth Firebase real (hoy PIN demo).
9. i18n de metadata/SEO.
10. Verificar dominio "parlo".
