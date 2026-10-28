// Prueba de las reglas de Firestore (liga + progreso) contra el EMULADOR.
// Proyecto `demo-parlo`: el emulador nunca toca producción.
//
// No va en package.json a propósito (no se usa en la app). Para correrla:
//   1. Java 21+ (firebase-tools y el emulador ya no arrancan con 17).
//   2. En una carpeta temporal:
//        npm i @firebase/rules-unit-testing firebase@12 --legacy-peer-deps
//        cp <repo>/firestore.rules <repo>/docs/pruebas/reglas.test.mjs .
//        printf '{"firestore":{"rules":"firestore.rules"},"emulators":{"firestore":{"port":8089}}}' > firebase.json
//        firebase emulators:exec --only firestore --project demo-parlo "node reglas.test.mjs firestore.rules"
import { readFileSync } from "node:fs";
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc, updateDoc, deleteField, getDoc, runTransaction } from "firebase/firestore";

const rules = readFileSync(process.argv[2], "utf8");
const env = await initializeTestEnvironment({ projectId: "demo-parlo", firestore: { rules } });

const A = env.authenticatedContext("alice").firestore();
const B = env.authenticatedContext("bob").firestore();
const C = env.authenticatedContext("carol").firestore();
const now = Date.now();
let pass = 0;
const ok = async (name, p) => { await assertSucceeds(p); pass++; console.log("  ✓", name); };
const no = async (name, p) => { await assertFails(p); pass++; console.log("  ✓ (rechaza)", name); };

const league = (members, extra = {}) => ({ name: "Amigos", code: "BCDFGH", ownerUid: "alice", createdAt: now, members, ...extra });

// --- crear liga ---
await no("crear con alias de 1", setDoc(doc(A, "leagues/x1"), league({ alice: { alias: "A", joinedAt: now } })));
await no("crear con alias de 17", setDoc(doc(A, "leagues/x1"), league({ alice: { alias: "a".repeat(17), joinedAt: now } })));
await no("crear con campo extra en members", setDoc(doc(A, "leagues/x1"), league({ alice: { alias: "Alice", joinedAt: now, email: "x@y.z" } })));
await no("crear con campo extra en la liga", setDoc(doc(A, "leagues/x1"), league({ alice: { alias: "Alice", joinedAt: now } }, { evil: 1 })));
await ok("crear liga válida", setDoc(doc(A, "leagues/L1"), league({ alice: { alias: "Alice", joinedAt: now } })));

// --- códigos ---
await no("código de liga inexistente", setDoc(doc(B, "leagueCodes/BCDFGH"), { leagueId: "nope" }));
await no("código de liga ajena", setDoc(doc(B, "leagueCodes/BCDFGH"), { leagueId: "L1" }));
await no("código distinto al de la liga", setDoc(doc(A, "leagueCodes/ZZZZZZ"), { leagueId: "L1" }));
await ok("el dueño reserva su código", setDoc(doc(A, "leagueCodes/BCDFGH"), { leagueId: "L1" }));
await ok("cualquiera con sesión lee un código", getDoc(doc(C, "leagueCodes/BCDFGH")));

// --- entrar ---
await no("entrar con campo extra", updateDoc(doc(B, "leagues/L1"), { "members.bob": { alias: "Bob", joinedAt: now, x: 1 } }));
await no("entrar con alias largo", updateDoc(doc(B, "leagues/L1"), { "members.bob": { alias: "b".repeat(17), joinedAt: now } }));
await no("entrar sin joinedAt", updateDoc(doc(B, "leagues/L1"), { "members.bob": { alias: "Bob" } }));
await no("meter a otro", updateDoc(doc(B, "leagues/L1"), { "members.carol": { alias: "Carol", joinedAt: now } }));
await ok("entrar bien", updateDoc(doc(B, "leagues/L1"), { "members.bob": { alias: "Bob", joinedAt: now } }));

// --- marcador ---
const score = (xp, extra = {}) => ({ alias: "Bob", week: "2026-10-26", xp, updatedAt: now, ...extra });
await no("XP por encima del tope", setDoc(doc(B, "leagues/L1/scores/bob"), score(200001)));
await no("XP no entero", setDoc(doc(B, "leagues/L1/scores/bob"), score(1.5)));
await no("campo extra en el marcador", setDoc(doc(B, "leagues/L1/scores/bob"), score(10, { evil: 1 })));
await no("escribir el marcador de otro", setDoc(doc(B, "leagues/L1/scores/alice"), score(10)));
await no("no miembro publica", setDoc(doc(C, "leagues/L1/scores/carol"), score(10)));
await ok("XP en el tope", setDoc(doc(B, "leagues/L1/scores/bob"), score(200000)));
await ok("XP normal", setDoc(doc(B, "leagues/L1/scores/bob"), score(340)));

// --- salir ---
await ok("salir", updateDoc(doc(B, "leagues/L1"), { "members.bob": deleteField() }));

// --- progreso: transacción sobre el documento propio ---
await ok("transacción sobre users/{uid} propio", runTransaction(A, async (tx) => {
  const snap = await tx.get(doc(A, "users/alice"));
  tx.set(doc(A, "users/alice"), { progress: { xp: (snap.data()?.progress?.xp ?? 0) + 10 } }, { merge: true });
}));
await no("transacción sobre users/{uid} ajeno", runTransaction(B, async (tx) => {
  await tx.get(doc(B, "users/alice"));
  tx.set(doc(B, "users/alice"), { progress: { xp: 1 } }, { merge: true });
}));

console.log(`\n${pass} casos OK`);
await env.cleanup();
process.exit(0);
