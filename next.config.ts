import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // ponytail: SW desactivado en dev para no cachear mientras se desarrolla.
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  // Serwist inyecta config webpack; declarar turbopack evita el conflicto en dev.
  turbopack: {},
};

export default withSerwist(nextConfig);
