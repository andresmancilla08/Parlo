"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconArrowRight, IconX } from "@tabler/icons-react";
import {
  PLACEMENT_ITEMS,
  placementResult,
  type PlacementResult,
} from "@/lib/placement";
import { useProgress } from "@/lib/progress";
import { localTitle, curriculum } from "@/lib/curriculum";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import mascot from "@/public/brand/mascot.png";

export default function TestPage() {
  const { t } = useTranslation();
  const router = useRouter();
  // Fuente única: las respuestas. El paso y el final se DERIVAN de ahí, así un
  // doble toque rápido no puede descuadrar el avance ni saltarse el resultado.
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = PLACEMENT_ITEMS.length;
  const answered = Object.keys(answers).length;
  const finished = answered >= total;
  const step = Math.min(answered, total - 1);
  const item = PLACEMENT_ITEMS[step];

  function pick(option: string) {
    setAnswers((prev) => ({ ...prev, [item.id]: option }));
  }

  if (finished) return <Outcome result={placementResult(answers)} />;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-6 pt-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/app")}
          aria-label={t("test.exit")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
        >
          <IconX className="size-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-pill bg-border/60">
          <motion.div
            className="h-full rounded-pill bg-primary"
            initial={false}
            animate={{ width: `${(step / total) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums text-muted">
          {step + 1}/{total}
        </span>
      </div>

      <p className="mt-3 pl-12 font-display text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("test.kicker")}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={spring}
          className="flex flex-1 flex-col pt-8"
        >
          <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight">
            {item.prompt}
          </h1>

          <div className="mt-6 flex flex-1 flex-col gap-3">
            {item.options.map((opt) => (
              <button
                key={opt}
                onClick={() => pick(opt)}
                className="rounded-2xl border-2 border-border bg-card px-5 py-4 text-left font-semibold transition-colors hover:border-primary/40 active:scale-[0.99]"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* No hay «no lo sé»: se elige la opción que suene mejor, como en un examen. */}
          <p className="pb-2 text-center text-xs font-semibold text-muted">
            {t("test.hint")}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- resultado ---------------- */

function Outcome({ result }: { result: PlacementResult }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const setStartLevel = useProgress((s) => s.setStartLevel);

  // Primera unidad del nivel propuesto: es donde va a empezar.
  const unit = curriculum.find((u) => u.level === result.level);

  return (
    <div className="mx-auto grid min-h-dvh w-full max-w-md place-items-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      >
        <Image
          src={mascot}
          alt=""
          height={150}
          width={Math.round((150 * mascot.width) / mascot.height)}
          className="mx-auto"
          priority
        />
        <p className="mt-4 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-primary-ink">
          {t("test.result_kicker")}
        </p>
        <h1 className="mt-2 font-display text-5xl font-extrabold tracking-tight">
          {result.level}
        </h1>
        <p className="mt-1 font-display text-lg font-extrabold text-accent-ink">
          {t(`home.level_${result.level.toLowerCase()}`)}
        </p>
        <p className="mt-3 text-sm text-muted">
          {t("test.result_score", { correct: result.correct, total: result.total })}
        </p>

        <div className="mt-5 space-y-2 text-left">
          {Object.entries(result.byLevel).map(([level, b]) => (
            <Card key={level} className="flex items-center gap-3 p-3">
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold",
                  b.correct >= 3
                    ? "bg-accent-soft text-accent-ink"
                    : "bg-bg text-muted",
                )}
              >
                {level}
              </span>
              <span className="flex-1 text-sm font-bold">
                {t("test.level_score", { correct: b.correct, total: b.total })}
              </span>
            </Card>
          ))}
        </div>

        {unit && (
          <p className="mt-5 text-sm font-semibold text-muted">
            {t("test.start_at", { unit: localTitle(unit, i18n.language) })}
          </p>
        )}

        <div className="mt-6">
          <Button
            fullWidth
            shimmer
            onClick={() => {
              setStartLevel(result.level);
              router.push("/app");
            }}
          >
            {t("test.start_cta")}
            <IconArrowRight className="size-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
