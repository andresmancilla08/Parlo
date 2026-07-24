import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import RegisterPWA from "./register-pwa";
import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  applicationName: "Parlo",
  title: {
    default: "Parlo — Aprende inglés como se debe",
    template: "%s · Parlo",
  },
  description:
    "Aprende inglés desde cero hasta avanzado con un tutor de IA que corrige y conversa en español, currículo por niveles, repaso espaciado y retos.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Parlo",
  },
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
        <RegisterPWA />
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
