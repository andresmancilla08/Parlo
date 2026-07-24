"use client";

import { useEffect } from "react";
import type { Serwist } from "@serwist/window";

declare global {
  interface Window {
    serwist?: Serwist;
  }
}

/** Registra el service worker en cliente. */
export default function RegisterPWA() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.serwist !== undefined) {
      void window.serwist.register();
    }
  }, []);
  return null;
}
