import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Fingerprint,
  Buildings,
  Heart,
  Armchair,
  Plant,
} from "@phosphor-icons/react/dist/ssr";

export type CareerReason = {
  title: string;
  body: string;
  icon: PhosphorIcon;
  image: string;
};

/* Pourquoi rejoindre notre équipe ? */
export const careerReasons: CareerReason[] = [
  {
    title: "Plus qu’un numéro",
    body: "Tu cherches à être autre chose qu’un numéro, ou un spécialiste relégué à un seul type de mandat ? Nous, on cherche des touche-à-tout, avec des opinions, des idées et une curiosité insatiable. Tu auras un vrai impact dans nos projets.",
    icon: Fingerprint,
    image: "/bureau/poste-travail-2.webp",
  },
  {
    title: "Des projets que tu verras sortir de terre",
    body: "Nos projets ne vivent pas dans des fichiers Excel. On voit notre travail se concrétiser dans nos milieux, et on est proche des équipes qui les réalisent.",
    icon: Buildings,
    image: "/projets/22015/1.webp",
  },
  {
    title: "Pas juste des conditions de travail",
    body: "Ta vie ne s’arrête pas à la porte du bureau, alors on prévoit des conditions de vie, pas juste de travail. Six semaines de vacances dès ton arrivée, des journées personnelles quand ça compte pour toi et ta famille, des assurances collectives et un REER pour voir plus loin que le prochain projet.",
    icon: Heart,
    image: "/bureau/equipe-exterieur.webp",
  },
  {
    title: "Des espaces qu’on aime",
    body: "Télétravail partiel permis, mais on a quand même cru bon d’organiser nos bureaux pour aimer venir y travailler. L’ambiance ici est conviviale, lumineuse et simple.",
    icon: Armchair,
    image: "/bureau/salle-conference.webp",
  },
  {
    title: "On veut te voir grandir",
    body: "On ne cherche pas quelqu’un pour combler un poste. On veut des gens qui vont évoluer, prendre leur place, et devenir une vraie valeur ajoutée pour l’équipe.",
    icon: Plant,
    image: "/bureau/plans-collaboration.webp",
  },
];

export type Posting = {
  title: string;
  location: string;
  type: string;
};

/* Aucun affichage en ce moment — la page bascule sur la candidature spontanée. */
export const postings: Posting[] = [];
