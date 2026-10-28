import type { CapacitorConfig } from "@capacitor/cli";

// APK nativa de Android (Capacitor). La app NO lleva la web dentro: el WebView
// carga la web desplegada (`server.url`), porque Parlo tiene rutas de servidor
// (/api/*) y no se puede exportar estática. Lo que el WebView no trae (voz del
// dispositivo, reconocimiento de voz) lo cubren plugins nativos; ver
// docs/contexto/decisiones.md («APK de Android: Capacitor»).
//
// Para probar contra un `next dev` local desde el emulador:
//   PARLO_CAP_DEV_URL=http://10.0.2.2:3000 pnpm cap sync android
// Ese build permite HTTP en claro; la APK que se entrega se sincroniza SIN la
// variable (producción, sólo HTTPS).
const devUrl = process.env.PARLO_CAP_DEV_URL;

const config: CapacitorConfig = {
  appId: "co.parlo.app",
  appName: "Parlo",
  // Sólo la página de «sin conexión»: lo demás llega de `server.url`.
  webDir: "capacitor/www",
  backgroundColor: "#fff9f5",
  appendUserAgent: "ParloAndroid",
  server: {
    url: devUrl ?? "https://parlo-lilac.vercel.app",
    cleartext: Boolean(devUrl),
    errorPath: "offline.html",
  },
  plugins: {
    SystemBars: {
      // Los márgenes de las barras los pone MainActivity (encoge el WebView
      // para que nada quede debajo de la barra de estado ni del teclado).
      insetsHandling: "disable",
    },
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      launchFadeOutDuration: 200,
      backgroundColor: "#fff9f5",
      androidScaleType: "CENTER_INSIDE",
      showSpinner: false,
    },
  },
};

export default config;
