import {
  IconHome2,
  IconBookmarks,
  IconBook2,
  IconMessages,
  IconTargetArrow,
  IconUser,
  type Icon,
} from "@tabler/icons-react";

/** Ítems de navegación compartidos por Sidebar (desktop) y BottomNav (móvil). */
export const navItems: { href: string; labelKey: string; icon: Icon }[] = [
  { href: "/app", labelKey: "nav.ruta", icon: IconHome2 },
  { href: "/app/leer", labelKey: "nav.leer", icon: IconBookmarks },
  { href: "/app/practica", labelKey: "nav.practica", icon: IconMessages },
  { href: "/app/guia", labelKey: "nav.guia", icon: IconBook2 },
  { href: "/app/retos", labelKey: "nav.retos", icon: IconTargetArrow },
  { href: "/app/perfil", labelKey: "nav.perfil", icon: IconUser },
];
