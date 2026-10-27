# Flujo de trabajo

## Antes de tocar código
1. Leer `docs/contexto/` y `docs/roadmap-mvp.md`.
2. Confirmar en qué fase del roadmap cae el cambio.
3. Verificar tokens de diseño existentes antes de crear estilos nuevos.

## Secuencia para implementar
1. Crear rama desde `main` (`feat/...`, `fix/...`).
2. Implementar componente de servidor por defecto; `"use client"` solo si hace falta.
3. Usar tokens (`bg-primary`, `text-muted`…) e iconos Tabler.
4. Animaciones rápidas con Framer Motion (spring stiff ≥ 300, stagger ≤ 0.02s).
5. **Validar toda UI con el equipo visual** antes de darla por terminada (regla del dueño).
6. `pnpm exec tsc --noEmit` y `pnpm lint`.

## Checklist de "terminado"
- [ ] Sin errores de tipos ni lint.
- [ ] `pnpm build` pasa (usa `--webpack`).
- [ ] Responsive (móvil primero) y `prefers-reduced-motion` respetado.
- [ ] Sin strings/colores hardcodeados fuera de tokens.
- [ ] Equipo visual ha firmado la UI.
- [ ] Commit (Conventional Commits, sin mencionar IA).

## Deploy
- `vercel --prod` con la cuenta `andresmancilla08@gmail.com`.
- Variables de entorno cargadas en Vercel (Firebase + `GOOGLE_GENERATIVE_AI_API_KEY`).
- No deployar sin permiso explícito del dueño en ese turno.

## Despliegue (producción)

- **Dónde:** Vercel, scope **personal** (`andresmancilla08gmailcom's projects`), plan Hobby → gratis. NO desplegar en el scope `Lecto`: es un equipo y puede tener plan de pago.
- **URL:** https://parlo-lilac.vercel.app (`parlo.vercel.app` estaba ocupado).
- **Comando:** `vercel --prod --yes`. Antes: subir versión en `package.json`.
- **Repo conectado:** cada push a `main` dispara un despliegue de producción automático.
- **Variables:** las 7 (`GOOGLE_GENERATIVE_AI_API_KEY` + 6 `NEXT_PUBLIC_FIREBASE_*`) están en los 3 entornos. Añadir una nueva: `vercel env add NOMBRE production` (el CLI 52 instalado no admite `--value`; para preview usar `pnpm dlx vercel@latest env add NOMBRE preview --value X --yes`).
- **Dominio en Firebase:** todo dominio nuevo debe añadirse a los dominios autorizados de Auth o el login falla con `auth/unauthorized-domain`. Por API:
  `PATCH https://identitytoolkit.googleapis.com/admin/v2/projects/parlo-ecdb0/config?updateMask=authorizedDomains`

## Coste cero (requisito del dueño)

Ningún servicio tiene facturación activada y así debe seguir:
- **Vercel Hobby**: sin método de pago; al pasarse de límites se limita, no se cobra. No subir a Pro.
- **Firebase Spark**: verificado sin cuenta de facturación (`gcloud beta billing projects describe`). Nada de Cloud Functions ni Identity Platform: exigen Blaze.
- **Gemini free tier**: si se agota la cuota devuelve error, no cobra. El límite de 15 peticiones/min del tutor existe para no quemarla.

## APK de Android (TWA, instalación manual)

```bash
cd android
JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home" ./gradlew assembleDebug
cp app/build/outputs/apk/debug/app-debug.apk ~/Downloads/parlo-$(node -p "require('../package.json').version").apk
```

- Necesita `android/local.properties` con `sdk.dir=/Users/<usuario>/Library/Android/sdk` (no se versiona).
- La APK carga producción: no hay que recompilarla al cambiar la web. Solo al cambiar ícono, nombre, URL o versión.
- Instalar en el teléfono: pasar el `.apk` (WhatsApp/Drive), abrirlo y permitir «Instalar apps desconocidas» para la app desde la que se abre. Requiere Chrome instalado (si no, abre en otro navegador con barra).
- Probar en emulador sin ventana: `emulator -avd Pixel_9_Pro -no-window -no-audio`, `adb install -r <apk>`, `adb exec-out screencap -p > shot.png`.
