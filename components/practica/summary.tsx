"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconArrowLeft, IconCards, IconCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import type { CoachSummary, Scenario } from "@/lib/coach";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpeakControls } from "@/components/ui/speak-controls";
import { SendErrorNotice, type SendError } from "@/components/practica/send-error";

export type SummaryState =
  | { status: "loading" }
  | { status: "ready"; data: CoachSummary }
  | { status: "error"; error: SendError };

/** Pantalla de resumen al cerrar la conversación. */
export function SummaryView({
  state,
  scenario,
  goalsDone,
  onRetry,
  onExit,
}: {
  state: SummaryState;
  scenario: Scenario | null;
  goalsDone: ReadonlySet<string>;
  onRetry: () => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const title = useRef<HTMLHeadingElement>(null);

  // El foco va al título: la pantalla cambia entera y el lector debe saberlo.
  useEffect(() => {
    title.current?.focus();
  }, []);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
        {scenario ? t(`practica.scenario_${scenario.id}`) : t("practica.free_title")}
      </p>
      <h1 ref={title} tabIndex={-1} className="mt-1.5 font-display text-3xl font-extrabold leading-tight tracking-tight outline-none">
        {t("practica.summary_title")}
      </h1>

      {scenario && (
        <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-muted">
          <IconCircleCheckFilled className="size-4 text-success-ink" aria-hidden />
          {t("practica.summary_missions", {
            count: scenario.goals.filter((g) => goalsDone.has(g.id)).length,
            total: scenario.goals.length,
          })}
        </p>
      )}

      <div aria-live="polite" aria-busy={state.status === "loading"} className="mt-6">
        {state.status === "loading" && <SummarySkeleton label={t("practica.summary_loading")} />}
        {state.status === "error" && <SendErrorNotice error={state.error} onRetry={onRetry} />}
        {state.status === "ready" && <SummaryContent data={state.data} />}
      </div>

      <div className="mt-8">
        <Button variant="secondary" fullWidth onClick={onExit}>
          <IconArrowLeft className="size-5" />
          {t("practica.summary_done")}
        </Button>
      </div>
    </div>
  );
}

function SummarySkeleton({ label }: { label: string }) {
  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      <p aria-hidden className="mb-3 text-sm font-bold text-muted">
        {label}
      </p>
      <div aria-hidden className="space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl bg-surface motion-reduce:animate-none" />
        ))}
      </div>
    </div>
  );
}

function SummaryContent({ data }: { data: CoachSummary }) {
  const { t } = useTranslation();
  const addCard = useProgress((s) => s.addCard);
  const cards = useProgress((s) => s.cards);
  const fresh = data.phrases.filter((p) => !cards[p.en]);
  const allIn = fresh.length === 0;

  return (
    <>
      {data.note && (
        <div className="rounded-2xl bg-accent-soft p-4">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-accent-ink">
            {t("practica.summary_note")}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-accent-ink/90">{data.note}</p>
        </div>
      )}

      <h2 className="mt-6 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("practica.summary_mistakes")}
      </h2>
      {data.mistakes.length === 0 ? (
        <p className="text-sm font-semibold text-muted">{t("practica.summary_no_mistakes")}</p>
      ) : (
        <ul className="grid gap-2.5">
          {data.mistakes.map((m, i) => (
            <li key={i}>
              <Card className="p-3.5">
                <p className="text-sm leading-relaxed">{m.pattern}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-sm font-extrabold text-success-ink">
                  {m.fix}
                  <SpeakControls text={m.fix} size="sm" />
                </p>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-6 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("practica.summary_phrases")}
      </h2>
      <ul className="grid gap-2">
        {data.phrases.map((p) => (
          <li key={p.en}>
            <Card className="flex items-center gap-3 p-3.5">
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-extrabold leading-snug">{p.en}</span>
                <span className="mt-0.5 block text-sm font-semibold text-muted">{p.es}</span>
              </span>
              {cards[p.en] && <IconCheck className="size-4 shrink-0 text-success-ink" aria-label={t("guia.added")} />}
              <SpeakControls text={p.en} />
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button
          fullWidth
          disabled={allIn}
          onClick={() => {
            // `addCard` no duplica: una frase que ya está en el repaso se deja.
            for (const p of fresh) addCard(p.en, p.es);
          }}
        >
          {allIn ? <IconCheck className="size-5" /> : <IconCards className="size-5" />}
          {allIn ? t("practica.summary_added") : t("practica.summary_add", { count: fresh.length })}
        </Button>
      </div>
    </>
  );
}

