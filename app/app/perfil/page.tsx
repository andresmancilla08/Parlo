"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconFlame,
  IconLogout,
  IconSparkles,
  IconTrophy,
} from "@tabler/icons-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { spring } from "@/lib/motion";

export default function PerfilPage() {
  const router = useRouter();
  const email = useAuth((s) => s.email);
  const logout = useAuth((s) => s.logout);

  const name = email?.split("@")[0] ?? "";

  return (
    <div className="px-5 pt-8">
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
          Nivel A1 · Principiante
        </span>
      </motion.div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <StatCard icon={IconFlame} value="3" label="Racha" tint="text-primary" />
        <StatCard icon={IconSparkles} value="120" label="Gemas" tint="text-gem" />
        <StatCard icon={IconTrophy} value="4" label="Logros" tint="text-accent" />
      </div>

      <div className="mt-8">
        <p className="mb-2 text-sm font-semibold text-muted">Apariencia</p>
        <ThemeToggle showLabel className="w-full justify-center" />
      </div>

      <Button
        variant="danger"
        fullWidth
        className="mt-4"
        onClick={() => {
          logout();
          router.replace("/");
        }}
      >
        <IconLogout className="size-5" />
        Cerrar sesión
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
      <Icon className={`mx-auto mb-1 size-6 ${tint}`} />
      <p className="font-display text-lg font-extrabold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </Card>
  );
}
