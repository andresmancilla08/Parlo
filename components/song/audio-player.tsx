"use client";

import { useEffect, useRef, useState } from "react";
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import type { SongPlayer } from "@/components/song/youtube-player";
import { cn } from "@/lib/utils";

// Reproductor para el catálogo libre (Jamendo): audio en streaming con licencia
// Creative Commons, así que se puede reproducir directamente sin embeber vídeo.

export function AudioPlayer({
  src,
  onTime,
  onReady,
  onError,
  className,
}: {
  src: string;
  onTime: (seconds: number) => void;
  onReady: (player: SongPlayer) => void;
  onError?: () => void;
  className?: string;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    onReady({
      play: () => void el.play(),
      pause: () => el.pause(),
      seek: (s) => {
        el.currentTime = s;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-3", className)}>
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          onTime(el.currentTime);
          setProgress(el.duration ? el.currentTime / el.duration : 0);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => onError?.()}
      />
      <div className="flex items-center gap-3">
        <PlayButton
          playing={playing}
          onToggle={() => {
            const el = audio.current;
            if (!el) return;
            if (el.paused) void el.play();
            else el.pause();
          }}
        />
        <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-border">
          <div
            className="h-full rounded-pill bg-primary transition-[width] duration-200"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function PlayButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? t("canciones.pause") : t("escucha.play")}
      className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-fg shadow-lg shadow-primary/25 transition-transform active:scale-95"
    >
      {playing ? (
        <IconPlayerPauseFilled className="size-5" />
      ) : (
        <IconPlayerPlayFilled className="size-5" />
      )}
    </button>
  );
}
