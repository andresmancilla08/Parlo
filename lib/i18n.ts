"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

export const LANG_KEY = "parlo-lang";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    // Idioma fijo en el primer render (SSR + hidratación); el provider lo cambia
    // en cliente según preferencia guardada, evitando mismatch de hidratación.
    lng: "es",
    fallbackLng: "es",
    supportedLngs: ["es", "en"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
