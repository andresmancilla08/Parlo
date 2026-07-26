import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Parlo — Aprende inglés",
    short_name: "Parlo",
    description:
      "Aprende inglés con un tutor de IA que corrige y conversa en español.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff9f5",
    theme_color: "#ff6b4a",
    orientation: "portrait",
    lang: "es",
    categories: ["education"],
    shortcuts: [
      {
        name: "Seguir aprendiendo",
        short_name: "Aprender",
        url: "/app",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Hablar con el tutor",
        short_name: "Tutor",
        url: "/app/tutor",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Repasar",
        short_name: "Repaso",
        url: "/app/repaso",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
