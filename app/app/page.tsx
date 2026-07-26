"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { allLessons, curriculum, localTitle, unitOfLesson } from "@/lib/curriculum";
import { dueCardKeys, useProgress } from "@/lib/progress";
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

  const completed = new Set(hydrated ? completedArr : []);
  const dueCount = hydrated ? dueCardKeys(cards, now).length : 0;

  // Lección actual = primera no completada (o ninguna si todo A1 está hecho).
  const current = allLessons.find((l) => !completed.has(l.id)) ?? null;
  const currentUnit = current ? unitOfLesson(current.id) : null;

  const name = hydrated && email ? cap(email.split("@")[0]) : "";
  const slotWord = t(`home.slot_${slot(new Date(now).getHours())}`);
  const greet = name ? `${slotWord}, ${name}` : slotWord;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-8 pt-5">
      {/* saludo + titular editorial */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {greet}
        </p>
        <h1 className="mt-2 font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-tight sm:text-6xl">
          {t("home.hero_line1")}
          <br />
          <span className="text-muted">{t("home.hero_line2")}</span>
        </h1>
      </motion.header>

      {/* panel: lección de hoy */}
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

      {/* stats: XP, racha, repaso/gemas */}
      <StatRow
        xp={hydrated ? xp : 0}
        streak={hydrated ? streak : 0}
        due={dueCount}
        gems={hydrated ? gems : 0}
      />

      <PwaInstall className="mt-6 md:hidden" />

      {/* ruta editorial (lista numerada) */}
      <p className="mt-8 mb-1 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("home.route_kicker")}
      </p>
      <div>
        {curriculum.map((unit, i) => (
          <UnitRow key={unit.id} unit={unit} index={i} completed={completed} />
        ))}
      </div>
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

/* ---------------- fila de unidad (ruta editorial) ---------------- */

function UnitRow({
  unit,
  index,
  completed,
}: {
  unit: (typeof curriculum)[number];
  index: number;
  completed: Set<string>;
}) {
  const { t, i18n } = useTranslation();
  const title = localTitle(unit, i18n.language);

  const firstPendingUnitIdx = curriculum.findIndex((u) =>
    u.lessons.some((l) => !completed.has(l.id)),
  );
  const currentUnitIdx = firstPendingUnitIdx === -1 ? curriculum.length - 1 : firstPendingUnitIdx;

  const state: "done" | "current" | "locked" =
    index < currentUnitIdx ? "done" : index === currentUnitIdx ? "current" : "locked";
  const clickable = state !== "locked";

  const doneCount = unit.lessons.filter((l) => completed.has(l.id)).length;
  const fraction = doneCount / unit.lessons.length;
  const target = unit.lessons.find((l) => !completed.has(l.id)) ?? unit.lessons[0];

  const status =
    state === "done"
      ? t("home.unit_done")
      : state === "current"
        ? t("home.unit_progress", { done: doneCount, total: unit.lessons.length })
        : t("home.unit_locked");

  const row = (
    <div className="flex items-center gap-4 border-b border-border py-4">
      <span
        className={cn(
          "w-11 shrink-0 font-display text-[2.1rem] font-extrabold leading-none",
          state === "current" ? "text-primary" : "text-border",
        )}
      >
        {String(index + 1).padStart(2, "0")}
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
