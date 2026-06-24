import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Cube,
  Blueprint,
  Buildings,
  Waveform,
  Ruler,
  HardHat,
} from "@phosphor-icons/react/dist/ssr";

export type Expertise = {
  n: string;
  title: string;
  blurb: string;
  details: string[];
  icon: PhosphorIcon;
};

export const expertises: Expertise[] = [
  {
    n: "01",
    title: "Modulaire",
    blurb:
      "Conception de structures préfabriquées et modulaires — pensées pour la rapidité d’assemblage, la répétabilité et un chantier maîtrisé.",
    details: [
      "Préfabrication et modules",
      "Répétabilité et tolérances",
      "Assemblage rapide en chantier",
    ],
    icon: Cube,
  },
  {
    n: "02",
    title: "Structure",
    blurb:
      "Calcul et dimensionnement de charpentes en acier, béton et bois, du concept aux plans d’exécution et à la surveillance de chantier.",
    details: [
      "Acier, béton et bois",
      "Plans d’exécution",
      "Surveillance de chantier",
    ],
    icon: Blueprint,
  },
  {
    n: "03",
    title: "Bâtiment",
    blurb:
      "Ingénierie complète du bâtiment — multirésidentiel, commercial, institutionnel et industriel, en conception intégrée avec tous les intervenants.",
    details: [
      "Multirésidentiel et commercial",
      "Institutionnel et industriel",
      "Conception intégrée (BIM)",
    ],
    icon: Buildings,
  },
  {
    n: "04",
    title: "Mise à niveau parasismique",
    blurb:
      "Remettre les structures existantes aux normes actuelles de résistance et de sismicité.",
    details: [
      "Renforcement structural",
      "Mise aux normes parasismiques",
      "Réhabilitation du patrimoine bâti",
    ],
    icon: Waveform,
  },
  {
    n: "05",
    title: "Plans et devis",
    blurb:
      "Concevoir et documenter la structure de bâtiments neufs ou existants, du concept au chantier.",
    details: [
      "Bâtiments neufs et agrandissements",
      "Plans, devis et détails d’exécution",
      "Coordination interdisciplinaire (BIM)",
    ],
    icon: Ruler,
  },
  {
    n: "06",
    title: "Surveillance de travaux",
    blurb:
      "Assurer que ce qui est bâti reflète fidèlement ce qui a été conçu, sur le terrain.",
    details: [
      "Surveillance de chantier",
      "Contrôle de la conformité",
      "Attestations de conformité",
    ],
    icon: HardHat,
  },
];

/* Les trois premières sont mises en avant sur le landing. */
export const featuredExpertises = expertises.slice(0, 3);
