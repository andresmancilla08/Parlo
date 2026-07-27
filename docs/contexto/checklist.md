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
| M4 | Tutor IA conversacional | 🔀 **unificado en M5** (Practicar → Charla libre); pantalla y endpoint retirados | — |
| M5 | **Entrenador de conversación con corrección** | ✅ v1 | `app/app/practica`, `app/api/coach`, `lib/coach.ts` |
| M6 | Escucha activa con huecos | ✅ v1 (piezas propias de Parlo) | `app/app/escucha`, `lib/listening.ts` |
| M6b | Canciones con letra | ⛔ **RETIRADO 2026-07-26**: sin licencia no se pueden servir letras de catálogo actual a los usuarios, y el repertorio libre (Jamendo/dominio público) no convence. Queda entero en el historial de git |
| M7 | Test de nivel inicial (colocación CEFR) | ✅ v1 | `app/app/test`, `lib/placement.ts` |
| M8 | Pronunciación (grabar y comparar) | ⛔ idea | — |
| M9 | **Lector de documentos propios con voz** | ✅ v1 **bidireccional** | `app/app/leer`, `lib/reader/*`, `app/api/translate` |

---

## 2. Hecho (verificado)

**Plataforma**
- Next.js 16 PWA web-only, Tailwind v4, Vercel Hobby (coste cero verificado), instalable (prompt nativo en Android + pasos en iOS), `safe-area`.
- i18next **es/en** con paridad de claves y todas las pantallas con `t()`; tema claro/oscuro/sistema.
- **Firebase real**: Auth correo + PIN de 4 dígitos (`pin+"00"`), Firestore `nam5`, reglas `users/{uid}`, sync local↔nube que conserva lo más avanzado.
- **Verificación de correo** (§7c): envío al registrarse y aviso reenviable con enfriamiento; puerta suave, nunca bloquea aprender.
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
| V8 | ✅ | global | Desborde horizontal real a 320px (medido, no a ojo) | `truncate` (whitespace-nowrap) en títulos subía el ancho MÍNIMO y estiraba la página → `line-clamp`; `<select>` con `w-0 flex-1`; nav de 5 pestañas y AppBar que encogen; densidad escalonada en 320 |
| V9 | ✅ | /app/repaso · /app/retos | Sin estado vacío útil | Repaso: mascota + «vuelve en N h» + CTA a la lección real; Retos: aviso «hoy no has practicado» con CTA |

Reglas de verificación: capturas reales (no supuestos) en 320/390/768/1440, claro y oscuro, es y en; contraste ≥4.5:1 medido; touch ≥44px; `prefers-reduced-motion`; cero strings hardcodeados.

Harness de capturas (dev): `shot.mjs` (Chrome headless por CDP) entra con usuario ficticio y siembra progreso. Ver `docs/contexto/flujo-de-trabajo.md`.

---

## 4. Pendientes priorizados

### P0 — ✅ CERRADO (2026-07-26)
1. ~~Rediseño visual de la app logueada (V1–V7)~~ ✅
2. ~~Barrido de textos y espaciados (V8)~~ ✅ **cero desborde medido en 320/390/768** en las 8 pantallas; cero strings hardcodeados.
3. ~~Estados vacíos y de error (V9)~~ ✅ repaso y retos con estado vacío que propone la siguiente acción; tutor ya tenía error con reintento.

### P1 — Para que el ciclo de producto cierre
4. ~~M7 · Test de nivel inicial~~ ✅ 12 ítems (4 por nivel), coloca en A1/A2/B1 y abre la ruta desde ahí.
5. ~~M5 · Entrenador de conversación con corrección~~ ✅ escenarios + puerta de corrección con ejemplos en español.
6. ~~M9 v1 · Lector de documentos con voz~~ ✅ hecho, y además **bidireccional** (§7).
7. ~~**Verificación de correo**~~ ✅ (§7c) `sendEmailVerification` al registrarse + aviso reenviable en la app.
8. **Recordatorio diario** de la racha (Web Push o recordatorio local de la PWA).

### P2 — Expansión
9. **M6b · fuente de letras con licencia** (§6): integrar **Musixmatch API** (plan gratis = ~30% de la letra + atribución) para no depender de que el usuario pegue la letra. Necesita que Andrés cree su key gratuita. Letras completas de catálogo actual = licencia de pago.
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

