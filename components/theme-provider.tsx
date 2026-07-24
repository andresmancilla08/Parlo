"use client";

import { useEffect } from "react";
import { applyTheme, useTheme } from "@/lib/theme";

/** Sincroniza el tema elegido con la clase `dark` y escucha cambios del sistema. */
export function ThemeProvider() {
  const theme = useTheme((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (useTheme.getState().theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return null;
}
