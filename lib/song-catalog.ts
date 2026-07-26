import type { Cefr } from "@/lib/curriculum/types";

// Catálogo SUGERIDO: sólo metadatos (título, artista, año, nivel y por qué
// sirve para aprender). Aquí NO hay letras: las aporta el usuario en su
// dispositivo (ver `lib/user-songs.ts`), porque las de catálogo actual están
// protegidas por derechos de autor y no se pueden alojar ni distribuir.
//
// El nivel es orientativo: mide cuánto cuesta ENTENDER la letra cantada
// (vocabulario, velocidad, claridad de la dicción), no la dificultad musical.

export type SongSuggestion = {
  id: string;
  title: string;
  artist: string;
  year: number;
  level: Cefr;
  /** Por qué es buena para practicar, en español. */
  why: string;
};

export const SONG_SUGGESTIONS: SongSuggestion[] = [
  // ---------------- A1: dicción muy clara, frases cortas, mucha repetición ----------------
  {
    id: "s-lemon-tree",
    title: "Lemon Tree",
    artist: "Fool's Garden",
    year: 1995,
    level: "A1",
    why: "Ritmo lento, vocabulario básico y estribillo muy repetido.",
  },
  {
    id: "s-let-it-be",
    title: "Let It Be",
    artist: "The Beatles",
    year: 1970,
    level: "A1",
    why: "Frases cortas, pronunciación clarísima y presente simple.",
  },
  {
    id: "s-count-on-me",
    title: "Count on Me",
    artist: "Bruno Mars",
    year: 2010,
    level: "A1",
    why: "Condicional sencillo y vocabulario de amistad.",
  },
  {
    id: "s-perfect",
    title: "Perfect",
    artist: "Ed Sheeran",
    year: 2017,
    level: "A1",
    why: "Muy lenta y con adjetivos de descripción fáciles de pillar.",
  },
  {
    id: "s-imagine",
    title: "Imagine",
    artist: "John Lennon",
    year: 1971,
    level: "A1",
    why: "Imperativos y frases cortas, cantadas despacio.",
  },
  {
    id: "s-happy",
    title: "Happy",
    artist: "Pharrell Williams",
    year: 2013,
    level: "A1",
    why: "Estribillo pegadizo con presente continuo.",
  },

  // ---------------- A2: pasado simple, futuro, algo más de velocidad ----------------
  {
    id: "s-yesterday",
    title: "Yesterday",
    artist: "The Beatles",
    year: 1965,
    level: "A2",
    why: "Pasado simple de principio a fin, ideal para fijarlo.",
  },
  {
    id: "s-photograph",
    title: "Photograph",
    artist: "Ed Sheeran",
    year: 2014,
    level: "A2",
    why: "Mezcla pasado y futuro con vocabulario de recuerdos.",
  },
  {
    id: "s-someone-like-you",
    title: "Someone Like You",
    artist: "Adele",
    year: 2011,
    level: "A2",
    why: "Pasado simple y presente perfecto, dicción muy limpia.",
  },
  {
    id: "s-shallow",
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    year: 2018,
    level: "A2",
    why: "Preguntas y comparativos, con partes lentas para seguir.",
  },
  {
    id: "s-wonderwall",
    title: "Wonderwall",
    artist: "Oasis",
    year: 1995,
    level: "A2",
    why: "Acento británico claro y estructuras de futuro con «gonna».",
  },
  {
    id: "s-fix-you",
    title: "Fix You",
    artist: "Coldplay",
    year: 2005,
    level: "A2",
    why: "Frases cortas con «when/and» y vocabulario emocional útil.",
  },
  {
    id: "s-viva-la-vida",
    title: "Viva la Vida",
    artist: "Coldplay",
    year: 2008,
    level: "A2",
    why: "Pasado simple narrativo («I used to rule…») muy marcado.",
  },
  {
    id: "s-sk8er-boi",
    title: "Sk8er Boi",
    artist: "Avril Lavigne",
    year: 2002,
    level: "A2",
    why: "Cuenta una historia en pasado, perfecta para narración.",
  },

  // ---------------- B1: velocidad normal, expresiones, condicionales ----------------
  {
    id: "s-thinking-out-loud",
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    year: 2014,
    level: "B1",
    why: "Condicionales y futuro («when your legs don't work…»).",
  },
  {
    id: "s-rolling-in-the-deep",
    title: "Rolling in the Deep",
    artist: "Adele",
    year: 2010,
    level: "B1",
    why: "Expresiones idiomáticas y ritmo rápido en el estribillo.",
  },
  {
    id: "s-viva-forever",
    title: "Learning to Fly",
    artist: "Tom Petty",
    year: 1991,
    level: "B1",
    why: "Verbos con partícula y gerundios, dicción americana clara.",
  },
  {
    id: "s-dont-stop-believin",
    title: "Don't Stop Believin'",
    artist: "Journey",
    year: 1981,
    level: "B1",
    why: "Narración con participios y vocabulario de ciudad y viaje.",
  },
  {
    id: "s-i-will-survive",
    title: "I Will Survive",
    artist: "Gloria Gaynor",
    year: 1978,
    level: "B1",
    why: "Futuro con «will» y pasado, cantado a velocidad media.",
  },
  {
    id: "s-take-me-home",
    title: "Take Me Home, Country Roads",
    artist: "John Denver",
    year: 1971,
    level: "B1",
    why: "Vocabulario de lugares y naturaleza, con acento suave.",
  },
  {
    id: "s-hey-jude",
    title: "Hey Jude",
    artist: "The Beatles",
    year: 1968,
    level: "B1",
    why: "Imperativos y consejos, con repetición larga al final.",
  },
  {
    id: "s-hotel-california",
    title: "Hotel California",
    artist: "Eagles",
    year: 1976,
    level: "B1",
    why: "Narración en pasado con muchísimo vocabulario descriptivo.",
  },

  // ---------------- B2: rápido, coloquial, metáforas ----------------
  {
    id: "s-lose-yourself",
    title: "Lose Yourself",
    artist: "Eminem",
    year: 2002,
    level: "B2",
    why: "Rapidísima y muy coloquial: entrenamiento de oído duro.",
  },
  {
    id: "s-bohemian",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    level: "B2",
    why: "Vocabulario poco común y cambios de ritmo constantes.",
  },
  {
    id: "s-thunder",
    title: "Believer",
    artist: "Imagine Dragons",
    year: 2017,
    level: "B2",
    why: "Metáforas y frases comprimidas cantadas a gran velocidad.",
  },
  {
    id: "s-shape-of-you",
    title: "Shape of You",
    artist: "Ed Sheeran",
    year: 2017,
    level: "B2",
    why: "Habla coloquial encadenada, con muchas contracciones.",
  },
// ---------------- Artistas de primera línea (añadidos a petición) ----------------
  {
    id: "s-cant-stop-feeling",
    title: "Can't Stop the Feeling!",
    artist: "Justin Timberlake",
    year: 2016,
    level: "A1",
    why: "Presente continuo y vocabulario de sensaciones, muy repetitiva.",
  },
  {
    id: "s-mirrors",
    title: "Mirrors",
    artist: "Justin Timberlake",
    year: 2013,
    level: "B1",
    why: "Metáforas con «reflection» y presente perfecto.",
  },
  {
    id: "s-sexyback",
    title: "Cry Me a River",
    artist: "Justin Timberlake",
    year: 2002,
    level: "B1",
    why: "Pasado simple narrativo y expresiones idiomáticas.",
  },
  {
    id: "s-diamonds",
    title: "Diamonds",
    artist: "Rihanna",
    year: 2012,
    level: "A2",
    why: "Estribillo lentísimo y comparaciones fáciles de retener.",
  },
  {
    id: "s-umbrella",
    title: "Umbrella",
    artist: "Rihanna",
    year: 2007,
    level: "A2",
    why: "Futuro con «will» y condicional sencillo, muy pegadiza.",
  },
  {
    id: "s-stay",
    title: "Stay",
    artist: "Rihanna & Mikky Ekko",
    year: 2013,
    level: "A2",
    why: "Cantada despacio, ideal para pillar cada palabra.",
  },
  {
    id: "s-sugar",
    title: "Sugar",
    artist: "Maroon 5",
    year: 2014,
    level: "A2",
    why: "Presente simple y necesidad («I need»), ritmo medio.",
  },
  {
    id: "s-memories",
    title: "Memories",
    artist: "Maroon 5",
    year: 2019,
    level: "A2",
    why: "Pasado y presente perfecto sobre recuerdos, muy clara.",
  },
  {
    id: "s-payphone",
    title: "Payphone",
    artist: "Maroon 5",
    year: 2012,
    level: "B1",
    why: "Narración en pasado con vocabulario cotidiano.",
  },
  {
    id: "s-hello",
    title: "Hello",
    artist: "Adele",
    year: 2015,
    level: "A2",
    why: "Dicción impecable y presente perfecto («I've been…»).",
  },
  {
    id: "s-easy-on-me",
    title: "Easy on Me",
    artist: "Adele",
    year: 2021,
    level: "A2",
    why: "Lenta, con imperativos y vocabulario emocional.",
  },
  {
    id: "s-just-the-way",
    title: "Just the Way You Are",
    artist: "Bruno Mars",
    year: 2010,
    level: "A1",
    why: "Descripción física y adjetivos, frases cortas.",
  },
  {
    id: "s-blank-space",
    title: "Blank Space",
    artist: "Taylor Swift",
    year: 2014,
    level: "B1",
    why: "Rápida y muy coloquial, con expresiones actuales.",
  },
  {
    id: "s-love-story",
    title: "Love Story",
    artist: "Taylor Swift",
    year: 2008,
    level: "A2",
    why: "Cuenta una historia en pasado, perfecta para narración.",
  },
  {
    id: "s-firework",
    title: "Firework",
    artist: "Katy Perry",
    year: 2010,
    level: "A2",
    why: "Preguntas y comparaciones con «like a», dicción clara.",
  },
  {
    id: "s-chandelier",
    title: "Chandelier",
    artist: "Sia",
    year: 2014,
    level: "B2",
    why: "Vocalización difícil: buen reto de oído avanzado.",
  },
  {
    id: "s-blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    year: 2019,
    level: "B1",
    why: "Ritmo rápido con vocabulario de ciudad y noche.",
  },
  {
    id: "s-levitating",
    title: "Levitating",
    artist: "Dua Lipa",
    year: 2020,
    level: "B1",
    why: "Habla encadenada y muchas contracciones.",
  },
  {
    id: "s-stay-with-me",
    title: "Stay with Me",
    artist: "Sam Smith",
    year: 2014,
    level: "A1",
    why: "Lenta, con imperativos y frases muy cortas.",
  },
  {
    id: "s-all-of-me",
    title: "All of Me",
    artist: "John Legend",
    year: 2013,
    level: "A2",
    why: "Vocabulario de pareja y presente simple, cantada despacio.",
  },
  {
    id: "s-i-will-always",
    title: "I Will Always Love You",
    artist: "Whitney Houston",
    year: 1992,
    level: "A1",
    why: "Futuro con «will» repetido y dicción clarísima.",
  },
  {
    id: "s-bad-guy",
    title: "Bad Guy",
    artist: "Billie Eilish",
    year: 2019,
    level: "B1",
    why: "Voz susurrada: entrena el oído para el habla baja.",
  },
];


/**
 * Enlace de búsqueda de la letra en Genius (fuente con licencia). No la
 * traemos nosotros: se abre en el navegador y el usuario copia lo que necesite.
 */
export function lyricsSearchUrl(song: { title: string; artist: string }): string {
  return `https://genius.com/search?q=${encodeURIComponent(`${song.artist} ${song.title}`)}`;
}

/** Búsqueda del vídeo en YouTube, para copiar el enlace. */
export function videoSearchUrl(song: { title: string; artist: string }): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title}`)}`;
}

export function suggestionsByLevel(): { level: Cefr; songs: SongSuggestion[] }[] {
  const order: Cefr[] = ["A1", "A2", "B1", "B2"];
  return order
    .map((level) => ({ level, songs: SONG_SUGGESTIONS.filter((s) => s.level === level) }))
    .filter((g) => g.songs.length > 0);
}
