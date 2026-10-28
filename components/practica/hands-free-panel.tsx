"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconKeyboard,
  IconMicrophone,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconDots,
} from "@tabler/icons-react";
import { dictationErrorKey, type DictationError } from "@/lib/dictation";
import { cn } from "@/lib/utils";

export type HandsFreeStatus = "listening" | "thinking" | "speaking" | "paused" | "waiting";

const ICON = {
  listening: IconMicrophone,
  thinking: IconDots,
  speaking: IconVolume,
  paused: IconPlayerPauseFilled,
  waiting: IconMicrophone,
} as const;

/**
 * Panel del modo manos libres: sustituye a la caja de texto. Dice SIEMPRE en
 * qué está (escuchando / pensando / hablando / en pausa) y deja pausar o
 * volver al teclado con un toque.
 */
export function HandsFreePanel({
  status,
  heard,
  error,
  onPause,
  onResume,
  onKeyboard,
}: {
  status: HandsFreeStatus;
  heard: string;
  error: DictationError;
  onPause: () => void;
  onResume: () => void;
  onKeyboard: () => void;
}) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const Icon = ICON[status];
  const live = status === "listening";

  return (
    <div className="rounded-[22px] border border-border bg-card p-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="relative grid size-12 shrink-0 place-items-center">
          {live && !reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary/25"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <span
            className={cn(
              "relative grid size-12 place-items-center rounded-full transition-colors duration-150",
              status === "listening" && "bg-primary text-primary-fg",
              status === "speaking" && "bg-accent-soft text-accent-ink",
              (status === "thinking" || status === "waiting") && "bg-surface text-muted",
              status === "paused" && "border border-border bg-surface text-muted",
            )}
          >
            <Icon className="size-6" aria-hidden />
          </span>
        </span>

        <div className="min-w-0 flex-1" aria-live="polite">
          <p className="font-display text-base font-extrabold">{t(`practica.hf_${status}`)}</p>
          <p className={cn("line-clamp-2 text-xs font-semibold", heard ? "text-fg" : "text-muted")}>
            {heard ? `“${heard}”` : t(`practica.hf_${status}_hint`)}
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-xs font-bold text-danger-ink">
          {t(dictationErrorKey(error))}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        {status === "paused" ? (
          <button
            type="button"
            onClick={onResume}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-pill bg-primary px-4 text-sm font-extrabold text-primary-fg active:scale-[0.98]"
          >
            <IconPlayerPlayFilled className="size-4" aria-hidden />
            {t("practica.hf_resume")}
          </button>
        ) : (
          <button
            type="button"
            onClick={onPause}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-pill border border-border bg-surface px-4 text-sm font-extrabold active:scale-[0.98]"
          >
            <IconPlayerPauseFilled className="size-4" aria-hidden />
            {t("practica.hf_pause")}
          </button>
        )}
        <button
          type="button"
          onClick={onKeyboard}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-border bg-surface px-4 text-sm font-extrabold active:scale-[0.98]"
        >
          <IconKeyboard className="size-4" aria-hidden />
          {t("practica.hf_keyboard")}
        </button>
      </div>
    </div>
  );
}
