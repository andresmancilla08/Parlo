"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  IconArrowRight,
  IconHeadphones,
  IconMicrophone,
  IconUsers,
} from "@tabler/icons-react";
import { SCENARIOS, scenarioById, type Scenario } from "@/lib/coach";
import { useProgress } from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Conversation } from "@/components/practica/conversation";
import { Missions } from "@/components/practica/missions";
import { CallEntryCard } from "@/components/app/call-entry-card";
import { SCENARIO_ICON } from "@/components/app/scenario-icons";
import { rise, spring, stagger } from "@/lib/motion";

export default function PracticaPage() {
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  // «picker» → «brief» (se enseña) → «chat» (se practica). La charla libre no
  // tiene guion que preparar, así que salta el briefing.
  const [phase, setPhase] = useState<"picker" | "brief" | "chat">("picker");
  const chosen = scenarioById(scenarioId);

  if (phase === "picker") {
    return (
      <Picker
        onStart={(id) => {
          setScenarioId(id);
          setPhase(id ? "brief" : "chat");
        }}
      />
    );
  }

  if (phase === "brief" && chosen) {
    return (
      <Briefing
        scenario={chosen}
        onStart={() => setPhase("chat")}
        onBack={() => {
          setScenarioId(null);
          setPhase("picker");
        }}
      />
    );
  }

  return (
    <Conversation
      scenarioId={scenarioId}
      onExit={() => {
        setPhase("picker");
        setScenarioId(null);
      }}
      key={scenarioId ?? "free"}
    />
  );
}

/* ---------------- briefing: se enseña antes de conversar ---------------- */

/** En el briefing las misiones se enseñan, aún sin cumplir. */
const NO_GOALS: ReadonlySet<string> = new Set();

function Briefing({
  scenario,
  onStart,
  onBack,
}: {
  scenario: Scenario;
  onStart: () => void;
  onBack: () => void;
}) {
  const { t } = useTranslation();
  const noteListen = useProgress((s) => s.noteListen);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex items-start gap-3"
      >
        <div className="min-w-0 flex-1">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-accent-ink">
            {t("practica.brief_kicker")}
          </p>
          <h1 className="mt-1.5 font-display text-3xl font-extrabold leading-tight tracking-tight">
            {t(`practica.scenario_${scenario.id}`)}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {scenario.level} · {t(`practica.goal_${scenario.id}`)}
          </p>
        </div>
        <BackButton onClick={onBack} className="shrink-0 px-3 py-1.5 text-xs" />
      </motion.header>

      <p className="mt-6 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("practica.brief_phrases")}
      </p>
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-2.5">
        {scenario.prep.map((line) => (
          <motion.div key={line.en} variants={rise}>
            <Card className="flex items-center gap-3 p-3.5">
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-extrabold leading-snug">
                  {line.en}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-muted">{line.es}</span>
              </span>
              <SpeakControls text={line.en} onPlay={noteListen} />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Missions scenario={scenario} done={NO_GOALS} className="mt-6" />

      <div className="mt-4 rounded-2xl bg-accent-soft p-4">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-accent-ink">
          {t("practica.brief_tip")}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-accent-ink/90">{t(`practica.tip_${scenario.id}`)}</p>
      </div>

      <div className="mt-6">
        <Button fullWidth shimmer onClick={onStart}>
          {t("practica.brief_start")}
          <IconArrowRight className="size-5" />
        </Button>
      </div>
    </div>
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

      {/* Los otros modos de práctica, visibles desde el primer momento */}
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {/* El modo llamada va primero y a todo el ancho: es la práctica estrella (2026-10-27). */}
        <div className="sm:col-span-2">
          <CallEntryCard />
        </div>
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
        <Link href="/app/pronunciacion" className="active:scale-[0.99]">
          <Card className="flex h-full items-center gap-3.5 p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
              <IconMicrophone className="size-5" stroke={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-base font-extrabold">
                {t("pronunciacion.home_cta")}
              </span>
              <span className="block text-xs font-bold text-muted">
                {t("pronunciacion.home_sub")}
              </span>
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
