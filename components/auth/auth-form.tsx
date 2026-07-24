"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconArrowRight, IconMail } from "@tabler/icons-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/ui/mascot";
import { spring } from "@/lib/motion";
import { PinInput } from "./pin-input";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { t } = useTranslation();
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [busy, setBusy] = useState(false);

  const isLogin = mode === "login";
  const canSubmit = email.includes("@") && pin.length === 4 && !busy;

  const submit = async () => {
    setBusy(true);
    const { ok } = await login(email, pin);
    setBusy(false);
    if (ok) {
      router.push("/app");
      return;
    }
    setError(t("auth.invalid"));
    setShake(true);
    setPin("");
    setTimeout(() => setShake(false), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="w-full max-w-sm"
    >
      <div className="mb-8 text-center">
        <div className="mb-3 flex justify-center">
          <Mascot height={108} />
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          {isLogin ? t("auth.login_title") : t("auth.signup_title")}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {isLogin ? t("auth.login_subtitle") : t("auth.signup_subtitle")}
        </p>
      </div>

      <motion.form
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.35 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) submit();
        }}
        className="rounded-3xl border border-border bg-card p-6 shadow-sm"
      >
        <label className="mb-1.5 block text-sm font-semibold text-fg">
          {t("auth.email")}
        </label>
        <div className="relative mb-5">
          <IconMail className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder={t("auth.email_ph")}
            className="w-full rounded-2xl border-2 border-border bg-surface py-3 pl-11 pr-4 text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>

        <label className="mb-2.5 block text-sm font-semibold text-fg">
          {t("auth.pin")}
        </label>
        <PinInput
          value={pin}
          onChange={(v) => {
            setPin(v);
            setError(null);
          }}
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm font-medium text-danger"
          >
            {error}
          </motion.p>
        )}

        <Button type="submit" fullWidth shimmer disabled={!canSubmit} className="mt-6">
          {isLogin ? t("auth.login_btn") : t("auth.signup_btn")}
          <IconArrowRight className="size-5" />
        </Button>
      </motion.form>

      <p className="mt-6 text-center text-sm text-muted">
        {isLogin ? t("auth.no_account") : t("auth.have_account")}
        <Link
          href={isLogin ? "/registro" : "/login"}
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          {isLogin ? t("auth.go_signup") : t("auth.go_login")}
        </Link>
      </p>
    </motion.div>
  );
}
