import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import webpush from "web-push";
import { reminderText, shouldRemind, type Reminder } from "@/lib/reminders";

// Cron del recordatorio de racha. Lo llama un cron EXTERNO cada hora en punto
// (GitHub Actions; el de Vercel Hobby corre una sola vez al día y no cubriría
// los husos horarios). Recorre los usuarios con recordatorio activo y avisa a
// quien esté en su hora local y hoy no haya practicado.

export const maxDuration = 60;

function admin() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  // El JSON va en base64 para que quepa en una variable de entorno sin líos
  // de saltos de línea en la clave privada.
  const json = JSON.parse(
    raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8"),
  );
  const app = getApps().length ? getApp() : initializeApp({ credential: cert(json) });
  return getFirestore(app);
}

export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const db = admin();
  if (!publicKey || !privateKey || !db) {
    return Response.json(
      { error: "push not configured (VAPID keys / FIREBASE_SERVICE_ACCOUNT)" },
      { status: 503 },
    );
  }
  webpush.setVapidDetails("mailto:hola@parlo.app", publicKey, privateKey);

  const now = new Date();
  const snap = await db.collection("users").where("reminder.enabled", "==", true).get();
  let sent = 0;
  let skipped = 0;
  let dropped = 0;

  await Promise.all(
    snap.docs.map(async (docSnap) => {
      const data = docSnap.data() as {
        reminder?: Reminder;
        progress?: { days?: Record<string, { xp?: number }>; streak?: number };
      };
      const reminder = data.reminder;
      if (!reminder?.subscription?.endpoint) return;

      const { send, day } = shouldRemind(reminder, data.progress?.days ?? {}, now);
      if (!send) {
        skipped++;
        return;
      }

      const text = reminderText(reminder.lang, data.progress?.streak ?? 0);
      try {
        await webpush.sendNotification(
          reminder.subscription,
          JSON.stringify({ ...text, url: "/app" }),
        );
        // Se marca el día ANTES de contar el envío: si el proceso muere aquí,
        // peor es repetir el aviso a la hora siguiente.
        await docSnap.ref.set({ reminder: { lastSent: day } }, { merge: true });
        sent++;
      } catch (err) {
        const status = (err as { statusCode?: number }).statusCode;
        // 404/410 = suscripción muerta (app desinstalada, permiso revocado):
        // se apaga para no reintentarla cada hora.
        if (status === 404 || status === 410) {
          await docSnap.ref.set({ reminder: { enabled: false } }, { merge: true });
          dropped++;
          return;
        }
        console.warn("[parlo] push falló", status ?? err);
      }
    }),
  );

  return Response.json({ candidates: snap.size, sent, skipped, dropped });
}
