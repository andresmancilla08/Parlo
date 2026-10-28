import {
  IconBriefcase,
  IconCoffee,
  IconContract,
  IconHome2,
  IconNews,
  IconPlane,
  IconPresentationAnalytics,
  IconStethoscope,
  IconUsers,
  type Icon,
  type IconProps,
} from "@tabler/icons-react";

/** Icono de cada escenario de conversación (`lib/coach.ts`). */
export const SCENARIO_ICON: Record<string, Icon> = {
  cafe: IconCoffee,
  intro: IconUsers,
  travel: IconPlane,
  doctor: IconStethoscope,
  interview: IconBriefcase,
  flat: IconHome2,
  negotiation: IconContract,
  debate: IconNews,
  board: IconPresentationAnalytics,
};

/** Componente (y no «devuelve el icono»): crear componentes en el render rompe el estado. */
export function ScenarioIcon({ scenario, ...props }: { scenario: string | null } & IconProps) {
  const Icon = (scenario && SCENARIO_ICON[scenario]) || IconUsers;
  return <Icon {...props} />;
}
