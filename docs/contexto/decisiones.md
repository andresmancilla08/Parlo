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

## Currículo + progreso local-first (SM-2)
- **Qué:** contenido curado en `lib/curriculum/` (A1); motor de lección `components/lesson/lesson-runner.tsx` (ejercicios choose/bank/type); repaso espaciado SM-2 en `lib/srs.ts`; progreso (xp/gemas/racha/estrellas/cartas SRS) en `lib/progress.ts` (zustand persist en localStorage).
- **Por qué:** entregar el core de aprendizaje funcional YA, sin depender de crear el proyecto Firebase. Runnable y deployable hoy.
- **Descartado (por ahora):** Firestore como store primario — se difiere a una capa de sync futura.
- **Estado:** vigente; migrar/duplicar a Firestore cuando exista proyecto.

## Auth: sesión server-side con cookie httpOnly + proxy.ts
- **Qué:** creds del usuario demo en env server (`DEMO_EMAIL`/`DEMO_PIN`); `/api/login` valida y setea cookie `parlo_session` httpOnly firmada HMAC-SHA256 (`lib/session.ts`, `AUTH_SECRET`); `proxy.ts` (Next 16, runtime Node) protege `/app` server-side. El store cliente solo guarda el email para la UI.
- **Por qué:** sacar las credenciales del bundle del cliente y proteger rutas en servidor (la auditoría lo marcó crítico). `proxy.ts` reemplaza a `middleware.ts` en Next 16.
- **Descartado:** validar en cliente (inseguro); Firebase Auth real (pendiente de crear proyecto → registro multi-usuario aún no).
- **Estado:** vigente para demo single-user; Firebase Auth real = próximo.

## Tokens accesibles (AA) — "inks"
- **Qué:** además de los colores de marca, tokens `--primary-ink/--accent-ink/--success-ink/--danger-ink` (variantes legibles como TEXTO) y `--primary-fg` navy sobre coral. `--muted` oscurecido a ≥4.5:1 sobre bg claro. `--gradient-panel` (panel premium legible en claro y oscuro).
- **Por qué:** auditoría de contraste (hex→ratio) encontró pares <4.5 (blanco sobre coral 2.8, mint sobre mint-soft 1.9, etc.). Regla dura: todo texto ≥4.5:1.
- **Cómo:** usar `text-*-ink` para TEXTO sobre fondos "soft"/tint; el color base (`text-accent`, etc.) queda para íconos/gráficos (≥3:1).
- **Estado:** vigente.

## SEO: metadatos fijos en español (sin rutas por idioma)
- **Qué:** `metadataBase` desde `lib/site.ts`, OpenGraph/Twitter y `robots.index`, más `app/opengraph-image.tsx` (generada con `next/og` en build), `app/robots.ts` y `app/sitemap.ts` (solo rutas públicas; `/app` y `/api` fuera).
- **Por qué:** el idioma de la UI se cambia en cliente (i18next) y no está en la URL, así que no hay locale que servir a los crawlers. Los metadatos van en español (público v1).
- **Descartado:** rutas `/es|/en` con `generateMetadata` por locale — coste alto (mover toda la app a un segmento) para un beneficio nulo hoy.
- **Estado:** vigente; revisar si se abre mercado angloparlante.

## SRS: cada carta se califica con SU ejercicio
- **Qué:** `Exercise.srsKey` marca qué carta evalúa un ejercicio; el runner devuelve `graded[]` (ok + srsKey) y `/app/repaso` llama a `reviewCards` con `qualityFromItem` (acierto 4 / fallo 2).
- **Por qué:** antes el repaso avanzaba TODAS las cartas con calidad fija 4, aunque fallaras: el intervalo crecía igual y el SRS mentía.
- **Nota:** 4 y no 5 porque acertar en opción múltiple es reconocimiento, no recuerdo puro.
- **Estado:** vigente. En las lecciones sigue usándose la calidad agregada (sus ejercicios no apuntan a una sola carta).

## Logros: arte ilustrado + "moneda" de icono
- **Qué:** `BadgeTile` acepta `src` (PNG ilustrado) o `icon` (Tabler). La variante icono se dibuja como moneda: aro `bg-gem` + centro `bg-primary` + icono blanco.
- **Por qué:** los logros nuevos (racha 30, primera conversación, escuchas) no tienen arte generado; la moneda mantiene la familia visual sin bloquear la feature.
- **Estado:** vigente; si se genera arte para esos tres, basta pasar `src`.

