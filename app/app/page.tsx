"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconBolt,
  IconCheck,
  IconFlame,
  IconLock,
  IconSparkles,
  IconStar,
  type Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Mascot } from "@/components/ui/mascot";
import { spring } from "@/lib/motion";

// ponytail: datos mock hasta cablear el currículo real en Firestore.
type NodeState = "done" | "current" | "locked";
const units: { level: string; title: string; nodes: NodeState[] }[] = [
  { level: "A1", title: "Saludos y presentaciones", nodes: ["done", "done", "current", "locked"] },
  { level: "A1", title: "Números y la hora", nodes: ["locked", "locked", "locked"] },
];

export default function HomePage() {
  return (
    <div className="px-5 pt-6">
      <Header />
      <DailyChallenge />
      <section className="mt-8">
        <h2 className="mb-1 font-display text-xl font-extrabold tracking-tight">
          Tu ruta
        </h2>
        <p className="mb-6 text-sm text-muted">
          Sigue el camino. Cada lección te acerca a hablar inglés.
        </p>
        {units.map((unit, i) => (
          <Unit key={i} unit={unit} index={i} />
        ))}
      </section>
    </div>
  );
}

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <Mascot height={54} />
        <div>
          <p className="text-sm text-muted">¡Hola de nuevo!</p>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            Sigamos aprendiendo
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Stat icon={IconFlame} value="3" className="text-primary" />
        <Stat icon={IconSparkles} value="120" className="text-gem" />
      </div>
    </motion.header>
  );
}

function Stat({
  icon: Icon,
  value,
  className,
}: {
  icon: Icon;
  value: string;
  className?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-pill border border-border bg-card px-3 py-1.5 text-sm font-bold">
      <Icon className={cn("size-4", className)} />
      {value}
    </span>
  );
}

function DailyChallenge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.05 }}
      className="mt-6 overflow-hidden rounded-3xl bg-gradient-brand p-5 text-primary-fg shadow-lg shadow-primary/20"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm/relaxed opacity-90">Reto diario</p>
          <p className="font-display text-lg font-extrabold">
            Completa 1 lección hoy
          </p>
        </div>
        <span className="grid size-12 place-items-center rounded-2xl bg-white/20">
          <IconBolt className="size-6" />
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-pill bg-white/25">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "35%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-pill bg-white"
        />
      </div>
      <p className="mt-2 text-xs opacity-90">Vas por buen camino · +50 XP al terminar</p>
    </motion.div>
  );
}

function Unit({
  unit,
  index,
}: {
  unit: (typeof units)[number];
  index: number;
}) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-accent-soft font-display text-sm font-extrabold text-accent">
          {unit.level}
        </span>
        <h3 className="font-display font-bold">{unit.title}</h3>
      </div>
      <div className="flex flex-col items-center gap-4">
        {unit.nodes.map((state, i) => (
          <LessonNode key={i} state={state} offset={i % 2 === 0 ? -1 : 1} order={index * 4 + i} />
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
  state,
  offset,
  order,
}: {
  state: NodeState;
  offset: number;
  order: number;
}) {
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
    <Link href="/app/leccion" aria-label="Abrir lección">
      {node}
    </Link>
  );
}
