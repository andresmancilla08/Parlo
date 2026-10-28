"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconBrandSafari,
  IconCircleCheckFilled,
  IconFlag,
  IconHeadset,
  IconMicrophone,
  IconPlayerStopFilled,
  IconSend2,
  IconVolume,
} from "@tabler/icons-react";
import { scenarioById, type CoachCorrection, type CoachSummary } from "@/lib/coach";
import { coachWindow, type WindowTurn } from "@/lib/coach-window";
import { extractReply, parseCoachFinal } from "@/lib/coach-stream";
import { takeSentences } from "@/lib/sentences";
import { apiFetch } from "@/lib/api-client";
import { useProgress } from "@/lib/progress";
import { useCoachPrefs } from "@/lib/coach-prefs";
import { useHydrated } from "@/lib/use-hydrated";
import { firstPendingLesson, TOP_LEVEL, unitOfLesson } from "@/lib/curriculum";
import { enqueueSpeech, speak, stopSpeaking, unlockAudio, useQueueSpeaking } from "@/lib/tts";
import { dictationErrorKey, useDictation } from "@/lib/dictation";
import { useHandsFree, useHandsFreeSupported } from "@/lib/hands-free";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { SpeakControls } from "@/components/ui/speak-controls";
import { CorrectionCard, UserMessage } from "@/components/practica/corrections";
import { Missions } from "@/components/practica/missions";
import { HandsFreePanel, type HandsFreeStatus } from "@/components/practica/hands-free-panel";
import { SummaryView, type SummaryState } from "@/components/practica/summary";
import { SendErrorNotice, sendErrorFrom, toSendError, type SendError } from "@/components/practica/send-error";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Turn = {
  role: "user" | "assistant";
  content: string;
  /** Sólo en turnos del usuario: lo que el tutor corrigió de ese mensaje. */
  corrections?: CoachCorrection[];
  /** Turno del tutor que aún está llegando. */
  streaming?: boolean;
};

/** Arranques para la charla libre (en inglés: es lo que se va a escribir). */
const FREE_STARTERS = [
  "Hi! Can we talk about my weekend?",
  "I want to practise ordering food in English.",
  "Ask me questions about my job.",
];

/** Lo que viaja al tutor: sólo papel y texto (las correcciones no cuentan). */
function plain(turns: Turn[]): WindowTurn[] {
  return turns.filter((t) => t.content).map((t) => ({ role: t.role, content: t.content }));
}

/**
 * Latencia real de cada turno, para medir en desarrollo y desde el harness de
 * capturas (`window.__parloVoz`). Desde que se envía: primer texto de la
 * respuesta, primera frase lista para leer y primer audio sonando.
 */
type VoiceMetric = { firstText?: number; firstSentence?: number; firstAudio?: number; done?: number };
function metric(m: VoiceMetric) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __parloVoz?: VoiceMetric[] };
  (w.__parloVoz ??= []).push(m);
}

function sanitizeSummary(raw: unknown): CoachSummary {
  const o = (raw ?? {}) as Partial<CoachSummary>;
  return {
    mistakes: Array.isArray(o.mistakes)
      ? o.mistakes.filter((m) => typeof m?.pattern === "string" && typeof m?.fix === "string").slice(0, 3)
      : [],
    phrases: Array.isArray(o.phrases)
      ? o.phrases.filter((p) => typeof p?.en === "string" && typeof p?.es === "string" && p.en.trim()).slice(0, 8)
      : [],
    note: typeof o.note === "string" ? o.note : "",
  };
}

