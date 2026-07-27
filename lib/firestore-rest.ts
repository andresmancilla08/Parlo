// Acceso a Firestore desde el servidor SIN Admin SDK: la organización de GCP
// prohíbe crear claves de service account, así que el cron entra con un usuario
// de Firebase Auth y habla con la API REST usando su idToken.
// Sólo lo usa `/api/reminders`; la app sigue usando el SDK del cliente.

/** Valor de Firestore en formato REST (`{stringValue: …}` y compañía). */
type Value = Record<string, unknown>;

/** `{stringValue: "a"}` → `"a"`, recursivo en mapas y arrays. */
export function decodeValue(value: Value | undefined): unknown {
  if (!value) return undefined;
  if ("nullValue" in value) return null;
  if ("stringValue" in value) return value.stringValue;
  if ("booleanValue" in value) return value.booleanValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return value.doubleValue;
  if ("timestampValue" in value) return value.timestampValue;
  if ("mapValue" in value) {
    return decodeFields((value.mapValue as { fields?: Record<string, Value> }).fields ?? {});
  }
  if ("arrayValue" in value) {
    const values = (value.arrayValue as { values?: Value[] }).values ?? [];
    return values.map(decodeValue);
  }
  return undefined; // bytesValue / referenceValue / geoPoint: Parlo no los usa
}

export function decodeFields(fields: Record<string, Value>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) out[key] = decodeValue(value);
  return out;
}

const AUTH = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
const BASE = "https://firestore.googleapis.com/v1";

export type FirestoreRest = {
  /** Documentos de una colección que cumplen `campo == valor`. */
  query: (
    collection: string,
    field: string,
    equals: boolean | string | number,
  ) => Promise<{ name: string; data: Record<string, unknown> }[]>;
  /**
   * Escribe UN subcampo sin tocar el resto (`name` es la ruta que da `query`).
   * Con `updateMask` anidado: un `updateMask=reminder` reemplazaría el mapa
   * entero y se perdería la suscripción.
   */
  patchField: (name: string, path: [string, string], value: Value) => Promise<void>;
};

/** Inicia sesión como el usuario de servicio y devuelve las operaciones. */
export async function connect(config: {
  apiKey: string;
  projectId: string;
  email: string;
  password: string;
}): Promise<FirestoreRest> {
  const auth = await fetch(`${AUTH}?key=${config.apiKey}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: config.email,
      password: config.password,
      returnSecureToken: true,
    }),
  }).then((r) => r.json());
  if (!auth.idToken) throw new Error(`login del cron falló: ${JSON.stringify(auth.error ?? auth)}`);

  const root = `${BASE}/projects/${config.projectId}/databases/(default)/documents`;
  const headers = { authorization: `Bearer ${auth.idToken}`, "content-type": "application/json" };

  return {
    async query(collection, field, equals) {
      const value: Value =
        typeof equals === "boolean"
          ? { booleanValue: equals }
          : typeof equals === "number"
            ? { integerValue: String(equals) }
            : { stringValue: equals };
      const res = await fetch(`${root}:runQuery`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: collection }],
            where: { fieldFilter: { field: { fieldPath: field }, op: "EQUAL", value } },
          },
        }),
      }).then((r) => r.json());
      if (!Array.isArray(res)) throw new Error(`query falló: ${JSON.stringify(res)}`);
      // Las páginas vacías vienen como `{readTime}` sin `document`.
      return res
        .filter((row) => row.document)
        .map((row) => ({ name: row.document.name, data: decodeFields(row.document.fields ?? {}) }));
    },

    async patchField(name, [parent, child], value) {
      const body = { fields: { [parent]: { mapValue: { fields: { [child]: value } } } } };
      const res = await fetch(
        `${BASE}/${name}?updateMask.fieldPaths=${encodeURIComponent(`${parent}.${child}`)}`,
        { method: "PATCH", headers, body: JSON.stringify(body) },
      );
      if (!res.ok) throw new Error(`patch falló: ${res.status} ${await res.text()}`);
    },
  };
}
