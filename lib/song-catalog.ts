import type { Cefr } from "@/lib/curriculum/types";

// Catálogo SUGERIDO: sólo metadatos (título, artista, año, nivel y por qué
// sirve para aprender). Aquí NO hay letras: las aporta el usuario en su
// dispositivo (ver `lib/user-songs.ts`), porque las de catálogo actual están
// protegidas por derechos de autor y no se pueden alojar ni distribuir.
//
// El nivel mide cuánto cuesta ENTENDER la letra cantada (velocidad, claridad de
// la dicción, vocabulario), no la dificultad musical. 10 canciones por nivel.

export type SongSuggestion = {
  id: string;
  title: string;
  artist: string;
  year: number;
  level: Cefr;
  /** Por qué es buena para practicar, en español. */
  why: string;
};

/** Cabecera de cada sección del catálogo. */
export type LevelSection = {
  level: Cefr;
  titleEs: string;
  titleEn: string;
  focusEs: string;
  focusEn: string;
};

export const LEVEL_SECTIONS: LevelSection[] = [
  {
    level: "A1",
    titleEs: "Primeros pasos",
    titleEn: "First steps",
    focusEs: "Lentas, repetitivas y con dicción clarísima",
    focusEn: "Slow, repetitive and very clearly sung",
  },
  {
    level: "A2",
    titleEs: "Contar cosas",
    titleEn: "Telling things",
    focusEs: "Pasado, futuro y vocabulario del día a día",
    focusEn: "Past, future and everyday vocabulary",
  },
  {
    level: "B1",
    titleEs: "Velocidad real",
    titleEn: "Real speed",
    focusEs: "Ritmo normal, expresiones y frases encadenadas",
    focusEn: "Normal pace, idioms and linked speech",
  },
  {
    level: "B2",
    titleEs: "Oído fino",
    titleEn: "Sharp ear",
    focusEs: "Rápidas, coloquiales y llenas de metáforas",
    focusEn: "Fast, colloquial and full of metaphor",
  },
  {
    level: "C1",
    titleEs: "Matices",
    titleEn: "Nuance",
    focusEs: "Lenguaje figurado, ironía y acentos marcados",
    focusEn: "Figurative language, irony and strong accents",
  },
  {
    level: "C2",
    titleEs: "Sin red",
    titleEn: "No safety net",
    focusEs: "Letra densa, jerga y referencias culturales",
    focusEn: "Dense lyrics, slang and cultural references",
  },
];

