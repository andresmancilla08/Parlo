# Guía para generar los assets de Parlo con ChatGPT (DALL·E)

ChatGPT es bueno para **imágenes** (mascota, icono, hero, badges) pero **malo para texto/wordmark** y **no exporta SVG**.

- Wordmark "Parlo": se hace en código (ya está). Vector formal → Figma/Recraft/Illustrator después.
- Todo lo demás: ChatGPT con los prompts de abajo.

## Reglas para pegarle a ChatGPT (una sola vez, al inicio del chat)

```
Vas a generarme una serie de imágenes para mi app "Parlo" (app de inglés, mascota LORO).
Mantén SIEMPRE el mismo personaje y estilo entre imágenes.
Estilo: flat 3D premium, formas suaves, sombras muy ligeras, ojos expresivos,
líneas mínimas, aspecto premium NO infantil, iluminación suave, fondos limpios.
Paleta: coral #FF6B4A, mint #27C7A8, ámbar/gemas #FFC94A, texto ciruela #1B1233.
Genera cada imagen que te pida en alta resolución, cuadrada salvo que diga otra cosa,
y con FONDO TRANSPARENTE (PNG) salvo el app icon.
Empieza por la mascota principal; para las siguientes reutiliza EXACTAMENTE ese loro.
```

## Prompts en orden (uno por mensaje)

**1. Mascota principal (genera esta primero — es la referencia)**
```
The Parlo mascot: a friendly modern parrot, premium flat 3D illustration, warm
coral (#FF6B4A) body with mint (#27C7A8) wing accents, amber (#FFC94A) beak,
expressive eyes, confident smile, slightly tilted head, soft rounded shapes,
minimal details, transparent background, highly recognizable startup mascot,
not childish.
```

**2. App icon (fondo sólido coral, con texto NO)**
```
App icon using the same Parlo parrot HEAD only, stylized in white, centered on a
solid coral background (#FF6B4A), rounded-square icon, premium flat design, soft
shadow, 20% internal padding so it works as a maskable icon, no text.
```

**3. Mascota celebrando**
```
The same Parlo parrot celebrating a completed lesson: happy expression, wings
raised, golden gems (#FFC94A) floating around, subtle confetti, transparent
background, same flat 3D premium style.
```

**4. Mascota pensando**
```
The same Parlo parrot thinking: looking upward, one wing touching its beak, small
floating question marks, transparent background, same style.
```

**5. Mascota saludando (para onboarding/login)**
```
The same Parlo parrot waving hello with one wing, friendly welcoming pose,
transparent background, same style.
```

**6. Hero de la landing (horizontal 16:9)**
```
Wide hero illustration (16:9) for an AI English-learning app: a young Hispanic
adult chatting with the same friendly Parlo parrot tutor, floating English words
and conversation bubbles, warm coral and mint palette, premium flat illustration,
lots of negative space on the right for text, clean background.
```

**7. Empty state (tutor/lecciones vacías)**
```
The same Parlo parrot sitting beside an empty notebook, waiting to start, premium
flat illustration, warm coral palette, soft lighting, minimal, transparent background.
```

**8. Badges de logro (pídelos juntos o uno a uno, cuadrados, fondo transparente)**
```
A set of premium golden achievement badges in the Parlo style, transparent
background: (a) first conversation — golden speech bubble with a small parrot
feather; (b) 7-day streak — golden flame with ribbon; (c) 30-day streak — golden
calendar with coral ribbon; (d) level completed — golden shield with a flying
feather; (e) 100 words — golden book; (f) perfect pronunciation — golden microphone.
```

## Qué descargar y con qué nombre

Guarda los PNG con estos nombres y pásamelos (o déjalos en `public/brand/`):

| Archivo | De qué prompt | Uso |
|---|---|---|
| `mascot.png` | 1 | mascota general |
| `icon-source.png` | 2 | app icon (yo genero 192/512/maskable + apple-touch) |
| `mascot-celebrate.png` | 3 | logros / fin de lección |
| `mascot-think.png` | 4 | correcciones / cargando |
| `mascot-wave.png` | 5 | login / onboarding |
| `hero.png` | 6 | landing |
| `empty.png` | 7 | estados vacíos |
| `badge-*.png` | 8 | gamificación |

## Después

Me pasas los archivos y yo:
1. Genero los tamaños del app icon y los conecto al `manifest.ts` (PWA instalable con icono real).
2. Coloco la mascota en login, tutor (empty state), fin de lección y logros.
3. Meto el hero en la landing.
