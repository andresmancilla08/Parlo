"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconArrowRight,
  IconClockEdit,
  IconExternalLink,
  IconLanguage,
  IconMusic,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import {
  lineAt,
  PUBLIC_DOMAIN_SONGS,
  songFromUser,
  youtubeIdFrom,
  type Song,
} from "@/lib/songs";
import { useUserSongs } from "@/lib/user-songs";
import {
  lyricsSearchUrl,
  suggestionsByLevel,
  videoSearchUrl,
  type SongSuggestion,
} from "@/lib/song-catalog";
import {
  blankHint,
  blanksFor,
  coreOf,
  DIFFICULTIES,
  sameWord,
  tokenize,
  type Difficulty,
} from "@/lib/listening";
import { useProgress } from "@/lib/progress";
import { YouTubePlayer, type SongPlayer } from "@/components/song/youtube-player";
import {
  LyricLineView,
  useLyricsEs,
  WordSheet,
} from "@/components/song/lyrics-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function CancionesPage() {
  const params = useSearchParams();
  const router = useRouter();
  const userSongs = useUserSongs((s) => s.songs);
  const videos = useUserSongs((s) => s.videos);
  const times = useUserSongs((s) => s.times);
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);

  // A las canciones del catálogo se les pega el vídeo que haya elegido el usuario.
  const all = useMemo(
    () =>
      [...userSongs, ...PUBLIC_DOMAIN_SONGS].map((song) => {
        const withVideo = song.youtubeId ? song : { ...song, youtubeId: videos[song.id] };
        const marked = times[song.id];
        // Lo marcado a mano (tap-to-sync) manda sobre los tiempos estimados.
        return marked
          ? {
              ...withVideo,
              lines: withVideo.lines.map((l, i) => ({ ...l, t: marked[i] ?? l.t })),
            }
          : withVideo;
      }),
    [userSongs, videos, times],
  );
  const song = all.find((s) => s.id === params.get("s")) ?? null;
  const urlDifficulty = DIFFICULTIES.find((d) => d.id === params.get("d")) ?? difficulty;

  if (song && song.youtubeId) {
    return (
      <Session
        key={`${song.id}-${urlDifficulty.id}`}
        song={song}
        difficulty={urlDifficulty}
        onExit={() => router.push("/app/canciones")}
      />
    );
  }

  return (
    <Picker
      songs={all}
      difficulty={difficulty}
      onDifficulty={setDifficulty}
      onPick={(s) => router.push(`/app/canciones?s=${s.id}&d=${difficulty.id}`)}
    />
  );
}

/* ---------------- elegir canción / añadir la tuya ---------------- */

