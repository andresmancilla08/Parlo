"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconArrowLeft, IconMessageChatbot, IconTool } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";

export default function LeccionPage() {
  const { t } = useTranslation();
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        <span className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-3xl bg-accent-soft text-accent">
          <IconTool className="size-8" />
        </span>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          {t("leccion.title")}
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
          {t("leccion.body")}
        </p>
        <div className="mt-7 flex flex-col items-center gap-3">
          <Button href="/app/tutor" shimmer>
            <IconMessageChatbot className="size-5" />
            {t("leccion.go_tutor")}
          </Button>
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted"
          >
            <IconArrowLeft className="size-4" />
            {t("leccion.back")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
