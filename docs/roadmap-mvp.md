# Parlo — Roadmap & Plan MVP

> App web (PWA) para que hispanohablantes aprendan inglés desde A1 hasta C2, con currículo estructurado, tutor de IA que corrige y conversa, retos y premiación interna.

**Estado:** planificación · **Fecha:** 2026-07-23 · **Dueño:** Andrés Mancilla

---

## 1. Visión (una frase)

> Parlo enseña inglés a hispanohablantes combinando un camino claro por niveles con un tutor de IA que **explica el porqué de cada error** y te deja **conversar de verdad** — no solo tocar botones.

---

## 2. Decisiones ya tomadas

| Tema | Decisión |
|---|---|
| Público v1 | Hispanohablantes → inglés (UI y explicaciones en español) |
| Contenido | Mixto: currículo estructurado curado + IA para práctica, corrección y conversación |
| Alcance MVP | Completo: lecciones gamificadas **+** tutor IA desde v1 |
| Nombre | **Parlo** |
| Formato | Web PWA (instalable, offline parcial) |
| Stack | Next.js (App Router) + PWA, Vercel, AI SDK + Claude, Web Speech API |

---

## 3. Propuesta de valor (por qué Parlo y no Duolingo)

- **Corrección que explica el porqué**, en español, no solo "correcto/incorrecto".
- **Conversación real** con un tutor IA (role-play + charla libre) con feedback inmediato.
- **Método serio**: repaso espaciado (SRS) e input comprensible, no solo gamificación adictiva.
- **Ejercicios infinitos** generados a tu nivel e intereses (sin quedarte sin contenido).

---

## 4. Principios de método (respaldo pedagógico)

Cada feature del MVP existe para servir a uno de estos principios. Si una idea futura no encaja en ninguno, se descarta.

1. **Input comprensible (Krashen, i+1):** el contenido siempre un pelín por encima de tu nivel.
2. **Repaso espaciado (SRS):** el vocabulario se repasa justo antes de olvidarlo. Es lo que de verdad fija palabras.
3. **Producción activa:** hablar y escribir, no solo reconocer. La IA corrige la producción.
4. **Feedback inmediato y explicado:** el error se corrige en el momento y se explica el porqué.
5. **Hábito diario:** micro-lecciones de 5–10 min. La racha protege el hábito, no es el fin.
6. **Contexto real:** situaciones de uso (viaje, trabajo, café), no frases sueltas sin sentido.

---

## 5. Alcance del MVP (v1)

### Dentro (v1)

**Onboarding y nivel**
- Registro/login (email o Google).
- Test de nivel inicial adaptativo → sitúa al usuario en CEFR (A1–C2).

**Aprendizaje**
- Ruta por niveles/unidades (currículo curado por CEFR).
- Micro-lecciones: vocabulario, gramática, listening, con ejercicios variados.
- SRS de vocabulario (cola de repaso diaria).
- Corrección de escritura con explicación en español (motor IA).
- Tutor conversacional IA (role-play guiado + charla libre) con feedback.
- Pronunciación básica con Web Speech API (reconocimiento de voz nativo del navegador).

**Retos**
- Reto diario + racha (streak).
- Reto semanal temático.

**Premiación interna**
- XP y subida de niveles.
- Racha con protección ("congelar racha" con gemas).
- Gemas (moneda interna) ganadas por actividad.
- Logros/badges.
- Tienda simple (congelar racha, temas visuales).

**PWA**
- Instalable, ícono, splash.
- Offline parcial: repaso SRS y lecciones ya cargadas funcionan sin red.

### Fuera (v1 — para después)

- Duelos 1v1 (PvP) y ligas competitivas.
- Leaderboard social / amigos.
- Podcasts/vídeo largo, subtítulos interactivos.
- Pagos / suscripción premium.
- App nativa (iOS/Android) — la PWA cubre el arranque.
- Multiidioma de UI (v1 es solo español).

---

## 6. Arquitectura técnica

### Stack

- **Frontend/Backend:** Next.js (App Router) desplegado en Vercel (Fluid Compute).
- **PWA:** Serwist (service worker) para instalación y offline parcial.
- **IA:** Vercel AI SDK + Claude (correcciones, conversación, generación de ejercicios).
- **Voz:** Web Speech API del navegador (gratis, sin coste de API) para pronunciación.
- **Base de datos:** a decidir en fase 0 — Neon Postgres (Vercel Marketplace) o Firebase. Recomendado Postgres por el modelo relacional del progreso/SRS.
- **Auth:** NextAuth/Auth.js o Clerk.

### Cómo se usa la IA (el diferenciador)

| Uso | Qué hace | Cuándo se llama |
|---|---|---|
| Corrección de escritura | Recibe la frase del usuario → devuelve versión correcta + errores etiquetados + explicación en español | Al enviar un ejercicio de producción escrita |
| Conversación | Mantiene un role-play o charla, responde en inglés a nivel del usuario, marca errores al final del turno | Modo tutor conversacional |
| Generación de ejercicios | Crea variantes de ejercicios a partir de la lección + nivel + intereses | Cuando se agota el banco curado de la unidad |

