"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconBook,
  IconCards,
  IconLanguage,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconSearch,
  IconTrash,
  IconUpload,
  IconVolume,
} from "@tabler/icons-react";
import { parseFile } from "@/lib/reader/parse";
import { deleteDoc, getDoc, listDocs, saveDoc, type StoredDoc } from "@/lib/reader/store";
import { buildIndex, cleanWord, search, toSentences, toWords } from "@/lib/reader/segment";
import { vocabCandidates } from "@/lib/reader/vocab";
import { detectLang, targetLang } from "@/lib/reader/detect";
import { RATE_SLOW, speak } from "@/lib/tts";
import { useProgress } from "@/lib/progress";
import { IconTurtle } from "@/components/ui/icon-turtle";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function LeerPage() {
  const params = useSearchParams();
  const id = params.get("d");
  return id ? <Reader id={id} /> : <Library />;
}

/* ---------------- biblioteca ---------------- */

function Library() {
  const { t } = useTranslation();
  const router = useRouter();
  const [docs, setDocs] = useState<StoredDoc[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    listDocs()
      .then(setDocs)
      .catch(() => setDocs([]));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function onFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const parsed = await parseFile(file);
      if ("error" in parsed) {
        setError(t(`leer.err_${parsed.error}`));
        return;
      }
      await saveDoc({
        id: `${Date.now()}`,
        title: parsed.title,
        text: parsed.text,
        size: file.size,
        addedAt: Date.now(),
        position: 0,
        lang: detectLang(parsed.text),
      });
      refresh();
    } catch {
      setError(t("leer.err_read"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {t("leer.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight">
          {t("leer.title")}
        </h1>
        <p className="mt-2 text-sm text-muted">{t("leer.subtitle")}</p>
      </motion.header>

      <label className="mt-6 block cursor-pointer active:scale-[0.99]">
        <Card className="flex items-center gap-3.5 border-primary/40 p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
            <IconUpload className="size-5" stroke={2.2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-extrabold">
              {busy ? t("leer.reading") : t("leer.upload")}
            </span>
            <span className="block text-xs font-bold text-muted">{t("leer.upload_hint")}</span>
          </span>
        </Card>
        <input
          type="file"
          accept=".txt,.md,.markdown,.csv,.log,.docx,.epub,application/pdf,text/plain"
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </label>

      {error && (
        <p role="alert" className="mt-3 text-sm font-bold text-danger-ink">
          {error}
        </p>
      )}

      <p className="mt-8 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("leer.library")}
      </p>

      {docs && docs.length === 0 && (
        <p className="text-sm text-muted">{t("leer.empty")}</p>
      )}

      <div className="space-y-2.5">
        {docs?.map((doc) => (
          <Card key={doc.id} className="flex items-center gap-3 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
              <IconBook className="size-5" stroke={2.2} />
            </span>
            <button
              onClick={() => router.push(`/app/leer?d=${doc.id}`)}
              className="min-w-0 flex-1 text-left"
            >
              <span className="block line-clamp-1 font-display text-base font-extrabold">
                {doc.title}
              </span>
              <span className="block text-xs font-bold text-muted">
                {t("leer.meta", {
                  kb: Math.max(1, Math.round(doc.size / 1024)),
                  n: toSentences(doc.text).length,
                })}
              </span>
            </button>
            <button
              onClick={async () => {
                await deleteDoc(doc.id);
                refresh();
              }}
              aria-label={t("leer.remove")}
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-danger-ink"
            >
              <IconTrash className="size-4" />
            </button>
          </Card>
        ))}
      </div>

      <p className="mt-4 text-xs font-semibold text-muted">{t("leer.privacy")}</p>
    </div>
  );
}

/* ---------------- lector ---------------- */

const CACHE_KEY = "parlo-doc-es";

function readCache(id: string): Record<number, string> {
  try {
    return JSON.parse(localStorage.getItem(`${CACHE_KEY}:${id}`) ?? "{}");
  } catch {
    return {};
  }
}

function writeCache(id: string, data: Record<number, string>) {
  try {
    localStorage.setItem(`${CACHE_KEY}:${id}`, JSON.stringify(data));
  } catch {
    // Sin espacio: la traducción se volverá a pedir.
  }
}

function Reader({ id }: { id: string }) {
  const { t } = useTranslation();
  const router = useRouter();
  const noteListen = useProgress((s) => s.noteListen);
  const addCard = useProgress((s) => s.addCard);

  const [vocabAdded, setVocabAdded] = useState<number | null>(null);
  const [doc, setDoc] = useState<StoredDoc | null | undefined>(undefined);
  const [current, setCurrent] = useState(0);
  const [reading, setReading] = useState(false);
  const [showEs, setShowEs] = useState(false);
  const [es, setEs] = useState<Record<number, string>>({});
  const [query, setQuery] = useState("");
  const [word, setWord] = useState<{ word: string; context: string } | null>(null);
  const stop = useRef(false);

  useEffect(() => {
    getDoc(id).then((d) => {
      setDoc(d ?? null);
      if (d) {
        setCurrent(d.position);
        setEs(readCache(id));
      }
    });
  }, [id]);

  const sentences = useMemo(() => (doc ? toSentences(doc.text) : []), [doc]);
  // Documentos viejos (sin idioma guardado): se deduce al abrirlos.
  const lang = doc ? (doc.lang ?? detectLang(doc.text)) : "en";
  const to = targetLang(lang);
  const index = useMemo(() => buildIndex(sentences), [sentences]);
  const hits = useMemo(() => (query ? search(index, query) : []), [index, query]);
  const visible = query ? sentences.filter((s) => hits.includes(s.i)) : sentences;

  /** Guarda por dónde va la lectura para poder retomar. */
  const remember = useCallback(
    (i: number) => {
      if (doc) saveDoc({ ...doc, position: i }).catch(() => {});
    },
    [doc],
  );

  function readOne(i: number, rate?: number) {
    setCurrent(i);
    remember(i);
    speak(sentences[i].text, lang, rate);
    noteListen();
  }

  /** Lectura continua: encadena frases hasta el final o hasta que se pare. */
  async function readAll(from: number) {
    stop.current = false;
    setReading(true);
    for (let i = from; i < sentences.length; i++) {
      if (stop.current) break;
      setCurrent(i);
      remember(i);
      await speakAndWait(sentences[i].text, lang);
    }
    setReading(false);
  }

  async function translateVisible() {
    const missing = visible.filter((s) => !es[s.i]).slice(0, 20);
    if (missing.length === 0) return;
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lines: missing.map((s) => s.text), from: lang }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { lines: string[] };
      const next = { ...es };
      missing.forEach((s, k) => (next[s.i] = data.lines[k] ?? ""));
      setEs(next);
      writeCache(id, next);
    } catch {
      // Sin red: se queda sólo el inglés.
    }
  }

  if (doc === undefined) return <p className="p-6 text-sm text-muted">{t("common.loading")}</p>;
  if (doc === null) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted">{t("leer.not_found")}</p>
        <Button className="mt-4" onClick={() => router.push("/app/leer")}>
          {t("leer.back")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4 sm:px-5">
      <div className="flex items-center gap-3">
        <BackButton onClick={() => router.push("/app/leer")} className="shrink-0 px-3 py-1.5 text-xs" />
        <p className="line-clamp-1 min-w-0 flex-1 font-display text-sm font-extrabold">
          {doc.title}
        </p>
        <span className="shrink-0 rounded-pill bg-accent-soft px-2 py-0.5 text-[0.65rem] font-extrabold uppercase text-accent-ink">
          {lang}
        </span>
        <span className="shrink-0 text-xs font-bold tabular-nums text-muted">
          {current + 1}/{sentences.length}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="flex min-w-0 flex-1 items-center gap-2 rounded-pill border border-border bg-surface px-3 py-2">
          <IconSearch className="size-4 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("leer.search")}
            aria-label={t("leer.search")}
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-muted"
          />
        </span>
        <Button
          variant="secondary"
          className="shrink-0 px-3 py-2 text-xs"
          onClick={() => {
            setShowEs((v) => !v);
            if (!showEs) translateVisible();
          }}
        >
          <IconLanguage className="size-4" />
          {showEs
            ? t(lang === "en" ? "leer.only_en" : "leer.only_es")
            : t(to === "es" ? "leer.show_es" : "leer.show_en")}
        </Button>
      </div>

      {query && (
        <p className="mt-2 text-xs font-bold text-muted">
          {t("leer.results", { n: hits.length })}
        </p>
      )}

      {/* Vocabulario del documento entero al repaso: lo que más se repite en lo
          que TÚ lees es justo lo que te conviene aprender. */}
      <button
        type="button"
        onClick={() => {
          const known = new Set(Object.keys(useProgress.getState().cards).map((k) => k.toLowerCase()));
          const picked = vocabCandidates(doc.text, known, 20);
          picked.forEach((c) => addCard(c.word));
          setVocabAdded(picked.length);
        }}
        className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-left transition-colors hover:border-accent active:scale-[0.99]"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
          <IconCards className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-extrabold">
            {vocabAdded === null
              ? t("leer.vocab_cta")
              : vocabAdded > 0
                ? t("leer.vocab_added", { n: vocabAdded })
                : t("leer.vocab_none")}
          </span>
          <span className="block text-xs font-bold text-muted">{t("leer.vocab_hint")}</span>
        </span>
      </button>

      <div className="mt-4 space-y-1">
        {visible.map((s) => (
          <div
            key={s.i}
            className={cn(
              "rounded-xl px-3 py-2 transition-colors",
              s.i === current && "bg-primary-soft",
            )}
          >
            <p className="text-lg leading-relaxed">
              {toWords(s.text).map((chunk, k) =>
                chunk.trim() === "" ? (
                  chunk
                ) : (
                  <button
                    key={k}
                    onClick={() => setWord({ word: cleanWord(chunk), context: s.text })}
                    className="rounded px-0.5 font-semibold transition-colors hover:bg-accent-soft hover:text-accent-ink"
                  >
                    {chunk}
                  </button>
                ),
              )}
              <button
                onClick={() => readOne(s.i)}
                aria-label={t("a11y.listen_option", { text: s.text.slice(0, 40) })}
                className="ml-1.5 inline-grid size-7 place-items-center rounded-full bg-accent-soft align-middle text-accent-ink"
              >
                <IconVolume className="size-3.5" />
              </button>
              <button
                onClick={() => readOne(s.i, RATE_SLOW)}
                aria-label={t("a11y.listen_slow", { text: s.text.slice(0, 40) })}
                title={t("common.slow")}
                className="ml-1 inline-grid size-7 place-items-center rounded-full bg-accent-soft align-middle text-accent-ink"
              >
                <IconTurtle className="size-4" />
              </button>
            </p>
            {showEs && es[s.i] && (
              // La traducción también se escucha, en la voz del OTRO idioma:
              // oír la frase en los dos idiomas es media clase de vocabulario.
              <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
                <span className="min-w-0">{es[s.i]}</span>
                <SpeakControls text={es[s.i]} lang={to} size="sm" onPlay={noteListen} />
              </p>
            )}
          </div>
        ))}
      </div>

      {/* control de lectura continua */}
      <div className="fixed inset-x-0 bottom-20 z-30 mx-auto w-full max-w-2xl px-4 md:bottom-6">
        <Button
          fullWidth
          onClick={() => {
            if (reading) {
              stop.current = true;
              window.speechSynthesis?.cancel();
              setReading(false);
            } else {
              readAll(current);
            }
          }}
        >
          {reading ? (
            <>
              <IconPlayerStopFilled className="size-5" />
              {t("leer.stop")}
            </>
          ) : (
            <>
              <IconPlayerPlayFilled className="size-5" />
              {t("leer.play")}
            </>
          )}
        </Button>
      </div>

      {word && (
        <WordCard
          key={`${word.word}-${word.context}`}
          word={word.word}
          context={word.context}
          lang={lang}
          onClose={() => setWord(null)}
        />
      )}
    </div>
  );
}

/** Habla y espera a que termine, para poder encadenar frases. */
function speakAndWait(text: string, lang: "en" | "es"): Promise<void> {
  return new Promise((resolve) => {
    speak(text, lang);
    const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    if (!synth) return resolve();
    const check = setInterval(() => {
      if (!synth.speaking && !synth.pending) {
        clearInterval(check);
        resolve();
      }
    }, 200);
  });
}

/* ---------------- significado de una palabra ---------------- */

function WordCard({
  word,
  context,
  lang,
  onClose,
}: {
  word: string;
  context: string;
  lang: "en" | "es";
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const addCard = useProgress((s) => s.addCard);
  const [info, setInfo] = useState<{ translation: string; meaning: string; example: string } | null>(
    null,
  );
  const [failed, setFailed] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ mode: "word", word, context, from: lang }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) setInfo(data);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [word, context, lang]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
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
          onClick={() => speak(word, lang)}
          aria-label={t("a11y.listen_option", { text: word })}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink"
        >
          <IconVolume className="size-5" />
        </button>
        <button
          onClick={() => speak(word, lang, RATE_SLOW)}
          aria-label={t("a11y.listen_slow", { text: word })}
          title={t("common.slow")}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink"
        >
          <IconTurtle className="size-6" />
        </button>
        <button
          onClick={onClose}
          aria-label={t("leer.close")}
          className="grid size-10 shrink-0 place-items-center rounded-full text-muted"
        >
          ✕
        </button>
      </div>

      {!info && !failed && <p className="mt-3 text-sm font-bold text-muted">{t("common.loading")}</p>}
      {failed && (
        <p role="alert" className="mt-3 text-sm font-bold text-danger-ink">
          {t("leer.word_error")}
        </p>
      )}
      {info && (
        <>
          <p className="mt-3 text-sm leading-relaxed text-fg/85">{info.meaning}</p>
          <p className="mt-2 text-sm font-semibold text-muted">{info.example}</p>
          <Button
            variant="secondary"
            fullWidth
            className="mt-4"
            disabled={saved}
            onClick={() => {
              addCard(word);
              setSaved(true);
            }}
          >
            {saved ? t("leer.saved") : t("leer.save_word")}
          </Button>
        </>
      )}
    </motion.div>
  );
}
