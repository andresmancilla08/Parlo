"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  IconArrowRight,
  IconBriefcase,
  IconHeadphones,
  IconCoffee,
  IconHome2,
  IconMicrophone,
  IconPlane,
  IconPlayerStopFilled,
  IconSend2,
  IconStethoscope,
  IconUsers,
  type Icon,
} from "@tabler/icons-react";
import { SCENARIOS, scenarioById, type CoachCorrection, type CoachTurn } from "@/lib/coach";
import { useProgress } from "@/lib/progress";
import { firstPendingLesson, unitOfLesson } from "@/lib/curriculum";
import { speak } from "@/lib/tts";
import { useDictation } from "@/lib/dictation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { SpeakControls } from "@/components/ui/speak-controls";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SCENARIO_ICON: Record<string, Icon> = {
  cafe: IconCoffee,
  intro: IconUsers,
  travel: IconPlane,
  doctor: IconStethoscope,
  interview: IconBriefcase,
  flat: IconHome2,
};

type Turn = { role: "user" | "assistant"; content: string };

/** Arranques para la charla libre (en inglés: es lo que se va a escribir). */
const FREE_STARTERS = [
  "Hi! Can we talk about my weekend?",
  "I want to practise ordering food in English.",
  "Ask me questions about my job.",
];

export default function PracticaPage() {
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <Picker
        onStart={(id) => {
          setScenarioId(id);
          setStarted(true);
        }}
      />
    );
  }

  return (
    <Conversation
      scenarioId={scenarioId}
      onExit={() => {
        setStarted(false);
        setScenarioId(null);
      }}
      key={scenarioId ?? "free"}
    />
  );
}

/* ---------------- elegir escenario ---------------- */

