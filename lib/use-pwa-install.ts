"use client";

import { useSyncExternalStore } from "react";

// Instalación de la PWA. Mismo enfoque que Spendia (hooks/usePwaInstall.ts):
// Chrome/Android dispara `beforeinstallprompt` (se captura ANTES de que monte
// React, desde el layout) e iOS no lo soporta → allí se explican los pasos.
//
// Se usa `useSyncExternalStore` y no useState+useEffect porque React 19 prohíbe
// el setState síncrono dentro de un efecto (ver docs/contexto/errores-conocidos).

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    __pwaPrompt?: BeforeInstallPromptEvent | null;
  }
}

/* ---------- store externo: el evento de instalación ---------- */

let captured: BeforeInstallPromptEvent | null = null;
let installed = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void): () => void {
  if (listeners.size === 0) {
    // El evento pudo llegar antes de montar React: lo dejó el script del layout.
    captured = window.__pwaPrompt ?? null;
    window.__pwaPrompt = null;
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
  }
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    }
  };
}

function onBeforeInstall(e: Event) {
  e.preventDefault();
  captured = e as BeforeInstallPromptEvent;
  emit();
}

function onInstalled() {
  installed = true;
  captured = null;
  emit();
}

/** Snapshot estable: la misma cadena mientras no cambie nada. */
function getSnapshot(): string {
  const standalone = installed || isStandalone();
  return `${standalone ? "1" : "0"}|${captured ? "1" : "0"}`;
}

function getServerSnapshot(): string {
  return "0|0"; // en el servidor no se sabe: el banner aparece tras hidratar
}

function isStandalone(): boolean {
  const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone;
  if (iosStandalone === true) return true;
  return window.matchMedia("(display-mode: standalone)").matches;
}

export function isIOS(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  // iPadOS 13+ se identifica como Mac, se distingue por el táctil.
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

export function usePwaInstall() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [standalone, hasPrompt] = snapshot.split("|");

  async function install(): Promise<boolean> {
    if (!captured) return false;
    await captured.prompt();
    const { outcome } = await captured.userChoice;
    if (outcome === "accepted") {
      installed = true;
      captured = null;
      emit();
    }
    return outcome === "accepted";
  }

  return {
    isStandalone: standalone === "1",
    canNativeInstall: hasPrompt === "1",
    install,
  };
}
