"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import badgeLevel from "@/public/brand/badge-level.png";
import badgeStreak from "@/public/brand/badge-streak.png";
import badgeWords from "@/public/brand/badge-words.png";
import {
  IconCalendarStar,
  IconCircleCheck,
  IconEar,
  IconFlame,
  IconLogout,
  IconMessages,
  IconSparkles,
  IconTargetArrow,
  IconTrophy,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { levelFromXp } from "@/lib/gamification";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";
import { allLessons, learnedVocab, unitOfLesson } from "@/lib/curriculum";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangToggle } from "@/components/ui/lang-toggle";
import { VoicePicker } from "@/components/ui/voice-picker";
import { speak, useServerVoice } from "@/lib/tts";
import { ReminderSetting } from "@/components/app/reminder-setting";
import { playCorrect, useSfx } from "@/lib/sfx";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function PerfilPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const email = useAuth((s) => s.email);
  const verified = useAuth((s) => s.emailVerified);
  const logout = useAuth((s) => s.logout);
  const hydrated = useHydrated();
  const streak = useProgress((s) => s.streak);
  const gems = useProgress((s) => s.gems);
  const xp = useProgress((s) => s.xp);
  const completed = useProgress((s) => s.completed);
  const tutorMessages = useProgress((s) => s.tutorMessages);
  const listens = useProgress((s) => s.listens);

  const name = email?.split("@")[0] ?? "";
  const rank = levelFromXp(hydrated ? xp : 0);

  // «Logros» = insignias ganadas (antes mostraba el nº de lecciones: engañoso).
  const badgesEarned = [
    completed.length >= 1,
    streak >= 3,
    learnedVocab(new Set(completed)).length >= 10,
    streak >= 30,
    tutorMessages >= 1,
    listens >= 20,
  ];
  const earnedBadges = badgesEarned.filter(Boolean).length;

  // Nivel actual = el de la unidad en curso (ya no es un texto fijo A1).
  const done = new Set(completed);
  const nextLesson = allLessons.find((l) => !done.has(l.id)) ?? allLessons[allLessons.length - 1];
  const level = unitOfLesson(nextLesson.id)?.level ?? "A1";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-8 sm:px-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-col items-center text-center"
      >
        <span className="grid size-20 place-items-center rounded-full bg-primary font-display text-3xl font-extrabold uppercase text-primary-fg shadow-lg shadow-primary/25">
          {name.charAt(0) || "P"}
        </span>
        <h1 className="mt-4 max-w-full break-words font-display text-xl font-extrabold">{name}</h1>
        <p className="max-w-full break-all text-sm text-muted">{email}</p>
        {verified && (
          <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-success-ink">
            <IconCircleCheck className="size-4" />
            {t("verify.verified")}
          </span>
        )}
        <span className="mt-3 rounded-pill bg-accent-soft px-3 py-1 text-sm font-bold text-accent-ink">
          {t("perfil.level", { level })}
        </span>
      </motion.div>

      {/* nivel de avance (XP) → lleva a retos y objetivos */}
      <Link href="/app/retos" className="mt-6 block active:scale-[0.99]">
        <Card className="p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-base font-extrabold">
              {t("retos.level_title", { n: rank.level })}
              <span className="ml-2 text-sm font-bold text-accent-ink">
                {t(`retos.rank_${rank.rank}`)}
              </span>
            </p>
            <p className="shrink-0 text-xs font-bold text-muted">
              {t("retos.level_progress", {
                into: rank.into,
                need: rank.need,
                next: rank.level + 1,
              })}
            </p>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-border">
            <div
              className="h-full rounded-pill bg-primary transition-[width] duration-500"
              style={{ width: `${Math.round(rank.fraction * 100)}%` }}
            />
          </div>
        </Card>
      </Link>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        <StatCard icon={IconFlame} value={String(hydrated ? streak : 0)} label={t("perfil.streak")} tint="text-primary" />
        <StatCard icon={IconSparkles} value={String(hydrated ? gems : 0)} label={t("perfil.gems")} tint="text-gem" />
        <StatCard icon={IconTrophy} value={String(hydrated ? earnedBadges : 0)} label={t("perfil.achievements")} tint="text-accent" />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-muted">
          {t("perfil.badges_title")}
        </p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <BadgeTile
            src={badgeLevel}
            title={t("perfil.badge_level")}
            earned={hydrated && completed.length >= 1}
          />
          <BadgeTile
            src={badgeStreak}
            title={t("perfil.badge_streak")}
            earned={hydrated && streak >= 3}
          />
          <BadgeTile
            src={badgeWords}
            title={t("perfil.badge_words")}
            earned={hydrated && learnedVocab(new Set(completed)).length >= 10}
          />
          <BadgeTile
            icon={IconCalendarStar}
            title={t("perfil.badge_streak30")}
            earned={hydrated && streak >= 30}
          />
          <BadgeTile
            icon={IconMessages}
            title={t("perfil.badge_talk")}
            earned={hydrated && tutorMessages >= 1}
          />
          <BadgeTile
            icon={IconEar}
            title={t("perfil.badge_listen")}
            earned={hydrated && listens >= 20}
          />
        </div>
      </div>

      <Link href="/app/test" className="mt-8 block active:scale-[0.99]">
        <Card className="flex items-center gap-3 p-4">
          <IconTargetArrow className="size-5 shrink-0 text-primary" />
          <span className="flex-1 text-sm font-bold">{t("test.redo")}</span>
        </Card>
      </Link>

      <div className="mt-8">
        <p className="mb-2 text-sm font-semibold text-muted">{t("reminder.section")}</p>
        <ReminderSetting />
      </div>

      <NeuralVoiceSetting />

      <div className="mt-8">
        <p className="mb-2 text-sm font-semibold text-muted">
          {t("perfil.voice_title")}
        </p>
        <VoicePicker />
      </div>

      <SoundSetting />

      <div className="mt-8">
        <p className="mb-2 text-sm font-semibold text-muted">
          {t("perfil.appearance")}
        </p>
        <div className="flex gap-2">
          <ThemeToggle showLabel className="flex-1 justify-center" />
          <LangToggle className="justify-center" />
        </div>
      </div>

      <Button
        variant="danger"
        fullWidth
        className="mt-4"
        onClick={async () => {
          await logout();
          router.replace("/");
        }}
      >
        <IconLogout className="size-5" />
        {t("perfil.logout")}
      </Button>
    </div>
  );
}

