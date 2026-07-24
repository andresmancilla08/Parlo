import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** true solo tras la hidratación en cliente (evita mismatch SSR sin setState-in-effect). */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
