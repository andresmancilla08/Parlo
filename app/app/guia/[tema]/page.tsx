"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useTranslation } from "react-i18next";
import { BackButton } from "@/components/ui/back-button";
import { IrregularsView } from "@/components/guide/irregulars-view";
import { RegularsView } from "@/components/guide/regulars-view";
import { ConjugatorView } from "@/components/guide/conjugator-view";
import { PhrasalsView } from "@/components/guide/phrasals-view";
import { FalseFriendsView } from "@/components/guide/false-friends-view";

// Una sola ruta para los cinco temas: cambian los datos y la tabla, no el
// armazón. Añadir un tema es una línea aquí y un componente.
const VIEWS: Record<string, { key: string; View: () => React.ReactElement }> = {
  "verbos-irregulares": { key: "irregulares", View: IrregularsView },
  "verbos-regulares": { key: "regulares", View: RegularsView },
  "tiempos-verbales": { key: "tiempos", View: ConjugatorView },
  "phrasal-verbs": { key: "phrasals", View: PhrasalsView },
  "falsos-amigos": { key: "falsos", View: FalseFriendsView },
};

export default function GuiaTemaPage() {
  const { t } = useTranslation();
  const params = useParams<{ tema: string }>();
  const entry = VIEWS[params.tema];
  if (!entry) notFound();

  const { key, View } = entry;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-8 pt-5 sm:px-5">
      <BackButton href="/app/guia" />
      <h1 className="mt-3 font-display text-2xl font-black">{t(`guia.topic_${key}`)}</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`guia.topic_${key}_desc`)}</p>
      <div className="mt-6">
        <View />
      </div>
    </div>
  );
}
