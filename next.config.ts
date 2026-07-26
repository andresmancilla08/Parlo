import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // ponytail: SW desactivado en dev para no cachear mientras se desarrolla.
  disable: process.env.NODE_ENV === "development",
});

// Cabeceras de seguridad. Sin CSP por ahora: Next inyecta scripts inline y una
// CSP mal puesta rompe la app en silencio; se añade cuando haya nonce.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" }, // nadie nos mete en un iframe
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Serwist inyecta config webpack; declarar turbopack evita el conflicto en dev.
  turbopack: {},
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withSerwist(nextConfig);
