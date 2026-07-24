"use client";

import { motion } from "framer-motion";
import {
  IconBolt,
  IconBrain,
  IconFeather,
  IconFlame,
  IconMessageChatbot,
  IconPencil,
  IconSparkles,
  IconTrophy,
  IconVolume2,
} from "@tabler/icons-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const spring = { type: "spring" as const, stiffness: 320, damping: 24 };

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: spring },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.02 } },
};

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Nav />
      <Hero />
      <Method />
      <Levels />
      <Rewards />
      <FinalCta />
      <Footer />
    </main>
  );
}

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-1.5 font-display text-xl font-extrabold tracking-tight">
      <IconFeather className="size-5 text-primary" />
      Parlo
    </span>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Wordmark />
        <div className="flex items-center gap-2">
          <ShimmerButton href="/login" variant="ghost" className="px-5 py-2.5 text-sm">
            Entrar
          </ShimmerButton>
          <ShimmerButton href="/registro" className="px-5 py-2.5 text-sm">
            Empezar gratis
          </ShimmerButton>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <AuroraBackground className="px-5 py-20 sm:py-28">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={rise}
          className="mb-6 inline-flex items-center gap-2 rounded-pill border border-border bg-surface/70 px-4 py-1.5 text-sm font-semibold text-muted backdrop-blur"
        >
          <IconSparkles className="size-4 text-primary" />
          Tu tutor de inglés con IA, en español
        </motion.span>

        <motion.h1
          variants={rise}
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Aprende inglés <GradientText>como se debe</GradientText>, desde cero
          hasta avanzado
        </motion.h1>

        <motion.p variants={rise} className="mt-5 max-w-xl text-lg text-muted">
          Currículo por niveles A1 → C2, un tutor de IA que corrige tus errores y
          te explica el porqué, repaso espaciado y retos diarios. Sin cuentas de
          humo: práctica real.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <ShimmerButton href="/registro">
            <IconBolt className="size-5" />
            Empezar gratis
          </ShimmerButton>
          <ShimmerButton href="#metodo" variant="ghost">
            Cómo funciona
          </ShimmerButton>
        </motion.div>

        <motion.p variants={rise} className="mt-5 text-sm text-muted">
          Gratis para empezar · Instalable como app · Sin tarjeta
        </motion.p>
      </motion.div>
    </AuroraBackground>
  );
}

const features = [
  {
    icon: IconMessageChatbot,
    title: "Conversa de verdad",
    body: "Habla con un tutor de IA en situaciones reales (viaje, trabajo, café). Te responde a tu nivel y corrige al final del turno.",
  },
  {
    icon: IconPencil,
    title: "Corrección que explica",
    body: "Escribe y recibe la versión correcta con el porqué de cada error, en español. Aprendes la regla, no solo el resultado.",
  },
  {
    icon: IconBrain,
    title: "Repaso espaciado",
    body: "El vocabulario vuelve justo antes de que lo olvides. Es lo que de verdad fija las palabras a largo plazo.",
  },
  {
    icon: IconVolume2,
    title: "Pronunciación",
    body: "Practica en voz alta y recibe feedback con el reconocimiento de voz del navegador. Sin instalar nada.",
  },
];

function Method() {
  return (
    <section id="metodo" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        kicker="El método"
        title="No es otra app de tocar botones"
        subtitle="Cada función existe por una razón pedagógica: input comprensible, producción activa y feedback inmediato."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f) => (
          <motion.article
            key={f.title}
            variants={rise}
            whileHover={{ y: -6 }}
            transition={spring}
            className="group rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform group-hover:scale-110">
              <f.icon className="size-6" />
            </div>
            <h3 className="font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

function Levels() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-8">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 to-accent-soft/40 p-8 sm:p-12">
        <SectionHeading
          kicker="Tu ruta"
          title="De principiante a fluido, paso a paso"
          subtitle="Empiezas con un test que te sitúa en tu nivel real. A partir de ahí, un camino claro."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {levels.map((lvl, i) => (
            <motion.div key={lvl} variants={rise} className="flex items-center gap-3">
              <span className="grid size-16 place-items-center rounded-2xl border border-border bg-surface font-display text-xl font-extrabold text-fg shadow-sm">
                {lvl}
              </span>
              {i < levels.length - 1 && (
                <span className="hidden text-2xl text-muted sm:block">→</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const rewards = [
  { icon: IconFlame, title: "Racha", body: "Un día tras otro. La racha protege el hábito." },
  { icon: IconTrophy, title: "Logros", body: "Hitos que celebran tu progreso real." },
  { icon: IconSparkles, title: "Gemas", body: "Gana gemas y desbloquea temas y ventajas." },
];

function Rewards() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        kicker="Se siente bien avanzar"
        title="Retos y recompensas que enganchan"
        subtitle="La gamificación al servicio del aprendizaje, no para reemplazarlo."
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-5 sm:grid-cols-3"
      >
        {rewards.map((r) => (
          <motion.article
            key={r.title}
            variants={rise}
            whileHover={{ y: -6 }}
            transition={spring}
            className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gem/15 text-gem">
              <r.icon className="size-7" />
            </div>
            <h3 className="font-display text-lg font-bold">{r.title}</h3>
            <p className="mt-2 text-sm text-muted">{r.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="mx-auto max-w-3xl rounded-[2rem] bg-fg px-8 py-14 text-center text-bg"
      >
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          Empieza hoy. Habla inglés antes de lo que crees.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base opacity-80">
          Gratis para arrancar. Instálalo como app y practica 10 minutos al día.
        </p>
        <div className="mt-8 flex justify-center">
          <ShimmerButton href="/registro">
            <IconBolt className="size-5" />
            Crear mi cuenta
          </ShimmerButton>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row">
        <Wordmark />
        <p>© 2026 Parlo · Aprende inglés como se debe</p>
      </div>
    </footer>
  );
}

function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={spring}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-primary">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-muted">{subtitle}</p>
    </motion.div>
  );
}
