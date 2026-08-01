"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  buildReviewExercises,
  firstPendingLesson,
  learnedVocab,
  localTitle,
  type Exercise,
} from "@/lib/curriculum";
import { dueCardKeys, qualityFromItem, useProgress } from "@/lib/progress";
import { LessonRunner } from "@/components/lesson/lesson-runner";
import { Button } from "@/components/ui/button";
import mascot from "@/public/brand/mascot.png";

export default function RepasoPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const cards = useProgress((s) => s.cards);
  const saved = useProgress((s) => s.saved);
  const completed = useProgress((s) => s.completed);
  const startLevel = useProgress((s) => s.startLevel);
  const reviewCards = useProgress((s) => s.reviewCards);

  // La sesión de repaso se fija al entrar. El layout monta esta página solo en
  // cliente (tras auth), así que el inicializador perezoso corre una vez con el
  // store ya rehidratado.
  // Todo lo que depende del reloj se calcula UNA vez aquí: el render debe ser
  // puro (react-hooks/purity) y además la sesión no debe cambiar a mitad.
  const [session] = useState(() => {
    const now = Date.now();
    // El vocabulario del currículo MÁS lo guardado a mano (lector y guía): sin
    // esto, una palabra añadida fuera de una lección nunca llegaba a preguntarse.
    const pool = [
      ...learnedVocab(new Set(completed)),
      ...Object.entries(saved).map(([en, es]) => ({ en, es })),
    ];
    const exercises: Exercise[] = buildReviewExercises(dueCardKeys(cards, now), pool);
    const soonest = Object.values(cards).reduce<number | null>(
      (min, c) => (min === null || c.due < min ? c.due : min),
      null,
    );
    return {
      exercises,
      total: Object.keys(cards).length,
      hours: soonest === null ? null : Math.max(1, Math.ceil((soonest - now) / 3_600_000)),
    };
  });
  const { exercises, total, hours } = session;

  if (exercises.length === 0) {
    const next = firstPendingLesson(new Set(completed), startLevel);

    return (
      <div className="mx-auto grid min-h-[70vh] w-full max-w-md place-items-center px-6 text-center">
        <div>
          <Image
            src={mascot}
            alt=""
            height={132}
            width={Math.round((132 * mascot.width) / mascot.height)}
            className="mx-auto"
            priority
          />
          <h1 className="mt-4 font-display text-2xl font-extrabold">
            {total === 0 ? t("repaso.none_title") : t("repaso.empty_title")}
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
            {total === 0
              ? t("repaso.none_body")
              : hours !== null
                ? t("repaso.empty_next", { n: hours, count: total })
                : t("repaso.empty_body")}
          </p>

          {/* Salir a mano izquierda no sirve de nada: se ofrece qué hacer AHORA. */}
          <div className="mt-6">
            {next ? (
              <Link href={`/app/leccion?id=${next.id}`}>
                <Button fullWidth>
                  {t("repaso.cta_lesson", { title: localTitle(next, i18n.language) })}
                  <IconArrowRight className="size-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/app/escucha">
                <Button fullWidth>
                  {t("escucha.home_cta")}
                  <IconArrowRight className="size-5" />
                </Button>
              </Link>
            )}
            <Link
              href="/app"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-muted"
            >
              <IconArrowLeft className="size-4" />
              {t("leccion.back")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LessonRunner
      title={t("repaso.title")}
      exercises={exercises}
      onComplete={({ graded }) => {
        // Cada carta avanza con la calidad de SU ejercicio (acierto 4 / fallo 2).
        reviewCards(
          graded
            .filter((g) => g.srsKey)
            .map((g) => ({ key: g.srsKey!, quality: qualityFromItem(g.ok) })),
        );
        router.push("/app");
      }}
    />
  );
}