## Auth: Firebase con correo + PIN de 4 dígitos
- **Qué:** Firebase Auth (proyecto `parlo-ecdb0`) con correo y PIN de 4 dígitos. Firebase exige 6+ caracteres, así que el PIN se completa con un sufijo fijo (`lib/firebase.ts:pinToPassword` → `pin + "00"`), el mismo patrón que Spendia (`hooks/useAuth.ts`).
- **Por qué:** el PIN es la UX que el dueño quiere en todos sus productos; la entropía real es la del PIN (10⁴) y Firebase corta la fuerza bruta con `too-many-requests`.
- **Descartado:** contraseña de 6+ (rompe la UX pedida); enlace mágico (obliga a salir de la app).
- **Estado:** vigente. Falta activar el proveedor Email/Password en la consola (Spark no permite hacerlo por API).

## `proxy.ts` es gate de UX, no de seguridad
- **Qué:** la cookie `parlo_session` la escribe el cliente al iniciar sesión y sólo marca "hay sesión"; `proxy.ts` la usa para redirigir a `/login` sin parpadeo.
- **Por qué:** con Firebase la sesión vive en el cliente (IndexedDB) y verificarla en el servidor exigiría `firebase-admin` + service account. Ninguna página de `/app` renderiza datos privados en servidor: la frontera real son las reglas de Firestore (`request.auth.uid`), que sí se validan en el servidor de Google.
- **Descartado:** cookie httpOnly firmada tras verificar el ID token (más código y una clave más que custodiar, sin ganancia real).
- **Estado:** vigente. Si algún día se renderizan datos privados en servidor, hay que verificar el ID token de verdad.

## Progreso: local-first con sync a Firestore
- **Qué:** el store sigue siendo la fuente de trabajo (zustand persist en localStorage). Al iniciar sesión, `lib/sync.ts` fusiona local↔`users/{uid}` y escribe con debounce de 1,5 s.
- **Cómo fusiona:** gana lo más avanzado (máximo de xp/gemas/racha/contadores, unión de lecciones, máximo de estrellas, y por carta SRS la de `due` más reciente). Nunca se pierde lo hecho sin red.
- **Estado:** vigente.

## Enseñar SIEMPRE antes de evaluar (fase «Aprende»)
- **Qué:** cada lección abre con teoría (`TeachStep[]`: idea · tabla · error típico · ejemplos con audio) y sólo después entran los ejercicios. `progress.taught` recuerda la teoría vista: la segunda vez se entra directo a practicar, con la bombilla de la barra superior para consultarla sin perder el ejercicio en curso.
- **Por qué:** la app era puramente evaluativa; se aprendía por descarte. El diferenciador de Parlo es entender el porqué, y eso exige explicar antes de preguntar.
- **Dónde vive:** `lib/curriculum/teach/{a1,a2,b1}.ts` como mapa `lessonId → TeachStep[]`, NO dentro de `levels/*.ts`.
- **Por qué separado:** los archivos de nivel ya rondan las 1.100 líneas; insertar teoría dentro de cada lección los haría inmanejables y arriesga romper ejercicios al editar. El mapa se cruza por id y `teach.check.ts` valida que no falte ninguna ni sobre ninguna.
- **Red de seguridad:** `getTeach()` deriva teoría del vocabulario y de los `explain` si una lección no la tuviera; así ninguna práctica puede llegar sin enseñanza previa.
- **Estado:** vigente. 54/54 lecciones con teoría escrita a mano (216 pasos).

## Test de nivel adaptativo por bloques
- **Qué:** bloques de 5 ítems por nivel (A1 → A2 → B1). Se sube mientras se acierten ≥3; al primer bloque no superado el test para. Hay opción explícita «No lo sé» y al final se explican TODOS los fallos con audio.
- **Por qué:** los 12 ítems fijos anteriores obligaban a quien empieza de cero a contestar preguntas de B1 (frustrante y sin información nueva). Adivinar además colocaba a gente donde no le tocaba: «No lo sé» limpia esa señal.
- **Extra:** el resultado ofrece empezar en el nivel propuesto o «prefiero empezar desde A1» (subir de nivel marca las lecciones anteriores como superadas, y no todo el mundo quiere saltárselas).
- **Estado:** vigente. Cubierto por `lib/placement.check.ts`.

