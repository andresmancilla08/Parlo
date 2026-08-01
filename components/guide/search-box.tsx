"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

/**
 * Buscador de la guía. `w-0 flex-1` en el input: sin eso, a 320px el
 * placeholder empuja el ancho mínimo y desborda la pantalla entera.
 */
export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-3 py-2.5 focus-within:border-primary">
      <IconSearch className="size-5 shrink-0 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t("guia.search")}
        aria-label={placeholder ?? t("guia.search")}
        className="w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={t("common.close")}
          className="grid size-7 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft hover:text-primary"
        >
          <IconX className="size-4" />
        </button>
      )}
    </div>
  );
}

/** Contador de resultados + estado vacío, que se repite en las cinco vistas. */
export function ResultCount({ n }: { n: number }) {
  const { t } = useTranslation();
  if (n === 0) return <p className="mt-6 text-sm font-semibold text-muted">{t("guia.empty")}</p>;
  return <p className="mt-3 text-xs font-bold text-muted">{t("guia.results", { n })}</p>;
}
