import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import RegisterPWA from "./register-pwa";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { siteUrl } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const title = "Parlo — Aprende inglés como se debe";
const description =
  "Aprende inglés desde cero hasta avanzado con un tutor de IA que corrige y conversa en español, currículo por niveles, repaso espaciado y retos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Parlo",
  title: { default: title, template: "%s · Parlo" },
  description,
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Parlo",
  },
  // El idioma de la UI se cambia en cliente (i18next), así que los metadatos
  // van en español: el locale por URL exigiría rutas /es|/en (ver decisiones.md).
  openGraph: {
    type: "website",
    siteName: "Parlo",
    locale: "es_ES",
    url: "/",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#140e24" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${montserrat.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('parlo-theme');var t=s?JSON.parse(s).state.theme:'system';var d=t==='dark'||((t==='system'||!t)&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}`,
          }}
        />
        {/* El evento de instalación llega antes de que React monte: se guarda
            para poder ofrecer el diálogo nativo después (patrón de Spendia). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__pwaPrompt=null;addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pwaPrompt=e;});`,
          }}
        />
        <RegisterPWA />
        <ThemeProvider />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
