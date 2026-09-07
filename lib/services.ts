import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Lightbulb,
  Compass,
  HardHat,
  Crane,
} from "@phosphor-icons/react/dist/ssr";
import type { ServiceLabel } from "./site";

export type ServiceFamily = {
  /** Doit correspondre exactement au libellé de tri de la page Projets. */
  label: ServiceLabel;
  /** Version courte pour les puces et les onglets. */
  short: string;
  promise: string;
  items: string[];
  icon: PhosphorIcon;
};

export const serviceFamilies: ServiceFamily[] = [
  {
    label: "Services consultatifs / Études préparatoires",
    short: "Services consultatifs",
    promise: "Partir vos projets sur une fondation solide",
    items: [
      "Études de faisabilité / Études d’avant-projet",
      "Expertises et avis techniques",
      "Contre-expertises légales",
      "Recherches de solutions techniques",
    ],
    icon: Lightbulb,
  },
  {
    label: "Conception / Planification",
    short: "Conception",
    promise:
      "Fournir une valeur ajoutée réelle par une participation active dans l’orientation du projet",
    items: [
      "Préparation de plans et devis de structure",
      "Estimations budgétaires",
      "Stratégie de projet",
      "Gestion d’équipes multidisciplinaires",
    ],
    icon: Compass,
  },
  {
    label: "Services durant l’exécution",
    short: "Exécution",
    promise: "Le contrôle qualité par un suivi impliqué et proactif",
    items: [
      "Surveillance de chantier",
      "Optimisation de plans",
      "Gestion contractuelle",
    ],
    icon: HardHat,
  },
  {
    label: "Services aux entrepreneurs / Conception-construction",
    short: "Entrepreneurs",
    promise:
      "Des concepteurs versatiles qui comprennent la réalité du terrain",
    items: [
      "Ouvrages temporaires",
      "Méthodes de chantier / Assistance technique",
      "Détaillages spécialisés",
      "Conception-construction (Design Build)",
    ],
    icon: Crane,
  },
];
