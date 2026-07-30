"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconArrowRight,
  IconCircleCheck,
  IconHelpCircle,
  IconTargetArrow,
  IconX,
} from "@tabler/icons-react";
import {
  BLOCK,
  blockResult,
  DONT_KNOW,
  itemsForLevel,
  nextLevel,
  placementResult,
  PLACEMENT_LEVELS,
  type PlacementResult,
} from "@/lib/placement";
import { useProgress } from "@/lib/progress";
import { localTitle, curriculum, type Cefr } from "@/lib/curriculum";
import { playComplete, playReward, playWrong } from "@/lib/sfx";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { spring, stagger, rise } from "@/lib/motion";
import { cn } from "@/lib/utils";
import mascot from "@/public/brand/mascot.png";

// Test ADAPTATIVO por bloques: 5 preguntas por nivel y se sigue mientras se
// apruebe. Quien empieza de cero contesta 5, no 15.

type Phase = "intro" | "quiz" | "between" | "result";

export default function TestPage() {
  const router = useRouter();
  // Fuente única: las respuestas. El paso se DERIVA de ahí, así un doble toque
  // rápido no puede descuadrar el avance ni saltarse el resultado.
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [level, setLevel] = useState<Cefr>(PLACEMENT_LEVELS[0]);
  const [phase, setPhase] = useState<Phase>("intro");

  if (phase === "intro") {
    return <Intro onStart={() => setPhase("quiz")} onExit={() => router.push("/app")} />;
  }

  if (phase === "quiz") {
    return (
      <Quiz
        level={level}
        answers={answers}
        onAnswer={(id, option) => setAnswers((prev) => ({ ...prev, [id]: option }))}
        onBlockDone={() => setPhase("between")}
        onExit={() => router.push("/app")}
      />
    );
  }

  if (phase === "between") {
    const result = blockResult(level, answers);
    const upcoming = result.passed ? nextLevel(level) : null;
    return (
      <BetweenBlocks
        level={level}
        correct={result.correct}
        total={result.total}
        passed={result.passed}
        upcoming={upcoming}
        onContinue={() => {
          if (upcoming) {
            setLevel(upcoming);
            setPhase("quiz");
          } else {
            setPhase("result");
          }
        }}
      />
    );
  }

  return <Outcome result={placementResult(answers)} />;
}

/* ---------------- intro: las reglas antes de empezar ---------------- */

