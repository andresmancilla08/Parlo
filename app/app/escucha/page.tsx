"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconArrowRight, IconHeadphones, IconVolume, IconX } from "@tabler/icons-react";
import {
  blankHint,
  blanksFor,
  coreOf,
  DIFFICULTIES,
  sameWord,
  tokenize,
  TRACKS,
  type Difficulty,
  type ListeningTrack,
} from "@/lib/listening";
import { localTitle } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { speak } from "@/lib/tts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import mascotCelebrate from "@/public/brand/mascot-celebrate.png";

export default function EscuchaPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[1]);

  // La pista activa va en la URL: la sesión sobrevive a un recargado y el
  // layout puede quitar la navegación mientras se practica (modo foco).
  const track = TRACKS.find((t) => t.id === params.get("t")) ?? null;
  const urlDifficulty =
    DIFFICULTIES.find((d) => d.id === params.get("d")) ?? difficulty;

  if (!track) {
    return (
      <Picker
        difficulty={difficulty}
        onDifficulty={setDifficulty}
        onPick={(t) => router.push(`/app/escucha?t=${t.id}&d=${difficulty.id}`)}
      />
    );
  }
  return (
    <Session
      key={`${track.id}-${urlDifficulty.id}`}
      track={track}
      difficulty={urlDifficulty}
      onExit={() => router.push("/app/escucha")}
    />
  );
}

/* ---------------- elegir pista y dificultad ---------------- */

