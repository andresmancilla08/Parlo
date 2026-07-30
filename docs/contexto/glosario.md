# Glosario

## Términos del dominio
- **CEFR:** marco europeo de niveles de idioma (A1, A2, B1, B2, C1, C2). Ruta de progreso de Parlo.
- **SRS (Spaced Repetition System):** repaso espaciado; muestra el vocabulario justo antes de olvidarlo (algoritmo tipo SM-2).
- **Input comprensible:** contenido un poco por encima del nivel actual (i+1, método Krashen).
- **Producción activa:** ejercicios de hablar/escribir (no solo reconocer), corregidos por IA.
- **Tutor IA:** conversación/role-play y correcciones con explicación en español (Gemini).

## Entidades principales (Firestore, borrador)
- **users:** perfil, nivel CEFR, config, racha.
- **courses / units / lessons:** currículo curado por nivel.
- **exercises:** ejercicios por lección (tipo, contenido, respuesta esperada).
- **user_progress:** lección completada, aciertos, fecha.
- **srs_cards:** tarjeta, intervalo, próxima revisión, facilidad.
- **gamification:** XP, gemas, racha, logros.
- **ai_sessions:** conversaciones/correcciones (historial + límites de uso).

## Siglas y nombres internos
- **Parlo:** el producto (de "hablar", raíz romance). Mascota: loro 🦜.
- **Gemas:** moneda interna (se gana con actividad, se gasta en tienda: congelar racha, temas).
- **Racha (streak):** días seguidos con actividad mínima.

## Añadidos 2026-07-29
- **Teoría / fase «Aprende»:** los `TeachStep[]` que se ven antes de practicar. Cuatro tipos: `idea` (el porqué), `table` (patrón), `pitfall` (error típico de hispanohablante, con su par mal/bien) y `examples` (frases bilingües con audio).
- **`taught`:** lista de lecciones cuya teoría ya se vio (parte del progreso sincronizado).
- **Tortuga:** botón de audio lento (`RATE_SLOW`), al lado del altavoz normal.
- **Bloque (test de nivel):** los 5 ítems de un nivel; se aprueba con 3 y da paso al bloque siguiente.
