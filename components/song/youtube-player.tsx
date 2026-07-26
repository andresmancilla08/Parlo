"use client";

import { useEffect, useRef, useState } from "react";

// Reproductor con el embed OFICIAL de YouTube (IFrame API). No se descarga ni
// se aloja el audio: lo sirve YouTube con sus licencias. Sólo necesitamos
// controlar play/pause y saber el segundo actual para sincronizar la letra.

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allow: boolean) => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: { onReady?: () => void; onStateChange?: (e: { data: number }) => void };
    },
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

/** Carga la IFrame API una sola vez por sesión. */
function loadApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => reject(new Error("no se pudo cargar YouTube"));
    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) resolve(window.YT);
      else reject(new Error("YT no disponible"));
    };
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export type SongPlayer = {
  play: () => void;
  pause: () => void;
  seek: (s: number) => void;
};

export function YouTubePlayer({
  videoId,
  onTime,
  onReady,
  onError,
  className,
}: {
  videoId: string;
  /** Se llama ~4 veces por segundo mientras suena. */
  onTime: (seconds: number) => void;
  onReady: (player: SongPlayer) => void;
  onError?: () => void;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let player: YTPlayer | null = null;
    let timer: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    loadApi()
      .then((YT) => {
        if (cancelled || !host.current) return;
        player = new YT.Player(host.current, {
          videoId,
          playerVars: { playsinline: 1, modestbranding: 1, rel: 0 },
          events: {
            onReady: () => {
              if (cancelled || !player) return;
              onReady({
                play: () => player?.playVideo(),
                pause: () => player?.pauseVideo(),
                seek: (s) => player?.seekTo(s, true),
              });
              timer = setInterval(() => {
                if (player) onTime(player.getCurrentTime());
              }, 250);
            },
          },
        });
      })
      .catch(() => {
        setFailed(true);
        onError?.();
      });

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      player?.destroy();
    };
    // videoId es la única dependencia real: los callbacks se recrean por render
    // pero no deben reinstanciar el reproductor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  if (failed) return null;
  return (
    <div className={className}>
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black/60">
        <div ref={host} className="size-full" />
      </div>
    </div>
  );
}
