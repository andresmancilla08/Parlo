"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconMessages,
  IconTable,
  IconX,
} from "@tabler/icons-react";
import type { TeachStep } from "@/lib/curriculum/teach";
import { useProgress } from "@/lib/progress";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Button } from "@/components/ui/button";
import { spring, stagger, rise } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Fase «Aprende»: la teoría ANTES de practicar. Una idea por pantalla, con
// ejemplos que se pueden escuchar (normal y despacio). Nunca evalúa: aquí no
// se falla, solo se entiende.

type Props = {
  /** Título de la lección (mismo kicker editorial que el resto). */
  title: string;
  steps: TeachStep[];
  /** Terminó la teoría: se pasa a los ejercicios. */
  onDone: () => void;
  onExit: () => void;
  /** Se puede saltar cuando ya se vio antes esta teoría. */
  canSkip?: boolean;
};

export function LessonTeach({ title, steps, onDone, onExit, canSkip }: Props) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const total = steps.length;
  const last = step + 1 >= total;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-6 pt-4">
      {/* barra superior: mismo patrón que la práctica, pero en tono acento */}
      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          aria-label={t("a11y.exit_lesson")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-accent-soft"
        >
          <IconX className="size-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-pill bg-border/60">
          <motion.div
            className="h-full rounded-pill bg-accent"
            initial={false}
            animate={{ width: `${((step + 1) / total) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-muted">
          {step + 1}/{total}
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3 pl-12">
        <p className="font-display text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-accent-ink">
          {t("teach.kicker")} · {title}
        </p>
        {canSkip && (
          <button
            type="button"
            onClick={onDone}
            className="shrink-0 text-xs font-bold text-muted underline-offset-2 hover:underline"
          >
            {t("teach.skip")}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={spring}
          className="flex flex-1 flex-col pt-6"
        >
          <StepView step={steps[step]} />
        </motion.div>
      </AnimatePresence>

      {/* navegación (anclada abajo, igual que el CTA de la práctica) */}
      <div className="sticky bottom-0 -mx-5 mt-4 flex items-center gap-3 px-5 pb-2 pt-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            aria-label={t("teach.back")}
            className="grid size-12 shrink-0 place-items-center rounded-pill border-2 border-border bg-card text-muted transition-colors hover:border-accent active:scale-95"
          >
            <IconArrowLeft className="size-5" />
          </button>
        )}
        {/* `flex-1` en vez de `fullWidth`: con el botón «atrás» al lado, un
            ancho del 100 % desborda la página unos píxeles en móvil. */}
        <Button
          className="min-w-0 flex-1"
          shimmer={last}
          onClick={() => (last ? onDone() : setStep((s) => s + 1))}
        >
          {last ? t("teach.practice") : t("teach.next")}
          <IconArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

/* ---------------- una vista por tipo de paso ---------------- */

function StepView({ step }: { step: TeachStep }) {
  const { t } = useTranslation();
  const noteListen = useProgress((s) => s.noteListen);

  if (step.kind === "idea") {
    return (
      <StepShell icon={<IconBulb className="size-5" />} title={step.title}>
        <p className="text-lg leading-relaxed text-fg/85">{step.body}</p>
      </StepShell>
    );
  }

  if (step.kind === "examples") {
    return (
      <StepShell icon={<IconMessages className="size-5" />} title={step.title}>
        <motion.ul variants={stagger} initial="hidden" animate="show" className="grid gap-2.5">
          {step.items.map((ex) => (
            <motion.li
              key={ex.en}
              variants={rise}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
            >
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-extrabold leading-snug">{ex.en}</p>
                <p className="mt-0.5 text-sm font-semibold text-muted">{ex.es}</p>
                {ex.note && (
                  <p className="mt-1 inline-block rounded-pill bg-accent-soft px-2 py-0.5 text-[0.7rem] font-bold text-accent-ink">
                    {ex.note}
                  </p>
                )}
              </div>
              <SpeakControls text={ex.en} onPlay={noteListen} />
            </motion.li>
          ))}
        </motion.ul>
      </StepShell>
    );
  }

  if (step.kind === "table") {
    return (
      <StepShell icon={<IconTable className="size-5" />} title={step.title}>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-2 gap-3 border-b border-border bg-bg px-4 py-2.5">
            {step.head.map((h) => (
              <p
                key={h}
                className="min-w-0 break-words font-display text-[0.7rem] font-extrabold uppercase tracking-[0.1em] text-muted"
              >
                {h}
              </p>
            ))}
          </div>
          <motion.div variants={stagger} initial="hidden" animate="show">
            {step.rows.map((row) => (
              <motion.div
                key={row.join("|")}
                variants={rise}
                className="grid grid-cols-2 gap-3 border-b border-border px-4 py-3 last:border-b-0"
              >
                {/* `min-w-0`: sin él, una celda larga estira la rejilla y la
                    página desborda a lo ancho en 320-390px. */}
                <p className="min-w-0 break-words text-sm font-bold">{row[0]}</p>
                <p className="min-w-0 break-words text-sm font-semibold text-muted">{row[1]}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </StepShell>
    );
  }

  return (
    <StepShell
      icon={<IconAlertTriangle className="size-5" />}
      title={step.title}
      tone="warning"
    >
      <div className="grid gap-2.5">
        <Contrast ok={false} label={t("teach.wrong_label")} text={step.wrong} />
        <Contrast ok label={t("teach.right_label")} text={step.right} />
      </div>
      <p className="mt-4 text-base leading-relaxed text-fg/85">{step.body}</p>
    </StepShell>
  );
}

function StepShell({
  icon,
  title,
  tone = "accent",
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tone?: "accent" | "warning";
  children: React.ReactNode;
}) {
  // Centrado vertical: una idea corta no debe dejar media pantalla muerta
  // encima del botón (mismo criterio que el CTA de la práctica).
  return (
    <div className="flex flex-1 flex-col justify-center pb-6">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl",
            tone === "accent" ? "bg-accent-soft text-accent-ink" : "bg-warning/20 text-fg",
          )}
        >
          {icon}
        </span>
        <h1 className="min-w-0 font-display text-2xl font-extrabold leading-tight tracking-tight">
          {title}
        </h1>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Contrast({ ok, label, text }: { ok: boolean; label: string; text: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl p-3.5",
        ok ? "bg-success/12" : "bg-danger/12",
      )}
    >
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full",
          ok ? "bg-success text-white" : "bg-danger text-white",
        )}
      >
        {ok ? <IconCheck className="size-4" /> : <IconX className="size-4" />}
      </span>
      <div className="min-w-0">
        <p
          className={cn(
            "font-display text-[0.7rem] font-extrabold uppercase tracking-[0.1em]",
            ok ? "text-success-ink" : "text-danger-ink",
          )}
        >
          {label}
        </p>
        <p className={cn("font-semibold", ok ? "text-success-ink" : "text-danger-ink")}>{text}</p>
      </div>
    </div>
  );
}