function Picker({
  difficulty,
  onDifficulty,
  onPick,
}: {
  difficulty: Difficulty;
  onDifficulty: (d: Difficulty) => void;
  onPick: (t: ListeningTrack) => void;
}) {
  const { t, i18n } = useTranslation();
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {t("escucha.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight">
          {t("escucha.title")}
        </h1>
        <p className="mt-2 text-sm text-muted">{t("escucha.subtitle")}</p>
      </motion.header>

      <p className="mt-6 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("escucha.difficulty")}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.id}
            onClick={() => onDifficulty(d)}
            aria-pressed={difficulty.id === d.id}
            className={cn(
              "rounded-pill py-2.5 font-display text-sm font-extrabold transition-transform active:scale-95",
              difficulty.id === d.id
                ? "bg-primary text-primary-fg shadow-lg shadow-primary/25"
                : "border border-border bg-surface text-fg",
            )}
          >
            {t(`escucha.level_${d.id}`)}
          </button>
        ))}
      </div>

      <p className="mt-6 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("escucha.tracks")}
      </p>
      <div className="space-y-2.5">
        {TRACKS.map((track) => (
          <button key={track.id} onClick={() => onPick(track)} className="w-full text-left active:scale-[0.99]">
            <Card className="flex items-center gap-3.5 p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                <IconHeadphones className="size-5" stroke={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block line-clamp-1 font-display text-base font-extrabold">
                  {localTitle(track, i18n.language)}
                </span>
                <span className="block text-xs font-bold text-muted">
                  {track.level} · {t("escucha.lines", { n: track.lines.length })}
                </span>
              </span>
              <IconArrowRight className="size-5 shrink-0 text-muted" />
            </Card>
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-semibold text-muted">
        {t("escucha.note")}
      </p>
    </div>
  );
}

/* ---------------- sesión de escucha ---------------- */

function Session({
  track,
  difficulty,
  onExit,
}: {
  track: ListeningTrack;
  difficulty: Difficulty;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const completeListening = useProgress((s) => s.completeListening);

  const [index, setIndex] = useState(0);
  const [guesses, setGuesses] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [done, setDone] = useState(false);

  const line = track.lines[index];
  const tokens = useMemo(() => tokenize(line), [line]);
  const blanks = useMemo(() => blanksFor(line, difficulty), [line, difficulty]);

  function check() {
    const hits = blanks.filter((i) => sameWord(guesses[i] ?? "", tokens[i])).length;
    setScore((s) => ({ correct: s.correct + hits, total: s.total + blanks.length }));
    setChecked(true);
    speak(line); // se vuelve a oír la frase completa con la solución delante
  }

  function next() {
    if (index + 1 >= track.lines.length) {
      completeListening(score.correct, score.total);
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setGuesses({});
    setChecked(false);
  }

  if (done) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="mx-auto grid min-h-dvh w-full max-w-md place-items-center px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={spring}>
          <Image
            src={mascotCelebrate}
            alt=""
            height={140}
            width={Math.round((140 * mascotCelebrate.width) / mascotCelebrate.height)}
            className="mx-auto"
            priority
          />
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight">
            {t("escucha.done_title")}
          </h1>
          <p className="mt-2 text-muted">
            {t("escucha.done_score", { correct: score.correct, total: score.total, pct })}
          </p>
          <p className="mt-1 font-display text-lg font-extrabold text-primary">
            +{score.correct * 5} XP
          </p>
          <div className="mt-6 space-y-2">
            <Button fullWidth onClick={onExit}>
              {t("escucha.again")}
            </Button>
            <Button variant="secondary" fullWidth onClick={() => router.push("/app")}>
              {t("escucha.exit")}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-6 pt-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          aria-label={t("escucha.exit")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
        >
          <IconX className="size-5" />
        </button>
        <div className="h-3 flex-1 overflow-hidden rounded-pill bg-border/60">
          <motion.div
            className="h-full rounded-pill bg-primary"
            initial={false}
            animate={{ width: `${(index / track.lines.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <span className="w-12 shrink-0 text-right text-sm font-bold tabular-nums text-muted">
          {index + 1}/{track.lines.length}
        </span>
      </div>

      <p className="mt-3 pl-12 font-display text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-muted">
        {t(`escucha.level_${difficulty.id}`)}
      </p>

      <div className="mt-8 flex flex-1 flex-col justify-center">
        <button
          type="button"
          onClick={() => speak(line)}
          className="mx-auto grid size-20 place-items-center rounded-full bg-primary text-primary-fg shadow-xl shadow-primary/25 transition-transform active:scale-95"
          aria-label={t("escucha.play")}
        >
          <IconVolume className="size-9" />
        </button>
        <p className="mt-2 text-center text-xs font-bold text-muted">{t("escucha.play_hint")}</p>

        {/* la frase con huecos */}
        <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3 text-lg font-semibold leading-relaxed">
          {tokens.map((token, i) =>
            blanks.includes(i) ? (
              <span key={i} className="inline-flex items-center">
                <input
                  value={guesses[i] ?? ""}
                  onChange={(e) => setGuesses((g) => ({ ...g, [i]: e.target.value }))}
                  disabled={checked}
                  placeholder={blankHint(token, difficulty)}
                  aria-label={t("escucha.blank", { n: i + 1 })}
                  style={{ width: `${Math.max(coreOf(token).length, 3) + 1.5}ch` }}
                  className={cn(
                    "rounded-lg border-b-2 bg-transparent px-1 py-0.5 text-center font-semibold outline-none placeholder:text-muted/60",
                    !checked && "border-primary focus:bg-primary-soft/40",
                    checked && sameWord(guesses[i] ?? "", token) && "border-success text-success-ink",
                    checked &&
                      !sameWord(guesses[i] ?? "", token) &&
                      "border-danger text-danger-ink/70 line-through",
                  )}
                />
                {checked && !sameWord(guesses[i] ?? "", token) && (
                  <span className="ml-1.5 rounded-lg bg-accent-soft px-1.5 py-0.5 font-extrabold text-success-ink">
                    {coreOf(token)}
                  </span>
                )}
              </span>
            ) : (
              <span key={i}>{token}</span>
            ),
          )}
        </div>
      </div>

      <div className="sticky bottom-0 mt-4 bg-bg/90 pb-2 pt-3 backdrop-blur">
        <AnimatePresence>
          {checked && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring}
              className="mb-3 text-center text-sm font-bold text-muted"
            >
              {t("escucha.solution")}
            </motion.p>
          )}
        </AnimatePresence>
        {checked ? (
          <Button fullWidth onClick={next}>
            {index + 1 >= track.lines.length ? t("escucha.finish") : t("leccion.continue")}
            <IconArrowRight className="size-5" />
          </Button>
        ) : (
          <Button
            fullWidth
            disabled={blanks.every((i) => !(guesses[i] ?? "").trim())}
            onClick={check}
          >
            {t("leccion.check")}
          </Button>
        )}
      </div>
    </div>
  );
}