function Picker({ onStart }: { onStart: (id: string | null) => void }) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {t("practica.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight">
          {t("practica.title")}
        </h1>
        <p className="mt-2 text-sm text-muted">{t("practica.subtitle")}</p>
      </motion.header>

      {/* El otro modo de práctica, visible desde el primer momento */}
      <div className="mt-6 grid gap-2.5">
        <Link href="/app/escucha" className="active:scale-[0.99]">
          <Card className="flex h-full items-center gap-3.5 p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
              <IconHeadphones className="size-5" stroke={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-base font-extrabold">
                {t("escucha.home_cta")}
              </span>
              <span className="block text-xs font-bold text-muted">{t("escucha.subtitle")}</span>
            </span>
            <IconArrowRight className="size-5 shrink-0 text-muted" />
          </Card>
        </Link>
      </div>

      <p className="mt-8 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("practica.scenarios")}
      </p>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {SCENARIOS.map((s) => {
          const Icon = SCENARIO_ICON[s.id] ?? IconUsers;
          return (
            <button key={s.id} onClick={() => onStart(s.id)} className="text-left active:scale-[0.99]">
              <Card className="flex h-full items-center gap-3.5 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
                  <Icon className="size-5" stroke={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-extrabold">
                    {t(`practica.scenario_${s.id}`)}
                  </span>
                  <span className="block text-xs font-bold text-muted">
                    {s.level} · {t(`practica.goal_${s.id}`)}
                  </span>
                </span>
              </Card>
            </button>
          );
        })}
      </div>

      <button onClick={() => onStart(null)} className="mt-2.5 w-full text-left active:scale-[0.99]">
        <Card className="flex items-center gap-3.5 border-accent bg-accent-soft p-4">
          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-extrabold text-accent-ink">
              {t("practica.free_title")}
            </span>
            <span className="block text-xs font-bold text-accent-ink/80">
              {t("practica.free_body")}
            </span>
          </span>
          <IconArrowRight className="size-5 shrink-0 text-accent-ink" />
        </Card>
      </button>

      <p className="mt-4 text-center text-xs font-semibold text-muted">
        {t("practica.privacy")}
      </p>
    </div>
  );
}

/* ---------------- conversación con puerta de corrección ---------------- */

function Conversation({
  scenarioId,
  onExit,
}: {
  scenarioId: string | null;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const scenario = scenarioById(scenarioId);
  const noteTutorMessage = useProgress((s) => s.noteTutorMessage);
  const completed = useProgress((s) => s.completed);
  const startLevel = useProgress((s) => s.startLevel);

  const [turns, setTurns] = useState<Turn[]>(
    scenario ? [{ role: "assistant", content: scenario.openerEn }] : [],
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  /** Correcciones pendientes de leer: bloquean el avance de la charla. */
  const [gate, setGate] = useState<{ corrections: CoachCorrection[]; reply: string } | null>(null);
  const [lastSent, setLastSent] = useState("");
  const listEnd = useRef<HTMLDivElement>(null);

  // Dictado: lo que ya estaba escrito se conserva y el habla se añade detrás.
  const dictationBase = useRef("");
  const mic = useDictation("en-US", (text, final) => {
    const merged = dictationBase.current ? `${dictationBase.current} ${text}` : text;
    setInput(merged);
    if (final) dictationBase.current = merged;
  });

  // La respuesta de la IA se lee sola la PRIMERA vez (después, con el botón).
  const spoken = useRef(0);
  useEffect(() => {
    const last = turns.at(-1);
    if (turns.length > spoken.current && last?.role === "assistant") speak(last.content);
    spoken.current = turns.length;
  }, [turns]);

  // Nivel aproximado para el prompt: el de la unidad que está haciendo.
  const pending = firstPendingLesson(new Set(completed), startLevel);
  const level = pending ? unitOfLesson(pending.id)?.level ?? "A2" : "B1";

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    // Se corta el micro: si no, el reconocimiento se oiría a sí mismo cuando
    // la respuesta se lea en voz alta.
    mic.stop();
    dictationBase.current = "";
    const next: Turn[] = [...turns, { role: "user", content: clean }];
    setTurns(next);
    setInput("");
    setLastSent(clean);
    setBusy(true);
    setError(false);
    noteTutorMessage();

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next, scenario: scenarioId, level }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as CoachTurn;

      if (data.corrections?.length) {
        // Puerta: primero se lee la corrección, luego continúa la conversación.
        setGate({ corrections: data.corrections, reply: data.reply });
      } else {
        setTurns([...next, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError(true);
      setTurns(turns); // se devuelve el mensaje al usuario para reintentar
      setInput(clean);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => listEnd.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  function acceptGate() {
    if (!gate) return;
    setTurns((prev) => [...prev, { role: "assistant", content: gate.reply }]);
    setGate(null);
  }

  function rewrite() {
    if (!gate) return;
    // Se quita el mensaje con errores y se devuelve al cuadro de texto.
    setTurns((prev) => prev.slice(0, -1));
    setInput(lastSent);
    setGate(null);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-2xl flex-col px-5 pb-4 pt-5 md:min-h-[calc(100dvh-5rem)]">
      <header className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
            {scenario ? t(`practica.scenario_${scenario.id}`) : t("practica.free_title")}
          </p>
          <p className="line-clamp-1 text-xs font-bold text-muted">
            {scenario ? t(`practica.goal_${scenario.id}`) : t("practica.free_body")}
          </p>
        </div>
        <BackButton onClick={onExit} className="shrink-0 px-3 py-1.5 text-xs" />
      </header>

      <div className="mt-4 flex-1 space-y-3">
        {/* Charla libre: sin escenario no hay primer turno, y una pantalla en
            blanco no invita a hablar. Tres arranques y a andar. */}
        {turns.length === 0 && (
          <div className="pt-2">
            <p className="mb-2 font-display text-xs font-extrabold uppercase tracking-[0.13em] text-muted">
              {t("practica.starters_title")}
            </p>
            <div className="grid gap-2">
              {FREE_STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-primary/40 active:scale-[0.99]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((turn, i) => (
          <div
            key={i}
            className={cn("flex", turn.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                turn.role === "user"
                  ? "bg-primary text-primary-fg"
                  : "border border-border bg-card",
              )}
            >
              <p className="text-sm font-semibold leading-relaxed">{turn.content}</p>
              {turn.role === "assistant" && (
                <SpeakControls text={turn.content} size="sm" className="mt-1.5" />
              )}
            </div>
          </div>
        ))}

        {busy && (
          <p className="text-sm font-bold text-muted">{t("practica.thinking")}</p>
        )}
        {error && (
          <p role="alert" className="text-sm font-bold text-danger-ink">
            {t("practica.error")}
          </p>
        )}
        <div ref={listEnd} />
      </div>

      {/* puerta de corrección */}
      <AnimatePresence>
        {gate && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={spring}
            className="sticky bottom-0 mt-3 rounded-[22px] border-2 border-primary bg-card p-4 shadow-xl shadow-primary/10"
          >
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
              {t("practica.fix_kicker")}
            </p>
            <div className="mt-3 space-y-3">
              {gate.corrections.map((c, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-danger-ink line-through decoration-danger/60">
                    {c.original}
                  </p>
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
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={rewrite}>
                {t("practica.rewrite")}
              </Button>
              <Button className="flex-1" onClick={acceptGate}>
                {t("practica.got_it")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* entrada */}
      {!gate && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="sticky bottom-0 mt-3 bg-bg/90 py-2 backdrop-blur"
        >
          {mic.listening && (
            <p className="mb-1.5 flex items-center gap-2 text-xs font-bold text-primary-ink">
              <motion.span
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="size-2 rounded-full bg-danger"
              />
              {t("practica.listening")}
            </p>
          )}
          {mic.error && (
            <p role="alert" className="mb-1.5 text-xs font-bold text-danger-ink">
              {t(mic.error === "denied" ? "practica.mic_denied" : "practica.mic_failed")}
            </p>
          )}
          <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              dictationBase.current = e.target.value;
            }}
            placeholder={t("practica.placeholder")}
            disabled={busy}
            className="min-w-0 flex-1 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-primary"
          />
          {mic.supported && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!mic.listening) dictationBase.current = input.trim();
                mic.toggle();
              }}
              disabled={busy}
              aria-label={t(mic.listening ? "a11y.mic_stop" : "a11y.mic_start")}
              aria-pressed={mic.listening}
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-2xl transition-colors",
                mic.listening
                  ? "bg-danger text-white"
                  : "border border-border bg-surface text-primary-ink hover:border-primary",
              )}
            >
              {mic.listening ? (
                <IconPlayerStopFilled className="size-4" />
              ) : (
                <IconMicrophone className="size-5" />
              )}
            </motion.button>
          )}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim() || busy}
            aria-label={t("a11y.send")}
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-2xl transition-colors",
              !input.trim() || busy
                ? "border border-border bg-surface text-muted"
                : "bg-primary text-primary-fg",
            )}
          >
            <IconSend2 className="size-5" />
          </motion.button>
          </div>
        </form>
      )}
    </div>
  );
}
