"use client";

import { deleteField, doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebaseReady } from "@/lib/firebase";
import { DEFAULT_REMINDER_HOUR, type Reminder } from "@/lib/reminders";

// Suscripción a Web Push del recordatorio de racha. El envío lo hace el cron
// (`/api/reminders`); aquí sólo se guarda la suscripción en `users/{uid}`.

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

export type PushStatus =
  | "unsupported" // navegador sin push (iOS sin instalar la PWA, por ejemplo)
  | "unconfigured" // falta la clave VAPID en el despliegue
  | "denied" // el usuario bloqueó las notificaciones
  | "error" // el navegador aceptó el permiso pero la suscripción falló
  | "off"
  | "on";

export function pushSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

/** Estado a mostrar en los ajustes (sin pedir permisos). */
export function pushStatus(saved: Reminder | null): PushStatus {
  if (!pushSupported()) return "unsupported";
  if (!VAPID_PUBLIC) return "unconfigured";
  if (Notification.permission === "denied") return "denied";
  return saved?.enabled ? "on" : "off";
}

/**
 * base64url (formato VAPID) → bytes, que es lo que pide `subscribe()`.
 * El `ArrayBuffer` explícito es para el tipo `BufferSource` de la API (un
 * `Uint8Array` genérico admitiría `SharedArrayBuffer`, que no vale aquí).
 */
function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padded = (base64 + "=".repeat((4 - (base64.length % 4)) % 4))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const raw = atob(padded);
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

/**
 * `pushManager.subscribe()` puede quedarse colgado para siempre si el servicio
 * de push del navegador no responde (visto en Chrome headless y con red mala).
 * Sin este tope, el interruptor de ajustes se queda girando sin fin.
 */
function withTimeout<T>(promise: Promise<T>, ms = 15_000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("push timeout")), ms)),
  ]);
}

export async function loadReminder(uid: string): Promise<Reminder | null> {
  if (!firebaseReady) return null;
  try {
    const snap = await getDoc(doc(db(), "users", uid));
    return (snap.data()?.reminder as Reminder | undefined) ?? null;
  } catch {
    return null; // sin red: los ajustes se muestran apagados, no roto
  }
}

/**
 * Pide permiso, se suscribe y guarda la preferencia. La hora es LOCAL y se
 * guarda con la zona IANA: el cron la interpreta con el horario de verano
 * correcto sin que el cliente recalcule nada.
 */
export async function enableReminder(
  uid: string,
  hour = DEFAULT_REMINDER_HOUR,
  lang: "es" | "en" = "es",
): Promise<{ ok: true } | { ok: false; reason: PushStatus }> {
  if (!pushSupported()) return { ok: false, reason: "unsupported" };
  if (!VAPID_PUBLIC) return { ok: false, reason: "unconfigured" };

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return { ok: false, reason: "denied" };

  try {
    const registration = await withTimeout(navigator.serviceWorker.ready);
    const subscription =
      (await registration.pushManager.getSubscription()) ??
      (await withTimeout(
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC),
        }),
      ));

    const reminder: Reminder = {
      enabled: true,
      hour,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      lang,
      subscription: subscription.toJSON() as Reminder["subscription"],
      lastSent: null,
    };
    await setDoc(doc(db(), "users", uid), { reminder }, { merge: true });
    return { ok: true };
  } catch (err) {
    // El servicio de push del navegador puede fallar (sin red, bloqueado por
    // política, navegador sin SW registrado): se dice, no se deja a medias.
    console.warn("[parlo] no se pudo suscribir al push", err);
    return { ok: false, reason: "error" };
  }
}

/** Cambia la hora sin volver a pedir permiso ni resuscribirse. */
export async function setReminderHour(uid: string, hour: number) {
  await setDoc(doc(db(), "users", uid), { reminder: { hour } }, { merge: true });
}

export async function disableReminder(uid: string) {
  // Se borra el campo entero: una suscripción sin dueño sólo genera 410 en el cron.
  await setDoc(doc(db(), "users", uid), { reminder: deleteField() }, { merge: true });
  if (!pushSupported()) return;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  await subscription?.unsubscribe();
}
