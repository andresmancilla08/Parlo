"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { I18nextProvider } from "react-i18next";
import i18n, { LANG_KEY } from "@/lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY);
    const lang =
      stored === "en" || stored === "es"
        ? stored
        : navigator.language?.startsWith("en")
          ? "en"
          : "es";
    if (lang !== i18n.resolvedLanguage) i18n.changeLanguage(lang);
  }, []);

  // `reducedMotion="user"` respeta `prefers-reduced-motion` en TODA la app:
  // las animaciones de posición y escala se anulan solas, sin tocar cada una.
  return (
    <I18nextProvider i18n={i18n}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </I18nextProvider>
  );
}
