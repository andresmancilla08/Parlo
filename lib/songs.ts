import type { Cefr } from "@/lib/curriculum/types";

// Canciones para practicar oído (módulo M6 v2).
//
// REGLA DURA de este archivo: aquí sólo entran letras de DOMINIO PÚBLICO, con
// su atribución. Las letras de catálogo actual NO se alojan en el repo: llegan
// (a) de una fuente con licencia configurada por el usuario (Musixmatch), o
// (b) pegadas por el propio usuario y guardadas SÓLO en su dispositivo.
// El audio nunca se descarga: se reproduce con el embed oficial de YouTube.

export type LyricLine = {
  /** Segundo en que empieza la línea dentro del vídeo. */
  t: number;
  text: string;
};

export type SongSource = "public-domain" | "user" | "licensed" | "cc";

export type Song = {
  id: string;
  title: string;
  /** Autoría y año, para poder mostrar la atribución. */
  credit: string;
  level: Cefr;
  source: SongSource;
  /** Vídeo de YouTube con el que se reproduce (embed oficial). */
  youtubeId?: string;
  /** Audio directo con licencia Creative Commons (catálogo libre de Jamendo). */
  audioUrl?: string;
  /** Enlace a la ficha original, para la atribución de la licencia. */
  sourceUrl?: string;
  lines: LyricLine[];
};

/**
 * Catálogo incluido: canciones tradicionales cuya letra es de dominio público
 * (autoría anónima o autor fallecido hace más de 70 años). El `youtubeId` lo
 * elige el usuario en la app si el vídeo por defecto no está disponible.
 */
export const PUBLIC_DOMAIN_SONGS: Song[] = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle, Little Star",
    credit: "Letra: Jane Taylor, 1806 · dominio público",
    level: "A1",
    source: "public-domain",
    lines: [
      { t: 0, text: "Twinkle, twinkle, little star" },
      { t: 5, text: "How I wonder what you are" },
      { t: 10, text: "Up above the world so high" },
      { t: 15, text: "Like a diamond in the sky" },
      { t: 20, text: "Twinkle, twinkle, little star" },
      { t: 25, text: "How I wonder what you are" },
    ],
  },
  {
    id: "row",
    title: "Row, Row, Row Your Boat",
    credit: "Tradicional, 1852 · dominio público",
    level: "A1",
    source: "public-domain",
    lines: [
      { t: 0, text: "Row, row, row your boat" },
      { t: 4, text: "Gently down the stream" },
      { t: 8, text: "Merrily, merrily, merrily, merrily" },
      { t: 12, text: "Life is but a dream" },
    ],
  },
  {
    id: "mountain",
    title: "She'll Be Coming Round the Mountain",
    credit: "Tradicional estadounidense, s. XIX · dominio público",
    level: "A2",
    source: "public-domain",
    lines: [
      { t: 0, text: "She'll be coming round the mountain when she comes" },
      { t: 6, text: "She'll be coming round the mountain when she comes" },
      { t: 12, text: "She'll be coming round the mountain" },
      { t: 16, text: "She'll be coming round the mountain" },
      { t: 20, text: "She'll be coming round the mountain when she comes" },
    ],
  },
  {
    id: "amazing",
    title: "Amazing Grace",
    credit: "Letra: John Newton, 1779 · dominio público",
    level: "A2",
    source: "public-domain",
    lines: [
      { t: 0, text: "Amazing grace, how sweet the sound" },
      { t: 8, text: "That saved a wretch like me" },
      { t: 16, text: "I once was lost, but now am found" },
      { t: 24, text: "Was blind, but now I see" },
    ],
  },
];

/* ---------------- canciones del usuario (sólo en su dispositivo) ---------------- */

/** Lo que el usuario pega: enlace del vídeo + su letra, línea a línea. */
export type UserSongInput = {
  title: string;
  youtubeUrl: string;
  /** Una línea por salto de línea. Los tiempos se reparten o se ajustan a mano. */
  lyrics: string;
  /** Duración aproximada en segundos, para repartir los tiempos. */
  durationSec?: number;
};

/** Extrae el id de vídeo de cualquier forma de enlace de YouTube. */
export function youtubeIdFrom(url: string): string | null {
  const clean = url.trim();
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = clean.match(p);
    if (m) return m[1];
  }
  return /^[\w-]{11}$/.test(clean) ? clean : null;
}

/**
 * Convierte lo que pega el usuario en una canción utilizable. Si no hay tiempos,
 * se reparten uniformemente sobre la duración indicada (o 3,5 s por línea):
 * imperfecto pero suficiente para practicar, y se puede ajustar luego.
 */
export function songFromUser(input: UserSongInput): Song | { error: string } {
  const youtubeId = youtubeIdFrom(input.youtubeUrl);
  if (!youtubeId) return { error: "url" };

  const texts = cleanLyrics(input.lyrics);
  if (texts.length === 0) return { error: "lyrics" };

  const per = input.durationSec ? input.durationSec / texts.length : 3.5;
  return {
    id: `user-${youtubeId}`,
    title: input.title.trim() || "—",
    credit: "Letra aportada por ti · sólo en este dispositivo",
    level: "B1",
    source: "user",
    youtubeId,
    lines: texts.map((text, i) => ({ t: Math.round(i * per), text })),
  };
}

/**
 * Limpia lo que se pega desde una web de letras: quita líneas vacías y las
 * marcas de sección ([Verse 1], [Chorus], [Puente]…), que no se cantan.
 */
export function cleanLyrics(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^[[(\u3010].{0,40}[\])\u3011]$/.test(l))
    .map((l) => l.replace(/\s*[[(]\s*x\s*\d+\s*[\])]\s*$/i, "").trim())
    .filter(Boolean);
}

/** Línea que suena en el segundo dado (la última que ya empezó). */
export function lineAt(lines: LyricLine[], seconds: number): number {
  let idx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].t <= seconds) idx = i;
    else break;
  }
  return idx;
}
