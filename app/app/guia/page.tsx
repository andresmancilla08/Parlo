"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconArrowRight } from "@tabler/icons-react";
import { TOPICS } from "@/components/guide/topics";
import { Card } from "@/components/ui/card";
import { rise, stagger } from "@/lib/motion";

// Guía: la parte de consulta de Parlo. No es un curso ni gana XP; es el sitio
// al que vas cuando necesitas la tabla, no la lección.


export default function GuiaPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {t("guia.kicker")}
      </p>
      <h1 className="mt-1 font-display text-2xl font-black sm:text-3xl">{t("guia.title")}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("guia.subtitle")}</p>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-6 grid gap-3 sm:grid-cols-2"
      >
        {TOPICS.map((topic) => (
          <motion.div key={topic.slug} variants={rise}>
            <Link href={`/app/guia/${topic.slug}`} className="block h-full">
              <Card className="group flex h-full items-start gap-3 p-4 transition-colors hover:border-primary">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <topic.icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="min-w-0 font-display text-base font-bold">
                      {t(`guia.topic_${topic.key}`)}
                    </span>
                    <IconArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {t(`guia.topic_${topic.key}_desc`)}
                  </span>
                  <span className="mt-2 inline-block rounded-pill bg-border/60 px-2.5 py-1 text-[0.65rem] font-bold text-muted">
                    {t(topic.countKey, { n: topic.count })}
                  </span>
                </span>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
