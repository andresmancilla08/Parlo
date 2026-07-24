"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/** Input de PIN de 4 dígitos con avance automático, backspace y pegado. */
export function PinInput({
  value,
  onChange,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const { t } = useTranslation();
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(4, " ").slice(0, 4).split("");

  const setDigit = (i: number, d: string) => {
    const clean = d.replace(/\D/g, "");
    const next = value.split("");
    next[i] = clean;
    const joined = next.join("").replace(/\s/g, "").slice(0, 4);
    onChange(joined);
    if (clean && i < 3) refs.current[i + 1]?.focus();
  };

  return (
    <div className="flex justify-center gap-3" role="group" aria-label={t("a11y.pin_group")}>
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          type="password"
          maxLength={1}
          autoFocus={autoFocus && i === 0}
          value={digits[i]?.trim() ?? ""}
          aria-label={t("a11y.pin_digit", { n: i + 1 })}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i]?.trim() && i > 0) {
              refs.current[i - 1]?.focus();
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
            if (pasted) {
              onChange(pasted);
              refs.current[Math.min(pasted.length, 3)]?.focus();
            }
          }}
          className={cn(
            "size-14 rounded-2xl border-2 border-border bg-surface text-center font-display text-2xl font-bold text-fg outline-none transition-colors",
            "focus:border-primary focus:ring-4 focus:ring-primary/15",
          )}
        />
      ))}
    </div>
  );
}