export function Conversation({ scenarioId, onExit }: { scenarioId: string | null; onExit: () => void }) {
  const { t } = useTranslation();
  const scenario = scenarioById(scenarioId);
  const noteTutorMessage = useProgress((s) => s.noteTutorMessage);
  const completed = useProgress((s) => s.completed);
  const startLevel = useProgress((s) => s.startLevel);
  const hydrated = useHydrated();
  const strictPref = useCoachPrefs((s) => s.strict);

  const [turns, setTurns] = useState<Turn[]>(
    scenario ? [{ role: "assistant", content: scenario.openerEn }] : [],
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<SendError | null>(null);
  /** Modo estricto: correcciones pendientes de leer que bloquean la charla. */
  const [gate, setGate] = useState<{ corrections: CoachCorrection[]; reply: string } | null>(null);
  const [lastSent, setLastSent] = useState("");
  const [goalsDone, setGoalsDone] = useState<ReadonlySet<string>>(() => new Set());
  const [summary, setSummary] = useState<SummaryState | null>(null);
  /** Turno cuya lectura automática bloqueó el navegador («Toca para oír»). */
  const [muted, setMuted] = useState<number | null>(null);
  const [handsFree, setHandsFree] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sayingIt, setSayingIt] = useState(false);
  const listEnd = useRef<HTMLDivElement>(null);
  const gateCard = useRef<HTMLDivElement>(null);
  const inflight = useRef<AbortController | null>(null);

  const speaking = useQueueSpeaking();
  const hfSupported = useHandsFreeSupported();
  // En manos libres nadie toca la pantalla para pasar la puerta: siempre suave.
  const strict = hydrated && strictPref && !handsFree;

  // La corrección estricta bloquea la charla: el foco va a ella para que el
  // teclado y el lector de pantalla la encuentren sin buscarla.
  useEffect(() => {
    if (gate) gateCard.current?.focus();
  }, [gate]);

  // Dictado: lo que ya estaba escrito se conserva y el habla se añade detrás.
  const dictationBase = useRef("");
  const mic = useDictation("en-US", (text, final) => {
    const merged = dictationBase.current ? `${dictationBase.current} ${text}` : text;
    setInput(merged);
    if (final) dictationBase.current = merged;
  });

  // La frase con la que abre el personaje se lee sola al entrar. Al salir se
  // calla el tutor y se corta la petición en vuelo.
  useEffect(() => {
    if (scenario) enqueueSpeech(scenario.openerEn, { onBlocked: () => setMuted(0) });
    return () => {
      inflight.current?.abort();
      stopSpeaking();
    };
    // Sólo al montar: el escenario no cambia (la conversación lleva `key`).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nivel aproximado para el prompt: el de la unidad que está haciendo.
  const pending = firstPendingLesson(new Set(completed), startLevel);
  const level = pending ? (unitOfLesson(pending.id)?.level ?? "A2") : TOP_LEVEL;

  function scrollToEnd() {
    requestAnimationFrame(() => listEnd.current?.scrollIntoView({ behavior: "smooth", block: "end" }));
  }

  /** Lee una respuesta completa (modo estricto o «Toca para oír»). */
  function speakWhole(text: string, index: number) {
    for (const chunk of takeSentences(text, true).chunks) {
      enqueueSpeech(chunk, { onBlocked: () => setMuted(index) });
    }
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;
    // Se corta el micro: si no, el reconocimiento se oiría a sí mismo cuando
    // la respuesta se lea en voz alta. `abort` y no `stop`: con `stop` aún
    // llegaba el resultado final y reescribía en el cuadro la frase enviada.
    mic.abort();
    // Este toque «estrena» el audio: la respuesta llega tras un await y en
    // iOS ya no contaría como gesto del usuario.
    unlockAudio();
    stopSpeaking();
    setMuted(null);
    dictationBase.current = "";

    const before = turns;
    const next: Turn[] = [...turns, { role: "user", content: clean }];
    const soft = !strict;
    const userIndex = next.length - 1;
    const replyIndex = next.length;
    setTurns(soft ? [...next, { role: "assistant", content: "", streaming: true }] : next);
    setInput("");
    setLastSent(clean);
    setBusy(true);
    setError(null);
    noteTutorMessage();
    scrollToEnd();

    const ctrl = new AbortController();
    inflight.current = ctrl;
    const t0 = performance.now();
    const m: VoiceMetric = {};
    const since = () => Math.round(performance.now() - t0);

    // Lectura por frases mientras llega: `spoken` es hasta dónde de `reply`
    // ya se ha mandado a la cola.
    let spoken = 0;
    let streamed = "";
    const speakUpTo = (reply: string, final: boolean) => {
      if (!soft) return;
      const { chunks, rest } = takeSentences(reply.slice(spoken), final);
      spoken = reply.length - rest.length;
      for (const chunk of chunks) {
        m.firstSentence ??= since();
        enqueueSpeech(chunk, {
          onStart: () => {
            m.firstAudio ??= since();
          },
          onBlocked: () => setMuted(replyIndex),
        });
      }
    };

    try {
      const res = await apiFetch("/api/coach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // Sólo una ventana (escenario + últimos turnos): el servidor rechaza
        // historiales largos y, sin recortar, la charla moría para siempre.
        body: JSON.stringify({ messages: coachWindow(plain(next)), scenario: scenarioId, level }),
        signal: ctrl.signal,
      });
      if (!res.ok) throw await sendErrorFrom(res);

      let raw = "";
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          raw += decoder.decode(value, { stream: true });
          const partial = extractReply(raw);
          if (!partial || partial.reply === streamed) continue;
          streamed = partial.reply;
          m.firstText ??= since();
          if (soft) {
            const shown = streamed;
            setTurns((prev) => prev.map((turn, i) => (i === replyIndex ? { ...turn, content: shown } : turn)));
          }
          speakUpTo(streamed, partial.done);
        }
        raw += decoder.decode();
      } else {
        raw = await res.text();
      }

      const final = parseCoachFinal(raw);
      if (!final) throw { kind: "generic" } satisfies SendError;
      m.done = since();

      // Lo que no se llegó a leer (la última frase, o todo si no hubo stream).
      if (soft) speakUpTo(streamed && final.reply.startsWith(streamed.trim()) ? streamed : final.reply, true);

      const valid = new Set(scenario?.goals.map((g) => g.id) ?? []);
      const met = final.goalsMet.filter((g) => valid.has(g));
      if (met.length) setGoalsDone((prev) => new Set([...prev, ...met]));

      if (soft) {
        setTurns((prev) =>
          prev.map((turn, i) =>
            i === replyIndex
              ? { role: "assistant", content: final.reply }
              : i === userIndex && final.corrections.length
                ? { ...turn, corrections: final.corrections }
                : turn,
          ),
        );
      } else if (final.corrections.length) {
        // Puerta: primero se lee la corrección, luego continúa la conversación.
        setGate({ corrections: final.corrections, reply: final.reply });
      } else {
        setTurns([...next, { role: "assistant", content: final.reply }]);
        speakWhole(final.reply, replyIndex);
      }
      metric(m);
      if (process.env.NODE_ENV !== "production") console.info("[voz] latencia (ms)", m);
    } catch (err) {
      if (ctrl.signal.aborted) return;
      stopSpeaking();
      setError(toSendError(err));
      // Se quita el turno enviado: «Reintentar» lo vuelve a mandar una sola vez.
      setTurns(before);
      setInput(clean);
    } finally {
      if (inflight.current === ctrl) {
        inflight.current = null;
        setBusy(false);
      }
      scrollToEnd();
    }
  }

  function acceptGate() {
    if (!gate) return;
    unlockAudio();
    const index = turns.length;
    setTurns((prev) => [...prev, { role: "assistant", content: gate.reply }]);
    speakWhole(gate.reply, index);
    setGate(null);
  }

  function rewrite() {
    if (!gate) return;
    // Se quita el mensaje con errores y se devuelve al cuadro de texto.
    setTurns((prev) => prev.slice(0, -1));
    setInput(lastSent);
    setGate(null);
  }

  /* ---------- manos libres ---------- */

  // Medio dúplex: sólo se escucha cuando nadie más habla ni se espera nada.
  const canListen =
    handsFree && !paused && !busy && !speaking && !gate && !sayingIt && !error && summary === null;
  const hf = useHandsFree({ active: canListen, onUtterance: (text) => void send(text) });
  const hfStatus: HandsFreeStatus = paused
    ? "paused"
    : busy
      ? "thinking"
      : speaking
        ? "speaking"
        : hf.listening
          ? "listening"
          : "waiting";

  function startHandsFree() {
    // El toque estrena el audio: las respuestas sonarán sin más gestos.
    unlockAudio();
    mic.abort();
    hf.clearError();
    setPaused(false);
    setHandsFree(true);
  }

  const onSayItListening = useCallback((on: boolean) => setSayingIt(on), []);

  /* ---------- resumen al terminar ---------- */

  const userTurns = turns.filter((turn) => turn.role === "user").length;

  function requestSummary() {
    setSummary({ status: "loading" });
    const corrections = turns.flatMap((turn) =>
      (turn.corrections ?? []).map((c) => ({ original: c.original, corrected: c.corrected })),
    );
    apiFetch("/api/coach", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mode: "summary",
        messages: coachWindow(plain(turns)),
        scenario: scenarioId,
        level,
        corrections,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw await sendErrorFrom(res);
        return res.json();
      })
      .then((data) => setSummary({ status: "ready", data: sanitizeSummary(data) }))
      .catch((err) => setSummary({ status: "error", error: toSendError(err) }));
  }

  function finish() {
    inflight.current?.abort();
    stopSpeaking();
    mic.abort();
    setHandsFree(false);
    if (userTurns === 0) return onExit();
    requestSummary();
  }

  if (summary) {
    return (
      <SummaryView
        state={summary}
        scenario={scenario}
        goalsDone={goalsDone}
        onRetry={requestSummary}
        onExit={onExit}
      />
    );
  }

  const allGoals = !!scenario && scenario.goals.every((g) => goalsDone.has(g.id));

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-2xl flex-col px-4 pb-4 pt-5 sm:px-5 md:min-h-[calc(100dvh-5rem)]">
      <header className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
            {scenario ? t(`practica.scenario_${scenario.id}`) : t("practica.free_title")}
          </p>
          <p className="line-clamp-1 text-xs font-bold text-muted">
            {scenario ? t(`practica.goal_${scenario.id}`) : t("practica.free_body")}
          </p>
        </div>
        {userTurns > 0 && (
          <button
            type="button"
            onClick={finish}
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-pill bg-primary px-4 text-xs font-extrabold text-primary-fg active:scale-[0.98]"
          >
            <IconFlag className="size-4" aria-hidden />
            {t("practica.finish")}
          </button>
        )}
        <BackButton onClick={onExit} className="shrink-0 px-3 py-1.5 text-xs" />
      </header>

      {scenario && <Missions scenario={scenario} done={goalsDone} className="mt-3" />}
      {allGoals && (
        <p
          role="status"
          className="mt-2 flex items-center gap-1.5 rounded-2xl bg-success/15 px-3 py-2 text-xs font-bold text-success-ink"
        >
          <IconCircleCheckFilled className="size-4 shrink-0" aria-hidden />
          {t("practica.missions_all")}
        </p>
      )}

      {/* Los turnos nuevos se anuncian al lector de pantalla. */}
      <div className="mt-4 flex-1 space-y-3" aria-live="polite" aria-relevant="additions">
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
                  className="min-h-11 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-primary/40 active:scale-[0.99]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((turn, i) => (
          <div key={i} className="space-y-2">
            <div className={cn("flex", turn.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  turn.role === "user" ? "bg-primary text-primary-fg" : "border border-border bg-card",
                )}
              >
                {turn.role === "user" ? (
                  <UserMessage content={turn.content} corrections={turn.corrections} />
                ) : turn.content ? (
                  <p className="text-sm font-semibold leading-relaxed">{turn.content}</p>
                ) : (
                  <p role="status" className="flex items-center gap-1 py-1" aria-label={t("practica.thinking")}>
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        aria-hidden
                        className="size-1.5 animate-pulse rounded-full bg-muted motion-reduce:animate-none"
                        style={{ animationDelay: `${d * 120}ms` }}
                      />
                    ))}
                  </p>
                )}
                {turn.role === "assistant" && turn.content && !turn.streaming && (
                  <>
                    {muted === i && (
                      <button
                        type="button"
                        onClick={() => {
                          setMuted(null);
                          speak(turn.content);
                        }}
                        className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-primary px-4 text-xs font-extrabold text-primary-fg active:scale-[0.98]"
                      >
                        <IconVolume className="size-4" aria-hidden />
                        {t("practica.tap_to_hear")}
                      </button>
                    )}
                    <SpeakControls text={turn.content} size="sm" className="mt-1.5" />
                  </>
                )}
              </div>
            </div>
            {turn.role === "user" && turn.corrections && turn.corrections.length > 0 && (
              <CorrectionCard
                message={turn.content}
                corrections={turn.corrections}
                onSayItListening={onSayItListening}
              />
            )}
          </div>
        ))}

        {busy && strict && (
          <p role="status" className="text-sm font-bold text-muted">
            {t("practica.thinking")}
          </p>
        )}
        {error && !busy && (
          <SendErrorNotice error={error} onRetry={() => send(lastSent)} key={`${error.kind}-${error.until ?? 0}`} />
        )}
        <div ref={listEnd} />
      </div>

      {/* puerta de corrección (modo estricto) */}
      <AnimatePresence>
        {gate && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={spring}
            ref={gateCard}
            tabIndex={-1}
            role="region"
            aria-labelledby="fix-kicker"
            className="sticky bottom-0 mt-3 rounded-[22px] border-2 border-primary bg-card p-4 shadow-xl shadow-primary/10 outline-none"
          >
            <p
              id="fix-kicker"
              className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink"
            >
              {t("practica.fix_kicker")}
            </p>
            <div className="mt-3 space-y-3">
              {gate.corrections.map((c, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-danger-ink line-through decoration-danger/60">{c.original}</p>
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
        <div className="sticky bottom-0 mt-3 bg-bg/90 py-2 backdrop-blur">
          {handsFree ? (
            <HandsFreePanel
              status={hfStatus}
              heard={hf.heard}
              error={hf.error}
              onPause={() => {
                stopSpeaking();
                setPaused(true);
              }}
              onResume={() => {
                unlockAudio();
                hf.clearError();
                setPaused(false);
              }}
              onKeyboard={() => {
                setHandsFree(false);
                setPaused(false);
              }}
            />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              {hfSupported && (
                <div className="mb-2 flex justify-end">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={false}
                    onClick={startHandsFree}
                    className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-border bg-surface px-3.5 text-xs font-extrabold text-fg transition-colors hover:border-primary active:scale-[0.98]"
                  >
                    <IconHeadset className="size-4 text-primary-ink" aria-hidden />
                    {t("practica.hf_toggle")}
                  </button>
                </div>
              )}
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
                  {t(dictationErrorKey(mic.error))}
                </p>
              )}
              {mic.iosStandalone && (
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted">
                  <IconBrandSafari className="size-4 shrink-0" />
                  {t("practica.mic_ios_pwa")}
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
                  aria-label={t("practica.placeholder")}
                  disabled={busy}
                  className="min-w-0 flex-1 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-primary"
                />
                {mic.supported && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!mic.listening) {
                        // Si el tutor sigue hablando, el micro lo transcribiría.
                        stopSpeaking();
                        unlockAudio();
                        dictationBase.current = input.trim();
                      }
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
                    {mic.listening ? <IconPlayerStopFilled className="size-4" /> : <IconMicrophone className="size-5" />}
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  disabled={!input.trim() || busy}
                  aria-label={t("a11y.send")}
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-2xl transition-colors",
                    !input.trim() || busy ? "border border-border bg-surface text-muted" : "bg-primary text-primary-fg",
                  )}
                >
                  <IconSend2 className="size-5" />
                </motion.button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
