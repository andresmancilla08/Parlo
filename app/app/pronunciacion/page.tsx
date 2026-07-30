"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconArrowRight,
  IconMicrophone,
  IconMicrophoneOff,
  IconPlayerStopFilled,
  IconRefresh,
} from "@tabler/icons-react";
import { allLessons, localTitle } from "@/lib/curriculum";
import { getTeach } from "@/lib/curriculum/teach";
import { useProgress } from "@/lib/progress";
import { useDictation } from "@/lib/dictation";
import { scoreAttempt, type Attempt } from "@/lib/pronunciation";
import { playCorrect, playWrong } from "@/lib/sfx";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import mascot from "@/public/brand/mascot.png";

// M8 · Pronunciación. No analiza el audio (eso costaría dinero): usa el
// reconocedor del navegador y compara lo que ENTENDIÓ con la frase. Si la
// máquina te entiende, un humano también.

type Phrase = { en: string; es: string; lesson: string };

export default function PronunciacionPage() {
  const { t, i18n } = useTranslation();
  const completed = useProgress((s) => s.completed);
  const completeSpeaking = useProgress((s) => s.completeSpeaking);

  // Frases: los ejemplos de la teoría YA vista. Se practica lo aprendido, no
  // frases sueltas sin contexto.
  const phrases = useMemo<Phrase[]>(() => {
    const done = new Set(completed);
    const source = allLessons.filter((l) => done.has(l.id));
    const pool = (source.length > 0 ? source : allLessons.slice(0, 2)).flatMap((lesson) =>
      getTeach(lesson)
        .filter((s) => s.kind === "examples")
        .flatMap((s) => s.items)
        .map((ex) => ({ en: ex.en, es: ex.es, lesson: localTitle(lesson, i18n.language) })),
    );
    // Sin duplicados: el mismo ejemplo puede repetirse entre lecciones.
    const seen = new Set<string>();
    return pool.filter((p) => (seen.has(p.en) ? false : (seen.add(p.en), true)));
  }, [completed, i18n.language]);

  const [index, setIndex] = useState(0);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [heard, setHeard] = useState("");

  const phrase = phrases[index];

  const mic = useDictation("en-US", (text, final) => {
    setHeard(text);
    if (!final || !phrase) return;
    const result = scoreAttempt(phrase.en, text);
    setAttempt(result);
    completeSpeaking(result.correct, result.total);
    if (result.rating === "retry") playWrong();
    else playCorrect();
  });

  function reset() {
    setAttempt(null);
    setHeard("");
  }

  function next() {
    reset();
    setIndex((i) => (i + 1) % Math.max(phrases.length, 1));
  }

  if (!phrase) {
    return (
      <Empty
        title={t("pronunciacion.empty_title")}
        body={t("pronunciacion.empty_body")}
        cta={t("pronunciacion.empty_cta")}
        href="/app"
      />
    );
  }

  if (!mic.supported) {
    return (
      <Empty
        title={t("pronunciacion.unsupported_title")}
        body={t("pronunciacion.unsupported_body")}
        cta={t("escucha.home_cta")}
        href="/app/escucha"
      />
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-xl flex-col px-5 pb-6 pt-5 md:min-h-[calc(100dvh-5rem)]">
      <header className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
            {t("pronunciacion.kicker")}
          </p>
          <p className="line-clamp-1 text-xs font-bold text-muted">{phrase.lesson}</p>
        </div>
        <BackButton href="/app/practica" className="shrink-0 px-3 py-1.5 text-xs" />
      </header>

      {/* la frase */}
      <div className="mt-6">
        <Card className="p-5">
          <p className="font-display text-2xl font-extrabold leading-snug tracking-tight">
            {attempt ? (
              <span>
                {attempt.words.map((w, i) => (
                  <span
                    key={`${w.word}-${i}`}
                    className={cn(
                      "mr-1.5 inline-block rounded-lg px-1",
                      w.ok ? "bg-success/15 text-success-ink" : "bg-danger/15 text-danger-ink",
                    )}
                  >
                    {w.word}
                  </span>
                ))}
              </span>
            ) : (
              phrase.en
            )}
          </p>
          <p className="mt-2 text-sm font-semibold text-muted">{phrase.es}</p>
          <div className="mt-4 flex items-center gap-3">
            <SpeakControls text={phrase.en} variant="outline" />
            <span className="text-xs font-bold text-muted">{t("pronunciacion.listen_first")}</span>
          </div>
        </Card>
      </div>

      {/* resultado */}
      <AnimatePresence mode="wait">
        {attempt && (
          <motion.div
            key={`${index}-${attempt.correct}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring}
            className={cn(
              "mt-4 rounded-2xl p-4",
              attempt.rating === "great"
                ? "bg-success/12"
                : attempt.rating === "good"
                  ? "bg-accent-soft"
                  : "bg-danger/12",
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p
                className={cn(
                  "font-display text-lg font-extrabold",
                  attempt.rating === "great"
                    ? "text-success-ink"
                    : attempt.rating === "good"
                      ? "text-accent-ink"
                      : "text-danger-ink",
                )}
              >
                {t(`pronunciacion.rating_${attempt.rating}`)}
              </p>
              <p className="font-display text-2xl font-extrabold tabular-nums">
                {Math.round(attempt.score * 100)}%
              </p>
            </div>
            <p className="mt-1 text-sm font-semibold text-fg/80">
              {t("pronunciacion.score_detail", {
                correct: attempt.correct,
                total: attempt.total,
              })}
            </p>
            {heard && (
              <p className="mt-2 text-xs font-bold text-muted">
                {t("pronunciacion.heard", { text: heard })}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1" />

      {/* micrófono */}
      <div className="sticky bottom-0 bg-bg/90 pb-2 pt-3 backdrop-blur">
        {mic.error && (
          <p role="alert" className="mb-2 text-center text-xs font-bold text-danger-ink">
            {t(mic.error === "denied" ? "practica.mic_denied" : "practica.mic_failed")}
          </p>
        )}
        <div className="flex items-center justify-center gap-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              reset();
              mic.toggle();
            }}
            aria-label={t(mic.listening ? "a11y.mic_stop" : "pronunciacion.record")}
            className={cn(
              "grid size-20 place-items-center rounded-full shadow-xl transition-colors",
              mic.listening
                ? "bg-danger text-white shadow-danger/30"
                : "bg-primary text-primary-fg shadow-primary/25",
            )}
          >
            {mic.listening ? (
              <IconPlayerStopFilled className="size-8" />
            ) : (
              <IconMicrophone className="size-9" />
            )}
          </motion.button>
          {attempt && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                reset();
                mic.toggle();
              }}
              aria-label={t("pronunciacion.again")}
              className="grid size-14 place-items-center rounded-full border-2 border-border bg-card text-muted"
            >
              <IconRefresh className="size-6" />
            </motion.button>
          )}
        </div>
        <p className="mt-2 text-center text-xs font-bold text-muted">
          {mic.listening ? t("pronunciacion.listening") : t("pronunciacion.hint")}
        </p>

        <Button fullWidth className="mt-3" variant="secondary" onClick={next}>
          {t("pronunciacion.next")}
          <IconArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

function Empty({
  title,
  body,
  cta,
  href,
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="mx-auto grid min-h-[70vh] w-full max-w-md place-items-center px-6 text-center">
      <div>
        <Image
          src={mascot}
          alt=""
          height={132}
          width={Math.round((132 * mascot.width) / mascot.height)}
          className="mx-auto"
          priority
        />
        <span className="mt-4 inline-grid size-10 place-items-center rounded-xl bg-primary-soft text-primary-ink">
          <IconMicrophoneOff className="size-5" />
        </span>
        <h1 className="mt-3 font-display text-2xl font-extrabold">{title}</h1>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{body}</p>
        <div className="mt-6">
          <Link href={href}>
            <Button fullWidth>
              {cta}
              <IconArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
