import {
  IconHome2,
  IconMessageChatbot,
  IconTargetArrow,
  IconUser,
  type Icon,
} from "@tabler/icons-react";

/** Ítems de navegación compartidos por Sidebar (desktop) y BottomNav (móvil). */
export const navItems: { href: string; labelKey: string; icon: Icon }[] = [
  { href: "/app", labelKey: "nav.ruta", icon: IconHome2 },
  { href: "/app/tutor", labelKey: "nav.tutor", icon: IconMessageChatbot },
  { href: "/app/retos", labelKey: "nav.retos", icon: IconTargetArrow },
  { href: "/app/perfil", labelKey: "nav.perfil", icon: IconUser },
];
