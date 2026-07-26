// Límite de peticiones en memoria (ventana deslizante).
// ponytail: por instancia, no compartido entre lambdas. Frena abuso casual y
// bucles del cliente, que es el riesgo real aquí (quemar la cuota gratis de
// Gemini). Si algún día hace falta de verdad: Upstash Redis o Vercel KV.

type Store = Map<string, number[]>;

const MAX_KEYS = 1000; // techo de memoria: se poda al llegar

/** true si la petición cabe dentro del límite; false si hay que rechazarla. */
export function allow(
  key: string,
  now: number,
  { store, limit, windowMs }: { store: Store; limit: number; windowMs: number },
): boolean {
  const recent = (store.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    store.set(key, recent); // sin añadir: la petición se rechaza
    return false;
  }

  recent.push(now);
  store.set(key, recent);

  if (store.size > MAX_KEYS) {
    for (const [k, times] of store) {
      if (times.every((t) => now - t >= windowMs)) store.delete(k);
    }
  }
  return true;
}