**Estado v2 (hecho 2026-07-26)**: `/app/canciones` reproduce **canciones reales** con el embed oficial de YouTube y pausa el vídeo en cada línea para completar los huecos (4 dificultades, XP y métricas compartidas con la escucha). Tres fuentes de letra: (a) catálogo de **dominio público** incluido con atribución, al que el usuario asigna el vídeo que quiera; (b) **su propia letra pegada**, guardada sólo en su dispositivo (`parlo-user-songs`, nunca al repo ni a Firestore); (c) pendiente: fuente con licencia (Musixmatch).

**Estado v1**: hecha en `/app/escucha` con **3 piezas originales de Parlo** (24 frases, A1/A2/B1) leídas con la voz del dispositivo, huecos deterministas en 4 dificultades, XP y métricas que alimentan los retos. Lo que falta es la **fuente externa**: reproductor de YouTube + transcripción con licencia. Fases restantes: (2) buscador por nivel/tema; (3) nivel de escucha estimado; (4) canciones **sólo** con licencia.

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

**Estado (hecho 2026-07-26)**: `/app/leer` funcionando. Subida de TXT/MD/CSV y **PDF** (pdf.js con carga diferida; detecta PDF escaneado y avisa). Documento en **IndexedDB del dispositivo** (`lib/reader/store.ts`), nunca sale del navegador. Segmentación con **`Intl.Segmenter`** (frases + palabras) e índice invertido para buscar dentro del texto. Altavoz por frase y **lectura continua** con resaltado y botón de parar. **Traducción por frase** con `gemini-flash-lite-latest` cacheada por documento en localStorage. **Clic en palabra** → traducción en contexto, explicación en español, ejemplo, y **«añadir al repaso»** (acción `addCard` del store). Guarda la última frase leída para retomar.
**Bidireccional**: `lib/reader/detect.ts` detecta el idioma contando palabras funcionales (sin IA ni dependencias). Si el documento está en español, la voz habla español y la traducción/significados van **al inglés**; la cabecera muestra el idioma detectado. Checks: `lib/reader/segment.check.ts` y `lib/reader/detect.check.ts`.
Pendiente v2: EPUB/DOCX y TTS de servidor cacheado.

Riesgos: calidad de voz desigual por dispositivo (mitigación: selector de voz + aviso); PDFs escaneados sin texto (mitigación: detectarlo y avisar — el OCR queda fuera del coste cero); documentos largos (mitigación: paginar por capítulos/bloques y no cargar todo en memoria).

## 7b. Navegación y sesión (2026-07-26)
- **Menú**: `Ruta · Leer · Practicar · Retos · Perfil` (5 pestañas). El Tutor suelto se retiró: lo cubre Practicar → Charla libre, que además corrige antes de seguir.
- **Lateral plegable** a solo iconos (`useSidebar`, preferencia recordada) con **tooltips propios** desde i18n; tema e idioma pasan a modo icono (`LangToggle` tiene prop `iconOnly`).
- **Sesión**: con cookie de presencia, `/`, `/login` y `/registro` redirigen a `/app`; sin ella, `/app/*` va a `/login`. `app/not-found.tsx` (server) manda a `/app` o a la landing según haya sesión.
- **Volver**: `BackButton` (admite `href` o `onClick`) en todas las subvistas: conversación, escucha y lector.
- Barra móvil: el pill activo lleva `0.5rem` de aire abajo más el área segura.
- **Menú de cuenta** al pie del lateral (`components/app/sidebar-menu.tsx`): panel translúcido (vidrio: `bg-surface/70` + `backdrop-blur-2xl` + borde de luz) con apariencia, idioma, perfil y **cerrar sesión**, sin tener que ir al perfil. Cierra al pulsar fuera o con Escape. El `aside` va con `overflow-visible` para que el panel no se recorte.
- **Mascota**: `mascot-celebrate.png` retirada de la app; se usa `mascot.png` (la del landing) en home, test, escucha y fin de lección. Ambas tenían un **velo semitransparente** (alpha 1-19: 13.710 y 19.124 px) que sobre fondo oscuro se veía como un recuadro; eliminado y lienzo recortado.

## 7c. Verificación de correo (2026-07-27)

`lib/auth.ts` + `components/app/verify-banner.tsx`.

