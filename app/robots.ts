import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // `/app` es la zona privada (requiere sesión) y no debe indexarse.
    rules: { userAgent: "*", allow: "/", disallow: ["/app", "/api"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
