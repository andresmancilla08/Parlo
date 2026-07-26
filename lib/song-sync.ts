"use client";

import { useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebaseReady } from "@/lib/firebase";
import { useUserSongs } from "@/lib/user-songs";
import type { Song } from "@/lib/songs";

// Las canciones del usuario dejan de vivir sólo en el navegador: se guardan en
// SU documento privado (`users/{uid}/library/songs`). Las reglas de Firestore
// impiden que nadie más lo lea, así que sigue siendo su copia personal y no un
// catálogo compartido.

const WRITE_DEBOUNCE_MS = 2000;

type Library = {
  songs: Song[];
  videos: Record<string, string>;
  times: Record<string, number[]>;
};

/** Gana lo más completo: nunca se pierde una letra por sincronizar. */
function merge(local: Library, remote: Library): Library {
  const byId = new Map<string, Song>();
  for (const s of remote.songs ?? []) byId.set(s.id, s);
  for (const s of local.songs ?? []) {
    const other = byId.get(s.id);
    // Se queda la versión con más líneas (la que tenga la letra más completa).
    if (!other || s.lines.length >= other.lines.length) byId.set(s.id, s);
  }
  return {
    songs: [...byId.values()],
    videos: { ...(remote.videos ?? {}), ...(local.videos ?? {}) },
    times: { ...(remote.times ?? {}), ...(local.times ?? {}) },
  };
}

export function useSongSync(uid: string | null) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!uid || !firebaseReady) return;
    let cancelled = false;
    const ref = doc(db(), "users", uid, "library", "songs");

    (async () => {
      try {
        const snap = await getDoc(ref);
        if (cancelled) return;
        const state = useUserSongs.getState();
        const local: Library = {
          songs: state.songs,
          videos: state.videos,
          times: state.times,
        };
        const remote = snap.exists() ? (snap.data() as Library) : { songs: [], videos: {}, times: {} };
        const next = merge(local, remote);
        useUserSongs.setState(next);
        await setDoc(ref, next, { merge: true });
      } catch (err) {
        // Sin red o reglas denegando: se sigue con la copia local.
        console.warn("[parlo] no se pudieron sincronizar las canciones", err);
      }
    })();

    const unsubscribe = useUserSongs.subscribe((state) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setDoc(
          ref,
          { songs: state.songs, videos: state.videos, times: state.times },
          { merge: true },
        ).catch((err) => console.warn("[parlo] no se pudo guardar la canción", err));
      }, WRITE_DEBOUNCE_MS);
    });

    return () => {
      cancelled = true;
      unsubscribe();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [uid]);
}
