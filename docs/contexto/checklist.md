# Parlo — Mapa maestro (estado · pendientes · plan)

Fuente de verdad del proyecto. Actualizado **2026-07-26**.
Producción: <https://parlo-lilac.vercel.app> (auto-deploy en cada push a `main`).

Leyenda de prioridad: **P0** rompe o bloquea · **P1** siguiente entrega · **P2** deseable · **P3** aparcado.

---

## 1. Mapa de módulos

| # | Módulo | Estado | Dónde vive |
|---|--------|--------|-----------|
| M0 | Plataforma (PWA, tema, i18n, auth, sync, seguridad, SEO) | ✅ operativo | `app/`, `lib/firebase.ts`, `lib/sync.ts`, `proxy.ts` |
| M1 | Currículo + motor de lecciones (choose/bank/type, explicación en español) | ✅ operativo | `lib/curriculum/`, `components/lesson/` |
| M2 | Repaso espaciado (SRS SM-2) | ✅ operativo | `lib/srs.ts`, `app/app/repaso` |
| M3 | Progreso y gamificación (XP, gemas, racha, objetivo diario, retos, premios, niveles, logros) | ✅ v1 | `lib/progress.ts`, `lib/gamification.ts`, `app/app/retos` |
| M4 | Tutor IA conversacional (Gemini free) | 🟡 básico (chat suelto) | `app/app/tutor`, `app/api/tutor` |
| M5 | **Entrenador de conversación con corrección** (nuevo) | ⛔ por hacer | — |
| M6 | **Música y podcasts con letra / transcripción** (nuevo, tipo LyricsTraining) | ⛔ por hacer | — |
| M7 | Test de nivel inicial (colocación CEFR) | ⛔ por hacer | — |
| M8 | Pronunciación (grabar y comparar) | ⛔ idea | — |
| M9 | **Lector de documentos propios con voz** (nuevo) | ⛔ por hacer | — |

---

## 2. Hecho (verificado)

**Plataforma**
- Next.js 16 PWA web-only, Tailwind v4, Vercel Hobby (coste cero verificado), instalable (prompt nativo en Android + pasos en iOS), `safe-area`.
- i18next **es/en** con paridad de claves y todas las pantallas con `t()`; tema claro/oscuro/sistema.
- **Firebase real**: Auth correo + PIN de 4 dígitos (`pin+"00"`), Firestore `nam5`, reglas `users/{uid}`, sync local↔nube que conserva lo más avanzado.
- Seguridad: cabeceras HTTP, cookie de presencia + `proxy.ts` como gate de UX, reglas de Firestore como frontera real, rate-limit del tutor (15/min por IP), tope de 12k caracteres, CVEs de producción a cero.
- SEO: OG image con `next/og`, `robots.ts`, `sitemap.ts`, metadatos.
- Marca: paleta definitiva con tokens AA (`*-ink`), mascota loro, logo, favicon, iconos PWA, decorativos en parallax.

**Aprendizaje**
- **18 unidades / 54 lecciones / 270 ejercicios**: A1 completo (6 unidades), A2 completo (rutinas, pasado, futuro, comparar, viajar, presente perfecto), B1 completo (condicionales, historias, modales, opiniones, trabajo, estilo indirecto + pasiva).
- Explicación **siempre en español** en cada ejercicio (el diferenciador).
- SRS SM-2 por ejercicio; repaso con distractores del vocabulario aprendido.
- Audio (Web Speech) en el enunciado, **en cada opción de respuesta** y en la respuesta correcta del feedback; se omite cuando las opciones están en español (`lib/curriculum/speech.ts`).
- Checks runnables: `lib/curriculum/data.check.ts`, `lib/gamification.check.ts`, `lib/srs.check.ts`, `lib/rate-limit.check.ts`.

**Gamificación (v1, 2026-07-26)**
- Objetivo diario de XP configurable (20/50/100) que da gemas y **manda sobre la racha**.
- Retos **diarios (3)** y **semanales (2)** deterministas por fecha, con progreso real y cobro de recompensa.
- Premios: escudo de racha (30 gemas) que salva un día fallado.
- Niveles de avance por XP (200/nivel) con 5 rangos; 6 logros con seguimiento real.

---

## 3. Auditoría visual (2026-07-26) — hallazgos abiertos

Hecha mirando capturas reales de la app logueada (móvil 390 y desktop 1440, claro y oscuro).

