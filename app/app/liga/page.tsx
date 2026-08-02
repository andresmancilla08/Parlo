"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconCheck,
  IconCopy,
  IconCrown,
  IconFlame,
  IconLogout2,
  IconShieldLock,
  IconTrophy,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";
import { weekDays, weekKey } from "@/lib/gamification";
import {
  createLeague,
  fetchLeague,
  fetchScores,
  isValidCode,
  joinLeague,
  leagueChallenge,
  leagueProgress,
  overtakenBy,
  leaveLeague,
  MAX_MEMBERS,
  normalizeCode,
  pushScore,
  useLeague,
  validateAlias,
  weeklyXp,
  type League,
  type LeagueScore,
} from "@/lib/league";
import { playReward } from "@/lib/sfx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { spring, stagger, rise } from "@/lib/motion";
import { cn } from "@/lib/utils";
import mascot from "@/public/brand/mascot.png";

// Liga entre amigos: lo ÚNICO compartido de Parlo. Opt-in, con alias en vez de
// nombre y sólo la XP de la semana. La pantalla lo dice, no lo esconde.

export default function LigaPage() {
  const { t } = useTranslation();
  const uid = useAuth((s) => s.uid);
  const days = useProgress((s) => s.days);
  const leagueId = useLeague((s) => s.leagueId);
  const alias = useLeague((s) => s.alias);
  const join = useLeague((s) => s.join);
  const leaveLocal = useLeague((s) => s.leaveLocal);
  const checked = useLeague((s) => s.checked);

  // `undefined` = todavía cargando; `null` = no estoy en ninguna liga.
  const [league, setLeague] = useState<League | null | undefined>(undefined);
  const [scores, setScores] = useState<LeagueScore[]>([]);

  const myXp = weeklyXp(days, weekDays(new Date()));

  // Carga en el efecto, pero con TODOS los setState dentro de callbacks de
  // promesa: el lint del proyecto prohíbe setState síncrono en un efecto.
  useEffect(() => {
    if (!leagueId || !uid) return;
    let alive = true;

    fetchLeague(leagueId)
      .then(async (found) => {
        if (!alive) return;
        if (!found || !(uid in found.members)) {
          // Te sacaron o la liga ya no existe: se limpia en local.
          leaveLocal();
          setLeague(null);
          return;
        }
        setLeague(found);
        await pushScore(leagueId, uid, alias, myXp, new Date()).catch(() => {});
        const list = await fetchScores(leagueId, new Date());
        if (alive) setScores(list);
      })
      .catch(() => {
        // Sin red: se muestra el alta y ya se reintentará al volver.
        if (alive) setLeague(null);
      });

    return () => {
      alive = false;
    };
    // `myXp` a propósito fuera: cambia con cada XP y recargaría la liga sin parar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId, uid, alias, leaveLocal]);

  // Se espera también a saber si el usuario ya está en una liga según la nube:
  // enseñar «crear liga» antes de tiempo invita a crear una segunda.
  const loading = (Boolean(leagueId) && league === undefined) || !checked;

  if (loading) {
    return (
      <div className="mx-auto grid min-h-[60vh] w-full max-w-2xl place-items-center px-4">
        <p className="text-sm font-bold text-muted">{t("common.loading")}</p>
      </div>
    );
  }

  if (!league) {
    return (
      <Setup
        onJoined={(l, chosenAlias) => {
          join(l.id, chosenAlias);
          setLeague(l);
          playReward();
        }}
      />
    );
  }

  return (
    <Standings
      league={league}
      scores={scores}
      myUid={uid ?? ""}
      myXp={myXp}
      onLeave={async () => {
        if (uid) await leaveLeague(league.id, uid).catch(() => {});
        leaveLocal();
        setLeague(null);
        setScores([]);
      }}
    />
  );
}

/* ---------------- crear o entrar ---------------- */

function Setup({ onJoined }: { onJoined: (l: League, alias: string) => void }) {
  const { t } = useTranslation();
  const uid = useAuth((s) => s.uid);
  const [alias, setAlias] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aliasError = alias ? validateAlias(alias) : null;
  const canCreate = !aliasError && alias.trim().length >= 2 && !busy;
  const canJoin = canCreate && isValidCode(code);

  async function run(action: "create" | "join") {
    if (!uid) return;
    setBusy(true);
    setError(null);
    try {
      const clean = alias.trim();
      const result =
        action === "create"
          ? await createLeague(name, uid, clean)
          : await joinLeague(code, uid, clean);
      if (typeof result === "string") {
        setError(t(`liga.err_${result}`));
        return;
      }
      onJoined(result, clean);
    } catch {
      setError(t("liga.err_offline"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-10 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {t("liga.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.02] tracking-tight">
          {t("liga.title")}
        </h1>
        <p className="mt-2 text-sm text-muted">{t("liga.subtitle")}</p>
      </motion.header>

      {/* Qué se comparte, antes de pedir nada: la liga es opt-in de verdad. */}
      <div className="mt-6 rounded-2xl border border-accent bg-accent-soft p-4">
        <p className="flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-[0.13em] text-accent-ink">
          <IconShieldLock className="size-4" />
          {t("liga.privacy_title")}
        </p>
        <ul className="mt-2 space-y-1.5 text-sm font-semibold text-accent-ink/90">
          <li>· {t("liga.privacy_1")}</li>
          <li>· {t("liga.privacy_2")}</li>
          <li>· {t("liga.privacy_3")}</li>
        </ul>
      </div>

      <label className="mt-6 block text-sm font-semibold text-fg" htmlFor="alias">
        {t("liga.alias_label")}
      </label>
      <input
        id="alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder={t("liga.alias_ph")}
        maxLength={16}
        className="mt-1.5 w-full rounded-2xl border-2 border-border bg-surface px-4 py-3 font-semibold outline-none transition-colors focus:border-primary"
      />
      {aliasError && (
        <p role="alert" className="mt-1.5 text-sm font-bold text-danger-ink">
          {t(`liga.alias_${aliasError}`)}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card className="p-4">
          <p className="flex items-center gap-2 font-display text-base font-extrabold">
            <IconUsers className="size-5 text-primary-ink" />
            {t("liga.create_title")}
          </p>
          <p className="mt-1 text-xs font-bold text-muted">{t("liga.create_body")}</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("liga.name_ph")}
            maxLength={30}
            className="mt-3 w-full rounded-xl border-2 border-border bg-surface px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary"
          />
          <Button fullWidth className="mt-3" disabled={!canCreate} onClick={() => run("create")}>
            {t("liga.create_cta")}
          </Button>
        </Card>

        <Card className="p-4">
          <p className="flex items-center gap-2 font-display text-base font-extrabold">
            <IconUserPlus className="size-5 text-primary-ink" />
            {t("liga.join_title")}
          </p>
          <p className="mt-1 text-xs font-bold text-muted">{t("liga.join_body")}</p>
          <input
            value={code}
            onChange={(e) => setCode(normalizeCode(e.target.value))}
            placeholder="ABC123"
            maxLength={6}
            className="mt-3 w-full rounded-xl border-2 border-border bg-surface px-3 py-2.5 text-center font-display text-lg font-extrabold uppercase tracking-[0.2em] outline-none focus:border-primary"
          />
          <Button
            variant="secondary"
            fullWidth
            className="mt-3"
            disabled={!canJoin}
            onClick={() => run("join")}
          >
            {t("liga.join_cta")}
          </Button>
        </Card>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-center text-sm font-bold text-danger-ink">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------- marcador ---------------- */

function Standings({
  league,
  scores,
  myUid,
  myXp,
  onLeave,
}: {
  league: League;
  scores: LeagueScore[];
  myUid: string;
  myXp: number;
  onLeave: () => void;
}) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const markSeen = useLeague((s) => s.markSeen);
  const claimLeague = useProgress((s) => s.claimLeague);
  const claims = useProgress((s) => s.claims);

  // Foto CONGELADA al entrar: si se leyera del store en cada render, marcarla
  // como vista borraría el aviso justo al enseñarlo.
  const [seenOnEnter] = useState(() => useLeague.getState().lastSeen);
  const [week] = useState(() => weekKey(new Date()));

  // Quien aún no ha estudiado esta semana no tiene marcador: se muestra a 0
  // para que la liga no parezca vacía y se vea a todo el mundo.
  const listed = new Set(scores.map((s) => s.uid));
  const all = [
    ...scores,
    ...Object.entries(league.members)
      .filter(([uid]) => !listed.has(uid))
      .map(([uid, m]) => ({ uid, alias: m.alias, xp: uid === myUid ? myXp : 0 })),
  ].sort((a, b) => b.xp - a.xp || a.alias.localeCompare(b.alias));

  // `all` se rehace en cada render, así que la dependencia real es su CONTENIDO.
  const allKey = all.map((s) => `${s.uid}:${s.xp}`).join("|");
  const overtaken = useMemo(
    () => overtakenBy(seenOnEnter, all, myUid),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seenOnEnter, myUid, allKey],
  );

  const challenge = leagueChallenge(league.id, week, Object.keys(league.members).length);
  const progress = leagueProgress(challenge, all);
  const claimed = Boolean(claims[challenge.key]);

  // La foto se actualiza para la PRÓXIMA visita, no para esta.
  useEffect(() => {
    if (all.length) markSeen(all);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allKey, markSeen]);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-10 pt-5 sm:px-5">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-primary-ink">
          {t("liga.kicker")}
        </p>
        <h1 className="mt-2 line-clamp-2 font-display text-3xl font-extrabold leading-tight tracking-tight">
          {league.name}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {t("liga.members", { n: Object.keys(league.members).length, max: MAX_MEMBERS })} ·{" "}
          {t("liga.this_week")}
        </p>
      </motion.header>

      {/* invitar */}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(league.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            setCopied(false);
          }
        }}
        className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 active:scale-[0.99]"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-display text-xs font-extrabold uppercase tracking-[0.13em] text-muted">
            {t("liga.invite")}
          </span>
          <span className="mt-0.5 block font-display text-2xl font-extrabold tracking-[0.2em]">
            {league.code}
          </span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-ink">
          {copied ? <IconCheck className="size-5" /> : <IconCopy className="size-5" />}
        </span>
      </button>
      <AnimatePresence>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-center text-xs font-bold text-accent-ink"
          >
            {t("liga.copied")}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Te han adelantado: es el aviso que pidió existir la liga, y se calcula
          contra una foto local, sin publicar cuándo mira cada uno. */}
      {overtaken.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="mt-5 flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/12 p-3.5"
        >
          <IconFlame className="mt-0.5 size-5 shrink-0 text-primary" stroke={2.2} />
          <div className="min-w-0">
            <p className="font-display text-sm font-extrabold">{t("liga.overtaken_title")}</p>
            <p className="mt-0.5 text-sm text-muted">
              {t("liga.overtaken_body", {
                who: overtaken.slice(0, 3).join(", "),
                count: overtaken.length,
              })}
            </p>
          </div>
        </motion.div>
      )}

      {/* Reto compartido: el mismo para toda la liga, sin escribir nada nuevo
          en Firestore (el progreso sale de los marcadores que ya se publican). */}
      <div className="mt-5 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.13em] text-accent-ink">
              {t("liga.challenge_kicker")}
            </p>
            <p className="mt-1 font-display text-base font-extrabold">
              {t(`liga.challenge_${challenge.id}`, { n: challenge.target })}
            </p>
          </div>
          <span className="shrink-0 rounded-pill bg-gem/20 px-2.5 py-1 font-display text-xs font-extrabold text-gem">
            +{challenge.reward}
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-pill bg-border">
          <div
            className="h-full rounded-pill bg-gradient-brand transition-[width] duration-300"
            style={{ width: `${Math.min(100, (progress.value / progress.target) * 100)}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs font-bold text-muted">
          {progress.value} / {progress.target}
        </p>

        {progress.done && (
          <Button
            className="mt-3"
            fullWidth
            disabled={claimed}
            onClick={() => {
              claimLeague(challenge.key, challenge.reward);
              playReward();
            }}
          >
            {claimed ? t("liga.challenge_claimed") : t("liga.challenge_claim")}
          </Button>
        )}
      </div>

      {/* ranking */}
      <p className="mt-7 mb-2 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-muted">
        {t("liga.ranking")}
      </p>
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
        {all.map((s, i) => {
          const mine = s.uid === myUid;
          return (
            <motion.div key={s.uid} variants={rise}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-3.5",
                  mine ? "border-primary bg-primary-soft" : "border-border bg-card",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold",
                    i === 0 ? "bg-gem/20 text-gem" : "bg-bg text-muted",
                  )}
                >
                  {i === 0 ? <IconCrown className="size-5" /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block line-clamp-1 font-display text-base font-extrabold">
                    {s.alias}
                    {mine && (
                      <span className="ml-1.5 text-xs font-bold text-primary-ink">
                        {t("liga.you")}
                      </span>
                    )}
                  </span>
                </span>
                <span className="shrink-0 font-display text-lg font-extrabold tabular-nums">
                  {s.xp}
                  <span className="ml-1 text-xs font-bold text-muted">XP</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {all.length === 1 && (
        <div className="mt-4 grid place-items-center rounded-2xl border border-dashed border-border p-6 text-center">
          <Image
            src={mascot}
            alt=""
            height={90}
            width={Math.round((90 * mascot.width) / mascot.height)}
          />
          <p className="mt-2 max-w-xs text-sm font-semibold text-muted">{t("liga.alone")}</p>
        </div>
      )}

      {/* salir */}
      <div className="mt-8">
        {confirmLeave ? (
          <div className="rounded-2xl border border-danger/40 bg-danger/8 p-4">
            <p className="font-display text-sm font-extrabold text-danger-ink">
              {t("liga.leave_confirm")}
            </p>
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setConfirmLeave(false)}>
                {t("common.close")}
              </Button>
              <Button variant="danger" className="flex-1" onClick={onLeave}>
                <IconLogout2 className="size-4" />
                {t("liga.leave")}
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmLeave(true)}
            className="mx-auto flex items-center gap-1.5 text-sm font-bold text-muted transition-colors hover:text-danger-ink"
          >
            <IconLogout2 className="size-4" />
            {t("liga.leave")}
          </button>
        )}
      </div>

      <p className="mt-6 flex items-start gap-2 text-xs font-semibold text-muted">
        <IconTrophy className="mt-0.5 size-4 shrink-0" />
        {t("liga.footer")}
      </p>
    </div>
  );
}
