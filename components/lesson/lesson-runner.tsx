"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconFlame,
  IconStarFilled,
  IconVolume,
  IconX,
} from "@tabler/icons-react";
import { optionsSpeakable, type Exercise } from "@/lib/curriculum";
import { useProgress, type GradedItem, type LessonResult } from "@/lib/progress";
import { speak } from "@/lib/tts";
import { playComplete, playCorrect, playWrong } from "@/lib/sfx";
import { Button } from "@/components/ui/button";
import { SpeakControls } from "@/components/ui/speak-controls";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import mascot from "@/public/brand/mascot.png";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type Props = {
  title: string;
  exercises: Exercise[];
  onComplete: (r: LessonResult) => void;
  exitHref?: string;
  /** Abre la teoría de la lección sin perder el ejercicio en curso. */
  onTeach?: () => void;
};

export function LessonRunner({
  title,
  exercises,
  onComplete,
  exitHref = "/app",
  onTeach,
}: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [graded, setGraded] = useState<GradedItem[]>([]);
  const [done, setDone] = useState(false);
  const committed = useRef(false);

  const total = exercises.length;
  const ex = exercises[step];
  const correctCount = graded.filter((g) => g.ok).length;
  // Aciertos seguidos AHORA mismo (se corta al primer fallo).
  const combo = graded.reduce((n, g) => (g.ok ? n + 1 : 0), 0);

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
          aria-label={t("a11y.exit_lesson")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
        >
          <IconX className="size-5" />
        </button>
        {/* La barra mide lo RESPONDIDO, no el índice: al comprobar avanza. */}
        <div className="h-3 flex-1 overflow-hidden rounded-pill bg-border/60">
          <motion.div
            className="h-full rounded-pill bg-primary"
            initial={false}
            animate={{ width: `${(graded.length / total) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        {onTeach && (
          <button
            onClick={onTeach}
            aria-label={t("teach.open")}
            title={t("teach.open")}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink transition-transform active:scale-95"
          >
            <IconBulb className="size-5" />
          </button>
        )}
        <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-muted">
          {step + 1}/{total}
        </span>
      </div>

      {/* qué estás practicando (mismo kicker editorial que la home) */}
      <div className="mt-3 flex items-center justify-between gap-3 pl-12">
        <p className="font-display text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-muted">
          {title}
        </p>
        <AnimatePresence>
          {combo >= 3 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={spring}
              className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-gem/15 px-2.5 py-1 font-display text-xs font-extrabold text-gem"
            >
              <IconFlame className="size-3.5" stroke={2.4} />
              {t("leccion.combo", { n: combo })}
            </motion.span>
          )}
        </AnimatePresence>
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
  const noteListen = useProgress((s) => s.noteListen);
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
    // El sonido sale del toque del usuario: los navegadores lo permiten.
    if (result) playCorrect();
    else playWrong();
  }

  const correctText =
    ex.kind === "choose" ? ex.answer : ex.kind === "bank" ? ex.answer : (Array.isArray(ex.answer) ? ex.answer[0] : ex.answer);

  return (
    <div className="flex flex-1 flex-col pt-8">
      {/* El enunciado va en español: no lleva altavoz (lo llevan las opciones). */}
      <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight">
        {ex.prompt}
      </h1>

      {/* contenido pegado al enunciado; el aire sobrante queda sobre el CTA */}
      <div className="mt-6 flex-1 pb-2">
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
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-fg">
                  <span>
                    {t("leccion.answer_was")}{" "}
                    <span className="font-extrabold">{correctText}</span>
                  </span>
                  {(ex.kind !== "choose" || optionsSpeakable(ex)) && (
                    <SpeakControls text={correctText} onPlay={noteListen} />
                  )}
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
  const { t } = useTranslation();
  const noteListen = useProgress((s) => s.noteListen);
  // Sólo se ofrece escuchar si las opciones están en inglés (ver `optionsSpeakable`).
  const speakable = optionsSpeakable(ex);

  return (
    <div className="grid gap-3">
      {ex.options.map((opt) => {
        const selected = choice === opt;
        const isAnswer = opt === ex.answer;
        return (
          <div key={opt} className="flex items-stretch gap-2">
            <button
              disabled={checked}
              onClick={() => onPick(opt)}
              className={cn(
                "flex-1 rounded-2xl border-2 px-5 py-4 text-left font-semibold transition-colors",
                !checked && selected && "border-primary bg-primary-soft",
                !checked && !selected && "border-border bg-card hover:border-primary/40",
                checked && isAnswer && "border-success bg-success/12 text-success-ink",
                checked && selected && !isAnswer && "border-danger bg-danger/12 text-danger-ink",
                checked && !isAnswer && !selected && "border-border bg-card opacity-60",
              )}
            >
              {opt}
            </button>
            {speakable && (
              <button
                type="button"
                onClick={() => {
                  speak(opt);
                  noteListen();
                }}
                aria-label={t("a11y.listen_option", { text: opt })}
                className="grid w-14 shrink-0 place-items-center rounded-2xl border-2 border-border bg-card text-accent-ink transition-colors hover:border-accent active:scale-95"
              >
                <IconVolume className="size-5" />
              </button>
            )}
          </div>
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

  useEffect(() => {
    playComplete();
  }, []);

  return (
    <div className="relative mx-auto grid min-h-dvh w-full max-w-md place-items-center px-6 text-center">
      <Confetti />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
      >
        <Image
          src={mascot}
          alt=""
          height={160}
          width={Math.round((160 * mascot.width) / mascot.height)}
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
          <Stat label="XP" value={<CountUp to={xp} prefix="+" />} />
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

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-5 py-3">
      <p className="font-display text-xl font-extrabold text-primary">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

/** Cifra que sube desde 0: el XP se siente ganado, no impreso. */
function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? to : 0);
  const text = useTransform(value, (v) => `${prefix}${Math.round(v)}`);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(value, to, { duration: 0.7, ease: "easeOut" });
    return () => controls.stop();
  }, [reduce, to, value]);

  return <motion.span>{text}</motion.span>;
}

/** Celebración corta y barata: 14 piezas con los colores de marca. */
function Confetti() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const pieces = Array.from({ length: 14 }, (_, i) => i);
  const colors = ["bg-primary", "bg-accent", "bg-gem"];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((i) => {
        const left = 8 + (i * 84) / 13;
        const delay = (i % 5) * 0.06;
        return (
          <motion.span
            key={i}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{ y: "60vh", opacity: [0, 1, 1, 0], rotate: i % 2 ? 220 : -220 }}
            transition={{ duration: 1.5, delay, ease: "easeIn" }}
            style={{ left: `${left}%` }}
            className={cn(
              "absolute top-0 size-2.5 rounded-[3px]",
              colors[i % colors.length],
            )}
          />
        );
      })}
    </div>
  );
}