| id | Sev | Pantalla | Problema | Arreglo |
|----|-----|----------|----------|---------|
| V1 | 🔴 | /app desktop | Contenido en `max-w-2xl`: **un tercio derecho vacío**; desktop = móvil estirado | Layout de 2 columnas ≥`xl` (ruta + panel lateral con objetivo/retos/repaso) |
| V2 | 🔴 | /app ruta | 18 filas planas, 15 seguidas «Bloqueada» | Agrupar por nivel A1/A2/B1, colapsar lo no alcanzado, foco en la unidad actual |
| V3 | 🔴 | /app/leccion | AppBar + BottomNav visibles: no hay **modo foco**, dos salidas compitiendo | Ocultar navegación durante lección y repaso |
| V4 | 🟠 | /app/leccion | Media pantalla muerta bajo las opciones; el CTA aparece de golpe | Reequilibrar: CTA siempre presente (deshabilitado) y contenido centrado |
| V5 | 🟠 | /app/retos | Panel apretado, titular en 2 líneas; diario y semanal indistinguibles; cobrar sin celebración | Jerarquía por periodo + microcelebración al cobrar |
| V6 | 🟠 | /app/tutor | Botón enviar deshabilitado en rojo apagado (parece error); hueco enorme entre starters e input | Estado deshabilitado neutro; repartir el alto |
| V7 | 🟠 | /app/perfil | «Logros» muestra el nº de lecciones (etiqueta engañosa) | Contar insignias ganadas o corregir la etiqueta |
| V8 | 🟡 | global | Revisión de espaciados/tamaños contra la escala y textos huérfanos (nada hardcodeado) | Barrido con grep + capturas 320/390/768/1440 |
| V9 | 🟡 | /app/repaso | Sin estado vacío real cuando no hay cartas vencidas | Estado vacío con mascota + siguiente acción |

Reglas de verificación: capturas reales (no supuestos) en 320/390/768/1440, claro y oscuro, es y en; contraste ≥4.5:1 medido; touch ≥44px; `prefers-reduced-motion`; cero strings hardcodeados.

Harness de capturas (dev): `shot.mjs` (Chrome headless por CDP) entra con usuario ficticio y siembra progreso. Ver `docs/contexto/flujo-de-trabajo.md`.

---

## 4. Pendientes priorizados

### P0 — Calidad de lo que ya existe
1. **Rediseño visual de la app logueada**: V1–V7 de la auditoría (en curso).
2. **Barrido de textos y espaciados** (V8): grep de strings hardcodeados, escala 4-8-12-16-24-32, 320px sin overflow.
3. **Estados vacíos y de error** en repaso, retos y tutor (V9).

### P1 — Para que el ciclo de producto cierre
4. **M7 · Test de nivel inicial**: 12–15 ítems adaptativos → coloca en A1/A2/B1 y abre la ruta desde ahí (hoy todos empiezan en A1 obligatoriamente).
5. **M5 · Entrenador de conversación con corrección** (§5).
6. **M9 v1 · Lector de documentos con voz** (§7): subir TXT/PDF, leerlo, escuchar frase a frase y palabra a palabra.
7. **Verificación de correo** (`sendEmailVerification`): hoy cualquiera se registra con un correo ajeno.
8. **Recordatorio diario** de la racha (Web Push o recordatorio local de la PWA).

### P2 — Expansión
9. **M6 · Música y podcasts con letra** (§6).
10. **M9 v2** (§7): EPUB/DOCX, **traducción en voz**, vocabulario del documento al SRS, búsqueda dentro del documento.
11. **Contenido B2** (6 unidades) y más ejercicios por lección en A2/B1.
12. **Arte propio** de las 3 insignias nuevas y poses extra de la mascota (las genera Andrés).
13. **M8 · Pronunciación**: grabar, comparar con la referencia y puntuar.
14. Liga/ranking entre amigos (opt-in) y retos compartidos.

### P3 — Aparcado
15. Recuperación de PIN (el flujo estándar de Firebase pide 6+ caracteres y rompe `pin+"00"`; haría falta página propia y dominio).
16. Dominio propio (por ahora se queda la URL de Vercel).
17. `docs/roadmap-mvp.md` está desactualizado (menciona Claude y stack viejo) → reescribir o retirar.

---

## 5. M5 · Entrenador de conversación con corrección (especificación)

**Idea**: conversar con la IA de forma natural; cuando cometa un error, **antes de continuar** la IA da la corrección, la explicación y ejemplos de uso.

- **Escenarios** con objetivo (pedir en un restaurante, entrevista de trabajo, presentarse, aeropuerto, médico…) y nivel sugerido; también «charla libre».
- **Turno con dos capas**: (1) *coach* — analiza mi mensaje y devuelve `{ hasErrors, corrections[{ original, corrected, why, examples[] }], naturalness }`; (2) *respuesta en personaje* que continúa la conversación.
- **Puerta de corrección**: si `hasErrors`, primero se muestra la tarjeta de corrección (en español, con 2 ejemplos de uso) y un botón «Entendido, seguir»; la conversación no avanza hasta cerrarla, con opción de **reescribir mi frase**.
- **Salida estructurada**: pedir JSON a Gemini y validarlo; si no valida, degradar a solo respuesta (nunca romper el chat).
- **Cierre de sesión**: resumen de errores recurrentes y vocabulario nuevo → **entra al SRS** (misma clave `vocab.en`) y suma a XP/retos (`tutor`).
- **Coste cero**: `gemini-flash-latest`, mismo rate-limit, historial recortado.
- Reutiliza `app/api/tutor` con `mode: "coach" | "chat"`.

Riesgos: latencia de dos llamadas por turno (mitigación: una sola llamada que devuelva ambas partes en el mismo JSON); falsos positivos (mitigación: instruir que corrija errores reales, no estilo).

