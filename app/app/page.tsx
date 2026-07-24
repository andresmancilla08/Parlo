"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconBolt,
  IconCheck,
  IconFlame,
  IconLock,
  IconRefresh,
  IconStar,
  type Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Mascot } from "@/components/ui/mascot";
import { spring } from "@/lib/motion";
import { curriculum, lessonState, type NodeState } from "@/lib/curriculum";
import { dailyGoalDone, dueCardKeys, useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";
import mascotCelebrate from "@/public/brand/mascot-celebrate.png";

export default function HomePage() {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const completed = useProgress((s) => s.completed);
  const cards = useProgress((s) => s.cards);
  const lastActiveDay = useProgress((s) => s.lastActiveDay);

  // El layout monta esta página solo en cliente (tras auth), así que el timestamp
  // se lee una vez en el inicializador perezoso, no en cada render.
  const [now] = useState(() => Date.now());

  const completedSet = new Set(hydrated ? completed : []);
  const dueCount = dueCardKeys(cards, now).length;
  const dailyDone = hydrated && dailyGoalDone(lastActiveDay);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pt-6">
      <Header />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="order-2 lg:order-1">
          <h2 className="mb-1 font-display text-xl font-extrabold tracking-tight">
            {t("home.route_title")}
          </h2>
          <p className="mb-6 text-sm text-muted">{t("home.route_subtitle")}</p>
          {curriculum.map((unit, i) => (
            <Unit key={unit.id} unit={unit} unitIndex={i} completed={completedSet} />
          ))}
        </section>

        <aside className="order-1 space-y-4 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <DailyChallenge done={dailyDone} />
          {dueCount > 0 && <ReviewCard count={dueCount} />}
          <StreakCard />
        </aside>
      </div>
    </div>
  );
}

function StreakCard() {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const streak = useProgress((s) => s.streak);
  return (
    <Card className="relative overflow-hidden p-5">
      <div className="flex items-center gap-2">
        <IconFlame className="size-6 text-primary" />
        <span className="font-display text-lg font-extrabold">
          {t("home.streak_title", { n: hydrated ? streak : 0 })}
        </span>
      </div>
      <p className="mt-1 max-w-[62%] text-sm text-muted">{t("home.streak_cta")}</p>
      <Image
        src={mascotCelebrate}
        alt=""
        height={104}
        width={Math.round((104 * mascotCelebrate.width) / mascotCelebrate.height)}
        className="pointer-events-none absolute -bottom-2 -right-1 select-none"
      />
    </Card>
  );
}

function Header() {
  const { t } = useTranslation();
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="flex items-center gap-3"
    >
      <Mascot height={56} />
      <div>
        <p className="text-sm text-muted">{t("home.greeting")}</p>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          {t("home.subtitle")}
        </h1>
      </div>
    </motion.header>
  );
}

function DailyChallenge({ done }: { done: boolean }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.05 }}
      className="overflow-hidden rounded-3xl bg-gradient-brand p-5 text-primary-fg shadow-lg shadow-primary/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm/relaxed opacity-90">{t("home.daily_label")}</p>
          <p className="font-display text-lg font-extrabold">{t("home.daily_title")}</p>
        </div>
        <span className="grid size-12 place-items-center rounded-2xl bg-white/20">
          {done ? <IconCheck className="size-6" /> : <IconBolt className="size-6" />}
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-pill bg-white/25">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: done ? "100%" : "0%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-pill bg-white"
        />
      </div>
      <p className="mt-2 text-xs opacity-90">
        {done ? t("home.daily_done") : t("home.daily_note")}
      </p>
    </motion.div>
  );
}

function ReviewCard({ count }: { count: number }) {
  const { t } = useTranslation();
  return (
    <Link href="/app/repaso">
      <motion.div
        whileHover={{ y: -3 }}
        transition={spring}
        className="flex items-center gap-3 rounded-3xl border border-accent/40 bg-accent-soft p-5"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-white">
          <IconRefresh className="size-6" />
        </span>
        <div>
          <p className="font-display font-extrabold text-accent">{t("home.review_title")}</p>
          <p className="text-sm text-accent/80">{t("home.review_body", { n: count })}</p>
        </div>
      </motion.div>
    </Link>
  );
}

function Unit({
  unit,
  unitIndex,
  completed,
}: {
  unit: (typeof curriculum)[number];
  unitIndex: number;
  completed: Set<string>;
}) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-accent-soft font-display text-sm font-extrabold text-accent">
          {unit.level}
        </span>
        <h3 className="font-display font-bold">{unit.titleEs}</h3>
      </div>
      <div className="flex flex-col items-center gap-4">
        {unit.lessons.map((lesson, i) => (
          <LessonNode
            key={lesson.id}
            id={lesson.id}
            state={lessonState(lesson.id, completed)}
            offset={i % 2 === 0 ? -1 : 1}
            order={unitIndex * 4 + i}
          />
        ))}
      </div>
    </div>
  );
}

const nodeIcon: Record<NodeState, Icon> = {
  done: IconCheck,
  current: IconStar,
  locked: IconLock,
};

function LessonNode({
  id,
  state,
  offset,
  order,
}: {
  id: string;
  state: NodeState;
  offset: number;
  order: number;
}) {
  const { t } = useTranslation();
  const Icon = nodeIcon[state];
  const clickable = state !== "locked";

  const node = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ ...spring, delay: Math.min(order * 0.02, 0.2) }}
      whileTap={clickable ? { scale: 0.92 } : undefined}
      style={{ marginLeft: offset * 56 }}
      className={cn(
        "grid size-16 place-items-center rounded-full border-4 shadow-md",
        state === "done" && "border-success/30 bg-success text-white",
        state === "current" &&
          "border-primary/30 bg-primary text-primary-fg ring-4 ring-primary/15",
        state === "locked" && "border-border bg-card text-muted",
      )}
    >
      <Icon className="size-7" />
    </motion.div>
  );

  if (!clickable) return node;
  return (
    <Link href={`/app/leccion?id=${id}`} aria-label={t("a11y.open_lesson")}>
      {node}
    </Link>
  );
}
