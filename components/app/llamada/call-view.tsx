"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconMicrophone, IconMicrophoneOff, IconPhone, IconPhoneOff, IconRefresh } from "@tabler/icons-react";
import { scenarioById } from "@/lib/coach";
import { MAX_CALL_MS, type CallError, type CallSnapshot, type CallStatus } from "@/lib/live/session";
import { formatClock, visibleLines } from "@/lib/live/transcript";
import { ScenarioIcon } from "@/components/app/scenario-icons";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Vista de la llamada, sin lógica de audio: recibe la instantánea de
// `LiveCall` y avisa de los toques. Separada para poder pintarla en cualquier
// estado (capturas, pruebas) sin micro ni sesión.

export const CALL_LIMIT_MIN = MAX_CALL_MS / 60_000;

export function isLive(status: CallStatus): boolean {
  return status === "connecting" || status === "listening" || status === "speaking" || status === "reconnecting";
}

export function useNow(active: boolean, every = 1000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(Date.now()), every);
    return () => clearInterval(id);
  }, [active, every]);
  return now;
}

export function CallView({
  scenario,
  snap,
  ringRef,
  listEndRef,
  onBack,
  onDial,
  onHangup,
  onToggleMute,
}: {
  scenario: string | null;
  snap: CallSnapshot | null;
  /** El anillo del nivel de audio: lo anima quien llama, escribiendo en el DOM. */
  ringRef?: RefObject<HTMLDivElement | null>;
  listEndRef?: RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onDial: () => void;
  onHangup: () => void;
  onToggleMute: () => void;
}) {
  const { t } = useTranslation();
  const info = scenarioById(scenario);
  const status = snap?.status ?? "idle";
  const live = isLive(status);
  const now = useNow(Boolean(snap?.startedAt) && live);
  const elapsed = snap?.startedAt ? (snap.endedAt ?? now) - snap.startedAt : 0;
  const lines = snap ? visibleLines(snap.transcript) : [];
  const error = snap?.status === "error" ? snap.error : null;
  const muted = snap?.muted ?? false;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-2xl flex-col px-5 pb-4 pt-5 md:min-h-[calc(100dvh-5rem)]">
      <header className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
            {info ? t(`practica.scenario_${info.id}`) : t("practica.free_title")}
          </p>
          <p className="line-clamp-1 text-xs font-bold text-muted">
            {info ? t(`practica.goal_${info.id}`) : t("llamada.free_body")}
          </p>
        </div>
        {!live && <BackButton onClick={onBack} className="min-h-11 shrink-0 px-3 py-1.5 text-xs" />}
      </header>

      {/* avatar + nivel de audio */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative grid size-36 place-items-center">
          <div
            ref={ringRef}
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-full transition-[transform,opacity] duration-75 ease-out",
              status === "speaking" ? "bg-accent/30" : status === "reconnecting" ? "bg-warning/30" : "bg-primary/20",
              !live && "opacity-0",
            )}
          />
          <span
            className={cn(
              "relative grid size-28 place-items-center rounded-full border-4 bg-card shadow-lg transition-colors duration-150",
              status === "speaking" ? "border-accent text-accent-ink" : live ? "border-primary text-primary-ink" : "border-border text-muted",
            )}
          >
            <ScenarioIcon scenario={scenario} className="size-12" stroke={1.8} />
          </span>
        </div>

        <p role="status" aria-live="polite" className="mt-5 font-display text-lg font-extrabold">
          {t(`llamada.status_${status}`)}
        </p>
        <p className="mt-0.5 font-display text-sm font-bold tabular-nums text-muted">
          {snap?.startedAt ? formatClock(elapsed) : "--:--"}
        </p>
      </div>

      {/* transcripción en vivo */}
      {/* Sin aria-live aquí: la línea en curso cambia a cada trozo y saturaba el lector; el estado ya se anuncia arriba. */}
      <div className="mt-6 flex-1 space-y-2.5">
        {lines.length === 0 && !error && (
          <p className="text-center text-sm font-semibold text-muted">
            {live ? t("llamada.transcript_waiting") : t("llamada.idle_hint")}
          </p>
        )}
        {lines.map((line, i) => (
          <div key={i} className={cn("flex", line.role === "user" ? "justify-end" : "justify-start")}>
            <p
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-semibold leading-relaxed",
                line.role === "user" ? "bg-primary text-primary-fg" : "border border-border bg-card",
                line.live && "border-2 border-dashed border-primary-ink/40",
              )}
            >
              {line.text}
            </p>
          </div>
        ))}
        {error && <CallErrorNotice error={error} onRetry={onDial} key={`${error.kind}-${error.until ?? 0}`} />}
        <div ref={listEndRef} />
      </div>

      {/* controles */}
      <div className="sticky bottom-0 mt-4 flex items-center justify-center gap-6 bg-bg/90 py-3 backdrop-blur">
        {live && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            transition={spring}
            onClick={onToggleMute}
            aria-pressed={muted}
            aria-label={t(muted ? "llamada.unmute" : "llamada.mute")}
            className={cn(
              "grid size-14 place-items-center rounded-full border transition-colors duration-150",
              muted ? "border-danger bg-danger/10 text-danger-ink" : "border-border bg-surface text-fg",
            )}
          >
            {muted ? <IconMicrophoneOff className="size-6" /> : <IconMicrophone className="size-6" />}
          </motion.button>
        )}
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          transition={spring}
          onClick={live ? onHangup : onDial}
          aria-label={t(live ? "llamada.hangup" : "llamada.call")}
          className={cn(
            "grid size-[4.5rem] place-items-center rounded-full text-primary-fg shadow-lg transition-colors duration-150",
            live ? "bg-danger shadow-danger/30" : "bg-success shadow-success/30",
          )}
        >
          {live ? <IconPhoneOff className="size-8" /> : <IconPhone className="size-8" />}
        </motion.button>
      </div>
      {!live && !error && (
        <p className="text-center text-xs font-semibold text-muted">{t("llamada.limit_note", { count: CALL_LIMIT_MIN })}</p>
      )}
    </div>
  );
}

export function CallErrorNotice({ error, onRetry }: { error: CallError; onRetry: () => void }) {
  const { t } = useTranslation();
  const now = useNow(Boolean(error.until));
  const left = error.until ? Math.max(0, Math.ceil((error.until - now) / 1000)) : 0;
  const message = t(`llamada.err_${error.kind}`, { count: left });
  const retryable = error.kind !== "session" && error.kind !== "unsupported" && error.kind !== "daily";

  return (
    <div role="alert" className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-danger/30 bg-card px-4 py-3">
      {/* Base de 12rem: en 320 px el botón baja de línea en vez de dejar el texto en una columna. */}
      <p className="min-w-0 flex-1 basis-48 text-sm font-bold text-danger-ink">{message}</p>
      {retryable && (
        <Button variant="secondary" size="sm" className="shrink-0" disabled={left > 0} onClick={onRetry}>
          <IconRefresh className="size-4" />
          {left > 0 ? t("practica.retry_in", { count: left }) : t("common.retry")}
        </Button>
      )}
    </div>
  );
}
