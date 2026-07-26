"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconLanguage, IconVolume, IconX } from "@tabler/icons-react";
import { speak } from "@/lib/tts";
import { useProgress } from "@/lib/progress";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Letra bilingüe con palabras tocables. La traducción se pide al vuelo y se
// guarda en ESTE dispositivo (nunca servimos letras ni traducciones nuestras).

type WordInfo = { translation: string; meaning: string; example: string };

const CACHE_KEY = "parlo-lyrics-es";

function readCache(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeCache(songId: string, lines: string[]) {
  try {
    const all = readCache();
    all[songId] = lines;
    localStorage.setItem(CACHE_KEY, JSON.stringify(all));
  } catch {
    // Sin espacio: la traducción se volverá a pedir. No es crítico.
  }
}

/** Traducción de la letra, cacheada por canción en el dispositivo. */
export function useLyricsEs(songId: string, lines: string[]) {
  const [es, setEs] = useState<string[] | null>(() => readCache()[songId] ?? null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const asked = useRef(false);

  async function load() {
    if (asked.current || es) return;
    asked.current = true;
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/lyrics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { lines: string[] };
      setEs(data.lines);
      writeCache(songId, data.lines);
    } catch {
      setFailed(true);
      asked.current = false;
    } finally {
      setLoading(false);
    }
  }

  return { es, loading, failed, load };
}

/* ---------------- una línea con palabras tocables ---------------- */

export function LyricLineView({
  text,
  translation,
  active,
  showEs,
  onWord,
}: {
  text: string;
  translation?: string;
  active?: boolean;
  showEs: boolean;
  onWord: (word: string, context: string) => void;
}) {
  return (
    <div
      className={cn(
        "rounded-xl px-3 py-2 transition-colors",
        active ? "bg-primary-soft" : "bg-transparent",
      )}
    >
      <p className={cn("text-lg font-semibold leading-relaxed", active && "text-fg")}>
        {text.split(/(\s+)/).map((chunk, i) =>
          chunk.trim() === "" ? (
            chunk
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => onWord(chunk, text)}
              className="rounded px-0.5 transition-colors hover:bg-accent-soft hover:text-accent-ink"
            >
              {chunk}
            </button>
          ),
        )}
      </p>
      {showEs && translation && (
        <p className="mt-0.5 text-sm font-semibold text-muted">{translation}</p>
      )}
    </div>
  );
}

/* ---------------- hoja con el significado ---------------- */

export function WordSheet({
  word,
  context,
  onClose,
}: {
  word: string;
  context: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const noteListen = useProgress((s) => s.noteListen);
  const [info, setInfo] = useState<WordInfo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/lyrics", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ mode: "word", word, context }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as WordInfo;
        if (!cancelled) setInfo(data);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [word, context]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={spring}
        className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-xl rounded-t-[26px] border border-border bg-card p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-extrabold">{word}</p>
            {info && (
              <p className="mt-0.5 font-display text-base font-extrabold text-accent-ink">
                {info.translation}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              speak(word);
              noteListen();
            }}
            aria-label={t("a11y.listen_option", { text: word })}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink"
          >
            <IconVolume className="size-5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("canciones.close")}
            className="grid size-10 shrink-0 place-items-center rounded-full text-muted"
          >
            <IconX className="size-5" />
          </button>
        </div>

        {!info && !failed && (
          <p className="mt-3 text-sm font-bold text-muted">{t("practica.thinking")}</p>
        )}
        {failed && (
          <p role="alert" className="mt-3 text-sm font-bold text-danger-ink">
            {t("canciones.word_error")}
          </p>
        )}
        {info && (
          <>
            <p className="mt-3 text-sm leading-relaxed text-fg/85">{info.meaning}</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-muted">
              <IconLanguage className="size-4 shrink-0" />
              {info.example}
            </p>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
