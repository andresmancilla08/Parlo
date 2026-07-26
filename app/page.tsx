"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconBolt,
  IconBrain,
  IconFlame,
  IconMessageChatbot,
  IconPencil,
  IconRoute,
  IconSparkles,
  IconTrophy,
  type Icon,
} from "@tabler/icons-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "@/components/ui/mascot";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangToggle } from "@/components/ui/lang-toggle";
import { cn } from "@/lib/utils";
import { rise, spring, stagger } from "@/lib/motion";
import decoCloud from "@/public/brand/deco-cloud.png";
import decoFeather from "@/public/brand/deco-feather.png";
import decoBubble from "@/public/brand/deco-bubble.png";

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
  return <Logo height={32} priority />;
}

function Nav() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Wordmark />
        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle className="px-2.5" />
          <Button href="/login" variant="secondary" size="sm" className="hidden sm:inline-flex">
            {t("nav.login")}
          </Button>
          <Button href="/registro" size="sm" shimmer>
            {t("nav.signup")}
          </Button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // El texto se va antes que el escenario: da sensación de cámara, no de bloque.
  const y = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 60]);
  const opacity = useTransform(scrollY, [0, 460], [1, reduce ? 1 : 0.4]);

  return (
    <AuroraBackground className="relative overflow-hidden px-5 pb-14 pt-10 sm:pb-16 lg:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* --- columna de texto: zona segura, ningún decorativo entra aquí --- */}
        <motion.div
          // Con reduced-motion el contenido aparece ya visible: nunca debe
          // depender de que la animación llegue a ejecutarse.
          initial={reduce ? "show" : "hidden"}
          animate="show"
          variants={stagger}
          style={{ y, opacity }}
          className="relative z-20 order-2 lg:order-1"
        >
          {/* scrim: garantiza contraste del texto sobre cualquier mancha del aurora */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 bg-bg/70 blur-2xl"
          />
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-2 rounded-pill border border-border bg-surface/70 px-4 py-1.5 text-sm font-semibold text-muted backdrop-blur"
          >
            <IconSparkles className="size-4 text-primary" />
            {t("landing.badge")}
          </motion.span>

          <motion.h1
            variants={rise}
            className="mt-6 max-w-[15ch] font-display text-[2.65rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.1rem]"
          >
            {t("landing.hero_pre")}
            <GradientText>{t("landing.hero_hl")}</GradientText>
            {t("landing.hero_post")}
          </motion.h1>

          <motion.p variants={rise} className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {t("landing.hero_subtitle")}
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-col gap-3 sm:flex-row [&_a]:w-full sm:[&_a]:w-auto"
          >
            <Button href="/registro" shimmer className="w-full justify-center sm:w-auto">
              <IconBolt className="size-5" />
              {t("landing.hero_cta")}
            </Button>
            <Button href="#metodo" variant="secondary" className="w-full justify-center sm:w-auto">
              {t("landing.hero_cta2")}
            </Button>
          </motion.div>

          <motion.p variants={rise} className="mt-5 text-sm text-muted">
            {t("landing.hero_note")}
          </motion.p>
        </motion.div>

        {/* --- escenario: la mascota y su profundidad viven SOLO aquí --- */}
        <Stage />
      </div>
    </AuroraBackground>
  );
}

/**
 * Escenario de la mascota: tres planos de profundidad (far/mid/near). Lo lejano
 * se mueve poco y va desenfocado; lo cercano se mueve más y va nítido.
 */
function Stage() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yMascot = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 70]);

  return (
    <div
      aria-hidden
      className="relative order-1 h-[190px] select-none sm:h-[240px] lg:order-2 lg:h-[440px]"
    >
      {/* Los decorativos se posicionan contra ESTA caja, no contra la columna:
          si no, en tablet se dispersan hasta los bordes de la pantalla. */}
      <div className="relative mx-auto h-full w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none">
        {/* pozo de luz (el escenario del personaje) */}
        <div className="absolute left-1/2 top-1/2 size-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl sm:size-[250px] lg:size-[420px]" />

        <Deco src={decoCloud} depth="far" width={260} className="-left-6 -top-4 w-[140px] lg:-left-16 lg:-top-10 lg:w-[260px]" />
        <Deco src={decoBubble} depth="mid" width={88} className="bottom-0 -left-1 hidden w-[52px] sm:block lg:-left-8 lg:w-[88px]" />
        <Deco src={decoFeather} depth="near" width={58} spin={10} className="-right-1 top-6 w-[34px] lg:right-2 lg:top-20 lg:w-[58px]" />

      <motion.div
        style={{ y: yMascot }}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...spring, delay: 0.05 }}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <Mascot
          height={380}
          priority
          imgClassName="h-[155px] w-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] sm:h-[205px] lg:h-[380px]"
        />
        </motion.div>
      </div>
    </div>
  );
}

