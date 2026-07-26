import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Sólo rutas públicas: la app vive tras login y no se indexa.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/login", "/registro"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.5,
  }));
}