**Control de costos:** el currículo base es curado (estático) → la IA solo entra en corrección, conversación y ejercicios extra. Se cachean generaciones comunes. Límite diario de mensajes de tutor por usuario en v1.

### Modelo de datos (borrador)

- `users` — perfil, nivel CEFR, config.
- `courses` / `units` / `lessons` — currículo curado.
- `exercises` — ejercicios por lección (tipo, contenido, respuesta).
- `user_progress` — lección completada, aciertos, fecha.
- `srs_cards` — tarjeta, intervalo, próxima revisión, facilidad (algoritmo tipo SM-2).
- `gamification` — XP, gemas, racha, logros.
- `ai_sessions` — conversaciones y correcciones (para historial y límites de uso).

---

## 7. Sistema de gamificación

- **XP:** por lección, repaso y reto. Sube de nivel de usuario (distinto del nivel CEFR).
- **Racha:** días seguidos con actividad mínima. Se puede congelar 1 día con gemas.
- **Gemas:** moneda ganada por actividad; se gasta en tienda (congelar racha, temas).
- **Logros/badges:** hitos ("7 días seguidos", "100 palabras dominadas", "primer diálogo").
- **Retos:** diario (objetivo pequeño) y semanal (temático, recompensa mayor).

Regla de diseño: la gamificación **sirve al aprendizaje**, no lo reemplaza. Nada de premiar tocar botones sin producir.

---

## 8. Currículo (cómo se mezcla curado + IA)

- Esqueleto **curado** por CEFR: A1 → C2, cada nivel en unidades, cada unidad en lecciones.
- Cada lección define objetivos (vocabulario/gramática/función comunicativa).
- El banco de ejercicios base es curado; cuando se agota o el usuario quiere más práctica, la **IA genera variantes** alineadas al objetivo de la lección.
- El vocabulario de cada lección alimenta el **SRS** del usuario.

Para v1 no hace falta cubrir A1–C2 completo: basta un **camino sólido de A1–B1** curado + IA para todo lo demás. C1–C2 se apoya más en IA y conversación.

---

## 9. Roadmap por fases

### Fase 0 — Fundaciones (setup)
- Scaffold Next.js + PWA + Vercel.
- Decidir y conectar DB + Auth.
- Design system de Parlo (paleta, tipografía, componentes base).
- `docs/contexto/` del proyecto.

### Fase 1 — Aprendizaje core
- Modelo de datos + currículo A1 (semilla de contenido).
- Motor de lecciones y tipos de ejercicio.
- SRS de vocabulario.
- Progreso y persistencia.

### Fase 2 — IA
- Corrección de escritura con explicación.
- Tutor conversacional (role-play + charla libre).
- Generación de ejercicios extra.
- Límites de uso y caché.

### Fase 3 — Gamificación
- XP, niveles, racha, gemas, logros.
- Reto diario y semanal.
- Tienda simple.

### Fase 4 — Pulido y lanzamiento
- Pronunciación (Web Speech API).
- Offline parcial (SRS + lecciones cargadas).
- Onboarding + test de nivel.
- Validación con equipo visual, accesibilidad, responsive.
- Deploy a producción + dominio.

*(Las fases son secuencia lógica, no calendario. Se ejecutan en orden; cada una deja algo usable.)*

---

## 10. Métricas de éxito

- **Activación:** % que completa el test de nivel + primera lección.
- **Retención:** D1 / D7 / D30.
- **Hábito:** racha media, lecciones/semana.
- **Aprendizaje:** palabras "dominadas" en SRS, precisión en repaso.
- **IA:** correcciones y conversaciones por usuario activo (y su coste).

---

## 11. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Coste de IA se dispara | Currículo curado como base, límites diarios, caché de generaciones |
| Web Speech API inconsistente entre navegadores | Feature progresiva: pronunciación es "extra", no bloquea la lección |
| Crear currículo curado es mucho trabajo | v1 solo A1–B1 curado; el resto con IA |
| Offline complejo | Alcance mínimo: solo SRS + lecciones ya vistas |
| Alcance MVP grande (ambos desde v1) | Fases ordenadas; cada fase entrega valor aunque se pause |

---

## 12. Branding (pendiente de fase 0)

- **Nombre:** Parlo.
- **Pendiente:** verificar dominio (`.com` / `.app` / `.co`) y nombre en tiendas.
- **Design system propio** (proyecto personal, identidad propia): paleta, tipografía y mascota se definen en fase 0 con el equipo visual.

---

## 13. Próximos pasos inmediatos

1. Verificar disponibilidad de dominio para "Parlo".
2. Cerrar elección DB + Auth.
3. Arrancar Fase 0 (scaffold + design system + `docs/contexto/`).
