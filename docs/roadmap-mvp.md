# Parlo — visión y alcance

> Estado detallado y pendientes priorizados: **`docs/contexto/checklist.md`** (fuente de verdad).
> Este documento explica el PARA QUÉ; el checklist, qué falta.
> Reescrito el 2026-07-30 (el anterior era de la fase de planificación y mencionaba un stack
> que ya no se usa).

## Qué es Parlo

PWA (siempre web, nunca nativa) para que un hispanohablante aprenda inglés de verdad:
entendiendo el porqué, no acertando por descarte.

Tres decisiones lo definen:

1. **Se enseña antes de evaluar.** Cada lección abre con teoría —la idea, el patrón en tabla,
   el error típico de hispanohablante y ejemplos con audio— y sólo entonces se practica.
   Ninguna pregunta llega sin haber explicado antes; el check `teach.check.ts` lo garantiza.
2. **El porqué, siempre en español.** El contenido es bilingüe, pero la explicación va en el
   idioma del usuario: es lo que separa a Parlo de una app de repetición.
3. **Coste cero.** Gemini free tier para IA, Web Speech del navegador para voz y
   reconocimiento, Vercel Hobby y Firebase Spark. Nada que dependa de una factura.

## Las cuatro destrezas

| Destreza | Dónde se entrena |
|---|---|
| Gramática y vocabulario | Lecciones: teoría + ejercicios (`/app/leccion`) y repaso SM-2 (`/app/repaso`) |
| Escuchar | Escucha activa con huecos (`/app/escucha`); audio normal y «tortuga» en toda la app |
| Hablar | Pronunciación (`/app/pronunciacion`) y conversación con corrección (`/app/practica`) |
| Leer | Lector de documentos propios con voz y traducción (`/app/leer`) |

Encima de todo: objetivo diario, retos, racha, niveles, logros y una **liga privada con amigos**
(opt-in: sólo se comparte un alias y la XP de la semana).

## Currículo

**30 unidades · 90 lecciones · 558 ejercicios**, de A1 a C1, cada lección con su teoría.
(A2 y B1 llevan 8 ejercicios por lección; A1, B2 y C1, 5.)

- **A1** saludos, números y hora, día a día, familia, lugares, tiempo y calendario.
- **A2** rutinas, pasado, futuro, comparar, viajar, presente perfecto.
- **B1** condicionales, historias, modales, opiniones, trabajo, estilo indirecto y pasiva.
- **B2** relativos, hipotético avanzado, pasiva avanzada, conectores y matiz, patrones
  verbales, sonar natural.
- **C1** inversión y énfasis, matices modales, frases compactas y nominalización, lenguaje
  idiomático, registro académico, precisión léxica.

El test de nivel coloca por bloques adaptativos de 5 preguntas (A1 → C1) y explica cada fallo.

## Lo que Parlo NO es

- **No es nativa.** Sin Expo ni tiendas: PWA instalable.
- **No paga por IA ni por voz.** Nada de Anthropic/OpenAI de pago ni TTS de suscripción.
- **No aloja contenido con licencia ajena** (por eso se retiró el módulo de canciones).
- **No es un examen.** El test de nivel orienta; no certifica.

## Stack

Next.js 16 (App Router) · Tailwind v4 · Zustand local-first con sync a Firestore ·
Firebase Auth (correo + PIN) · Serwist (PWA) · Vercel AI SDK con Gemini · Web Speech API ·
Vercel.

Detalle en `docs/contexto/arquitectura.md`; decisiones y sus porqués en `decisiones.md`.
