import webpush from "web-push";
import { connect } from "@/lib/firestore-rest";
import { reminderText, shouldRemind, type Reminder } from "@/lib/reminders";

// Cron del recordatorio de racha. Lo llama un cron EXTERNO cada hora en punto
// (GitHub Actions; el de Vercel Hobby corre una sola vez al día y no cubriría
// los husos horarios). Recorre los usuarios con recordatorio activo y avisa a
// quien esté en su hora local y hoy no haya practicado.
//
// Sin Admin SDK: la organización de GCP prohíbe crear claves de service
// account, así que entra con un usuario de Firebase Auth propio del cron
// (`firestore.rules` le da lectura y sólo le deja escribir `reminder`).

export const maxDuration = 60;

export async function POST(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const email = process.env.CRON_FIREBASE_EMAIL;
  const password = process.env.CRON_FIREBASE_PASSWORD;
  if (!publicKey || !privateKey || !apiKey || !projectId || !email || !password) {
    return Response.json(
      { error: "push not configured (VAPID keys / CRON_FIREBASE_*)" },
      { status: 503 },
    );
  }
  webpush.setVapidDetails("mailto:hola@parlo.app", publicKey, privateKey);

  const db = await connect({ apiKey, projectId, email, password });
  const rows = await db.query("users", "reminder.enabled", true);
  const now = new Date();
  let sent = 0;
  let skipped = 0;
  let dropped = 0;
  // Los fallos van en la respuesta: es la única traza que ve quien dispara el
  // cron (el log de la función queda en Vercel y nadie lo mira cada hora).
  const errors: string[] = [];

  await Promise.all(
    rows.map(async ({ name, data }) => {
      const reminder = data.reminder as Reminder | undefined;
      const progress = data.progress as
        | { days?: Record<string, { xp?: number }>; streak?: number }
        | undefined;
      if (!reminder?.subscription?.endpoint) return;

      const { send, day } = shouldRemind(reminder, progress?.days ?? {}, now);
      if (!send) {
        skipped++;
        return;
      }

      try {
        await webpush.sendNotification(
          reminder.subscription,
          JSON.stringify({ ...reminderText(reminder.lang, progress?.streak ?? 0), url: "/app" }),
        );
        // Se marca el día ANTES de contar el envío: si el proceso muere aquí,
        // peor es repetir el aviso a la hora siguiente.
        await db.patchField(name, ["reminder", "lastSent"], { stringValue: day });
        sent++;
      } catch (err) {
        const status = (err as { statusCode?: number }).statusCode;
        // 404/410 = suscripción muerta (app desinstalada, permiso revocado):
        // se apaga para no reintentarla cada hora.
        if (status === 404 || status === 410) {
          await db.patchField(name, ["reminder", "enabled"], { booleanValue: false });
          dropped++;
          return;
        }
        const detail = `${status ?? "sin status"}: ${(err as Error).message}`;
        console.warn("[parlo] push falló", detail);
        errors.push(detail);
      }
    }),
  );

  return Response.json({ candidates: rows.length, sent, skipped, dropped, errors });
}
