import {
  IconAbc,
  IconAlertTriangle,
  IconClockHour4,
  IconRepeat,
  IconTypography,
} from "@tabler/icons-react";
import { FALSE_FRIENDS, IRREGULARS, PHRASALS } from "@/lib/guide";
import { COMMON_REGULARS } from "@/lib/guide/regulars";

// Los temas de la guía. Fuera de `page.tsx` porque Next 16 no admite más
// exports que el componente en un archivo de página.
export const TOPICS = [
  {
    slug: "verbos-irregulares",
    key: "irregulares",
    icon: IconRepeat,
    count: IRREGULARS.length,
    countKey: "guia.count_verbs",
  },
  {
    slug: "verbos-regulares",
    key: "regulares",
    icon: IconTypography,
    count: COMMON_REGULARS.length,
    countKey: "guia.count_verbs",
  },
  {
    slug: "tiempos-verbales",
    key: "tiempos",
    icon: IconClockHour4,
    count: 15,
    countKey: "guia.count_tenses",
  },
  {
    slug: "phrasal-verbs",
    key: "phrasals",
    icon: IconAbc,
    count: PHRASALS.length,
    countKey: "guia.count_entries",
  },
  {
    slug: "falsos-amigos",
    key: "falsos",
    icon: IconAlertTriangle,
    count: FALSE_FRIENDS.length,
    countKey: "guia.count_entries",
  },
] as const;
