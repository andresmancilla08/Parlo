"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  IconBolt,
  IconBrain,
  IconFeather,
  IconFlame,
  IconMessageChatbot,
  IconPencil,
  IconRoute,
  IconSparkles,
  IconTrophy,
} from "@tabler/icons-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "@/components/ui/mascot";
import { rise, spring, stagger } from "@/lib/motion";

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
          <Button href="/login" variant="secondary" size="sm">
            Entrar
          </Button>
          <Button href="/registro" size="sm" shimmer>
            Empezar gratis
          </Button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 90]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0.35]);

  return (
    <AuroraBackground className="px-5 py-20 sm:py-28">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        style={{ y, opacity }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div variants={rise}>
          <Mascot height={168} float glow priority className="mb-3" />
        </motion.div>

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
          Habla inglés <GradientText>con confianza</GradientText>, no de memoria.
        </motion.h1>

        <motion.p variants={rise} className="mt-5 max-w-xl text-lg text-muted">
          Tu tutor de IA corrige tus errores, explica el porqué en español y te
          guía paso a paso hasta alcanzar fluidez real.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button href="/registro" shimmer>
            <IconBolt className="size-5" />
            Empieza gratis
          </Button>
          <Button href="#metodo" variant="secondary">
            Cómo funciona
          </Button>
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
    icon: IconRoute,
    title: "Aprende por niveles",
    body: "Desde A1 hasta C2 con un camino claro, sin perderte ni saltarte pasos.",
  },
  {
    icon: IconMessageChatbot,
    title: "Conversa desde el primer día",
    body: "Practica con IA como si hablaras con una persona real, a tu nivel.",
  },
  {
    icon: IconPencil,
    title: "Entiende tus errores",
    body: "Cada corrección incluye una explicación sencilla en español del porqué.",
  },
  {
    icon: IconBrain,
    title: "Nunca olvides lo aprendido",
    body: "El repaso espaciado aparece justo cuando tu memoria lo necesita.",
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
          <motion.div key={f.title} variants={rise} whileHover={{ y: -6 }} transition={spring}>
            <Card className="group h-full p-6">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform group-hover:scale-110">
                <f.icon className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </Card>
          </motion.div>
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
          <motion.div key={r.title} variants={rise} whileHover={{ y: -6 }} transition={spring}>
            <Card className="h-full p-6 text-center">
              <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gem/15 text-gem">
                <r.icon className="size-7" />
              </div>
              <h3 className="font-display text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">{r.body}</p>
            </Card>
          </motion.div>
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
          Empieza hoy. Tu inglés del futuro comienza con la primera conversación.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base opacity-80">
          Gratis para arrancar. Instálalo como app y practica 10 minutos al día.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/registro" shimmer>
            <IconBolt className="size-5" />
            Crear cuenta gratis
          </Button>
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
