"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  type Icon,
} from "@tabler/icons-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "@/components/ui/mascot";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangToggle } from "@/components/ui/lang-toggle";
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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 90]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0.35]);

  return (
    <AuroraBackground className="relative px-5 pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-2 z-0 flex justify-center sm:top-0">
        <Mascot
          height={340}
          glow
          priority
          imgClassName="h-[190px] w-auto drop-shadow-xl sm:h-[300px]"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center pt-40 text-center sm:pt-56"
      >
        <motion.span
          variants={rise}
          className="mb-6 inline-flex items-center gap-2 rounded-pill border border-border bg-surface/70 px-4 py-1.5 text-sm font-semibold text-muted backdrop-blur"
        >
          <IconSparkles className="size-4 text-primary" />
          {t("landing.badge")}
        </motion.span>

        <motion.h1
          variants={rise}
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
        >
          {t("landing.hero_pre")}
          <GradientText>{t("landing.hero_hl")}</GradientText>
          {t("landing.hero_post")}
        </motion.h1>

        <motion.p variants={rise} className="mt-5 max-w-xl text-lg text-muted">
          {t("landing.hero_subtitle")}
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button href="/registro" shimmer>
            <IconBolt className="size-5" />
            {t("landing.hero_cta")}
          </Button>
          <Button href="#metodo" variant="secondary">
            {t("landing.hero_cta2")}
          </Button>
        </motion.div>

        <motion.p variants={rise} className="mt-5 text-sm text-muted">
          {t("landing.hero_note")}
        </motion.p>
      </motion.div>
    </AuroraBackground>
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
