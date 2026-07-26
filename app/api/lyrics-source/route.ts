import { allow } from "@/lib/rate-limit";

// Fuente de letras CON LICENCIA (Musixmatch). Se piden al vuelo y se sirven con
// su atribución: sus términos NO permiten almacenarlas, así que aquí no se
// guardan en disco ni en Firestore, sólo un caché en memoria de corta vida para
// no gastar cuota si varios usuarios abren la misma canción seguida.
//
// El plan gratuito devuelve un FRAGMENTO de la letra (~30%) y obliga a mostrar
// el aviso de copyright y el enlace a Musixmatch: los dos vienen en la respuesta.

export const maxDuration = 20;

const RATE = { store: new Map<string, number[]>(), limit: 20, windowMs: 60_000 };
const CACHE_TTL_MS = 15 * 60_000;
const cache = new Map<string, { at: number; body: LyricsResponse }>();

export type LyricsResponse = {
  lines: string[];
  /** Aviso de copyright que hay que mostrar tal cual. */
  copyright: string;
  /** Enlace a Musixmatch, obligatorio junto a la letra. */
  url: string;
  /** El plan gratuito sólo entrega una parte de la canción. */
  partial: boolean;
  provider: "musixmatch";
};

const API = "https://api.musixmatch.com/ws/1.1";

async function musixmatch(path: string, params: Record<string, string>, key: string) {
  const qs = new URLSearchParams({ ...params, apikey: key, format: "json" });
  const res = await fetch(`${API}/${path}?${qs}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`musixmatch ${res.status}`);
  const json = (await res.json()) as {
    message: { header: { status_code: number }; body: unknown };
  };
  if (json.message.header.status_code !== 200) {
    throw new Error(`musixmatch status ${json.message.header.status_code}`);
  }
  return json.message.body;
}

export async function POST(req: Request) {
  const key = process.env.MUSIXMATCH_API_KEY;
  if (!key) {
    return Response.json({ error: "not-configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(ip, Date.now(), RATE)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { title?: unknown; artist?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const title = String(body.title ?? "").slice(0, 120).trim();
  const artist = String(body.artist ?? "").slice(0, 120).trim();
  if (!title || !artist) {
    return Response.json({ error: "Invalid track" }, { status: 400 });
  }

  const cacheKey = `${artist}|${title}`.toLowerCase();
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return Response.json(hit.body);
  }

  try {
    // `matcher.lyrics.get` resuelve pista y letra en una sola llamada.
    const found = (await musixmatch(
      "matcher.lyrics.get",
      { q_track: title, q_artist: artist },
      key,
    )) as {
      lyrics?: {
        lyrics_body?: string;
        lyrics_copyright?: string;
        backlink_url?: string;
        tracking_url?: string;
        restricted?: number;
      };
    };

    const raw = found.lyrics?.lyrics_body ?? "";
    if (!raw || found.lyrics?.restricted) {
      return Response.json({ error: "not-available" }, { status: 404 });
    }

    // El fragmento gratuito trae una coletilla legal al final: no es letra.
    const lines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => !/^\*+.*\*+$/.test(l))
      .filter((l) => !/NOT for Commercial Use|lyrics? provided by/i.test(l));

    if (lines.length === 0) {
      return Response.json({ error: "not-available" }, { status: 404 });
    }

    const payload: LyricsResponse = {
      lines,
      copyright:
        found.lyrics?.lyrics_copyright?.trim() ||
        "Lyrics provided by Musixmatch",
      url: found.lyrics?.backlink_url || found.lyrics?.tracking_url || "https://www.musixmatch.com",
      partial: true,
      provider: "musixmatch",
    };
    cache.set(cacheKey, { at: Date.now(), body: payload });
    return Response.json(payload);
  } catch (error) {
    console.error("[lyrics-source] falló:", error);
    return Response.json({ error: "source-error" }, { status: 502 });
  }
}
