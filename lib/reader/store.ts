"use client";

// Los documentos del usuario viven en SU dispositivo (IndexedDB). Nunca se
// suben: son archivos suyos y pueden ser privados o extensos.

export type StoredDoc = {
  id: string;
  title: string;
  /** Texto plano ya extraído. */
  text: string;
  /** Bytes del original, sólo informativo. */
  size: number;
  addedAt: number;
  /** Última frase leída, para retomar. */
  position: number;
};

const DB = "parlo-reader";
const STORE = "docs";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const store = db.transaction(STORE, mode).objectStore(STORE);
        const req = run(store);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }),
  );
}

export function listDocs(): Promise<StoredDoc[]> {
  return tx<StoredDoc[]>("readonly", (s) => s.getAll() as IDBRequest<StoredDoc[]>).then((docs) =>
    docs.sort((a, b) => b.addedAt - a.addedAt),
  );
}

export function getDoc(id: string): Promise<StoredDoc | undefined> {
  return tx<StoredDoc | undefined>("readonly", (s) => s.get(id) as IDBRequest<StoredDoc | undefined>);
}

export function saveDoc(doc: StoredDoc): Promise<unknown> {
  return tx("readwrite", (s) => s.put(doc));
}

export function deleteDoc(id: string): Promise<unknown> {
  return tx("readwrite", (s) => s.delete(id));
}
