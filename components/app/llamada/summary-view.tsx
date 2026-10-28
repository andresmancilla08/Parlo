"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconPhone, IconRefresh } from "@tabler/icons-react";
import type { CoachCorrection } from "@/lib/coach";
import type { CallSnapshot } from "@/lib/live/session";
import { formatClock, visibleLines } from "@/lib/live/transcript";
import { CALL_LIMIT_MIN } from "@/components/app/llamada/call-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpeakControls } from "@/components/ui/speak-controls";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Review =
  | { state: "loading" }
  | { state: "done"; corrections: CoachCorrection[] }
  | { state: "error"; kind: "busy" | "network" | "session" | "generic" }
  | { state: "empty" };

/** Resumen al colgar: revisión del coach + transcripción. Sin red ni audio. */
export function SummaryView({
  snap,
  review,
  onRetryReview,
  onAgain,
  onPick,
}: {
  snap: CallSnapshot;
  review: Review;
  onRetryReview: () => void;
  onAgain: () => void;
  onPick: () => void;
}) {
  const { t } = useTranslation();
  const lines = visibleLines(snap.transcript);
  const duration = snap.startedAt && snap.endedAt ? snap.endedAt - snap.startedAt : 0;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">{t("llamada.summary_kicker")}</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight">
          {t("llamada.summary_title", { time: formatClock(duration) })}
        </h1>
        {snap.hitTimeLimit && (
          <p className="mt-1 text-sm font-semibold text-muted">{t("llamada.time_limit", { count: CALL_LIMIT_MIN })}</p>
        )}
      </motion.header>

      <section className="mt-6">
        <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">{t("llamada.review_title")}</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={review.state}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            {review.state === "loading" && (
              <Card className="p-4 text-sm font-bold text-muted" role="status">
                {t("llamada.review_loading")}
              </Card>
            )}
            {review.state === "empty" && <Card className="p-4 text-sm font-semibold text-muted">{t("llamada.review_empty")}</Card>}
            {review.state === "error" && (
              <div role="alert" className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-danger/30 bg-card px-4 py-3">
                <p className="min-w-0 flex-1 basis-48 text-sm font-bold text-danger-ink">{t(`llamada.review_err_${review.kind}`)}</p>
                {review.kind !== "session" && (
                  <Button variant="secondary" size="sm" className="shrink-0" onClick={onRetryReview}>
                    <IconRefresh className="size-4" />
                    {t("common.retry")}
                  </Button>
                )}
              </div>
            )}
            {review.state === "done" &&
              (review.corrections.length === 0 ? (
                <Card className="border-success/40 p-4 text-sm font-bold text-success-ink">{t("llamada.review_clean")}</Card>
              ) : (
                <Card className="space-y-4 p-4">
                  {review.corrections.map((c, i) => (
                    <div key={i}>
                      <p className="text-sm font-bold text-danger-ink line-through decoration-danger/60">{c.original}</p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-extrabold text-success-ink">
                        {c.corrected}
                        <SpeakControls text={c.corrected} size="sm" />
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-fg/80">{c.why}</p>
                      {c.examples?.length > 0 && (
                        <ul className="mt-1.5 space-y-1">
                          {c.examples.map((ex, j) => (
                            <li key={j} className="text-xs font-semibold text-muted">
                              · {ex}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </Card>
              ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {lines.length > 0 && (
        <details className="mt-6 rounded-3xl border border-border bg-card p-4">
          <summary className="cursor-pointer font-display text-sm font-extrabold">{t("llamada.transcript_title")}</summary>
          <div className="mt-3 space-y-2">
            {lines.map((l, i) => (
              <p key={i} className="text-sm leading-relaxed">
                <span className={cn("font-extrabold", l.role === "user" ? "text-primary-ink" : "text-accent-ink")}>
                  {l.role === "user" ? t("llamada.you") : t("llamada.them")}:
                </span>{" "}
                {l.text}
              </p>
            ))}
          </div>
        </details>
      )}

      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        <Button onClick={onAgain}>
          <IconPhone className="size-5" />
          {t("llamada.call_again")}
        </Button>
        <Button variant="secondary" onClick={onPick}>
          {t("llamada.pick_other")}
        </Button>
      </div>
    </div>
  );
}
