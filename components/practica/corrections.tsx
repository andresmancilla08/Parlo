"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconChevronDown, IconSparkles } from "@tabler/icons-react";
import type { CoachCorrection } from "@/lib/coach";
import { applyCorrections, markFragments } from "@/lib/corrections";
import { SpeakControls } from "@/components/ui/speak-controls";
import { SayIt } from "@/components/practica/say-it";
import { cn } from "@/lib/utils";

/**
 * Tu mensaje con los fragmentos corregidos subrayados. Al tocar uno se ve lo
 * corregido en su sitio (y al volver a tocar, lo que escribiste).
 */
export function UserMessage({ content, corrections }: { content: string; corrections?: CoachCorrection[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const segments = corrections?.length ? markFragments(content, corrections) : [{ text: content }];

  return (
    <p className="text-sm font-semibold leading-relaxed">
      {segments.map((s, i) => {
        if (s.fix === undefined) return <span key={i}>{s.text}</span>;
        const fix = corrections![s.fix];
        const shown = open.has(i);
        return (
          <button
            key={i}
            type="button"
            aria-expanded={shown}
            aria-label={t(shown ? "practica.fix_hide" : "practica.fix_show", {
              original: fix.original,
              corrected: fix.corrected,
            })}
            onClick={() =>
              setOpen((prev) => {
                const next = new Set(prev);
                if (next.has(i)) next.delete(i);
                else next.add(i);
                return next;
              })
            }
            className={cn(
              // El objetivo táctil crece con padding vertical sin mover las líneas.
              "-my-1 inline rounded-md py-1 text-left transition-colors",
              shown
                ? "bg-primary-fg px-1 font-extrabold text-primary"
                : "underline decoration-primary-fg/70 decoration-wavy decoration-2 underline-offset-4 hover:bg-primary-fg/15",
            )}
          >
            {shown ? fix.corrected : s.text}
          </button>
        );
      })}
    </p>
  );
}

/**
 * Correcciones en suave: debajo de tu mensaje, sin bloquear la charla. La
 * respuesta del tutor ya está sonando; esto se lee cuando quieras.
 */
export function CorrectionCard({
  message,
  corrections,
  onSayItListening,
}: {
  message: string;
  corrections: CoachCorrection[];
  onSayItListening?: (listening: boolean) => void;
}) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [examples, setExamples] = useState(false);
  const examplesId = useId();
  const hasExamples = corrections.some((c) => c.examples.length > 0);

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      aria-label={t("practica.soft_kicker")}
      className="ml-auto w-full max-w-[85%] rounded-2xl border border-border bg-card p-3.5"
    >
      <p className="flex items-center gap-1.5 font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
        <IconSparkles className="size-4" aria-hidden />
        {t("practica.soft_kicker")}
      </p>
      <ul className="mt-2 space-y-2.5">
        {corrections.map((c, i) => (
          <li key={i}>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="font-bold text-danger-ink line-through decoration-danger/60">{c.original}</span>
              <span aria-hidden className="text-muted">→</span>
              <span className="font-extrabold text-success-ink">{c.corrected}</span>
              <SpeakControls text={c.corrected} size="sm" />
            </p>
            {c.why && <p className="mt-0.5 text-sm leading-relaxed text-fg/80">{c.why}</p>}
            {examples && c.examples.length > 0 && (
              <ul id={i === 0 ? examplesId : undefined} className="mt-1 space-y-0.5">
                {c.examples.map((ex, j) => (
                  <li key={j} className="text-xs font-semibold text-muted">
                    · {ex}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {hasExamples && (
        <button
          type="button"
          aria-expanded={examples}
          aria-controls={examplesId}
          onClick={() => setExamples((v) => !v)}
          className="-mx-1 mt-1 inline-flex min-h-11 items-center gap-1 px-1 text-xs font-extrabold text-primary-ink"
        >
          {t(examples ? "practica.examples_hide" : "practica.examples_show")}
          <IconChevronDown className={cn("size-4 transition-transform", examples && "rotate-180")} aria-hidden />
        </button>
      )}
      <SayIt target={applyCorrections(message, corrections)} onListeningChange={onSayItListening} />
    </motion.section>
  );
}
