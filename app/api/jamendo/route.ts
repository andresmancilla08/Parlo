import { allow } from "@/lib/rate-limit";

// Catálogo libre (Jamendo): música bajo Creative Commons con audio en streaming
// y, en muchas pistas, la letra publicada por el propio artista. Al ser CC, la
// letra SÍ se puede mostrar completa a cualquier usuario, con su atribución.
//
// Necesita `JAMENDO_CLIENT_ID` (gratuito en developer.jamendo.com).

export const maxDuration = 20;

const RATE = { store: new Map<string, number[]>(), limit: 30, windowMs: 60_000 };
const API = "https://api.jamendo.com/v3.0";

export type JamendoTrack = {
  id: string;
  title: string;
  artist: string;
  /** Segundos. */
  duration: number;
  audio: string;
  image: string;
  license: string;
  shareUrl: string;
  /** Sólo en el detalle. */
  lyrics?: string;
};

type RawTrack = {
  id: string;
  name: string;
  artist_name: string;
  duration: number;
  audio: string;
  audiodownload?: string;
  image: string;
  license_ccurl?: string;
  shareurl?: string;
  lyrics?: string;
};

async function jamendo(path: string, params: Record<string, string>, clientId: string) {
  const qs = new URLSearchParams({ ...params, client_id: clientId, format: "json" });
  const res = await fetch(`${API}/${path}?${qs}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`jamendo ${res.status}`);
  const json = (await res.json()) as {
    headers: { status: string; error_message?: string };
    results: RawTrack[];
  };
  if (json.headers.status !== "success") {
    throw new Error(json.headers.error_message || "jamendo error");
  }
  return json.results;
}

function toTrack(r: RawTrack): JamendoTrack {
  return {
    id: r.id,
    title: r.name,
    artist: r.artist_name,
    duration: r.duration,
    audio: r.audio,
    image: r.image,
    license: r.license_ccurl ?? "https://creativecommons.org/licenses/",
    shareUrl: r.shareurl ?? `https://www.jamendo.com/track/${r.id}`,
    lyrics: r.lyrics,
  };
}

export async function POST(req: Request) {
  const clientId = process.env.JAMENDO_CLIENT_ID;
  if (!clientId) return Response.json({ error: "not-configured" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(ip, Date.now(), RATE)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { mode?: unknown; query?: unknown; id?: unknown; tags?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    // --- detalle con letra ---
    if (body.mode === "lyrics") {
      const id = String(body.id ?? "").replace(/\D/g, "");
      if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
      const results = await jamendo("tracks", { id, include: "lyrics" }, clientId);
      const track = results[0];
      if (!track?.lyrics?.trim()) {
        return Response.json({ error: "no-lyrics" }, { status: 404 });
      }
      return Response.json(toTrack(track));
    }

    // --- búsqueda: sólo pistas que traen letra, en inglés ---
    const query = String(body.query ?? "").slice(0, 80).trim();
    const tags = String(body.tags ?? "").slice(0, 60).trim();
    const results = await jamendo(
      "tracks",
      {
        limit: "30",
        include: "lyrics",
        audioformat: "mp32",
        // `lang=en` filtra por idioma declarado de la letra.
        lang: "en",
        order: "popularity_total_desc",
        ...(query ? { namesearch: query } : {}),
        ...(tags ? { fuzzytags: tags } : {}),
      },
      clientId,
    );

    const withLyrics = results
      .filter((r) => r.lyrics && r.lyrics.trim().length > 40)
      .slice(0, 12)
      .map(toTrack);

    return Response.json({ tracks: withLyrics });
  } catch (error) {
    console.error("[jamendo] falló:", error);
    return Response.json({ error: "source-error" }, { status: 502 });
  }
}