/** Profundidad: lo lejano va borroso, tenue y lento; lo cercano nítido y rápido. */
const DEPTH = {
  // Sobre fondo oscuro, bajar opacidad desatura: menos blur y algo más de
  // opacidad conservan el color de marca en vez de virar a gris sucio.
  far: { shift: 24, className: "opacity-35 blur-[3px]" },
  mid: { shift: 62, className: "opacity-65 blur-[1.5px]" },
  near: { shift: 108, className: "opacity-90" },
} as const;

/** Capa decorativa con parallax por profundidad. Nunca sobre la columna de texto. */
function Deco({
  src,
  width,
  depth,
  spin = 0,
  className,
}: {
  src: StaticImageData;
  width: number;
  depth: keyof typeof DEPTH;
  spin?: number;
  className: string;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const { shift, className: depthClass } = DEPTH[depth];
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : shift]);
  const rotate = useTransform(scrollY, [0, 600], [0, reduce ? 0 : spin]);
  const height = Math.round((width * src.height) / src.width);

  return (
    <motion.div
      aria-hidden
      style={{ y, rotate }}
      className={cn("pointer-events-none absolute z-0 select-none", depthClass, className)}
    >
      <Image src={src} alt="" width={width} height={height} className="h-auto w-full" />
    </motion.div>
  );
}

const featureItems: { key: string; icon: Icon }[] = [
  { key: "levels", icon: IconRoute },
  { key: "converse", icon: IconMessageChatbot },
  { key: "errors", icon: IconPencil },
  { key: "memory", icon: IconBrain },
];

function Method() {
  const { t } = useTranslation();
  return (
    <section id="metodo" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        kicker={t("landing.method_kicker")}
        title={t("landing.method_title")}
        subtitle={t("landing.method_subtitle")}
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {featureItems.map((f) => (
          <motion.div key={f.key} variants={rise} whileHover={{ y: -6 }} transition={spring}>
            <Card className="group h-full p-6">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform group-hover:scale-110">
                <f.icon className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold">
                {t(`landing.features.${f.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`landing.features.${f.key}.body`)}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

function Levels() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-6xl px-5 py-8">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 to-accent-soft/40 p-8 sm:p-12">
        <SectionHeading
          kicker={t("landing.levels_kicker")}
          title={t("landing.levels_title")}
          subtitle={t("landing.levels_subtitle")}
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

const rewardItems: { key: string; icon: Icon }[] = [
  { key: "streak", icon: IconFlame },
  { key: "achievements", icon: IconTrophy },
  { key: "gems", icon: IconSparkles },
];

function Rewards() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading
        kicker={t("landing.rewards_kicker")}
        title={t("landing.rewards_title")}
        subtitle={t("landing.rewards_subtitle")}
      />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-5 sm:grid-cols-3"
      >
        {rewardItems.map((r) => (
          <motion.div key={r.key} variants={rise} whileHover={{ y: -6 }} transition={spring}>
            <Card className="h-full p-6 text-center">
              <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-gem/15 text-gem">
                <r.icon className="size-7" />
              </div>
              <h3 className="font-display text-lg font-bold">
                {t(`landing.rewards.${r.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {t(`landing.rewards.${r.key}.body`)}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function FinalCta() {
  const { t } = useTranslation();
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
          {t("landing.cta_title")}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base opacity-80">
          {t("landing.cta_subtitle")}
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/registro" shimmer>
            <IconBolt className="size-5" />
            {t("landing.cta_button")}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row">
        <Wordmark />
        <p>{t("landing.footer")}</p>
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
