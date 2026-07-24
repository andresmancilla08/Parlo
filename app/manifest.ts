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