function Intro({ onStart, onExit }: { onStart: () => void; onExit: () => void }) {
  const { t } = useTranslation();
  const points = [
    { icon: <IconTargetArrow className="size-5" />, text: t("test.intro_point1") },
    { icon: <IconHelpCircle className="size-5" />, text: t("test.intro_point2") },
    { icon: <IconCircleCheck className="size-5" />, text: t("test.intro_point3") },
  ];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-6 pt-4">
      <button
        onClick={onExit}
        aria-label={t("test.exit")}
        className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
      >
        <IconX className="size-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-1 flex-col justify-center"
      >
        <Image
          src={mascot}
          alt=""
          height={130}
          width={Math.round((130 * mascot.width) / mascot.height)}
          className="mx-auto"
          priority
        />
        <p className="mt-4 text-center font-display text-xs font-extrabold uppercase tracking-[0.14em] text-primary-ink">
          {t("test.kicker")}
        </p>
        <h1 className="mt-2 text-center font-display text-3xl font-extrabold leading-tight tracking-tight">
          {t("test.intro_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-center text-sm text-muted">
          {t("test.intro_body", { n: BLOCK })}
        </p>

        <motion.ul variants={stagger} initial="hidden" animate="show" className="mt-6 grid gap-2.5">
          {points.map((p) => (
            <motion.li key={p.text} variants={rise}>
              <Card className="flex items-center gap-3 p-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
                  {p.icon}
                </span>
                <span className="text-sm font-bold">{p.text}</span>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <Button fullWidth shimmer onClick={onStart}>
        {t("test.intro_cta")}
        <IconArrowRight className="size-5" />
      </Button>
    </div>
  );
}

/* ---------------- un bloque de preguntas ---------------- */

function Quiz({
  level,
  answers,
  onAnswer,
  onBlockDone,
  onExit,
}: {
  level: Cefr;
  answers: Record<string, string>;
  onAnswer: (id: string, option: string) => void;
  onBlockDone: () => void;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const items = itemsForLevel(level);
  const answered = items.filter((i) => i.id in answers).length;
  const step = Math.min(answered, items.length - 1);
  const item = items[step];

  function pick(option: string) {
    onAnswer(item.id, option);
    if (answered + 1 >= items.length) onBlockDone();
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-6 pt-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          aria-label={t("test.exit")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
        >
          <IconX className="size-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-pill bg-border/60">
          <motion.div
            className="h-full rounded-pill bg-primary"
            initial={false}
            animate={{ width: `${(answered / items.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums text-muted">
          {step + 1}/{items.length}
        </span>
      </div>

      <p className="mt-3 pl-12 font-display text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("test.kicker")} · {t("test.block", { level })}
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

          {/* Adivinar coloca a quien no sabe donde no le toca: mejor decirlo. */}
          <button
            onClick={() => pick(DONT_KNOW)}
            className="mx-auto mb-1 mt-4 inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-bold text-muted transition-colors hover:bg-primary-soft"
          >
            <IconHelpCircle className="size-4" />
            {t("test.idk")}
          </button>
          <p className="pb-2 text-center text-xs font-semibold text-muted">{t("test.hint")}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- entre bloques ---------------- */

function BetweenBlocks({
  level,
  correct,
  total,
  passed,
  upcoming,
  onContinue,
}: {
  level: Cefr;
  correct: number;
  total: number;
  passed: boolean;
  /** Siguiente bloque, o `null` si el test termina aquí. */
  upcoming: Cefr | null;
  onContinue: () => void;
}) {
  const { t } = useTranslation();

  // Suena una vez, al entrar: superar un nivel se celebra; pararse, no.
  useEffect(() => {
    if (passed) playReward();
    else playWrong();
  }, [passed]);

  return (
    <div className="mx-auto grid min-h-dvh w-full max-w-md place-items-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
        className="w-full"
      >
        <motion.span
          initial={{ scale: 0.4, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...spring, delay: 0.05 }}
          className={cn(
            "mx-auto grid size-20 place-items-center rounded-3xl font-display text-3xl font-extrabold",
            passed ? "bg-accent-soft text-accent-ink" : "bg-primary-soft text-primary-ink",
          )}
        >
          {level}
        </motion.span>

        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
          {passed ? t("test.block_pass_title", { level }) : t("test.block_stop_title")}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {upcoming
            ? t("test.block_pass_body", { correct, total, next: upcoming })
            : passed
              ? t("test.block_top_body", { correct, total, level })
              : t("test.block_stop_body", { correct, total, level })}
        </p>

        {/* aciertos del bloque, de un vistazo */}
        <div className="mx-auto mt-5 flex justify-center gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0.2, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ ...spring, delay: 0.06 * i }}
              className={cn(
                "h-2.5 w-8 rounded-pill",
                i < correct ? (passed ? "bg-accent" : "bg-primary") : "bg-border",
              )}
            />
          ))}
        </div>

        <div className="mt-8">
          <Button fullWidth shimmer onClick={onContinue}>
            {upcoming ? t("test.block_next", { level: upcoming }) : t("test.block_see")}
            <IconArrowRight className="size-5" />
          </Button>
        </div>
      </motion.div>
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

  useEffect(() => {
    playComplete();
  }, []);

  function start(level: Cefr) {
    setStartLevel(level);
    router.push("/app");
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 pb-10 pt-8 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={spring}>
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
        <motion.h1
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...spring, delay: 0.08 }}
          className="mt-2 font-display text-5xl font-extrabold tracking-tight"
        >
          {result.level}
        </motion.h1>
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
                  b.correct >= 3 ? "bg-accent-soft text-accent-ink" : "bg-bg text-muted",
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

        {/* Lo que falló SÍ se explica: un test que no enseña nada no sirve. */}
        {result.missed.length > 0 && (
          <div className="mt-7 text-left">
            <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
              {t("test.review_title")}
            </p>
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2.5">
              {result.missed.map((item) => (
                <motion.div
                  key={item.id}
                  variants={rise}
                  className="rounded-2xl border border-border bg-card p-3.5"
                >
                  <div className="flex items-start gap-2">
                    <p className="min-w-0 flex-1 font-display text-sm font-extrabold">
                      {item.full ?? item.prompt}
                    </p>
                    {item.full && <SpeakControls text={item.full} size="sm" />}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg/80">{item.explain}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {unit && (
          <p className="mt-6 text-sm font-semibold text-muted">
            {t("test.start_at", { unit: localTitle(unit, i18n.language) })}
          </p>
        )}

        <div className="mt-4 space-y-2">
          <Button fullWidth shimmer onClick={() => start(result.level)}>
            {t("test.start_cta")}
            <IconArrowRight className="size-5" />
          </Button>
          {/* Quien prefiera asentar la base puede empezar desde el principio. */}
          {result.level !== PLACEMENT_LEVELS[0] && (
            <Button variant="secondary" fullWidth onClick={() => start(PLACEMENT_LEVELS[0])}>
              {t("test.start_from_scratch", { level: PLACEMENT_LEVELS[0] })}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
