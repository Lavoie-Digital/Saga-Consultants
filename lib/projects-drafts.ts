import type { ExpertiseLabel, Market, ServiceLabel } from "./site";

/**
 * Dossiers du registre qui n'ont pas encore de photo publiable.
 *
 * Ils sont poussés dans Firestore comme brouillons : visibles dans /admin,
 * absents du site public. Il suffit d'y ajouter une photo et de cocher
 * « Publier » pour les faire apparaître.
 */
export type DraftProject = {
  slug: string;
  no: string;
  title: string;
  client?: string;
  location: string;
  year: string;
  budget?: string;
  markets: Market[];
  services: ServiceLabel[];
  expertises: ExpertiseLabel[];
  description: string;
};

/* Généré depuis « Registre projets site web_2026-09-07.xlsx » — les lignes
   marquées « rentre public quand on aura photos ». */
export const draftProjects: DraftProject[] = [
  {
    slug: "halte-beluga",
    no: "X_20077",
    title: "Halte Béluga",
    client: "Sépaq",
    location: "Sacré-Cœur",
    year: "2024",
    budget: "1,3 M$",
    markets: ["Institutionnel", "Tourisme"],
    services: [],
    expertises: [],
    description:
      "Ajouter d’un étage et mise à jour des installations sur le site de la Halte Béluga, dans le secteur de la Baie-Ste-Marguerite du parc national du Fjord-du-Saguenay. Le projet nécessitaire le développement de solutions compatibles avec une construction difficile d’accès.",
  },
  {
    slug: "renforcement-de-la-toiture-de-l-eglise-st-joseph",
    no: "21039",
    title: "Renforcement de la toiture de l’église St-Joseph",
    client: "Fabrique St-Joseph d’Alma",
    location: "Alma",
    year: "2022",
    budget: "1,2 M$",
    markets: ["Patrimoine"],
    services: ["Services consultatifs / Études préparatoires", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Lamellé-collé / Bois massif", "Rétrofit structural", "Maintien d’actifs"],
    description:
      "Expertise structural visant le renforcement et la réfection de la charpente du toit de l’église St-Joseph, au centre-ville d’Alma.",
  },
  {
    slug: "borea-canada",
    no: "X_21079",
    title: "Boréa Canada",
    client: "Boréa Canada",
    location: "Chicoutimi",
    year: "2022",
    markets: ["Commercial"],
    services: ["Services consultatifs / Études préparatoires", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Charpentes d’acier", "Rétrofit structural"],
    description:
      "Construction d’un nouveau bâtiment d’opérations à même une charpente d’acier déménagée et modifiée.",
  },
  {
    slug: "escalier-des-dunes",
    no: "X_23057",
    title: "Escalier des dunes",
    client: "Sépaq",
    location: "Tadoussac",
    year: "2025",
    budget: "2,4 M$",
    markets: ["Institutionnel", "Tourisme"],
    services: ["Services consultatifs / Études préparatoires", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Structures hybrides", "Exécutions complexes", "Hors-normes"],
    description:
      "Accompagnement des gestionnaires de la Sépaq dans le cadre de la construction d’un nouvel escalier d’accès au Dunes de Tadoussac. Le projet incluait les études préparatoires au développement du tracé, la préparation des plans et devis de structure pour la structure sur roc et en encorbellement, ainsi que la surveillance des travaux.",
  },
  {
    slug: "ecole-vanier",
    no: "X_23125",
    title: "École Vanier",
    client: "Centre de services scolaire des Rives-du-Saguenay",
    location: "Chicoutimi-Nord",
    year: "2026",
    markets: ["Institutionnel", "Scolaire"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Lamellé-collé / Bois massif", "Rétrofit structural", "Maintien d’actifs"],
    description:
      "Réaménagement intérieur complet de l’école primaire Vanier",
  },
  {
    slug: "centre-communautaire-de-la-dore",
    no: "X_23131",
    title: "Centre communautaire de La Doré",
    client: "Municipalité de La Paroisse de La Doré",
    location: "La Doré",
    year: "2024",
    budget: "7 M$",
    markets: ["Institutionnel", "Municipal"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Lamellé-collé / Bois massif"],
    description:
      "Construction d’un nouveau centre communautaire annexé à l’aréna municipal de La Doré. Le projet consiste en un bâtiment en bois lamellé-collé apparent devant abriter divers organismes publics et pouvant servir de lieu de rassemblement.",
  },
  {
    slug: "patinoire-du-parc-du-rocher",
    no: "X_24014",
    title: "Patinoire du Parc du Rocher",
    client: "Atelier Mock-Up",
    location: "St-Amable",
    year: "2024",
    budget: "3 M$",
    markets: ["Institutionnel", "Municipal"],
    services: ["Services consultatifs / Études préparatoires"],
    expertises: ["Hors-normes"],
    description:
      "Quelques fois, ce sont les innovations à petite échelle qui comptent! Dans le cadre du projet de construction de la nouvelle patinoire couverte dans la municipalité de St-Amable, SAGA a eu l’occasion d’apporter son grain de sel en offrant des services d’assistance technique au niveau des supports du système de panneaux architecturaux modulaires mis en place au plafond du bâtiment.",
  },
  {
    slug: "boite-a-dents",
    no: "X_24107",
    title: "Boîte à dents",
    client: "La Boîte à dents",
    location: "Alma",
    year: "2026",
    budget: "2,5 M$",
    markets: ["Commercial"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Charpentes d’acier"],
    description:
      "Construction d’un nouveau commercial à l’angle du l’avenue du Pont Sud et de la route du Lac Ouest, à Alma",
  },
  {
    slug: "escapa",
    no: "X_24131",
    title: "Escapa",
    client: "Escapa",
    location: "Sainte-Rose-du-Nord",
    year: "2025",
    budget: "2,5 M$",
    markets: ["Commercial", "Tourisme"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois", "Hors-normes"],
    description:
      "Le projet Escapa propose une immersion unique en surplomb du fjord du Saguenay. Construction de 5 chalets architecturaux sur la falaise, au cœur de Sainte-Rose-du-Nord.",
  },
  {
    slug: "patinoire-couverte-de-larouche",
    no: "X_24133",
    title: "Patinoire couverte de Larouche",
    client: "Municipalité de Larouche",
    location: "Larouche",
    year: "2026",
    budget: "2,8 M$",
    markets: ["Institutionnel", "Municipal"],
    services: ["Services consultatifs / Études préparatoires", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Structures hybrides"],
    description:
      "Construction d’une nouvelle patinoire couverte dans la municipalité de Larouche. Le projet consiste en une charpente hybride d’acier et de fermes préfabriquées en ossature légère.",
  },
  {
    slug: "logements-hocquart",
    no: "X_25013",
    title: "Logements Hocquart",
    client: "Immologix",
    location: "Jonquière",
    year: "2026",
    budget: "6 M$",
    markets: ["Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction d’un immeuble de 24 logements de haute qualité en ossature légère de bois.",
  },
  {
    slug: "complexe-residentiel-cap-chat",
    no: "X_25107",
    title: "Complexe résidentiel Cap-Chat",
    client: "CMétis",
    location: "Cap-Chat",
    year: "2026",
    budget: "16,4 M$",
    markets: ["Multilogement"],
    services: ["Services aux entrepreneurs / Conception-construction", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois", "Modulaire volumétrique"],
    description:
      "Construction de 2 immeubles de 24 logements à prix modiques. Le projet est réalisé en construction modulaire volumétrique et s’incrit dans le cadre de l’Initiative de multilogements hautement préfabriqués soutenue par la SHQ.",
  },
  {
    slug: "agrandissement-ecole-le-roseau",
    no: "X_25108",
    title: "Agrandissement École le Roseau",
    client: "Centre de services scolaire des Rives-du-Saguenay",
    location: "Chicoutimi-Nord",
    year: "2026",
    budget: "1 M$",
    markets: ["Institutionnel", "Scolaire"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction d’une nouvelle salle de classe et de ses locaux accessoires à l’école le Roseau, à Chicoutimi-Nord",
  },
  {
    slug: "lab-ecole-rimouski",
    no: "X_25113",
    title: "Lab-École - Rimouski",
    client: "Centre de services scolaire des Phares",
    location: "Rimouski",
    year: "2026",
    markets: ["Institutionnel", "Scolaire"],
    services: ["Services consultatifs / Études préparatoires", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Hors-normes", "Maintien d’actifs"],
    description:
      "Dans le cadre de la finalisation du chantier du Lab-École de Rimouski, SAGA s’est vu octroyé le mandat de mettre une place un système d’arrêt-neige compatible avec la toiture déjà en place.",
  },
  {
    slug: "complexe-amedee",
    no: "X_25123",
    title: "Complexe Amédée",
    client: "Société d’expansion de Baie-Comeau (SEBC)",
    location: "Baie-Comeau",
    year: "2026",
    budget: "27,5 M$",
    markets: ["Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution", "Services aux entrepreneurs / Conception-construction"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction d’un nouveau bâtiment de 72 logements destiné à l’usage des travailleurs temporaires du chantier de réfection de Manic-2 d’Hydro-Québec. Le projet est complété en formule Conception-construction avec Les entreprises G&M Laplante ltée.",
  },
];
