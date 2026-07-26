"use client";

import { useTranslation } from "react-i18next";
import { IconVolume } from "@tabler/icons-react";
import { hasGoodVoice, scoreVoice, speak, useVoicePref, useVoices } from "@/lib/tts";
import { cn } from "@/lib/utils";

/**
 * Elegir la voz inglesa. Existe porque la voz por defecto del navegador suele
 * ser una compacta que suena metálica; la mejor instalada cambia por equipo.
 */
export function VoicePicker({ className }: { className?: string }) {
  const { t } = useTranslation();
  const voices = useVoices("en");
  const name = useVoicePref((s) => s.name);
  const setVoice = useVoicePref((s) => s.setVoice);

  if (voices.length === 0) {
    return (
      <p className={cn("text-sm text-muted", className)}>{t("perfil.voice_none")}</p>
    );
  }

  const best = voices[0];
  const selected = (name ? voices.find((v) => v.name === name) : undefined) ?? best;

  return (
    <div className={className}>
      <div className="flex gap-2">
        <select
          value={selected.name}
          onChange={(e) => setVoice(e.target.value)}
          aria-label={t("perfil.voice_title")}
          className="min-w-0 flex-1 truncate rounded-pill border border-border bg-surface px-4 py-2.5 text-sm font-bold text-fg outline-none focus:border-primary"
        >
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name}
              {v.name === best.name ? ` · ${t("perfil.voice_best")}` : ""}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => speak("Hello! Let's practice English together.")}
          aria-label={t("perfil.voice_test")}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink transition-transform active:scale-95"
        >
          <IconVolume className="size-5" />
        </button>
      </div>

      {!hasGoodVoice(voices) && (
        <p className="mt-2 text-xs font-semibold text-muted">{t("perfil.voice_hint")}</p>
      )}
      {scoreVoice(selected) < 25 && hasGoodVoice(voices) && (
        <p className="mt-2 text-xs font-semibold text-primary-ink">
          {t("perfil.voice_better", { name: best.name })}
        </p>
      )}
    </div>
  );
}
