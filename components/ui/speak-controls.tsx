"use client";

import { useTranslation } from "react-i18next";
import { IconVolume } from "@tabler/icons-react";
import { RATE_SLOW, speak } from "@/lib/tts";
import { IconTurtle } from "@/components/ui/icon-turtle";
import { cn } from "@/lib/utils";

// Par de botones de audio: velocidad normal y «tortuga» (lento). Escuchar la
// misma frase despacio es lo que deja oír los sonidos que se comen al hablar.

type Props = {
  text: string;
  lang?: "en" | "es";
  /** Se llama en cada escucha (alimenta métricas y retos). */
  onPlay?: () => void;
  /** `soft` sobre fondo claro de tarjeta · `outline` sobre fondo de página. */
  variant?: "soft" | "outline";
  size?: "sm" | "md";
  className?: string;
};

export function SpeakControls({
  text,
  lang = "en",
  onPlay,
  variant = "soft",
  size = "md",
  className,
}: Props) {
  const { t } = useTranslation();

  const base = cn(
    "grid shrink-0 place-items-center rounded-full transition-transform active:scale-95",
    size === "md" ? "size-9" : "size-8",
    variant === "soft"
      ? "bg-accent-soft text-accent-ink"
      : "border-2 border-border bg-card text-accent-ink hover:border-accent",
  );

  function play(rate?: number) {
    speak(text, lang, rate);
    onPlay?.();
  }

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <button
        type="button"
        onClick={() => play()}
        aria-label={t("a11y.listen_option", { text })}
        className={base}
      >
        <IconVolume className={size === "md" ? "size-4" : "size-3.5"} />
      </button>
      <button
        type="button"
        onClick={() => play(RATE_SLOW)}
        aria-label={t("a11y.listen_slow", { text })}
        title={t("common.slow")}
        className={base}
      >
        <IconTurtle className={size === "md" ? "size-5" : "size-4"} />
      </button>
    </span>
  );
}
