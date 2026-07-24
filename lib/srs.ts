// SM-2 (SuperMemo 2) — repaso espaciado. Puro y testeable.
// quality 0..5 (qué tan bien recordaste). <3 = fallo → reinicia repeticiones.

export type SrsCard = {
  key: string; // identifica el ítem (p.ej. la palabra en inglés)
  ef: number; // easiness factor
  reps: number; // repeticiones consecutivas correctas
  interval: number; // días hasta el próximo repaso
  due: number; // timestamp ms del próximo repaso
};

const DAY = 86_400_000;

export function newCard(key: string, now: number): SrsCard {
  return { key, ef: 2.5, reps: 0, interval: 0, due: now };
}

/** Devuelve una carta NUEVA (inmutable) con el siguiente estado SM-2. */
export function review(card: SrsCard, quality: number, now: number): SrsCard {
  const q = Math.max(0, Math.min(5, quality));

  if (q < 3) {
    // Fallo: se reaprende hoy mismo.
    return { ...card, reps: 0, interval: 1, due: now + DAY };
  }

  const reps = card.reps + 1;
  let interval: number;
  if (reps === 1) interval = 1;
  else if (reps === 2) interval = 6;
  else interval = Math.round(card.interval * card.ef);

  const ef = Math.max(
    1.3,
    card.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
  );

  return { ...card, reps, interval, ef, due: now + interval * DAY };
}

export function isDue(card: SrsCard, now: number): boolean {
  return card.due <= now;
}