## Sonidos sintetizados (WebAudio), no ficheros
- **Qué:** acierto, error, fin de lección y recompensa se generan con osciladores en `lib/sfx.ts`; interruptor en el perfil (`parlo-sfx`, por defecto encendido).
- **Por qué:** cero bytes que descargar, cero assets que mantener y ningún problema de licencia. El `AudioContext` se crea en el primer sonido, que siempre nace de un toque del usuario (los navegadores bloquean el audio sin gesto previo).
- **Descartado:** MP3/OGG en `public/` (peso + licencias) y librerías de audio (innecesarias para cuatro tonos).
- **Estado:** vigente.

## Voz: tortuga, dictado y autoplay del coach
- **Tortuga (`RATE_SLOW = 0.55`):** cada frase se puede oír a velocidad normal o lenta (`SpeakControls`). Está en teoría, feedback de la práctica, escucha, lector y coach.
- **Dictado (`lib/dictation.ts`):** en Practicar se puede responder hablando con `SpeakRecognition` (Web Speech). No está en las definiciones del DOM: se tipa lo mínimo en el propio archivo. Firefox no la implementa → el botón no se muestra (`useSyncExternalStore`, nunca `setState` en efecto).
- **Autoplay:** la respuesta del coach se lee sola la primera vez y luego se repite a demanda. Al enviar se corta el micro para que el reconocimiento no se oiga a sí mismo.
- **Estado:** vigente.

## Pronunciación sin analizar audio (M8)
- **Qué:** el usuario lee la frase, el reconocedor del navegador la transcribe y `lib/pronunciation.ts` compara la transcripción con la referencia por **subsecuencia común más larga**, marcando qué palabras se entendieron.
- **Por qué así:** puntuar pronunciación «de verdad» (fonemas, entonación) exige un modelo de audio de pago. El criterio que sí importa al usuario —¿se me entiende?— lo responde gratis el propio reconocedor: si la máquina te entiende, un humano también.
- **Detalles:** las contracciones se expanden antes de comparar (`I'm` = `I am`), porque eso no es un fallo de pronunciación; la LCS evita que una palabra de más descuadre el resto. Las frases salen de la teoría de las lecciones ya hechas: se practica lo aprendido.
- **Descartado:** grabar y subir audio a un servicio (coste + privacidad); comparar por posición (una palabra extra rompía la alineación entera).
- **Estado:** vigente. Cubierto por `lib/pronunciation.check.ts`.

## Briefing antes de conversar y de escuchar
- **Qué:** cada escenario del coach define `prep` (3 frases con traducción) y `tipEs`, que se muestran ANTES de la conversación. La escucha explica su estrategia en el propio listado.
- **Por qué:** la regla «enseñar antes de evaluar» valía sólo para lecciones; conversar sin preparación deja al usuario en blanco y la sesión se vuelve una prueba, no una clase.
- **Excepción:** la charla libre no tiene briefing (no hay guion que preparar), pero sí tres arranques sugeridos.
- **Estado:** vigente.

## DOCX sí, EPUB todavía no
- **Qué:** el lector acepta TXT/MD/CSV/PDF y ahora **DOCX** con `mammoth/mammoth.browser` cargado en diferido.
- **Por qué mammoth y no otra cosa:** extrae texto plano sin arrastrar dependencias de Node al bundle. Sus tipos apuntan al build de Node (que importa `fs`), así que el build de navegador se declara en `types/mammoth-browser.d.ts`.
- **EPUB queda fuera:** es un zip con XHTML; haría falta epub.js (pesado) o un lector de zip propio. No compensa hasta que alguien lo pida.
- **`.doc` (binario, pre-2007) no está soportado** y no se va a soportar.
- **Estado:** vigente.

