"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconBolt,
  IconBook,
  IconCheck,
  IconEar,
  IconFlame,
  IconMessageChatbot,
  IconRefresh,
  IconShieldCheck,
  IconSparkles,
  type Icon,
} from "@tabler/icons-react";
import {
  challengeProgress,
  challengesFor,
  GOAL_OPTIONS,
  levelFromXp,
  REWARD,
  SHIELD_COST,
  type Challenge,
  type Metric,
} from "@/lib/gamification";
import { todayXp, useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const METRIC_ICON: Record<Metric, Icon> = {
  lessons: IconBook,
  correct: IconCheck,
  reviews: IconRefresh,
  tutor: IconMessageChatbot,
  listens: IconEar,
  xp: IconBolt,
};

export default function RetosPage() {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const [now] = useState(() => new Date());

  const xp = useProgress((s) => s.xp);
  const gems = useProgress((s) => s.gems);
  const streak = useProgress((s) => s.streak);
  const shields = useProgress((s) => s.shields);
  const days = useProgress((s) => s.days);
  const goalXp = useProgress((s) => s.goalXp);
  const claims = useProgress((s) => s.claims);
  const setGoal = useProgress((s) => s.setGoal);
  const claimChallenge = useProgress((s) => s.claimChallenge);
  const buyShield = useProgress((s) => s.buyShield);

  const done = hydrated ? todayXp(days) : 0;
  const goalFraction = Math.min(done / goalXp, 1);
  const challenges = challengesFor(now);
  const level = levelFromXp(hydrated ? xp : 0);

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-8 pt-5">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {t("retos.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight">
          {t("retos.title")}
        </h1>
      </motion.header>

      {/* objetivo diario */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.04 }}
        className="mt-6 rounded-[26px] bg-gradient-panel p-6 text-white shadow-2xl shadow-[#171033]/40"
      >
        <div className="flex items-center gap-5">
          <GoalRing fraction={goalFraction} label={`${done}`} sub={`/${goalXp}`} />
          <div className="min-w-0 flex-1">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-gem">
              {t("retos.goal_title")}
            </p>
            <p className="mt-1.5 font-display text-xl font-extrabold leading-tight sm:text-2xl">
              {goalFraction >= 1
                ? t("retos.goal_done")
                : t("retos.goal_left", { n: goalXp - done })}
            </p>
            <div className="mt-3 flex gap-4 text-sm font-bold text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <IconFlame className="size-4 text-primary" />
                {streak} · {t("retos.streak_label")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconShieldCheck className="size-4 text-accent" />
                {shields} · {t("retos.shields_label")}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-white/55">
          {t("retos.goal_pick")}
        </p>
        <div className="mt-2 flex gap-2">
          {GOAL_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setGoal(opt)}
              aria-pressed={goalXp === opt}
              className={cn(
                "flex-1 rounded-pill py-2.5 font-display text-sm font-extrabold transition-transform active:scale-95",
                goalXp === opt
                  ? "bg-primary text-primary-fg shadow-lg shadow-primary/30"
                  : "bg-white/12 text-white/80",
              )}
            >
              {opt} XP
            </button>
          ))}
        </div>
      </motion.div>

      {/* nivel de avance */}
      <Card className="mt-4 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-lg font-extrabold">
            {t("retos.level_title", { n: level.level })}
            <span className="ml-2 text-sm font-bold text-accent-ink">
              {t(`retos.rank_${level.rank}`)}
            </span>
          </p>
          <p className="shrink-0 text-xs font-bold text-muted">
            {t("retos.level_progress", {
              into: level.into,
              need: level.need,
              next: level.level + 1,
            })}
          </p>
        </div>
        <Bar fraction={level.fraction} className="mt-3" />
      </Card>

      <Section title={t("retos.daily")}>
        {challenges
          .filter((c) => c.period === "daily")
          .map((c) => (
            <ChallengeRow
              key={c.key}
              challenge={c}
              progress={hydrated ? challengeProgress(c, days, now) : 0}
              claimed={Boolean(claims[c.key])}
              onClaim={() => claimChallenge(c)}
            />
          ))}
      </Section>

      <Section title={t("retos.weekly")} hint={t("retos.reward", { n: REWARD.weekly })}>
        {challenges
          .filter((c) => c.period === "weekly")
          .map((c) => (
            <ChallengeRow
              key={c.key}
              challenge={c}
              progress={hydrated ? challengeProgress(c, days, now) : 0}
              claimed={Boolean(claims[c.key])}
              onClaim={() => claimChallenge(c)}
            />
          ))}
      </Section>

      {/* premios */}
      <Section title={t("retos.prizes")}>
        <Card className="flex items-center gap-4 p-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft">
            <IconShieldCheck className="size-6 text-accent-ink" stroke={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-extrabold">
              {t("retos.shield_title")}
            </p>
            <p className="text-sm text-muted">{t("retos.shield_body")}</p>
            <p className="mt-1 text-xs font-bold text-accent-ink">
              {t("retos.shield_owned", { n: shields })}
            </p>
          </div>
          <Button
            variant="secondary"
            className="shrink-0"
            disabled={!hydrated || gems < SHIELD_COST}
            onClick={buyShield}
          >
            <IconSparkles className="size-4 text-gem" />
            {SHIELD_COST}
          </Button>
        </Card>
        {hydrated && gems < SHIELD_COST && (
          <p className="mt-2 text-center text-xs font-bold text-muted">
            {t("retos.not_enough", { n: SHIELD_COST - gems })}
          </p>
        )}
      </Section>
    </div>
  );
}

