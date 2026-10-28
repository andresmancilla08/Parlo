"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconGauge, IconMessages } from "@tabler/icons-react";
import { useCoachPrefs } from "@/lib/coach-prefs";
import { SPEECH_RATES, speak, useSpeechSpeed, type SpeechSpeed } from "@/lib/tts";
import { useHydrated } from "@/lib/use-hydrated";
import { Card } from "@/components/ui/card";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SPEEDS: SpeechSpeed[] = ["slow", "normal", "fast"];

/** Ajustes de voz y conversación del perfil: velocidad (M6) y modo estricto (M2). */
export function CoachSettings() {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const strictPref = useCoachPrefs((s) => s.strict);
  const setStrict = useCoachPrefs((s) => s.setStrict);
  const speedPref = useSpeechSpeed((s) => s.speed);
  const setSpeed = useSpeechSpeed((s) => s.setSpeed);
  const strict = hydrated ? strictPref : false;
  const speed = hydrated ? speedPref : "normal";

  return (
    <>
      <div className="mt-8">
        <p className="mb-2 text-sm font-semibold text-muted">{t("perfil.speed_title")}</p>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
              <IconGauge className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 text-xs font-bold text-muted">{t("perfil.speed_hint")}</span>
          </div>
          <div
            role="radiogroup"
            aria-label={t("perfil.speed_title")}
            className="mt-3 grid grid-cols-3 gap-1 rounded-pill bg-surface p-1"
          >
            {SPEEDS.map((s) => {
              const on = speed === s;
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => {
                    setSpeed(s);
                    // Se oye el cambio con la velocidad recién elegida.
                    speak(t("perfil.speed_sample"), "en", SPEECH_RATES[s]);
                  }}
                  className={cn(
                    "relative min-h-11 rounded-pill text-sm font-extrabold transition-colors duration-150",
                    on ? "text-primary-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="speed-pill"
                      transition={spring}
                      className="absolute inset-0 rounded-pill bg-primary"
                    />
                  )}
                  <span className="relative">{t(`perfil.speed_${s}`)}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <p className="mb-2 text-sm font-semibold text-muted">{t("perfil.coach_title")}</p>
        <Card className="flex items-center gap-3 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
            <IconMessages className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-sm font-extrabold">
              {t(strict ? "perfil.strict_on" : "perfil.strict_off")}
            </span>
            <span className="block text-xs font-bold text-muted">{t("perfil.strict_hint")}</span>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={strict}
            aria-label={t("perfil.strict_on")}
            onClick={() => setStrict(!strict)}
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-pill transition-colors",
              strict ? "bg-primary" : "bg-border",
            )}
          >
            <motion.span
              layout
              transition={spring}
              className={cn("absolute top-1 size-5 rounded-full bg-white shadow", strict ? "left-6" : "left-1")}
            />
          </button>
        </Card>
      </div>
    </>
  );
}
