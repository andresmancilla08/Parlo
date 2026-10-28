import {
  IconHome2,
  IconBookmarks,
  IconBook2,
  IconMessages,
  IconTargetArrow,
  IconUser,
  type Icon,
} from "@tabler/icons-react";

type NavItem = {
  href: string;
  labelKey: string;
  icon: Icon;
  /** Otras rutas que cuentan como esta pestaña (sub-pantallas sin pestaña propia). */
  also?: string[];
};

/** Ítems de navegación compartidos por Sidebar (desktop) y BottomNav (móvil). */
export const navItems: NavItem[] = [
  { href: "/app", labelKey: "nav.ruta", icon: IconHome2 },
  { href: "/app/leer", labelKey: "nav.leer", icon: IconBookmarks },
  // El modo llamada vive dentro de «Practicar»: la barra no cabe otra pestaña en 320 px.
  { href: "/app/practica", labelKey: "nav.practica", icon: IconMessages, also: ["/app/llamada"] },
  { href: "/app/guia", labelKey: "nav.guia", icon: IconBook2 },
  { href: "/app/retos", labelKey: "nav.retos", icon: IconTargetArrow },
  { href: "/app/perfil", labelKey: "nav.perfil", icon: IconUser },
];

/** ¿La ruta actual pertenece a esta pestaña? */
export function isNavActive(item: NavItem, pathname: string): boolean {
  if (item.href === "/app") return pathname === "/app";
  return [item.href, ...(item.also ?? [])].some((h) => pathname.startsWith(h));
}
