"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconArrowRight, IconHeadphones, IconPhone } from "@tabler/icons-react";
import { SCENARIOS, type CoachTurn } from "@/lib/coach";
import { apiFetch, NotSignedInError } from "@/lib/api-client";
import { useProgress } from "@/lib/progress";
import { firstPendingLesson, TOP_LEVEL, unitOfLesson } from "@/lib/curriculum";
import { LiveCall, liveSupported, type CallSnapshot } from "@/lib/live/session";
import type { LiveLevel } from "@/lib/live/protocol";
import { reviewText, visibleLines, type Transcript } from "@/lib/live/transcript";
import { useHydrated } from "@/lib/use-hydrated";
import { ScenarioIcon } from "@/components/app/scenario-icons";
import { CallView } from "@/components/app/llamada/call-view";
import { SummaryView, type Review } from "@/components/app/llamada/summary-view";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { rise, spring, stagger } from "@/lib/motion";

// Modo llamada: conversación hablada en tiempo real con Gemini Live.
// Elegir con quién → llamar (CallView) → al colgar, revisión (SummaryView).

type Phase = { name: "pick" } | { name: "call"; scenario: string | null } | { name: "summary"; scenario: string | null; snap: CallSnapshot };

export default function LlamadaPage() {
  const [phase, setPhase] = useState<Phase>({ name: "pick" });
  const completed = useProgress((s) => s.completed);
  const startLevel = useProgress((s) => s.startLevel);
  // Mismo nivel que usa el tutor escrito: el de la unidad que está haciendo.
  const pending = firstPendingLesson(new Set(completed), startLevel);
  const level = (pending ? (unitOfLesson(pending.id)?.level ?? "A2") : TOP_LEVEL) as LiveLevel;

  if (phase.name === "pick") {
    return <Picker onPick={(scenario) => setPhase({ name: "call", scenario })} />;
  }
  if (phase.name === "call") {
    return (
      <CallScreen
        key={phase.scenario ?? "free"}
        scenario={phase.scenario}
        level={level}
        onBack={() => setPhase({ name: "pick" })}
        onEnded={(snap) => setPhase({ name: "summary", scenario: phase.scenario, snap })}
      />
    );
  }
  return (
    <Summary
      scenario={phase.scenario}
      level={level}
      snap={phase.snap}
      onAgain={() => setPhase({ name: "call", scenario: phase.scenario })}
      onPick={() => setPhase({ name: "pick" })}
    />
  );
}

/* ---------------- elegir con quién hablar ---------------- */

function Picker({ onPick }: { onPick: (scenario: string | null) => void }) {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const supported = hydrated ? liveSupported() : true;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">{t("llamada.kicker")}</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight">{t("llamada.title")}</h1>
          <p className="mt-2 text-sm text-muted">{t("llamada.subtitle")}</p>
        </div>
        <BackButton href="/app/practica" className="min-h-11 shrink-0 px-3 py-1.5 text-xs" />
      </motion.header>

      {!supported && (
        <p role="alert" className="mt-5 rounded-2xl border border-danger/30 bg-card px-4 py-3 text-sm font-bold text-danger-ink">
          {t("llamada.err_unsupported")}
        </p>
      )}

      <p className="mt-5 flex items-center gap-2 rounded-2xl bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-ink">
        <IconHeadphones className="size-5 shrink-0" />
        {t("llamada.tip_headphones")}
      </p>

      <p className="mt-7 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">{t("llamada.who")}</p>
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-2.5 sm:grid-cols-2">
        {SCENARIOS.map((s) => {
          return (
            <motion.button
              key={s.id}
              variants={rise}
              disabled={!supported}
              onClick={() => onPick(s.id)}
              className="rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg text-left active:scale-[0.99] disabled:opacity-60"
            >
              <Card className="flex h-full items-center gap-3.5 p-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
                  <ScenarioIcon scenario={s.id} className="size-5" stroke={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-extrabold">{t(`practica.scenario_${s.id}`)}</span>
                  <span className="block text-xs font-bold text-muted">
                    {s.level} · {t(`practica.goal_${s.id}`)}
                  </span>
                </span>
                <IconPhone className="size-5 shrink-0 text-muted" />
              </Card>
            </motion.button>
          );
        })}
      </motion.div>

      <button disabled={!supported} onClick={() => onPick(null)} className="mt-2.5 w-full rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg text-left active:scale-[0.99] disabled:opacity-60">
        <Card className="flex items-center gap-3.5 border-accent bg-accent-soft p-4">
          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-extrabold text-accent-ink">{t("practica.free_title")}</span>
            <span className="block text-xs font-bold text-accent-ink/80">{t("llamada.free_body")}</span>
          </span>
          <IconArrowRight className="size-5 shrink-0 text-accent-ink" />
        </Card>
      </button>

      <p className="mt-4 text-center text-xs font-semibold text-muted">{t("llamada.privacy")}</p>
    </div>
  );
}

