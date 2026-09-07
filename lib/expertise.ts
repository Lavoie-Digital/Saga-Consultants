import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Tree,
  ArrowsClockwise,
  TreeStructure,
  Wrench,
  Blueprint,
  Sparkle,
  Intersect,
  Cube,
  Wall,
  Path,
} from "@phosphor-icons/react/dist/ssr";
import { expertiseLabels, type ExpertiseLabel } from "./site";

export type Expertise = {
  label: ExpertiseLabel;
  blurb: string;
  icon: PhosphorIcon;
};

/* Le type de structures que nous maîtrisons.
   Les libellés et leur ordre viennent du registre de projets : ils sont
   classés du plus au moins fréquent dans nos mandats. */
export const expertises: Expertise[] = [
  {
    label: "Ossatures légères de bois",
    blurb:
      "Multirésidentiel et bâtiments légers, optimisés pour le montage, la préfabrication et le coût.",
    icon: Tree,
  },
  {
    label: "Rétrofit structural",
    blurb:
      "Renforcement, mise aux normes et reprise en sous-œuvre de bâtiments existants, souvent en exploitation.",
    icon: ArrowsClockwise,
  },
  {
    label: "Lamellé-collé / Bois massif",
    blurb:
      "Bois d’ingénierie apparent, là où la structure fait partie de l’architecture.",
    icon: TreeStructure,
  },
  {
    label: "Maintien d’actifs",
    blurb:
      "Inspection, diagnostic et planification des travaux qui prolongent la vie utile d’un bâtiment.",
    icon: Wrench,
  },
  {
    label: "Charpentes d’acier",
    blurb:
      "Ossatures et assemblages d’acier, des portées courantes aux grandes travées libres de colonnes.",
    icon: Blueprint,
  },
  {
    label: "Hors-normes",
    blurb:
      "Ce qui ne rentre dans aucune case : géométries, charges, accès ou usages inhabituels.",
    icon: Sparkle,
  },
  {
    label: "Structures hybrides",
    blurb:
      "Acier, bois et béton combinés dans un même ouvrage, chacun là où il est le plus efficace.",
    icon: Intersect,
  },
  {
    label: "Modulaire volumétrique",
    blurb:
      "Modules préfabriqués en usine : répétabilité, tolérances et levage maîtrisés.",
    icon: Cube,
  },
  {
    label: "Coffrage isolant",
    blurb:
      "Murs en blocs de coffrage à béton isolé, pour l’enveloppe comme pour la structure.",
    icon: Wall,
  },
  {
    label: "Exécutions complexes",
    blurb:
      "Séquences de construction, ouvrages temporaires et contraintes de chantier serrées.",
    icon: Path,
  },
];

/* Garde-fou : si le registre change, la liste ci-dessus doit suivre. */
const missing = expertiseLabels.filter(
  (l) => !expertises.some((e) => e.label === l),
);
if (process.env.NODE_ENV !== "production" && missing.length > 0) {
  console.warn("Expertises sans description :", missing.join(", "));
}