/** Interruptor de los sonidos de acierto/error (suena al encenderlos). */
function SoundSetting() {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const on = useSfx((s) => s.on);
  const setOn = useSfx((s) => s.setOn);
  const active = hydrated ? on : true;

  return (
    <div className="mt-8">
      <p className="mb-2 text-sm font-semibold text-muted">{t("perfil.sound_title")}</p>
      <Card className="flex items-center gap-3 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
          {active ? <IconVolume className="size-5" /> : <IconVolumeOff className="size-5" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-extrabold">
            {t(active ? "perfil.sound_on" : "perfil.sound_off")}
          </span>
          <span className="block text-xs font-bold text-muted">{t("perfil.sound_hint")}</span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label={t("perfil.sound_title")}
          onClick={() => {
            const next = !active;
            setOn(next);
            if (next) playCorrect(); // se oye lo que acabas de activar
          }}
          className={cn(
            "relative h-7 w-12 shrink-0 rounded-pill transition-colors",
            active ? "bg-primary" : "bg-border",
          )}
        >
          <motion.span
            layout
            transition={spring}
            className={cn(
              "absolute top-1 size-5 rounded-full bg-white shadow",
              active ? "left-6" : "left-1",
            )}
          />
        </button>
      </Card>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  tint,
}: {
  icon: typeof IconFlame;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <Card className="p-4 text-center">
      <Icon className={cn("mx-auto mb-1 size-6", tint)} />
      <p className="font-display text-lg font-extrabold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </Card>
  );
}

/** Logro: con arte propio (`src`) o con medalla de icono (`icon`). */
function BadgeTile({
  src,
  icon: Icon,
  title,
  earned,
}: {
  src?: StaticImageData;
  icon?: typeof IconFlame;
  title: string;
  earned: boolean;
}) {
  return (
    // p-3 y 56px en móvil: con 72px + p-4 las 3 columnas no caben en 360px.
    <Card
      className={cn(
        "flex min-w-0 flex-col items-center gap-2 p-3 text-center sm:p-4",
        !earned && "opacity-90",
      )}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          height={72}
          width={Math.round((72 * src.width) / src.height)}
          className={cn("h-14 w-auto transition sm:h-[72px]", !earned && "opacity-25 grayscale")}
        />
      ) : Icon ? (
        // Moneda: aro dorado + centro coral, para que hable el mismo idioma
        // que las medallas ilustradas de al lado.
        <span
          className={cn(
            "grid size-14 place-items-center rounded-full bg-gem p-[5px] shadow-md shadow-gem/30 transition sm:size-[72px]",
            !earned && "opacity-25 grayscale",
          )}
        >
          <span className="grid size-full place-items-center rounded-full bg-primary text-white shadow-inner">
            <Icon className="size-7 sm:size-8" stroke={2.2} />
          </span>
        </span>
      ) : null}
      <p className="hyphens-auto text-[0.7rem] font-bold leading-tight sm:text-xs">{title}</p>
    </Card>
  );
}

/**
 * Voz neural del servidor. Se puede apagar: hay quien prefiere la voz de su
 * sistema (o estar sin datos), y el respaldo es justo esa.
 */
function NeuralVoiceSetting() {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const on = useServerVoice((s) => s.on);
  const toggle = useServerVoice((s) => s.toggle);
  const active = hydrated ? on : true;

  return (
    <div className="mt-8">
      <p className="mb-2 text-sm font-semibold text-muted">{t("perfil.neural_title")}</p>
      <Card className="flex items-center gap-3 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
          <IconSparkles className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-extrabold">
            {t(active ? "perfil.neural_on" : "perfil.neural_off")}
          </span>
          <span className="block text-xs font-bold text-muted">{t("perfil.neural_hint")}</span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={active}
          aria-label={t("perfil.neural_title")}
          onClick={() => {
            toggle();
            // Se oye el cambio: la frase suena con la voz que acabas de elegir.
            if (!active) speak("This is the neural voice.", "en");
          }}
          className={cn(
            "relative h-7 w-12 shrink-0 rounded-pill transition-colors",
            active ? "bg-primary" : "bg-border",
          )}
        >
          <motion.span
            layout
            transition={spring}
            className={cn(
              "absolute top-1 size-5 rounded-full bg-white shadow",
              active ? "left-6" : "left-1",
            )}
          />
        </button>
      </Card>
    </div>
  );
}
