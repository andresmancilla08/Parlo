"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import badgeLevel from "@/public/brand/badge-level.png";
import badgeStreak from "@/public/brand/badge-streak.png";
import badgeWords from "@/public/brand/badge-words.png";
import {
  IconFlame,
  IconLogout,
  IconSparkles,
  IconTrophy,
} from "@tabler/icons-react";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";
import { learnedVocab } from "@/lib/curriculum";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangToggle } from "@/components/ui/lang-toggle";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function PerfilPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const email = useAuth((s) => s.email);
  const logout = useAuth((s) => s.logout);
  const hydrated = useHydrated();
  const streak = useProgress((s) => s.streak);
  const gems = useProgress((s) => s.gems);
  const completed = useProgress((s) => s.completed);

  const name = email?.split("@")[0] ?? "";

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-col items-center text-center"
      >
        <span className="grid size-20 place-items-center rounded-full bg-primary font-display text-3xl font-extrabold uppercase text-primary-fg shadow-lg shadow-primary/25">
          {name.charAt(0) || "P"}
        </span>
        <h1 className="mt-4 font-display text-xl font-extrabold">{name}</h1>
        <p className="text-sm text-muted">{email}</p>
        <span className="mt-3 rounded-pill bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
          {t("perfil.level")}
        </span>
      </motion.div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <StatCard icon={IconFlame} value={String(hydrated ? streak : 0)} label={t("perfil.streak")} tint="text-primary" />
        <StatCard icon={IconSparkles} value={String(hydrated ? gems : 0)} label={t("perfil.gems")} tint="text-gem" />
        <StatCard icon={IconTrophy} value={String(hydrated ? completed.length : 0)} label={t("perfil.achievements")} tint="text-accent" />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-muted">
          {t("perfil.badges_title")}
        </p>
        <div className="grid grid-cols-3 gap-3">
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
        </div>
      </div>

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

function BadgeTile({
  src,
  title,
  earned,
}: {
  src: StaticImageData;
  title: string;
  earned: boolean;
}) {
  return (
    <Card className={cn("flex flex-col items-center gap-2 p-4 text-center", !earned && "opacity-90")}>
      <Image
        src={src}
        alt=""
        height={72}
        width={Math.round((72 * src.width) / src.height)}
        className={cn("transition", !earned && "opacity-25 grayscale")}
      />
      <p className="text-xs font-bold leading-tight">{title}</p>
    </Card>
  );
}