/* ---------------- piezas ---------------- */

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
          {title}
        </p>
        {hint && (
          <p className="shrink-0 text-xs font-extrabold text-gem">{hint}</p>
        )}
      </div>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

function ChallengeRow({
  challenge,
  progress,
  claimed,
  onClaim,
}: {
  challenge: Challenge;
  progress: number;
  claimed: boolean;
  onClaim: () => void;
}) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [reward, setReward] = useState(false);
  const Icon = METRIC_ICON[challenge.metric];
  const complete = progress >= challenge.target;
  const weekly = challenge.period === "weekly";

  return (
    <Card
      className={cn(
        "relative p-4",
        // El semanal se distingue por una banda gem: vale más y se ve.
        weekly && "border-l-4 border-l-gem",
        complete && !claimed && "border-accent bg-accent-soft",
      )}
    >
      <AnimatePresence>
        {reward && !reduced && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: -26 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onAnimationComplete={() => setReward(false)}
            className="pointer-events-none absolute right-5 top-4 font-display text-sm font-extrabold text-gem"
          >
            +{challenge.reward}
          </motion.span>
        )}
      </AnimatePresence>
      <div className="flex items-center gap-3.5">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full",
            claimed ? "bg-accent-soft" : complete ? "bg-accent" : "bg-bg",
          )}
        >
          {claimed ? (
            <IconCheck className="size-5 text-success-ink" stroke={2.6} />
          ) : (
            <Icon
              className={cn("size-5", complete ? "text-primary-fg" : "text-muted")}
              stroke={2.2}
            />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-display text-sm font-extrabold">
            <span className="truncate">
              {t(`retos.metric_${challenge.metric}`, { n: challenge.target })}
            </span>
            {/* el periodo se dice con texto, no solo con el color de la banda */}
            {weekly && (
              <span className="shrink-0 rounded-pill bg-bg px-2 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-wide text-muted">
                {t("retos.badge_weekly")}
              </span>
            )}
          </p>
          <p className="text-xs font-bold text-muted">
            {progress} / {challenge.target} · {t("retos.reward", { n: challenge.reward })}
          </p>
        </div>

        {complete && !claimed ? (
          <Button
            className="shrink-0 px-4 py-2 text-sm"
            onClick={() => {
              onClaim();
              setReward(true);
            }}
          >
            {t("retos.claim")}
          </Button>
        ) : claimed ? (
          <span className="shrink-0 text-xs font-extrabold uppercase tracking-wide text-success-ink">
            {t("retos.claimed")}
          </span>
        ) : null}
      </div>
      {!claimed && <Bar fraction={progress / challenge.target} className="mt-3" />}
    </Card>
  );
}

function Bar({ fraction, className }: { fraction: number; className?: string }) {
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-pill bg-border", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.round(Math.min(fraction, 1) * 100)}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full rounded-pill bg-primary"
      />
    </div>
  );
}

function GoalRing({
  fraction,
  label,
  sub,
}: {
  fraction: number;
  label: string;
  sub: string;
}) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative size-[84px] shrink-0">
      <svg width={84} height={84} viewBox="0 0 84 84" aria-hidden>
        <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="7" />
        {fraction > 0 && (
          <motion.circle
            cx="42"
            cy="42"
            r={r}
            fill="none"
            stroke="var(--color-gem)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - fraction) }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            transform="rotate(-90 42 42)"
          />
        )}
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-display text-xl font-extrabold">{label}</span>
        <span className="mt-0.5 text-[0.68rem] font-bold text-white/60">{sub}</span>
      </span>
    </div>
  );
}