## Ejercicios extra en un mapa aparte, no dentro de `levels/*`
- **Qué:** ampliar A2 y B1 de 5 a 8 ejercicios por lección se hizo en `lib/curriculum/extra/{a2,b1}.ts` (`lessonId → Exercise[]`), y `data.ts` los concatena con `withExtra()`.
- **Por qué:** mismo motivo que la teoría — `a2.ts` y `b1.ts` pasan de 1.100 líneas y editarlas por dentro para meter tres ejercicios en cada una de las 18 lecciones es pedir romper contenido que ya funciona. Además el diff queda legible: todo lo nuevo en un archivo.
- **Orden:** los extra van al FINAL de cada lección, así quien ya la había hecho reconoce el principio.
- **Red de seguridad:** `data.check.ts` valida el currículo YA compuesto (lo mismo que ve la app), comprueba que ningún extra apunte a una lección inexistente y que no haya **enunciados repetidos** dentro de una lección.
- **Estado:** vigente y **completo**: desde el 2026-08-01 hay `extra/{a1,a2,b1,b2,c1}.ts` y las 90 lecciones tienen 8 ejercicios (**720**). El foco de cada nivel es distinto: A1 ensancha la rampa (el saludo que faltaba, el plural, la preposición hermana), B2 obliga a elegir entre dos formas gramaticales pero de significado distinto, y C1 va a registro y colocación.

## Liga entre amigos: alias, XP semanal y nada más
- **Qué:** liga privada opt-in de hasta 20 personas a la que se entra por un código de 6 caracteres. Modelo: `leagues/{id}` (con `members` como mapa uid → {alias, joinedAt}), `leagues/{id}/scores/{uid}` (alias, semana, XP) y `leagueCodes/{code}` → leagueId.
- **Qué se comparte y qué no:** un alias que elige el usuario y su XP de la semana. Nunca el correo, ni las lecciones, ni cuándo estudia. La pantalla lo dice ANTES de pedir nada.
- **Por qué el mapa `members` y no una subcolección:** con un mapa, la regla `members.diff(...).affectedKeys().hasOnly([uid])` deja que cada quien se añada o se quite **solo a sí mismo** en una sola operación, sin poder meter ni echar a nadie.
- **Por qué un código y no invitaciones:** invitar por correo obligaría a compartir correos, justo lo que se quiere evitar. El código no es adivinable en la práctica (29⁶ con alfabeto sin vocales ni caracteres ambiguos) y `leagueCodes` sólo permite `get`, nunca `list`.
- **El alias se valida** (`league-core.ts`) para que nadie meta un correo o un teléfono sin darse cuenta.
- **Estado:** vigente. Cubierto por `lib/league.check.ts` y probado contra Firestore real.

## EPUB con fflate y el spine, no por nombre de fichero
- **Qué:** `lib/reader/epub.ts` descomprime el EPUB con `fflate` (30 KB, import dinámico), lee `META-INF/container.xml` → OPF → manifest + spine, y extrae el texto con `DOMParser` en ese orden.
- **Por qué el spine:** coger los XHTML por orden alfabético desordena los capítulos (chapter10 antes que chapter2). El spine ES el índice de lectura del libro.
- **Descartado:** epub.js (pesa y trae visor propio, que aquí sobra) y leer el zip a mano.
- **Estado:** vigente. Probado subiendo un EPUB real por CDP.

## Vocabulario del documento al SRS por frecuencia
- **Qué:** un botón vuelca al repaso las 20 palabras más repetidas del documento que no sean funcionales, nombres propios ni conocidas ya.
- **Cómo distingue un nombre propio:** si TODAS sus apariciones llevan mayúscula y al menos una está a mitad de frase. Así «Sarah» cae y «Climate» (que solo aparece abriendo frase) se queda.
- **Por qué frecuencia y no IA:** lo que se repite en lo que TÚ lees es exactamente lo que te conviene aprender, y no cuesta ni una llamada.
- **Estado:** vigente. Cubierto por `lib/reader/vocab.check.ts`.

## El armazón de `/app` es fijo; lo que scrollea es el contenido
- **Qué:** `app/app/layout.tsx` es un `flex h-dvh overflow-hidden`; el que scrollea es el `<main>` (`overflow-y-auto overscroll-contain`). El lateral pasó de `sticky h-dvh` a `h-full` y la barra superior perdió el `sticky top-0`.
- **Por qué:** antes scrolleaba el documento entero. Las barras *parecían* quietas (sticky/fixed), pero el rebote del móvil y el del trackpad en macOS arrastran el documento con todo lo que cuelga de él: la app se movía en bloque. Con el armazón fijo no hay nada que rebotar, y `overscroll-contain` impide que el scroll del contenido se propague al documento al llegar al final.
- **Coste asumido:** Next ya no puede restaurar la posición al navegar (el scroller no es el documento), así que el layout hace `scrollTo(0, 0)` sobre el `<main>` cuando cambia `pathname`. Y en iOS la barra del navegador deja de esconderse al bajar, que es justo lo que se busca: nada se mueve.
- **Efecto lateral corregido:** el aviso de «verifica tu correo» quedó DENTRO del scroller; fuera se convertía en cromo permanente y se comía media pantalla en móvil.
- **Estado:** vigente. Verificado por CDP en 320/390/768/1440: `scrollHeight == clientHeight` del documento en las 9 rutas, barras inmóviles tras scrollear el contenido a tope, y reset al navegar.

