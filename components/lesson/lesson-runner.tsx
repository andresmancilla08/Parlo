"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconArrowRight,
  IconCheck,
  IconStarFilled,
  IconVolume,
  IconX,
} from "@tabler/icons-react";
import type { Exercise } from "@/lib/curriculum";
import type { GradedItem, LessonResult } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import mascotCelebrate from "@/public/brand/mascot-celebrate.png";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

type Props = {
  title: string;
  exercises: Exercise[];
  onComplete: (r: LessonResult) => void;
  exitHref?: string;
};

export function LessonRunner({ title, exercises, onComplete, exitHref = "/app" }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [graded, setGraded] = useState<GradedItem[]>([]);
  const [done, setDone] = useState(false);
  const committed = useRef(false);

  const total = exercises.length;
  const ex = exercises[step];
  const correctCount = graded.filter((g) => g.ok).length;

  function handleGraded(ok: boolean) {
    setGraded((g) => [...g, { ok, srsKey: exercises[step].srsKey }]);
  }

  function next() {
    if (step + 1 >= total) setDone(true);
    else setStep((s) => s + 1);
  }

  // Otorga el progreso una sola vez al terminar.
  useEffect(() => {
    if (done && !committed.current) {
      committed.current = true;
      onComplete({ correct: correctCount, total, graded });
    }
  }, [done, correctCount, total, graded, onComplete]);

  if (done) {
    return (
      <Complete
        correct={correctCount}
        total={total}
        onExit={() => router.push(exitHref)}
      />
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-6 pt-4">
      {/* barra superior */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(exitHref)}
          aria-label={title}
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
        <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-muted">
          {step + 1}/{total}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={spring}
          className="flex flex-1 flex-col"
        >
          <ExerciseView ex={ex} onGraded={handleGraded} onNext={next} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- una vista por ejercicio (maneja su propio check/feedback) ---------- */

function ExerciseView({
  ex,
  onGraded,
  onNext,
}: {
  ex: Exercise;
  onGraded: (ok: boolean) => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [ok, setOk] = useState(false);

  // estado propio de cada tipo
  const [choice, setChoice] = useState<string | null>(null);
  const [tokens, setTokens] = useState<string[]>([]);
  const [text, setText] = useState("");

  const canCheck = ex.kind === "choose" ? choice != null : ex.kind === "bank" ? tokens.length > 0 : text.trim().length > 0;

  function grade(): boolean {
    if (ex.kind === "choose") return choice === ex.answer;
    if (ex.kind === "bank") return normalize(tokens.join(" ")) === normalize(ex.answer);
    const answers = Array.isArray(ex.answer) ? ex.answer : [ex.answer];
    return answers.some((a) => normalize(a) === normalize(text));
  }

  function onCheck() {
    const result = grade();
    setOk(result);
    setChecked(true);
    onGraded(result);
  }

  const correctText =
    ex.kind === "choose" ? ex.answer : ex.kind === "bank" ? ex.answer : (Array.isArray(ex.answer) ? ex.answer[0] : ex.answer);

  return (
    <div className="flex flex-1 flex-col pt-8">
      <div className="flex items-start gap-2">
        <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight">
          {ex.prompt}
        </h1>
        {ex.kind === "choose" && ex.speak && (
          <button
            onClick={() => speak(ex.speak!)}
            aria-label="Escuchar"
            className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
          >
            <IconVolume className="size-5" />
          </button>
        )}
      </div>

      <div className="mt-8 flex-1">
        {ex.kind === "choose" && (
          <ChooseView ex={ex} choice={choice} checked={checked} onPick={setChoice} />
        )}
        {ex.kind === "bank" && (
          <BankView ex={ex} tokens={tokens} checked={checked} onChange={setTokens} />
        )}
        {ex.kind === "type" && (
          <TypeView text={text} checked={checked} ok={ok} onChange={setText} />
        )}
      </div>

      {/* feedback + CTA (anclado abajo) */}
      <div className="sticky bottom-0 -mx-5 mt-4 px-5 pb-2 pt-3">
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
              className={cn(
                "mb-3 rounded-2xl p-4",
                ok ? "bg-success/12 text-success-ink" : "bg-danger/12 text-danger-ink",
              )}
            >
              <p className="font-display font-extrabold">
                {ok ? t("leccion.correct") : t("leccion.incorrect")}
              </p>
              {!ok && (
                <p className="mt-0.5 text-sm font-semibold text-fg">
                  {t("leccion.answer_was")}{" "}
                  <span className="font-extrabold">{correctText}</span>
                </p>
              )}
              <p className="mt-1 text-sm leading-relaxed text-fg/80">{ex.explain}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {checked ? (
          <Button fullWidth onClick={onNext}>
            {t("leccion.continue")}
            <IconArrowRight className="size-5" />
          </Button>
        ) : (
          <Button fullWidth disabled={!canCheck} onClick={onCheck}>
            {t("leccion.check")}
          </Button>
        )}
      </div>
    </div>
  );
}

function ChooseView({
  ex,
  choice,
  checked,
  onPick,
}: {
  ex: Extract<Exercise, { kind: "choose" }>;
  choice: string | null;
  checked: boolean;
  onPick: (v: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {ex.options.map((opt) => {
        const selected = choice === opt;
        const isAnswer = opt === ex.answer;
        return (
          <button
            key={opt}
            disabled={checked}
            onClick={() => onPick(opt)}
            className={cn(
              "rounded-2xl border-2 px-5 py-4 text-left font-semibold transition-colors",
              !checked && selected && "border-primary bg-primary-soft",
              !checked && !selected && "border-border bg-card hover:border-primary/40",
              checked && isAnswer && "border-success bg-success/12 text-success-ink",
              checked && selected && !isAnswer && "border-danger bg-danger/12 text-danger-ink",
              checked && !isAnswer && !selected && "border-border bg-card opacity-60",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function BankView({
  ex,
  tokens,
  checked,
  onChange,
}: {
  ex: Extract<Exercise, { kind: "bank" }>;
  tokens: string[];
  checked: boolean;
  onChange: (t: string[]) => void;
}) {
  // banco restante: permite duplicados contando ocurrencias usadas
  const remaining = ex.bank.filter((w) => {
    const inBank = ex.bank.filter((b) => b === w).length;
    const inUsed = tokens.filter((tk) => tk === w).length;
    return inUsed < inBank;
  });

  return (
    <div>
      {/* línea de respuesta */}
      <div className="flex min-h-16 flex-wrap content-start gap-2 rounded-2xl border-2 border-dashed border-border p-3">
        {tokens.map((tk, i) => (
          <button
            key={`${tk}-${i}`}
            disabled={checked}
            onClick={() => onChange(tokens.filter((_, idx) => idx !== i))}
            className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold shadow-sm"
          >
            {tk}
          </button>
        ))}
      </div>
      {/* banco */}
      <div className="mt-6 flex flex-wrap gap-2">
        {remaining.map((w, i) => (
          <button
            key={`${w}-${i}`}
            disabled={checked}
            onClick={() => onChange([...tokens, w])}
            className="rounded-xl border-2 border-border bg-card px-3 py-2 text-sm font-semibold shadow-sm transition-colors hover:border-primary/40 disabled:opacity-50"
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypeView({
  text,
  checked,
  ok,
  onChange,
}: {
  text: string;
  checked: boolean;
  ok: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <input
      autoFocus
      value={text}
      disabled={checked}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded-2xl border-2 bg-card px-5 py-4 text-lg font-semibold outline-none transition-colors placeholder:text-muted focus:border-primary",
        checked && ok && "border-success",
        checked && !ok && "border-danger",
        !checked && "border-border",
      )}
      placeholder="…"
    />
  );
}

/* ---------- pantalla de fin ---------- */

function Complete({
  correct,
  total,
  onExit,
}: {
  correct: number;
  total: number;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const acc = total > 0 ? correct / total : 0;
  const stars = acc === 1 ? 3 : acc >= 0.8 ? 2 : 1;
  const xp = correct * 10;

  return (
    <div className="mx-auto grid min-h-dvh w-full max-w-md place-items-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      >
        <Image
          src={mascotCelebrate}
          alt=""
          height={160}
          width={Math.round((160 * mascotCelebrate.width) / mascotCelebrate.height)}
          className="mx-auto"
          priority
        />
        <div className="mt-4 flex justify-center gap-1">
          {[1, 2, 3].map((n) => (
            <motion.span
              key={n}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ ...spring, delay: 0.1 * n }}
            >
              <IconStarFilled
                className={cn("size-9", n <= stars ? "text-gem" : "text-border")}
              />
            </motion.span>
          ))}
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
          {t("leccion.done_title")}
        </h1>
        <p className="mt-2 text-muted">
          {t("leccion.done_score", { correct, total })}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Stat label="XP" value={`+${xp}`} />
          <Stat label={t("leccion.gems")} value={acc >= 0.8 ? "+5" : "+0"} />
        </div>
        <div className="mt-8">
          <Button fullWidth onClick={onExit} shimmer>
            {t("leccion.finish")}
            <IconCheck className="size-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-5 py-3">
      <p className="font-display text-xl font-extrabold text-primary">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
