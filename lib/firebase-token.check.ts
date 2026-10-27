// Check runnable. Correr: node --experimental-strip-types lib/firebase-token.check.ts
// Firma tokens con un par RSA generado aquí mismo: no toca Google ni Firebase.
import assert from "node:assert";
import { TokenError, verifyIdToken, type Jwk } from "./firebase-token.ts";

const PROJECT = "parlo-test";
const NOW = 1_800_000_000;

async function pair(kid: string) {
  const kp = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"],
  );
  const jwk = (await crypto.subtle.exportKey("jwk", kp.publicKey)) as Jwk;
  return { privateKey: kp.privateKey, jwk: { ...jwk, kid } };
}

const b64url = (bytes: Uint8Array) =>
  Buffer.from(bytes).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const enc = (o: unknown) => b64url(new TextEncoder().encode(JSON.stringify(o)));

async function sign(
  key: CryptoKey,
  claims: Record<string, unknown>,
  header: Record<string, unknown> = { alg: "RS256", kid: "k1", typ: "JWT" },
) {
  const data = `${enc(header)}.${enc(claims)}`;
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(data));
  return `${data}.${b64url(new Uint8Array(sig))}`;
}

const good = {
  aud: PROJECT,
  iss: `https://securetoken.google.com/${PROJECT}`,
  sub: "uid-ficticio-123",
  iat: NOW - 100,
  auth_time: NOW - 100,
  exp: NOW + 3000,
};

const k1 = await pair("k1");
const other = await pair("k1"); // mismo kid, otra clave: firma falsificada
const keys = async () => [k1.jwk];
const opts = { keys, nowS: NOW };

async function rejects(token: string, why: string, o = opts) {
  await assert.rejects(verifyIdToken(token, PROJECT, o), TokenError, why);
}

// Válido.
const ok = await verifyIdToken(await sign(k1.privateKey, good), PROJECT, opts);
assert.equal(ok.uid, "uid-ficticio-123");

// Firma de otra clave.
await rejects(await sign(other.privateKey, good), "firma falsa");
// Payload manipulado tras firmar.
const real = await sign(k1.privateKey, good);
const [h, , s] = real.split(".");
await rejects(`${h}.${enc({ ...good, sub: "otro" })}.${s}`, "payload cambiado");
// aud / iss de otro proyecto.
await rejects(await sign(k1.privateKey, { ...good, aud: "otro" }), "aud ajeno");
await rejects(
  await sign(k1.privateKey, { ...good, iss: "https://securetoken.google.com/otro" }),
  "iss ajeno",
);
// Caducado (más allá de la tolerancia) y emitido en el futuro.
await rejects(await sign(k1.privateKey, { ...good, exp: NOW - 120 }), "caducado");
await rejects(await sign(k1.privateKey, { ...good, iat: NOW + 600 }), "iat futuro");
// Sin sub.
await rejects(await sign(k1.privateKey, { ...good, sub: "" }), "sub vacío");
// Algoritmo distinto o kid desconocido.
await rejects(await sign(k1.privateKey, good, { alg: "HS256", kid: "k1" }), "alg none/HS");
await rejects(await sign(k1.privateKey, good, { alg: "RS256", kid: "zz" }), "kid desconocido");
// Basura.
await rejects("no.es.jwt", "malformado");
await rejects("abc", "malformado");

console.log("firebase-token: OK");