## La guía es consulta, no curso: datos bilingües y motor puro
- **Qué:** `/app/guia` con cinco temas (irregulares, regulares y el -ed, conjugador, phrasal verbs, falsos amigos). El contenido vive como datos bilingües en `lib/guide/`, igual que el currículo, y no en `locales/`: un verbo irregular no se traduce, se muestra.
- **Por qué un motor y no tablas:** guardar la conjugación de cada verbo sería imposible de mantener y estaría siempre incompleta. Con cinco formas (base, 3.ª persona, -ing, pasado, participio) salen los 15 tiempos, porque el inglés conjuga con auxiliares. Así funciona con CUALQUIER verbo que se escriba, esté o no en la tabla.
- **Por qué el motor no importa la tabla:** los `.check.ts` corren con `node --experimental-strip-types` y están excluidos de tsc, así que importan con extensión `.ts`. Para que eso funcione, el módulo probado no puede tener imports locales en runtime. `conjugate.ts` recibe el irregular como argumento y `lib/guide/index.ts` es quien cablea las dos piezas.
- **El límite conocido:** doblar la consonante final depende del ACENTO, que no está en la ortografía. Los monosílabos se resuelven con la regla; los polisílabos, con una lista explícita (`STRESSED_DOUBLERS`). Si aparece un verbo que dobla y no está, se añade ahí.
- **Estado:** vigente. Cubierto por `lib/guide/conjugate.check.ts` (reglas de ortografía, «to be» sin auxiliar, y validación de las tres tablas).

## Voz neural cacheada en la CDN, no pregenerada
- **Qué:** `GET /api/tts?t=…` llama a Gemini TTS, envuelve el PCM en una cabecera WAV y responde con `cache-control: immutable` a un año. La misma frase es siempre la misma URL, así que la CDN de Vercel la cachea y la segunda vez no llega al servidor.
- **Por qué así y no pregenerando el currículo:** pregenerar exigía decidir cuenta, autenticar (y la org de GCP prohíbe claves de service account) y guardar ~30k caracteres de audio en algún sitio. Generar bajo demanda con la clave de Gemini que YA existe y dejar que la CDN haga de almacén consigue lo mismo sin infraestructura nueva, y sólo se genera lo que alguien escucha de verdad.
- **Por qué GET y no POST:** un POST no lo cachea la CDN. El texto va en la URL, con tope de 400 caracteres (más que eso no es una frase).
- **El respaldo no es opcional:** la cuota gratuita tiene tope POR MINUTO, así que en una ráfaga de clics algunas peticiones fallan. Ante cualquier fallo se habla con la voz del dispositivo y se deja de intentar 5 minutos (cortafuegos en `lib/tts.ts`): esperar a una petición que sabemos que va a fallar es peor que sonar algo peor.
- **Estado:** vigente. Interruptor en el perfil (por defecto encendida). Verificado con el harness: 200 `audio/wav` con la cabecera de caché, y cero peticiones con el interruptor apagado.

## Entrar en la liga: escribir primero, leer después
- **Qué:** `joinLeague` ya no lee la liga antes de entrar; escribe su entrada de `members` y lee después.
- **Por qué:** la regla es `allow get: if isMember()`, así que quien todavía no es miembro NO puede leer el documento. Leer primero hacía que entrar por código fallara siempre, en silencio. La regla de `update` ya valida que sólo toques tu entrada y que no se pase del tope, así que escribir a ciegas es seguro.
- **Cómo se distinguen los errores:** por el código de Firestore — `not-found` (liga borrada, código huérfano) y `permission-denied` (el único rechazo posible en un alta bien formada es el tope de miembros).
- **Lección:** esto no se ve con una sola cuenta. El harness de capturas ahora sabe abrir **dos contextos de navegador aislados** (`cdp-multi.mjs`) precisamente para esto.
- **Estado:** vigente. Probado con dos cuentas reales: B entra por código, adelanta a A y A ve el aviso.
