# Prompt maestro para generar la marca de Parlo (pegar en ChatGPT)

> Copia TODO el bloque de abajo (desde "Actúa como…" hasta el final) y pégalo en ChatGPT.
> Si vas a generar imágenes, usa las secciones de "PROMPTS DE IMAGEN" tal cual en DALL·E / la herramienta de imágenes.

---

Actúa como un director de arte y estratega de marca senior, especializado en productos digitales educativos y fintech-style. Vas a crear el sistema de marca completo de **Parlo**, una app web para aprender inglés. Trabaja en **español**. Sé concreto y accionable: entrega valores exactos (HEX, nombres de fuente, textos finales), no teoría.

## 1. Contexto del producto

- **Qué es:** Parlo es una **web app (PWA)** para que **hispanohablantes** aprendan inglés desde cero (A1) hasta avanzado (C2).
- **Diferenciador:** un **tutor de IA que corrige los errores y explica el porqué EN ESPAÑOL**, además de conversación real, currículo por niveles, repaso espaciado y gamificación (retos, racha, gemas, logros).
- **Público:** hispanohablantes (LATAM y España), jóvenes-adultos, que quieren aprender inglés de forma seria pero motivadora. Nivel de tech: normal.
- **Personalidad de marca:** cálida, humana, motivadora, cercana, moderna, confiable. Ni infantil ni corporativa fría. Anti-"app de tocar botones".
- **Nombre:** **Parlo** (de "hablar", raíz romance: parlare/parler).
- **Mascota:** un **loro** (parrot) — el animal que "habla idiomas". Debe sentirse simpático y con carácter, pero premium, NO caricaturesco barato.
- **A evitar:** los clichés de las apps de idiomas (búho verde tipo Duolingo, banderas, cabinas de avión). Queremos algo propio y con calidez latina.

## 2. Dirección de arte ya definida (respétala como base; puedes refinar, no reinventar)

Paleta actual en el código (modo claro):

| Rol | HEX | Uso |
|---|---|---|
| Primary (coral) | `#FF6B4A` | acciones, marca, energía |
| Primary soft | `#FFE9E2` | fondos suaves de acento |
| Accent (teal loro) | `#00C2A8` | secundario, "pluma de loro" |
| Accent soft | `#D8F7F1` | fondos suaves teal |
| Gem (ámbar) | `#FFC94A` | recompensas/gamificación |
| Ink / texto | `#1B1233` | texto principal (ciruela oscuro) |
| Muted | `#7A7290` | texto secundario |
| Fondo | `#FFF9F5` | fondo cálido crema |
| Success | `#22B07D` · Danger `#E5484D` | estados |

Modo oscuro (base): fondo `#140E24`, superficie `#1C1436`, primary `#FF7A5C`, accent `#1BD6BB`, gem `#FFD166`.

Tipografías actuales: **Montserrat** (títulos/display) + **Nunito** (cuerpo).

## 3. Lo que necesito que generes (entrega TODO)

### A) Logo e identidad
1. **3 conceptos de logo** que combinen wordmark "Parlo" + un símbolo de loro/pluma. Para cada uno: descripción visual, por qué funciona, y en qué contextos brilla (favicon, header, splash).
2. Recomienda **1 concepto ganador** y justifícalo.
3. Reglas de uso: versión horizontal, versión símbolo solo (para app icon), área de seguridad, versiones mono (negro/blanco), qué NO hacer.

### B) Paleta de color (refinada)
- Confirma o ajusta la paleta de arriba. Entrega la tabla final con HEX para **claro y oscuro**, incluyendo estados hover/pressed y una escala de grises neutra.
- Da 1–2 **gradientes de marca** (con HEX y ángulo) para héroes y tarjetas destacadas.
- Verifica **contraste AA** de texto sobre fondos y dime combinaciones seguras.

### C) Tipografía
- Confirma o propón el par de fuentes (mantén Google Fonts por rendimiento/PWA). Da escala tipográfica (tamaños/pesos para display, h1–h3, body, caption).

### D) Voz y tono + copy
1. **Tagline principal** + 4 alternativas.
2. Descripción corta (1 frase) y media (2–3 frases) para tiendas/redes.
3. **Textos de la landing** por sección: hero (título + subtítulo + CTA), 4 bullets de método, sección de niveles, sección de recompensas, CTA final. En español, cálido y directo.
4. **Microcopy** de la app: pantalla de login/registro, estados vacíos, mensajes de logro, notificación de racha, errores amables.
5. Reglas de tono: 5 "sí" y 5 "no".

### E) Ilustración e imágenes (estilo + prompts listos)
1. Define un **estilo de ilustración** coherente (p. ej. flat con texturas suaves, esquinas redondeadas, sombras cálidas) alineado a la paleta.
2. Entrega **prompts de imagen listos para usar** (en inglés, para DALL·E/Midjourney) para:
   - Ilustración del **loro mascota** (pose principal + 2 expresiones: celebrando, pensando).
   - **Icono de app PWA** (símbolo del loro/pluma sobre fondo de marca) en versión cuadrada y **maskable** (con margen de seguridad), pensado para 512×512.
   - **Hero** de la landing.
   - **Empty states** (tutor sin mensajes, sin lecciones).
   - 3 **badges de logro** (racha, primera conversación, 100 palabras).

### F) Iconografía
- Recomiéndame un set coherente (ya uso **Tabler Icons**). Da la lista de iconos por sección (ruta, tutor, perfil, racha, gemas, logros).

## 4. Restricciones técnicas (impórtalas en tus decisiones)
- Es **web PWA** (Next.js). Todo debe verse bien en **móvil primero** y en modo claro/oscuro.
- Necesito el **app icon** en 192×192, 512×512 y una versión **maskable** (con ~20% de padding para que no se recorte).
- Fuentes idealmente de **Google Fonts**.
- Accesibilidad: contraste AA mínimo.

## 5. Formato de salida
Entrega en secciones claras (A–F), con tablas para colores y tipografía, y los prompts de imagen en bloques de código para copiarlos fácil. Al final, un **checklist** de assets a exportar (formatos y tamaños) para meterlos a la app.

---

### Extra — PROMPTS DE IMAGEN listos (por si quieres generar ya, sin esperar el brief)

**App icon (PWA):**
```
A minimalist, premium app icon for a language-learning app called "Parlo".
A stylized parrot head (or a single elegant feather) in white, centered on a
warm coral-to-tangerine gradient background (#FF6B4A to #FF9472). Rounded,
friendly, modern, flat design with soft depth. Teal accent (#00C2A8) as a
small highlight. Clean, iconic, readable at small sizes. Square, centered,
generous safe margin. No text.
```

**Loro mascota (principal):**
```
A friendly, characterful mascot parrot for "Parlo", a language-learning app.
Modern flat illustration with soft textures and warm shadows. Body in teal
(#00C2A8) with coral (#FF6B4A) accents on the wing/cheek, amber beak (#FFC94A).
Rounded shapes, expressive eyes, approachable and premium — NOT a cheap
cartoon. Neutral warm cream background (#FFF9F5). Full body, 3/4 view.
```

**Hero de la landing:**
```
A warm, modern illustration for a language-learning web app hero section:
a person happily chatting with a friendly teal parrot that has coral accents,
speech bubbles with subtle letters. Flat design, soft gradients, cream
background (#FFF9F5), coral (#FF6B4A) and teal (#00C2A8) palette. Bright,
motivating, premium, plenty of negative space on one side for text.
```