/* ---------------- la llamada ---------------- */

function CallScreen({
  scenario,
  level,
  onBack,
  onEnded,
}: {
  scenario: string | null;
  level: LiveLevel;
  onBack: () => void;
  onEnded: (snap: CallSnapshot) => void;
}) {
  const reduce = useReducedMotion();
  const [snap, setSnap] = useState<CallSnapshot | null>(null);
  const call = useRef<LiveCall | null>(null);
  const ring = useRef<HTMLDivElement>(null);
  const listEnd = useRef<HTMLDivElement>(null);

  // Al salir de la pantalla (atrás, otra pestaña de la app) se cuelga y se
  // suelta el micro: si no, el indicador de grabación seguiría encendido.
  useEffect(() => () => call.current?.hangup(), []);

  // Al terminar con algo hablado se pasa al resumen; si no, se queda aquí
  // (con el error, si lo hubo) para volver a intentarlo.
  useEffect(() => {
    if (snap?.status === "ended" && visibleLines(snap.transcript).length > 0) onEnded(snap);
  }, [snap, onEnded]);

  useEffect(() => {
    listEnd.current?.scrollIntoView({ block: "end", behavior: reduce ? "auto" : "smooth" });
  }, [snap?.transcript, reduce]);

  function dial() {
    call.current?.hangup();
    const c = new LiveCall({
      scenario,
      level,
      onChange: setSnap,
      // Cada frame: directo al DOM, sin pasar por React.
      onLevel: (v) => {
        const el = ring.current;
        if (!el) return;
        if (reduce) el.style.opacity = String(0.25 + v * 0.75);
        else el.style.transform = `scale(${1 + v * 0.32})`;
      },
    });
    call.current = c;
    // Síncrono dentro del toque: crea y reanuda el AudioContext (iOS).
    void c.start();
  }

  return (
    <CallView
      scenario={scenario}
      snap={snap}
      ringRef={ring}
      listEndRef={listEnd}
      onBack={onBack}
      onDial={dial}
      onHangup={() => call.current?.hangup()}
      onToggleMute={() => call.current?.setMuted(!call.current.snapshot.muted)}
    />
  );
}

/* ---------------- al colgar: revisión ---------------- */

function useReview(transcript: Transcript, scenario: string | null, level: LiveLevel) {
  const text = reviewText(transcript);
  const [review, setReview] = useState<Review>(text ? { state: "loading" } : { state: "empty" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!text) return;
    let cancelled = false;
    // Lo que dijo el usuario en toda la llamada, como un solo mensaje: el
    // coach corrige el último mensaje del usuario (ver `reviewText`).
    apiFetch("/api/coach", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: text }], scenario, level }),
    })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 401) return setReview({ state: "error", kind: "session" });
        if (res.status === 429 || res.status === 503) return setReview({ state: "error", kind: "busy" });
        if (!res.ok) return setReview({ state: "error", kind: "generic" });
        const data = (await res.json()) as CoachTurn;
        if (!cancelled) setReview({ state: "done", corrections: data.corrections ?? [] });
      })
      .catch((err) => {
        if (!cancelled) setReview({ state: "error", kind: err instanceof NotSignedInError ? "session" : "network" });
      });
    return () => {
      cancelled = true;
    };
  }, [text, scenario, level, attempt]);

  const retry = useCallback(() => {
    setReview({ state: "loading" });
    setAttempt((n) => n + 1);
  }, []);
  return { review, retry };
}

function Summary({
  scenario,
  level,
  snap,
  onAgain,
  onPick,
}: {
  scenario: string | null;
  level: LiveLevel;
  snap: CallSnapshot;
  onAgain: () => void;
  onPick: () => void;
}) {
  const noteTutorMessage = useProgress((s) => s.noteTutorMessage);
  const { review, retry } = useReview(snap.transcript, scenario, level);
  const spoke = visibleLines(snap.transcript).some((l) => l.role === "user");

  // Una llamada en la que habló cuenta como práctica con el tutor (logros).
  const noted = useRef(false);
  useEffect(() => {
    if (spoke && !noted.current) {
      noted.current = true;
      noteTutorMessage();
    }
  }, [spoke, noteTutorMessage]);

  return <SummaryView snap={snap} review={review} onRetryReview={retry} onAgain={onAgain} onPick={onPick} />;
}