---

## 6. M6 · Música y podcasts con letra (especificación)

**Idea**: buscar vídeos de canciones o podcasts, ver el texto, **completar huecos** por niveles (principiante → experto) y evaluar el nivel. Referencia de producto: lyricstraining.com.

- **Reproductor**: embed de YouTube (IFrame API); la web nunca descarga el medio.
- **Pista de texto sincronizada** (`{ t: segundos, line }`) y modo huecos: se ocultan palabras según dificultad (principiante ~10% de palabras frecuentes → experto ~40% incluyendo funcionales); al llegar la línea el reproductor **pausa** hasta acertar, con «saltar» que penaliza.
- **Niveles**: % de huecos + tolerancia ortográfica + si se muestran iniciales.
- **Evaluación**: precisión y velocidad → XP, aciertos al SRS y estimación de **nivel de escucha** (independiente del CEFR de gramática).
- **Fuente del texto — restricción legal, decidir antes de implementar**: no vamos a alojar letras de canciones sin licencia. Opciones: (a) API de letras con licencia (Musixmatch/LyricFind, de pago → choca con «coste cero»); (b) **transcripciones/subtítulos** de vídeos que los publican y podcasts con transcripción abierta o propia (CC/dominio público); (c) contenido grabado por nosotros. **Recomendación: empezar por (b)** — encaja mejor con aprender inglés y es gratis; canciones solo cuando haya licencia.
- **Datos**: colección `tracks` (título, fuente, nivel, duración, licencia) + `lines`; arrancar con un puñado curado en el repo antes de montar buscador.

Fases: (1) reproductor + huecos con 3 piezas curadas; (2) buscador por nivel/tema; (3) puntuación y nivel de escucha; (4) canciones **si** hay licencia.

---

## 7. M9 · Lector de documentos propios con voz (especificación)

**Idea**: subir un documento que yo quiera leer en inglés; la app lo lee e indexa, muestra el texto completo, permite **reproducir palabras sueltas o frases enteras**, escucharlo **completo** con muy buena voz inglesa y también oír la **traducción en voz**.

- **Todo en el dispositivo** (privacidad + coste cero): el archivo se parsea en el cliente y se guarda en **IndexedDB**; a Firestore solo van metadatos y la posición de lectura. Nada de subir el documento a un servidor.
- **Formatos**: v1 TXT/MD y **PDF** (pdf.js); v2 EPUB (epub.js) y DOCX (mammoth).
- **Segmentación**: `Intl.Segmenter` (nativo, gratis) para partir en frases y palabras → cada frase es una unidad reproducible y cada palabra es tocable.
- **Indexado**: índice invertido simple en IndexedDB para buscar dentro del documento y localizar una palabra en todas sus apariciones.
- **Lectura en voz (el punto delicado)**: `speechSynthesis` es gratis pero su calidad depende del sistema. Plan: capa `lib/tts.ts` con proveedor conmutable → (a) **Web Speech eligiendo la mejor voz `en-*` instalada** (en macOS/iOS hay voces muy buenas; en Android varía), (b) **Gemini TTS** si su cuota gratuita lo permite (a verificar antes de prometerlo), (c) proveedores de pago (ElevenLabs/OpenAI) descartados por coste. La UI debe avisar cuando la voz del sistema sea pobre y sugerir instalar una voz mejor.
- **Traducción en voz**: traducir por frase con Gemini, **cachear** en IndexedDB (una frase se traduce una sola vez) y leerla con voz `es-*`. Modo «bilingüe»: frase en inglés → misma frase en español.
- **Aprender leyendo**: tocar una palabra → significado + botón «añadir al repaso» (entra al SRS con la misma clave `vocab.en`); el tiempo de lectura suma XP y alimenta los retos.
- **Aviso al usuario**: la traducción envía fragmentos del documento a Gemini (el resto es local). Debe decirse en la UI.

Fases: **v1** subir TXT/PDF + texto completo + reproducir palabra/frase + reproducción continua con resaltado; **v2** EPUB/DOCX, traducción en voz cacheada, palabras al SRS, buscador interno.

Riesgos: calidad de voz desigual por dispositivo (mitigación: selector de voz + aviso); PDFs escaneados sin texto (mitigación: detectarlo y avisar — el OCR queda fuera del coste cero); documentos largos (mitigación: paginar por capítulos/bloques y no cargar todo en memoria).

## 8. Bloqueado en Andrés
- Arte de las insignias nuevas y poses de la mascota (pensar/saludar/oops).
- Decisión de licencia para M6 (§6) y si acepta empezar por podcasts/transcripciones.
- Rotar la API key de Gemini (se pegó en texto plano en el chat).

## 9. Cómo se verifica cada cambio
1. `node --experimental-strip-types lib/curriculum/data.check.ts` (y el check del módulo que se toque).
2. `pnpm exec tsc --noEmit` + `pnpm lint` + `pnpm build`.
3. Capturas reales en 390 y 1440, claro y oscuro, antes de declarar terminado.
4. Paridad de claves i18n es/en y cero strings hardcodeados.