function Picker({
  songs,
  difficulty,
  onDifficulty,
  onPick,
}: {
  songs: Song[];
  difficulty: Difficulty;
  onDifficulty: (d: Difficulty) => void;
  onPick: (s: Song) => void;
}) {
  const { t, i18n } = useTranslation();
  const [adding, setAdding] = useState<{ open: boolean; preset?: string }>({ open: false });
  const remove = useUserSongs((s) => s.remove);
  const groups = suggestionsByLevel();
  const have = new Set(songs.map((s) => s.title.toLowerCase()));

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {t("canciones.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight">
          {t("canciones.title")}
        </h1>
        <p className="mt-2 text-sm text-muted">{t("canciones.subtitle")}</p>
      </motion.header>

      <p className="mt-6 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("escucha.difficulty")}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.id}
            onClick={() => onDifficulty(d)}
            aria-pressed={difficulty.id === d.id}
            className={cn(
              "min-w-0 rounded-pill py-2.5 font-display text-xs font-extrabold transition-transform active:scale-95 sm:text-sm",
              difficulty.id === d.id
                ? "bg-primary text-primary-fg shadow-lg shadow-primary/25"
                : "border border-border bg-surface text-fg",
            )}
          >
            {t(`escucha.level_${d.id}`)}
          </button>
        ))}
      </div>

      <button
        onClick={() => setAdding((v) => ({ open: !v.open }))}
        className="mt-6 w-full text-left active:scale-[0.99]"
      >
        <Card className="flex items-center gap-3 border-primary/40 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
            <IconPlus className="size-5" stroke={2.4} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-sm font-extrabold">
              {t("canciones.add_title")}
            </span>
            <span className="block text-xs font-bold text-muted">
              {t("canciones.add_body")}
            </span>
          </span>
        </Card>
      </button>

      {adding.open && (
        <AddForm preset={adding.preset} onDone={() => setAdding({ open: false })} />
      )}

      <p className="mt-6 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("canciones.list")}
      </p>
      <div className="space-y-2.5">
        {songs.map((song) => (
          <Card key={song.id} className="flex flex-wrap items-center gap-3 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-ink">
              <IconMusic className="size-5" stroke={2.2} />
            </span>
            <button onClick={() => onPick(song)} className="min-w-0 flex-1 text-left">
              <span className="block line-clamp-1 font-display text-base font-extrabold">
                {song.title}
              </span>
              <span className="block line-clamp-1 text-xs font-bold text-muted">
                {song.level} · {song.credit}
              </span>
            </button>
            {!song.youtubeId && <VideoField songId={song.id} />}
            {song.source === "user" && (
              <button
                onClick={() => remove(song.id)}
                aria-label={t("canciones.remove")}
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-danger-ink"
              >
                <IconTrash className="size-4" />
              </button>
            )}
          </Card>
        ))}
      </div>

      <p className="mt-4 text-xs font-semibold text-muted">{t("canciones.legal")}</p>

      {/* Catálogo sugerido: sólo título y artista. La letra la pones tú. */}
      <p className="mt-8 mb-1 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("canciones.suggested")}
      </p>
      <p className="mb-3 text-xs font-semibold text-muted">{t("canciones.suggested_body")}</p>
      {groups.map(({ section, songs: list }) => (
        <div key={section.level} className="mt-5">
          <div className="mb-2 flex items-baseline gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-fg font-display text-xs font-extrabold">
              {section.level}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-sm font-extrabold">
                {i18n.language.startsWith("en") ? section.titleEn : section.titleEs}
              </span>
              <span className="block text-xs font-bold text-muted">
                {i18n.language.startsWith("en") ? section.focusEn : section.focusEs}
              </span>
            </span>
            <span className="shrink-0 text-xs font-bold text-muted">{list.length}</span>
          </div>
          <div className="space-y-1.5">
            {list.map((sug) => (
              <SuggestionRow
                key={sug.id}
                suggestion={sug}
                done={have.has(sug.title.toLowerCase())}
                onAdd={() => setAdding({ open: true, preset: `${sug.title} — ${sug.artist}` })}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Fila del catálogo sugerido: al tocarla se abre el formulario con el título puesto. */
function SuggestionRow({
  suggestion,
  done,
  onAdd,
}: {
  suggestion: SongSuggestion;
  done: boolean;
  onAdd: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Card className={cn("p-3", done && "opacity-60")}>
      <div className="flex items-center gap-3">
        <button
          onClick={onAdd}
          disabled={done}
          className="min-w-0 flex-1 text-left active:scale-[0.99]"
        >
          <span className="block line-clamp-1 text-sm font-extrabold">{suggestion.title}</span>
          <span className="block line-clamp-1 text-xs font-bold text-muted">
            {suggestion.artist} · {suggestion.year}
          </span>
          <span className="mt-0.5 block line-clamp-2 text-xs text-muted">{suggestion.why}</span>
        </button>
        <span className="shrink-0 text-xs font-extrabold text-primary-ink">
          {done ? t("canciones.have") : t("canciones.put_lyrics")}
        </span>
      </div>
      {!done && (
        <div className="mt-2 flex flex-wrap gap-2">
          <a
            href={lyricsSearchUrl(suggestion)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-xs font-extrabold text-fg transition-colors hover:border-primary"
          >
            <IconExternalLink className="size-3.5" />
            {t("canciones.find_lyrics")}
          </a>
          <a
            href={videoSearchUrl(suggestion)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-xs font-extrabold text-fg transition-colors hover:border-primary"
          >
            <IconExternalLink className="size-3.5" />
            {t("canciones.find_video")}
          </a>
        </div>
      )}
    </Card>
  );
}

/** Pide el vídeo de una canción del catálogo: no adivinamos enlaces de YouTube. */
function VideoField({ songId }: { songId: string }) {
  const { t } = useTranslation();
  const setVideo = useUserSongs((s) => s.setVideo);
  const [url, setUrl] = useState("");
  const [bad, setBad] = useState(false);

  return (
    <span className="flex w-full basis-full items-center gap-2">
      <input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setBad(false);
        }}
        placeholder={t("canciones.f_url")}
        inputMode="url"
        aria-label={t("canciones.f_url")}
        className={cn(
          "min-w-0 flex-1 rounded-xl border bg-surface px-3 py-2 text-xs font-semibold outline-none",
          bad ? "border-danger" : "border-border focus:border-primary",
        )}
      />
      <Button
        variant="secondary"
        className="shrink-0 px-3 py-2 text-xs"
        onClick={() => {
          const id = youtubeIdFrom(url);
          if (!id) return setBad(true);
          setVideo(songId, id);
        }}
      >
        {t("canciones.link")}
      </Button>
    </span>
  );
}

function AddForm({ onDone, preset }: { onDone: () => void; preset?: string }) {
  const { t } = useTranslation();
  const add = useUserSongs((s) => s.add);
  const [title, setTitle] = useState(preset ?? "");
  const [url, setUrl] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const result = songFromUser({
      title,
      youtubeUrl: url,
      lyrics,
      durationSec: duration ? Number(duration) : undefined,
    });
    if ("error" in result) {
      setError(result.error === "url" ? t("canciones.err_url") : t("canciones.err_lyrics"));
      return;
    }
    add(result);
    onDone();
  }

  return (
    <Card className="mt-2.5 space-y-3 p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("canciones.f_title")}
        className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={t("canciones.f_url")}
        inputMode="url"
        className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
      />
      <textarea
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        placeholder={t("canciones.f_lyrics")}
        rows={5}
        className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
      />
      <input
        value={duration}
        onChange={(e) => setDuration(e.target.value.replace(/\D/g, ""))}
        placeholder={t("canciones.f_duration")}
        inputMode="numeric"
        className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
      />
      {error && (
        <p role="alert" className="text-xs font-bold text-danger-ink">
          {error}
        </p>
      )}
      <p className="text-xs font-semibold text-muted">{t("canciones.f_note")}</p>
      <Button fullWidth onClick={submit} disabled={!url.trim() || !lyrics.trim()}>
        {t("canciones.f_save")}
      </Button>
    </Card>
  );
}

/* ---------------- sesión: el vídeo pausa en cada línea ---------------- */

function Session({
  song,
  difficulty,
  onExit,
}: {
  song: Song;
  difficulty: Difficulty;
  onExit: () => void;
}) {
  const { t } = useTranslation();
  const completeListening = useProgress((s) => s.completeListening);

  const [player, setPlayer] = useState<SongPlayer | null>(null);
  const [index, setIndex] = useState(0);
  const [guesses, setGuesses] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [videoFailed, setVideoFailed] = useState(false);
  const [showEs, setShowEs] = useState(false);
  const [word, setWord] = useState<{ word: string; context: string } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const texts = useMemo(() => song.lines.map((l) => l.text), [song.lines]);
  const { es, loading: esLoading, failed: esFailed, load: loadEs } = useLyricsEs(song.id, texts);

  const line = song.lines[index]?.text ?? "";
  const tokens = useMemo(() => tokenize(line), [line]);
  const blanks = useMemo(() => (line ? blanksFor(line, difficulty) : []), [line, difficulty]);
  const finished = index >= song.lines.length;

  /** Mientras suena: al llegar al final de la línea actual, se pausa. */
  function handleTime(seconds: number) {
    if (checked || finished) return;
    const next = song.lines[index + 1];
    if (next && seconds >= next.t - 0.15) player?.pause();
    // Si el usuario adelanta el vídeo, la letra sigue donde toca.
    const at = lineAt(song.lines, seconds);
    if (at > index && !checked) setIndex(at);
  }

  function check() {
    const hits = blanks.filter((i) => sameWord(guesses[i] ?? "", tokens[i])).length;
    setScore((s) => ({ correct: s.correct + hits, total: s.total + blanks.length }));
    setChecked(true);
  }

  function next() {
    const isLast = index + 1 >= song.lines.length;
    if (isLast) {
      completeListening(score.correct, score.total);
      setIndex(song.lines.length);
      return;
    }
    setIndex((i) => i + 1);
    setGuesses({});
    setChecked(false);
    player?.seek(song.lines[index + 1].t);
    player?.play();
  }

  if (syncing) return <SyncMode song={song} onDone={() => setSyncing(false)} />;

  if (finished) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="mx-auto grid min-h-[70vh] w-full max-w-md place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            {t("escucha.done_title")}
          </h1>
          <p className="mt-2 text-muted">
            {t("escucha.done_score", { correct: score.correct, total: score.total, pct })}
          </p>
          <p className="mt-1 font-display text-lg font-extrabold text-primary">
            +{score.correct * 5} XP
          </p>
          <Button fullWidth className="mt-6" onClick={onExit}>
            {t("escucha.again")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-4 sm:px-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          aria-label={t("escucha.exit")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
        >
          <IconX className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 font-display text-sm font-extrabold">{song.title}</p>
          <p className="line-clamp-1 text-xs font-bold text-muted">{song.credit}</p>
        </div>
        <span className="shrink-0 text-sm font-bold tabular-nums text-muted">
          {index + 1}/{song.lines.length}
        </span>
      </div>

      {/* El reproductor va compacto (los términos de YouTube piden que siga
          visible), pero quien manda en pantalla es la letra. */}
      {song.youtubeId && (
        <YouTubePlayer
          className="mx-auto mt-4 w-full max-w-[356px]"
          videoId={song.youtubeId}
          onReady={setPlayer}
          onTime={handleTime}
          onError={() => setVideoFailed(true)}
        />
      )}
      {videoFailed && (
        <p role="alert" className="mt-3 text-sm font-bold text-danger-ink">
          {t("canciones.video_error")}
        </p>
      )}

      {/* la línea con huecos */}
      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3 text-lg font-semibold leading-relaxed">
        {tokens.map((token, i) =>
          blanks.includes(i) ? (
            <span key={i} className="inline-flex items-center">
              <input
                value={guesses[i] ?? ""}
                onChange={(e) => setGuesses((g) => ({ ...g, [i]: e.target.value }))}
                disabled={checked}
                placeholder={blankHint(token, difficulty)}
                aria-label={t("escucha.blank", { n: i + 1 })}
                style={{ width: `${Math.max(coreOf(token).length, 3) + 1.5}ch` }}
                className={cn(
                  "rounded-lg border-b-2 bg-transparent px-1 py-0.5 text-center font-semibold outline-none placeholder:text-muted/60",
                  !checked && "border-primary focus:bg-primary-soft/40",
                  checked && sameWord(guesses[i] ?? "", token) && "border-success text-success-ink",
                  checked &&
                    !sameWord(guesses[i] ?? "", token) &&
                    "border-danger text-danger-ink/70 line-through",
                )}
              />
              {checked && !sameWord(guesses[i] ?? "", token) && (
                <span className="ml-1.5 rounded-lg bg-accent-soft px-1.5 py-0.5 font-extrabold text-success-ink">
                  {coreOf(token)}
                </span>
              )}
            </span>
          ) : (
            <span key={i}>{token}</span>
          ),
        )}
      </div>

      {/* letra completa: la línea en curso lleva los huecos, el resto se lee */}
      <div className="mt-5 space-y-1">
        {song.lines.map((l, i) =>
          i === index ? null : (
            <LyricLineView
              key={i}
              text={l.text}
              translation={es?.[i]}
              showEs={showEs}
              onWord={(w, c) => setWord({ word: w, context: c })}
            />
          ),
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          className="shrink-0"
          onClick={() => {
            player?.seek(song.lines[index].t);
            player?.play();
          }}
        >
          {t("canciones.replay")}
        </Button>
        <Button variant="secondary" className="shrink-0" onClick={() => setSyncing(true)}>
          <IconClockEdit className="size-4" />
          {t("canciones.sync")}
        </Button>
        <Button
          variant="secondary"
          className="shrink-0"
          onClick={() => {
            setShowEs((v) => !v);
            if (!es) loadEs();
          }}
        >
          <IconLanguage className="size-4" />
          {esLoading ? t("practica.thinking") : showEs ? t("canciones.hide_es") : t("canciones.show_es")}
        </Button>
        {checked ? (
          <Button className="flex-1" onClick={next}>
            {index + 1 >= song.lines.length ? t("escucha.finish") : t("leccion.continue")}
            <IconArrowRight className="size-5" />
          </Button>
        ) : (
          <Button
            className="flex-1"
            disabled={blanks.every((i) => !(guesses[i] ?? "").trim())}
            onClick={check}
          >
            {t("leccion.check")}
          </Button>
        )}
      </div>

      {esFailed && (
        <p role="alert" className="mt-3 text-xs font-bold text-danger-ink">
          {t("canciones.es_error")}
        </p>
      )}

      {word && (
        <WordSheet
          key={`${word.word}-${word.context}`}
          word={word.word}
          context={word.context}
          onClose={() => setWord(null)}
        />
      )}
    </div>
  );
}

/* ---------------- tap-to-sync: marcar el tiempo de cada verso ---------------- */

function SyncMode({ song, onDone }: { song: Song; onDone: () => void }) {
  const { t } = useTranslation();
  const setTimes = useUserSongs((s) => s.setTimes);
  const [player, setPlayer] = useState<SongPlayer | null>(null);
  const [marks, setMarks] = useState<number[]>([]);
  const current = useRef(0);

  const next = marks.length; // verso que toca marcar
  const done = next >= song.lines.length;

  function save() {
    setTimes(song.id, marks);
    player?.pause();
    onDone();
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-4 sm:px-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onDone}
          aria-label={t("canciones.close")}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
        >
          <IconX className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold">{t("canciones.sync_title")}</p>
          <p className="line-clamp-2 text-xs font-bold text-muted">{t("canciones.sync_body")}</p>
        </div>
        <span className="shrink-0 text-sm font-bold tabular-nums text-muted">
          {marks.length}/{song.lines.length}
        </span>
      </div>

      {song.youtubeId && (
        <YouTubePlayer
          className="mx-auto mt-4 w-full max-w-[356px]"
          videoId={song.youtubeId}
          onReady={(p) => {
            setPlayer(p);
            p.seek(0);
          }}
          onTime={(s) => {
            current.current = s;
          }}
        />
      )}

      <div className="mt-5 space-y-1">
        {song.lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2",
              i === next && "bg-primary-soft",
              i < next && "opacity-60",
            )}
          >
            <span className="w-12 shrink-0 text-xs font-bold tabular-nums text-muted">
              {i < marks.length ? `${marks[i].toFixed(1)}s` : "—"}
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold">{l.text}</span>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-5 space-y-2 bg-bg/90 py-3 backdrop-blur">
        {done ? (
          <Button fullWidth shimmer onClick={save}>
            {t("canciones.sync_save")}
          </Button>
        ) : (
          <Button
            fullWidth
            onClick={() => setMarks((m) => [...m, Math.max(0, current.current)])}
          >
            {t("canciones.sync_mark")}
          </Button>
        )}
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => setMarks([])}>
            {t("canciones.sync_reset")}
          </Button>
          {marks.length > 0 && !done && (
            <Button variant="secondary" className="flex-1" onClick={save}>
              {t("canciones.sync_save")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
