// URL pública del sitio. Vercel la inyecta en preview/prod; en local, localhost.
// ponytail: cuando haya dominio propio, se fija con NEXT_PUBLIC_SITE_URL.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