export const SONG_SUGGESTIONS: SongSuggestion[] = [
  /* ===================== A1 · Primeros pasos ===================== */
  { id: "s-stay-with-me", title: "Stay with Me", artist: "Sam Smith", year: 2014, level: "A1", why: "Lentísima, con frases de tres o cuatro palabras." },
  { id: "s-just-the-way", title: "Just the Way You Are", artist: "Bruno Mars", year: 2010, level: "A1", why: "Adjetivos de descripción física, muy claros." },
  { id: "s-perfect", title: "Perfect", artist: "Ed Sheeran", year: 2017, level: "A1", why: "Balada pausada, se sigue cada palabra." },
  { id: "s-imagine", title: "Imagine", artist: "John Lennon", year: 1971, level: "A1", why: "Imperativos y frases muy cortas." },
  { id: "s-let-it-be", title: "Let It Be", artist: "The Beatles", year: 1970, level: "A1", why: "Pronunciación nítida y estribillo repetido." },
  { id: "s-i-will-always", title: "I Will Always Love You", artist: "Whitney Houston", year: 1992, level: "A1", why: "Futuro con «will» repetido una y otra vez." },
  { id: "s-happy", title: "Happy", artist: "Pharrell Williams", year: 2013, level: "A1", why: "Estribillo pegadizo con comparaciones fáciles." },
  { id: "s-cant-stop-feeling", title: "Can't Stop the Feeling!", artist: "Justin Timberlake", year: 2016, level: "A1", why: "Presente continuo y sensaciones, muy repetitiva." },
  { id: "s-three-little-birds", title: "Three Little Birds", artist: "Bob Marley", year: 1977, level: "A1", why: "Frases cortísimas repetidas, ritmo tranquilo." },
  { id: "s-cant-help", title: "Can't Help Falling in Love", artist: "Elvis Presley", year: 1961, level: "A1", why: "Muy lenta, vocalización de manual." },

  /* ===================== A2 · Contar cosas ===================== */
  { id: "s-yesterday", title: "Yesterday", artist: "The Beatles", year: 1965, level: "A2", why: "Pasado simple de principio a fin." },
  { id: "s-hello", title: "Hello", artist: "Adele", year: 2015, level: "A2", why: "Dicción impecable y presente perfecto." },
  { id: "s-someone-like-you", title: "Someone Like You", artist: "Adele", year: 2011, level: "A2", why: "Pasado y presente perfecto en la misma canción." },
  { id: "s-photograph", title: "Photograph", artist: "Ed Sheeran", year: 2014, level: "A2", why: "Recuerdos: pasado y futuro mezclados." },
  { id: "s-diamonds", title: "Diamonds", artist: "Rihanna", year: 2012, level: "A2", why: "Estribillo lento con comparaciones («like…»)." },
  { id: "s-stay", title: "Stay", artist: "Rihanna & Mikky Ekko", year: 2013, level: "A2", why: "Cantada despacio, casi hablada." },
  { id: "s-memories", title: "Memories", artist: "Maroon 5", year: 2019, level: "A2", why: "Presente perfecto sobre recuerdos, muy clara." },
  { id: "s-all-of-me", title: "All of Me", artist: "John Legend", year: 2013, level: "A2", why: "Vocabulario de pareja, tempo pausado." },
  { id: "s-firework", title: "Firework", artist: "Katy Perry", year: 2010, level: "A2", why: "Preguntas y comparaciones con «like a»." },
  { id: "s-love-story", title: "Love Story", artist: "Taylor Swift", year: 2008, level: "A2", why: "Narra una historia entera en pasado." },

  /* ===================== B1 · Velocidad real ===================== */
  { id: "s-thinking-out-loud", title: "Thinking Out Loud", artist: "Ed Sheeran", year: 2014, level: "B1", why: "Condicionales y futuro sobre hacerse mayor." },
  { id: "s-rolling-in-the-deep", title: "Rolling in the Deep", artist: "Adele", year: 2010, level: "B1", why: "Expresiones idiomáticas y estribillo rápido." },
  { id: "s-mirrors", title: "Mirrors", artist: "Justin Timberlake", year: 2013, level: "B1", why: "Metáforas con «reflection» y presente perfecto." },
  { id: "s-payphone", title: "Payphone", artist: "Maroon 5", year: 2012, level: "B1", why: "Narración en pasado con vocabulario cotidiano." },
  { id: "s-umbrella", title: "Umbrella", artist: "Rihanna", year: 2007, level: "B1", why: "Futuro y condicional con ritmo sostenido." },
  { id: "s-wonderwall", title: "Wonderwall", artist: "Oasis", year: 1995, level: "B1", why: "Acento británico y «gonna» por todas partes." },
  { id: "s-viva-la-vida", title: "Viva la Vida", artist: "Coldplay", year: 2008, level: "B1", why: "«I used to…» para el hábito pasado." },
  { id: "s-dont-stop-believin", title: "Don't Stop Believin'", artist: "Journey", year: 1981, level: "B1", why: "Participios y vocabulario de ciudad y viaje." },
  { id: "s-take-me-home", title: "Take Me Home, Country Roads", artist: "John Denver", year: 1971, level: "B1", why: "Lugares y naturaleza, acento suave." },
  { id: "s-billie-jean", title: "Billie Jean", artist: "Michael Jackson", year: 1982, level: "B1", why: "Historia en pasado con frases encadenadas." },

  /* ===================== B2 · Oído fino ===================== */
  { id: "s-lose-yourself", title: "Lose Yourself", artist: "Eminem", year: 2002, level: "B2", why: "Rap rapidísimo: el reto de oído más duro." },
  { id: "s-bohemian", title: "Bohemian Rhapsody", artist: "Queen", year: 1975, level: "B2", why: "Vocabulario poco común y cambios de ritmo." },
  { id: "s-believer", title: "Believer", artist: "Imagine Dragons", year: 2017, level: "B2", why: "Frases comprimidas y metáforas." },
  { id: "s-shape-of-you", title: "Shape of You", artist: "Ed Sheeran", year: 2017, level: "B2", why: "Habla coloquial encadenada, muchas contracciones." },
  { id: "s-blank-space", title: "Blank Space", artist: "Taylor Swift", year: 2014, level: "B2", why: "Rápida, irónica y muy actual." },
  { id: "s-chandelier", title: "Chandelier", artist: "Sia", year: 2014, level: "B2", why: "Vocalización difícil: entrena el oído de verdad." },
  { id: "s-blinding-lights", title: "Blinding Lights", artist: "The Weeknd", year: 2019, level: "B2", why: "Tempo alto con vocabulario de noche y ciudad." },
  { id: "s-levitating", title: "Levitating", artist: "Dua Lipa", year: 2020, level: "B2", why: "Sílabas comidas y juego de palabras." },
  { id: "s-bad-guy", title: "Bad Guy", artist: "Billie Eilish", year: 2019, level: "B2", why: "Voz susurrada: oído para el habla baja." },
  { id: "s-hotel-california", title: "Hotel California", artist: "Eagles", year: 1976, level: "B2", why: "Narración larga y muy descriptiva." },

  /* ===================== C1 · Matices ===================== */
  { id: "s-hallelujah", title: "Hallelujah", artist: "Leonard Cohen", year: 1984, level: "C1", why: "Lenguaje bíblico y metáforas encadenadas." },
  { id: "s-sound-of-silence", title: "The Sound of Silence", artist: "Simon & Garfunkel", year: 1964, level: "C1", why: "Vocabulario poético y sintaxis invertida." },
  { id: "s-space-oddity", title: "Space Oddity", artist: "David Bowie", year: 1969, level: "C1", why: "Narración con jerga técnica y doble sentido." },
  { id: "s-back-to-black", title: "Back to Black", artist: "Amy Winehouse", year: 2006, level: "C1", why: "Acento londinense y expresiones muy idiomáticas." },
  { id: "s-creep", title: "Creep", artist: "Radiohead", year: 1992, level: "C1", why: "Condicionales e ironía sobre uno mismo." },
  { id: "s-blowin-wind", title: "Blowin' in the Wind", artist: "Bob Dylan", year: 1963, level: "C1", why: "Preguntas retóricas y lenguaje simbólico." },
  { id: "s-both-sides", title: "Both Sides Now", artist: "Joni Mitchell", year: 1969, level: "C1", why: "Metáforas sostenidas y contrastes abstractos." },
  { id: "s-feeling-good", title: "Feeling Good", artist: "Nina Simone", year: 1965, level: "C1", why: "Estructuras poéticas y vocabulario de naturaleza." },
  { id: "s-riders-storm", title: "Riders on the Storm", artist: "The Doors", year: 1971, level: "C1", why: "Imágenes oscuras y frases sin sujeto explícito." },
  { id: "s-do-i-wanna-know", title: "Do I Wanna Know?", artist: "Arctic Monkeys", year: 2013, level: "C1", why: "Acento de Sheffield y coloquialismos británicos." },

  /* ===================== C2 · Sin red ===================== */
  { id: "s-subterranean", title: "Subterranean Homesick Blues", artist: "Bob Dylan", year: 1965, level: "C2", why: "Torrente de palabras con juegos y referencias." },
  { id: "s-paranoid-android", title: "Paranoid Android", artist: "Radiohead", year: 1997, level: "C2", why: "Letra fragmentaria y cambios de registro." },
  { id: "s-rap-god", title: "Rap God", artist: "Eminem", year: 2013, level: "C2", why: "Velocidad extrema y juegos de palabras densos." },
  { id: "s-alright", title: "Alright", artist: "Kendrick Lamar", year: 2015, level: "C2", why: "Jerga afroamericana y referencias sociales." },
  { id: "s-dry-your-eyes", title: "Dry Your Eyes", artist: "The Streets", year: 2004, level: "C2", why: "Acento británico cerrado, casi hablado." },
  { id: "s-criminal", title: "Criminal", artist: "Fiona Apple", year: 1996, level: "C2", why: "Vocabulario culto y frases largas encadenadas." },
  { id: "s-red-right-hand", title: "Red Right Hand", artist: "Nick Cave & The Bad Seeds", year: 1994, level: "C2", why: "Narrativa literaria con vocabulario arcaico." },
  { id: "s-certain-romance", title: "A Certain Romance", artist: "Arctic Monkeys", year: 2006, level: "C2", why: "Slang del norte de Inglaterra a gran velocidad." },
  { id: "s-rain-dogs", title: "Rain Dogs", artist: "Tom Waits", year: 1985, level: "C2", why: "Voz rasgada y vocabulario muy poco común." },
  { id: "s-chicago", title: "Chicago", artist: "Sufjan Stevens", year: 2005, level: "C2", why: "Narración abstracta con estructuras complejas." },
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

export function suggestionsByLevel(): {
  section: LevelSection;
  songs: SongSuggestion[];
}[] {
  return LEVEL_SECTIONS.map((section) => ({
    section,
    songs: SONG_SUGGESTIONS.filter((s) => s.level === section.level),
  })).filter((g) => g.songs.length > 0);
}
