"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconMicrophone, IconPlayerStopFilled, IconRefresh } from "@tabler/icons-react";
import { dictationErrorKey, useDictation } from "@/lib/dictation";
import { scoreAttempt, type Attempt } from "@/lib/pronunciation";
import { useProgress } from "@/lib/progress";
import { playCorrect, playWrong } from "@/lib/sfx";
import { stopSpeaking, unlockAudio } from "@/lib/tts";
import { cn } from "@/lib/utils";

/**
 * «Dilo tú»: tras una corrección, repetir en voz alta la frase ya corregida.
 * Se puntúa igual que la pantalla de pronunciación (`scoreAttempt`) y suma el
 * mismo XP (`completeSpeaking`: 2 por palabra captada).
 */
export function SayIt({
  target,
  onListeningChange,
}: {
  target: string;
  /** Avisa al padre para pausar el manos libres mientras se usa el micro aquí. */
  onListeningChange?: (listening: boolean) => void;
}) {
  const { t } = useTranslation();
  const completeSpeaking = useProgress((s) => s.completeSpeaking);
  const [attempt, setAttempt] = useState<Attempt | null>(null);

  const mic = useDictation("en-US", (text, final) => {
    if (!final) return;
    const result = scoreAttempt(target, text);
    setAttempt(result);
    completeSpeaking(result.correct, result.total);
    if (result.rating === "retry") playWrong();
    else playCorrect();
  });

  const notify = onListeningChange;
  useEffect(() => {
    notify?.(mic.listening);
  }, [mic.listening, notify]);

  if (!mic.supported) return null;

  function toggle() {
    if (!mic.listening) {
      // El tutor se calla: si no, el micro lo transcribiría a él.
      stopSpeaking();
      unlockAudio();
      setAttempt(null);
    }
    mic.toggle();
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={mic.listening}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-sm font-extrabold transition-transform active:scale-[0.97]",
            mic.listening ? "bg-danger text-white" : "bg-primary text-primary-fg",
          )}
        >
          {mic.listening ? (
            <IconPlayerStopFilled className="size-4" />
          ) : attempt ? (
            <IconRefresh className="size-4" />
          ) : (
            <IconMicrophone className="size-4" />
          )}
          {mic.listening ? t("practica.sayit_stop") : attempt ? t("practica.sayit_again") : t("practica.sayit")}
        </button>
        {!attempt && !mic.listening && (
          <span className="text-xs font-semibold text-muted">{t("practica.sayit_hint")}</span>
        )}
        {mic.listening && <span className="text-xs font-bold text-primary-ink">{t("practica.listening")}</span>}
      </div>

      <div aria-live="polite">
        {attempt && (
          <div className="mt-2.5">
            <p className="text-sm font-bold leading-relaxed">
              {attempt.words.map((w, i) => (
                <span
                  key={`${w.word}-${i}`}
                  className={cn(
                    "mr-1 inline-block rounded-md px-1",
                    w.ok ? "bg-success/15 text-success-ink" : "bg-danger/15 text-danger-ink",
                  )}
                >
                  {w.word}
                </span>
              ))}
            </p>
            <p className="mt-1 text-xs font-bold text-muted">
              {t(`practica.sayit_${attempt.rating}`, { correct: attempt.correct, total: attempt.total })}
            </p>
          </div>
        )}
        {mic.error && (
          <p role="alert" className="mt-2 text-xs font-bold text-danger-ink">
            {t(dictationErrorKey(mic.error))}
          </p>
        )}
      </div>
    </div>
  );
}