- Al **registrarse** se envía `sendEmailVerification` con la URL de retorno `${origin}/app` y el **idioma de la app** (`auth.languageCode` desde `parlo-lang`). Si el dominio no está en «Authorized domains» de Firebase, el SDK rechaza la URL de retorno (`auth/unauthorized-continue-uri`) → **se reintenta sin ella**, antes que dejar al usuario sin correo. El envío nunca bloquea el registro: si falla, el aviso de la app deja reenviarlo.
- **Aviso reenviable** en `/app` (fuera del modo foco, así no interrumpe una lección): título, correo destino, `Reenviar` con **enfriamiento de 60 s persistido** en `localStorage` (`parlo-verify-sent`, sobrevive recargas) y `Ya lo hice` → `user.reload()`. Se puede cerrar y vuelve en la siguiente sesión (`sessionStorage`).
- Al **volver a la pestaña** (`visibilitychange`) se relee el usuario: si abrió el enlace en el correo, el aviso desaparece solo sin pedir nada.
- **Puerta suave a propósito**: aprender nunca se bloquea por el correo sin verificar. La frontera real de datos siguen siendo las reglas de Firestore (`request.auth.uid`); un correo verificado no añade permisos hoy.
- Color **ámbar** (`bg-warning/12` + `border-warning/40`): el mint de éxito diría «todo en orden». Primer uso del token `warning` en la app.
- Perfil: chip «Correo verificado» (`success-ink`) bajo la dirección cuando ya está verificado.
- Verificado con capturas reales a 320/390/1440 en claro y oscuro, y con **envío real** contra Firebase (aviso «Correo enviado», enfriamiento en marcha, «Aún no está verificado» al comprobar antes de abrir el enlace).

## 8. Decisiones de IA y voz (verificado 2026-07-26)

**Texto (tutor, coach, traducción)**: `gemini-flash-lite-latest` ✅ probado con la cuenta del proyecto (más barato y suficiente); `gemini-3.1-flash-lite` ✅ como alternativa; `gemini-flash-latest` ✅ (el que usa el coach hoy). `gemini-2.5-flash-lite` está **retirado (404)**. Plan B gratis: Groq.

**M6 v2 · canciones REALES — qué es viable legalmente** (informativo, no asesoría legal):
| Pieza | Viable | Cómo |
|---|---|---|
| Audio/vídeo | ✅ | Embed oficial de YouTube (IFrame API). Nunca se descarga ni se aloja el audio |
| Letra de dominio público | ✅ completa | Tradicional/folk anterior a ~1929 → va en el repo con su atribución |
| Letra de catálogo actual | ⚠️ con licencia | **Musixmatch API** plan gratis = ~30% de la letra + atribución obligatoria (basta para un ejercicio de huecos corto). Completa = licencia de pago (LyricFind / Musixmatch comercial) |
| Letra que pega el usuario | ✅ | Solo en **su dispositivo** (IndexedDB). Nunca al repo ni a Firestore |
| Genius API | ❌ | No sirve letras; scrapear su web viola sus términos |
| Subtítulos de YouTube ajenos | ❌ | La API oficial solo permite descargarlos si eres dueño del vídeo |

**Voz (TTS) — plan acordado**
Hoy: **Web Speech** con selección automática de la mejor voz instalada y selector manual en el perfil (`lib/tts.ts` puntúa las voces). Arregla el «suena terrible» donde hay voces buenas, pero no lo garantiza en todos los equipos.
Plan en dos capas (coste recurrente 0):
1. **Currículo (finito)**: pregenerar los MP3 una sola vez (~30k caracteres) con Google Cloud TTS Neural2/Chirp o Azure neural y servirlos estáticos. El runtime usa el MP3 si existe y cae a Web Speech si no.
2. **Texto libre (M9, escucha, coach)**: Web Speech con la voz elegida; si se activa TTS de servidor, cachear cada frase en IndexedDB para sintetizarla una única vez.

## 9. Bloqueado en Andrés
- Arte de las insignias nuevas y poses de la mascota (pensar/saludar/oops).
- Decisión de licencia para M6 (§6) y si acepta empezar por podcasts/transcripciones.
- Rotar la API key de Gemini (se pegó en texto plano en el chat).

## 10. Cómo se verifica cada cambio
1. `node --experimental-strip-types lib/curriculum/data.check.ts` (y el check del módulo que se toque).
2. `pnpm exec tsc --noEmit` + `pnpm lint` + `pnpm build`.
3. Capturas reales en 320, 390 y 1440, claro y oscuro, antes de declarar terminado.
   OJO con el harness: `window.innerWidth` MIENTE bajo emulación de móvil (crece con el
   contenido desbordado). Hay que medir contra `document.documentElement.clientWidth`, y
   capturar SIN `--full` para ver el recorte real (con `--full` el clip usa el scrollWidth
   y el desborde queda oculto).
4. Paridad de claves i18n es/en y cero strings hardcodeados.
