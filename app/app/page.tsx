"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconArrowRight,
  IconChevronDown,
  IconHeadphones,
  IconCircleCheck,
  IconLock,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import {
  currentUnitIndex,
  curriculum,
  firstPendingLesson,
  levelRank,
  localTitle,
  unitOfLesson,
  type Cefr,
} from "@/lib/curriculum";
import { challengeProgress, challengesFor } from "@/lib/gamification";
import { dueCardKeys, todayXp, useProgress } from "@/lib/progress";
import { useAuth } from "@/lib/auth";
import { useHydrated } from "@/lib/use-hydrated";
import { PwaInstall } from "@/components/ui/pwa-install";
import mascotCelebrate from "@/public/brand/mascot-celebrate.png";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const hydrated = useHydrated();
  const [now] = useState(() => Date.now()); // cliente-only (el layout monta tras auth)

  const email = useAuth((s) => s.email);
  const xp = useProgress((s) => s.xp);
  const gems = useProgress((s) => s.gems);
  const streak = useProgress((s) => s.streak);
  const completedArr = useProgress((s) => s.completed);
  const cards = useProgress((s) => s.cards);
  const days = useProgress((s) => s.days);
  const goalXp = useProgress((s) => s.goalXp);
  const claims = useProgress((s) => s.claims);
  const startLevel = useProgress((s) => s.startLevel);

  const completed = new Set(hydrated ? completedArr : []);
  const dueCount = hydrated ? dueCardKeys(cards, now).length : 0;

  // Objetivo del día y retos ya cumplidos pero sin cobrar.
  const goalXpDone = hydrated ? todayXp(days) : 0;
  const claimable = hydrated
    ? challengesFor(new Date(now)).filter(
        (c) => !claims[c.key] && challengeProgress(c, days, new Date(now)) >= c.target,
      ).length
    : 0;

  // Lección actual = primera no completada (o ninguna si todo A1 está hecho).
  const current = firstPendingLesson(completed, startLevel);
  const currentUnitIdx = currentUnitIndex(completed, startLevel);
  const currentUnit = current ? unitOfLesson(current.id) : null;

  const name = hydrated && email ? cap(email.split("@")[0]) : "";
  const slotWord = t(`home.slot_${slot(new Date(now).getHours())}`);
  const greet = name ? `${slotWord}, ${name}` : slotWord;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-8 pt-5 xl:max-w-6xl">
      {/* saludo + titular editorial */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <p className="truncate font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {greet}
        </p>
        <h1 className="mt-2 font-display text-[2.1rem] font-extrabold leading-[0.98] tracking-tight min-[380px]:text-[2.6rem] sm:text-6xl">
          {t("home.hero_line1")}
          <br />
          <span className="text-muted">{t("home.hero_line2")}</span>
        </h1>
      </motion.header>

      {/* En desktop la pantalla se parte: ruta a la izquierda, «hoy» a la derecha.
          En móvil sigue siendo una sola columna en el orden de siempre. */}
      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start xl:gap-8">
      {/* panel: lección de hoy (col. 1, fila 1) */}
      <div className="min-w-0 xl:col-start-1 xl:row-start-1">
        {current && currentUnit ? (
          <FeaturePanel
            kicker={t("home.feature_kicker")}
            title={localTitle(current, i18n.language)}
            subtitle={`${currentUnit.level} · ${localTitle(currentUnit, i18n.language)}`}
            href={`/app/leccion?id=${current.id}`}
            cta={t("home.feature_continue")}
            progress={unitFraction(currentUnit.id, completed)}
          />
        ) : (
          <FeaturePanel
            kicker={t("home.feature_kicker")}
            title={t("home.all_done_title")}
            subtitle={t("home.all_done_sub")}
            href="/app/repaso"
            cta={t("home.all_done_cta")}
            progress={1}
          />
        )}

        {/* Sólo a quien no ha empezado: no obligar a arrancar en A1 si ya sabe. */}
        {hydrated && startLevel === null && completedArr.length === 0 && (
          <Link href="/app/test" className="mt-4 block active:scale-[0.99]">
            <div className="rounded-2xl border border-accent bg-accent-soft p-4">
              <p className="font-display text-base font-extrabold text-accent-ink">
                {t("test.banner_title")}
              </p>
              <p className="mt-1 text-sm font-semibold text-accent-ink/80">
                {t("test.banner_body")}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 font-display text-sm font-extrabold text-accent-ink">
                {t("test.banner_cta")}
                <IconArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* «hoy»: stats, objetivo e instalación (columna derecha en desktop) */}
      <aside className="min-w-0 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:sticky xl:top-6">
        <StatRow
          xp={hydrated ? xp : 0}
          streak={hydrated ? streak : 0}
          due={dueCount}
          gems={hydrated ? gems : 0}
        />

        <GoalCard done={goalXpDone} goal={goalXp} claimable={claimable} />

        <Link href="/app/escucha" className="mt-4 block active:scale-[0.99]">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
              <IconHeadphones className="size-5" stroke={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-sm font-extrabold">
                {t("escucha.home_cta")}
              </span>
              <span className="block text-xs font-bold text-muted">{t("escucha.kicker")}</span>
            </span>
            <IconArrowRight className="size-4 shrink-0 text-muted" />
          </div>
        </Link>

        <PwaInstall className="mt-4 md:hidden" />
      </aside>

      {/* ruta por niveles (col. 1, fila 2 en desktop) */}
      <section className="mt-8 min-w-0 xl:col-start-1 xl:row-start-2 xl:mt-6">
        <p className="mb-1 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
          {t("home.route_kicker")}
        </p>
        <LevelPath
          completed={completed}
          currentUnitIdx={currentUnitIdx}
          startLevel={startLevel}
        />
      </section>
      </div>
    </div>
  );
}

/* ---------------- ruta agrupada por nivel ---------------- */

/** Unidades agrupadas por nivel, en el orden de la ruta. */
function levelGroups() {
  const out: { level: string; units: typeof curriculum; from: number }[] = [];
  curriculum.forEach((unit, i) => {
    const last = out.at(-1);
    if (last && last.level === unit.level) last.units.push(unit);
    else out.push({ level: unit.level, units: [unit], from: i });
  });
  return out;
}

function LevelPath({
  completed,
  currentUnitIdx,
  startLevel,
}: {
  completed: Set<string>;
  currentUnitIdx: number;
  startLevel: Cefr | null;
}) {
  const { t } = useTranslation();
  const groups = levelGroups();

  // Nivel en curso = el de la unidad actual (ya respeta el test de nivel).
  const currentLevel = curriculum[currentUnitIdx]?.level ?? groups[0].level;
  const startRank = startLevel ? levelRank(startLevel) : 0;

  const [open, setOpen] = useState<Record<string, boolean>>({ [currentLevel]: true });

  return (
    <div className="space-y-3">
      {groups.map((g, gi) => {
        const lessons = g.units.flatMap((u) => u.lessons);
        const done = lessons.filter((l) => completed.has(l.id)).length;
        const unitsDone = g.units.filter((u) =>
          u.lessons.every((l) => completed.has(l.id)),
        ).length;
        const state =
          done === lessons.length
            ? "done"
            : g.level === currentLevel
              ? "current"
              : // Si el test colocó al usuario más arriba, lo anterior queda
                // disponible (repaso opcional), no bloqueado.
                levelRank(g.level as Cefr) < startRank
                ? "open"
                : "locked";
        const isOpen = open[g.level] ?? false;

        return (
          <div
            key={g.level}
            className={cn(
              "overflow-hidden rounded-2xl border",
              state === "current" ? "border-primary/40 bg-card" : "border-border bg-card",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [g.level]: !isOpen }))}
              aria-expanded={isOpen}
              aria-label={t("a11y.toggle_level", { level: g.level })}
              className="flex w-full items-center gap-3.5 p-4 text-left transition-colors hover:bg-primary-soft/40"
            >
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-xl font-display text-base font-extrabold",
                  state === "current"
                    ? "bg-primary text-primary-fg"
                    : state === "done"
                      ? "bg-accent-soft text-accent-ink"
                      : "bg-bg text-muted",
                )}
              >
                {g.level}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-base font-extrabold">
                  {t(`home.level_${g.level.toLowerCase()}`)}
                </span>
                <span className="block text-xs font-bold text-muted">
                  {state === "locked"
                    ? t("home.level_locked", { prev: groups[gi - 1]?.level ?? "" })
                    : t("home.level_units", { done: unitsDone, total: g.units.length })}
                </span>
                <span className="mt-2 block h-1 overflow-hidden rounded-pill bg-border">
                  <span
                    className={cn(
                      "block h-full rounded-pill transition-[width] duration-500",
                      state === "done" ? "bg-accent" : "bg-primary",
                    )}
                    style={{ width: `${Math.round((done / lessons.length) * 100)}%` }}
                  />
                </span>
              </span>

              {state === "done" ? (
                <IconCircleCheck className="size-5 shrink-0 text-accent-ink" />
              ) : state === "locked" ? (
                <IconLock className="size-4 shrink-0 text-muted" />
              ) : null}
              <IconChevronDown
                className={cn(
                  "size-5 shrink-0 text-muted transition-transform duration-150",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-4 pb-1">
                    {g.units.map((unit, i) => (
                      <UnitRow
                        key={unit.id}
                        unit={unit}
                        index={g.from + i}
                        label={String(i + 1).padStart(2, "0")}
                        completed={completed}
                        currentUnitIdx={currentUnitIdx}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- panel lección de hoy ---------------- */

function FeaturePanel({
  kicker,
  title,
  subtitle,
  href,
  cta,
  progress,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  progress: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.04 }}
      className="relative mt-6 overflow-hidden rounded-[26px] bg-gradient-panel p-6 text-white shadow-2xl shadow-[#171033]/40"
    >
      <p className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-gem">
        {kicker}
      </p>
      <h2 className="mt-2.5 max-w-[66%] font-display text-3xl font-extrabold leading-[1.02] tracking-tight">
        {title}
      </h2>
      <p className="mt-2 max-w-[64%] text-sm font-semibold text-white/70">{subtitle}</p>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3.5 font-display text-base font-extrabold text-primary-fg shadow-lg shadow-primary/40 transition-transform active:scale-95"
      >
        {cta}
        <IconArrowRight className="size-5" />
      </Link>

      <div className="mt-5 h-1.5 max-w-[64%] overflow-hidden rounded-pill bg-white/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.round(progress * 100)}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-pill bg-gem"
        />
      </div>

      <Image
        src={mascotCelebrate}
        alt=""
        height={158}
        width={Math.round((158 * mascotCelebrate.width) / mascotCelebrate.height)}
        className="pointer-events-none absolute -bottom-1.5 -right-2 select-none drop-shadow-xl"
        priority
      />
    </motion.div>
  );
}

/* ---------------- fila de stats ---------------- */

function StatRow({
  xp,
  streak,
  due,
  gems,
}: {
  xp: number;
  streak: number;
  due: number;
  gems: number;
}) {
  const { t } = useTranslation();
  return (
    <div className="mt-4 grid grid-cols-3 gap-2.5">
      <StatTile value={xp} label="XP" />
      <StatTile value={streak} label={t("perfil.streak")} />
      {due > 0 ? (
        <Link href="/app/repaso" className="active:scale-[0.98]">
          <StatTile value={due} label={t("home.review_label")} accent />
        </Link>
      ) : (
        <StatTile value={gems} label={t("perfil.gems")} gem />
      )}
    </div>
  );
}

function StatTile({
  value,
  label,
  accent,
  gem,
}: {
  value: number;
  label: string;
  accent?: boolean;
  gem?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3.5 text-center",
        accent ? "border-accent bg-accent-soft" : "border-border bg-card",
      )}
    >
      <p
        className={cn(
          "font-display text-2xl font-extrabold leading-none",
          accent && "text-accent-ink",
          gem && "text-gem",
        )}
      >
        {value}
      </p>
      <p className={cn("mt-1 text-xs font-bold", accent ? "text-accent-ink" : "text-muted")}>
        {label}
      </p>
    </div>
  );
}

/* ---------------- objetivo del día ---------------- */

function GoalCard({
  done,
  goal,
  claimable,
}: {
  done: number;
  goal: number;
  claimable: number;
}) {
  const { t } = useTranslation();
  const fraction = Math.min(done / goal, 1);
  const complete = fraction >= 1;

  return (
    <Link href="/app/retos" className="mt-4 block active:scale-[0.99]">
      <div
        className={cn(
          "rounded-2xl border p-4",
          complete ? "border-accent bg-accent-soft" : "border-border bg-card",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className={cn(
              "font-display text-xs font-extrabold uppercase tracking-[0.13em]",
              complete ? "text-accent-ink" : "text-muted",
            )}
          >
            {t("home.goal_kicker")}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-primary-ink">
            {claimable > 0 ? t("home.claimable", { n: claimable }) : t("home.goal_cta")}
            <IconArrowRight className="size-3.5" />
          </span>
        </div>

        <p className="mt-1.5 font-display text-lg font-extrabold">
          {complete ? t("home.goal_done") : t("home.goal_left", { n: goal - done })}
        </p>

        <div className="mt-2.5 h-1.5 overflow-hidden rounded-pill bg-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.round(fraction * 100)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("h-full rounded-pill", complete ? "bg-accent" : "bg-primary")}
          />
        </div>
      </div>
    </Link>
  );
}

/* ---------------- fila de unidad (ruta editorial) ---------------- */

function UnitRow({
  unit,
  index,
  label,
  completed,
  currentUnitIdx,
}: {
  unit: (typeof curriculum)[number];
  index: number;
  /** Número visible (dentro del nivel, no global). */
  label?: string;
  completed: Set<string>;
  /** Unidad en curso (ya respeta el test de nivel). */
  currentUnitIdx: number;
}) {
  const { t, i18n } = useTranslation();
  const title = localTitle(unit, i18n.language);

  const doneCount = unit.lessons.filter((l) => completed.has(l.id)).length;
  const fraction = doneCount / unit.lessons.length;
  const target = unit.lessons.find((l) => !completed.has(l.id)) ?? unit.lessons[0];

  // El estado sale de los datos, no de la posición: si el test de nivel te
  // colocó en B1, las unidades de A1 quedan ABIERTAS (no «completadas»).
  const state: "done" | "current" | "open" | "locked" =
    doneCount === unit.lessons.length
      ? "done"
      : index === currentUnitIdx
        ? "current"
        : index < currentUnitIdx
          ? "open"
          : "locked";
  const clickable = state !== "locked";

  const status =
    state === "done"
      ? t("home.unit_done")
      : state === "locked"
        ? t("home.unit_locked")
        : t("home.unit_progress", { done: doneCount, total: unit.lessons.length });

  const row = (
    <div className="flex items-center gap-4 border-b border-border py-4 last:border-b-0">
      <span
        className={cn(
          "w-9 shrink-0 font-display text-[1.75rem] font-extrabold leading-none",
          state === "current" ? "text-primary" : "text-border",
        )}
      >
        {label ?? String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "truncate font-display text-lg font-extrabold",
            state === "locked" && "text-muted",
          )}
        >
          {title}
        </h3>
        <p className="text-sm font-bold text-muted">
          {unit.level} · {status}
        </p>
      </div>
      <Ring
        fraction={state === "done" ? 1 : fraction}
        color={state === "done" ? "var(--color-success)" : "var(--color-primary)"}
      />
    </div>
  );

  if (!clickable) return row;
  return (
    <Link href={`/app/leccion?id=${target.id}`} aria-label={title}>
      <motion.div whileTap={{ scale: 0.99 }}>{row}</motion.div>
    </Link>
  );
}

function Ring({ fraction, color }: { fraction: number; color: string }) {
  const r = 19;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={44} height={44} viewBox="0 0 44 44" className="shrink-0" aria-hidden>
      <circle cx="22" cy="22" r={r} fill="none" stroke="var(--color-border)" strokeWidth="5" />
      {fraction > 0 && (
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - fraction)}
          transform="rotate(-90 22 22)"
        />
      )}
    </svg>
  );
}

/* ---------------- helpers ---------------- */

function unitFraction(unitId: string, completed: Set<string>): number {
  const unit = curriculum.find((u) => u.id === unitId);
  if (!unit) return 0;
  const done = unit.lessons.filter((l) => completed.has(l.id)).length;
  return done / unit.lessons.length;
}

function slot(hour: number): "morning" | "afternoon" | "evening" {
  if (hour < 12) return "morning";
  if (hour < 20) return "afternoon";
  return "evening";
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
