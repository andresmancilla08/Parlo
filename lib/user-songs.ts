"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Song } from "@/lib/songs";

// Canciones que añade el usuario: viven SÓLO en su dispositivo (localStorage).
// No se suben a Firestore ni entran en el repo: la letra es material de terceros
// y aquí es uso personal, no distribución.

type State = {
  songs: Song[];
  /** Vídeo elegido para una canción del catálogo: songId → id de YouTube. */
  videos: Record<string, string>;
  add: (song: Song) => void;
  remove: (id: string) => void;
  setVideo: (songId: string, youtubeId: string) => void;
};

export const useUserSongs = create<State>()(
  persist(
    (set) => ({
      songs: [],
      videos: {},
      setVideo: (songId, youtubeId) =>
        set((s) => ({ videos: { ...s.videos, [songId]: youtubeId } })),
      add: (song) =>
        set((s) => ({ songs: [song, ...s.songs.filter((x) => x.id !== song.id)] })),
      remove: (id) => set((s) => ({ songs: s.songs.filter((x) => x.id !== id) })),
    }),
    { name: "parlo-user-songs", storage: createJSONStorage(() => localStorage) },
  ),
);
