import type { ExpertiseLabel, Market, ServiceLabel } from "./site";

export type Project = {
  slug: string;
  /** Numéro de dossier SAGA — clé de correspondance avec le registre interne. */
  no: string;
  title: string;
  client?: string;
  location: string;
  year: string;
  /** Budget de construction, déjà formaté (« 12 M$ »). */
  budget?: string;
  markets: Market[];
  services: ServiceLabel[];
  expertises: ExpertiseLabel[];
  description: string;
  image: string;
  gallery?: string[];
  featured?: boolean;
};

/* Généré depuis « Registre projets site web_2026-09-07.xlsx ».
   Ne pas éditer à la main : les projets se gèrent depuis /admin une fois
   Firebase branché, et ce fichier sert de jeu de départ et de repli. */
export const projects: Project[] = [
  {
    slug: "agrandissement-sefar-bdh",
    no: "20004",
    title: "Agrandissement Sefar BDH",
    client: "Sefar BDH",
    location: "Chicoutimi",
    year: "2022",
    budget: "2,5 M$",
    markets: ["Industriel / Énergie / Minier"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Charpentes d’acier"],
    description:
      "Projet de construction d’un agrandissement sur 2 niveaux pour l’établissement industriel situé dans le secteur commercial près de l’autoroute 70. Le nouveau bâtiment est relié aux bureaux administratifs par une passerelle aérienne.",
    image: "/projets/20004/1.webp",
  },
  {
    slug: "ecole-du-vallon",
    no: "20015",
    title: "École du Vallon",
    client: "Centre de services scolaire des Rives-du-Saguenay",
    location: "Petit Saguenay",
    year: "2020",
    budget: "3,5 M$",
    markets: ["Institutionnel", "Scolaire"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Maintien d’actifs", "Lamellé-collé / Bois massif", "Rétrofit structural"],
    description:
      "Réaménagement intérieur complet de l’école primaire du Vallon.",
    image: "/projets/20015/1.webp",
    gallery: ["/projets/20015/2.webp", "/projets/20015/3.webp", "/projets/20015/4.webp", "/projets/20015/5.webp", "/projets/20015/6.webp", "/projets/20015/7.webp"],
    featured: true,
  },
  {
    slug: "ecole-jolis-pres",
    no: "20018",
    title: "École Jolis-Prés",
    location: "Laterrière",
    year: "2021",
    budget: "2,6 M$",
    markets: ["Institutionnel", "Scolaire"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Maintien d’actifs", "Structures hybrides", "Rétrofit structural"],
    description:
      "Réaménagement intérieur complet de l’école primaire Jolis-Prés.",
    image: "/projets/20018/1.webp",
  },
  {
    slug: "piscine-interieure-hotel-delta",
    no: "20021",
    title: "Piscine intérieure - Hôtel Delta",
    client: "Hôtel Delta",
    location: "Jonquière",
    year: "2020",
    budget: "1,2 M$",
    markets: ["Commercial", "Tourisme"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Coffrage isolant"],
    description:
      "Construction d’une annexe au complexe de l’hôtel Delta de jonquière pour l’accueil d’une piscine intérieure et des équipêments connexes.",
    image: "/projets/20021/1.webp",
  },
  {
    slug: "residence-d",
    no: "20039",
    title: "Résidence D",
    client: "SEBJ",
    location: "Némiscau",
    year: "2021",
    budget: "11 M$",
    markets: ["Institutionnel", "Industriel / Énergie / Minier"],
    services: ["Conception / Planification", "Services durant l’exécution", "Services aux entrepreneurs / Conception-construction"],
    expertises: ["Modulaire volumétrique"],
    description:
      "Construction d’un bloc résidentiel de 71 chambres destinées à l’usage des travailleurs. Le bâtiment est fait de modules préfabriqués pour accélérer l’exécution au chantier et limiter les besoins en main-d’œuvre désentralisée.",
    image: "/projets/20039/1.webp",
    featured: true,
  },
  {
    slug: "refection-d-une-tour-d-observation",
    no: "20041",
    title: "Réfection d’une tour d’observation",
    client: "Moulin des Pionniers",
    location: "La Doré",
    year: "2020",
    markets: ["Institutionnel", "Paramunicipal"],
    services: ["Services consultatifs / Études préparatoires", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Lamellé-collé / Bois massif", "Hors-normes"],
    description:
      "Inspection de la tour d’observation du Moulin des Pionniers de La Doré et préparation des plans requis pour sa réfection et son maintien.",
    image: "/projets/20041/1.webp",
  },
  {
    slug: "quadrilatere-du-royaume",
    no: "20043",
    title: "Quadrilatère du Royaume",
    client: "Lapointe & Gagnon",
    location: "Jonquière",
    year: "2020",
    markets: ["Commercial"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction d’un nouvel édifice à bureau situé dans le secteur commercial du Faubourg Sagami, à Jonquière. Le nouveau bâtiment comprend 2 niveaux et est fait d’une charpente en ossature légère préfabriquée et optimisée pour les besoins du projet.",
    image: "/projets/20043/1.webp",
  },
  {
    slug: "pavillon-viva",
    no: "20063",
    title: "Pavillon VIVA",
    client: "Village Vacances Petit-Saguenay",
    location: "Petit-Saguenay",
    year: "2020",
    markets: ["Commercial", "Tourisme"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Lamellé-collé / Bois massif"],
    description:
      "Construction d’un nouveau pavillon en bordure de la piscine VIVA dans le cadre de la mise à jour des installations au Village Vacances Petit-Saguenay.",
    image: "/projets/20063/1.webp",
  },
  {
    slug: "ecole-mont-valin",
    no: "21025",
    title: "École Mont-Valin",
    client: "Centre de services scolaire des Rives-du-Saguenay",
    location: "St-Fulgence",
    year: "2022",
    budget: "5,2 M$",
    markets: ["Institutionnel", "Scolaire"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Charpentes d’acier", "Rétrofit structural", "Maintien d’actifs"],
    description:
      "Réaménagement intérieur complet de l’école primaire Mont-Valin.",
    image: "/projets/21025/1.webp",
  },
  {
    slug: "le-chevalier",
    no: "21035",
    title: "Le Chevalier",
    client: "Chevaliers de Colomb",
    location: "Lac-Mégantic",
    year: "2024",
    budget: "10,5 M$",
    markets: ["Commercial", "Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Modulaire volumétrique"],
    description:
      "Construction d’un immeuble abritant 2 niveaux de logements à prix modiques sur un rez-de-chaussée de locaux commerciaux et de conférence. Le bâtiment s’intègre au microréseau électrique du centre-ville de Lac-Mégantic, un réseau énergétique innovant unique au Québec. Les étages supérieurs ont été construits en modules préfabriquées en usine.",
    image: "/projets/21035/1.webp",
    featured: true,
  },
  {
    slug: "centre-de-sante-l-equilibre",
    no: "21054",
    title: "Centre de santé l’Équilibre",
    client: "Hébergement plus",
    location: "Chicoutimi",
    year: "2024",
    budget: "16 M$",
    markets: ["Institutionnel", "Paramunicipal", "Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Charpentes d’acier", "Rétrofit structural", "Structures hybrides"],
    description:
      "Transformation de l’ancienne prison de Chicoutimi pour y installer le Centre de santé l’Équilibre. Cet établissement de 56 nouvelles chambres est destiné à offrir un milieu de vie, un soutien psychosocial et de l’hébergement temporaire pour des personnes vulnérables ou en détresse.",
    image: "/projets/21054/1.webp",
    featured: true,
  },
  {
    slug: "microtel-lachute",
    no: "21060",
    title: "Microtel Lachute",
    client: "Wyndham",
    location: "Lachute",
    year: "2023",
    budget: "12 M$",
    markets: ["Commercial", "Tourisme"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Modulaire volumétrique"],
    description:
      "Nouvel hôtel de 72 chambres sur 4 étages à Lachute, construit en modules préfabriqués hors-site.",
    image: "/projets/21060/1.webp",
    gallery: ["/projets/21060/2.webp"],
    featured: true,
  },
  {
    slug: "maison-d-accueil-pour-sans-abri",
    no: "21093",
    title: "Maison d’accueil pour sans-abri",
    client: "Maison d’accueil pour sans-abri",
    location: "Chicoutimi",
    year: "2023",
    budget: "5 M$",
    markets: ["Institutionnel", "Paramunicipal", "Patrimoine"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Rétrofit structural"],
    description:
      "Conversion d’un bâtiment patrimonial religieux pour y installer 36 chambres vouées à l’accueil des sans-abris du secteur.",
    image: "/projets/21093/1.webp",
  },
  {
    slug: "reamenagement-du-coeur-du-village",
    no: "22015",
    title: "Réaménagement du cœur du village",
    client: "Petit-Saguenay",
    location: "Petit-Saguenay",
    year: "2023",
    budget: "5 M$",
    markets: [],
    services: [],
    expertises: [],
    description:
      "Aménagement de nouvelles installations urbaines dans le cœur du village de Petit-Saguenay. Le projet incluait entre autre la construction d’une nouvelle passerelle piétonne de 50 mètres enjambant la rivière Petit-Saguenay et la construction de 2 pavillons communautaires.",
    image: "/projets/22015/1.webp",
    gallery: ["/projets/22015/2.webp", "/projets/22015/3.webp", "/projets/22015/4.webp", "/projets/22015/5.webp", "/projets/22015/6.webp"],
    featured: true,
  },
  {
    slug: "agrandissement-de-l-ecole-st-c-ur-de-marie",
    no: "22082",
    title: "Agrandissement de l’école St-Cœur-de-Marie",
    client: "Centre de services scolaire des Rives-du-Saguenay",
    location: "Chicoutimi",
    year: "2023",
    budget: "9,5 M$",
    markets: ["Institutionnel", "Scolaire"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Structures hybrides", "Rétrofit structural", "Maintien d’actifs"],
    description:
      "Construction d’un nouveau gymnase et réfection majeure des locaux existants à l’école Saint-Cœur-de-Marie, à Chicoutimi.",
    image: "/projets/22082/1.webp",
    featured: true,
  },
  {
    slug: "bibliotheque-georges-henri-levesque",
    no: "23037",
    title: "Bibliothèque Georges-Henri-Lévesque",
    client: "Ville de Roberval",
    location: "Roberval",
    year: "2025",
    budget: "8 M$",
    markets: ["Institutionnel", "Municipal"],
    services: ["Services consultatifs / Études préparatoires", "Conception / Planification", "Services durant l’exécution"],
    expertises: ["Charpentes d’acier", "Rétrofit structural"],
    description:
      "Réfection majeure de la bibliothèque municipale Georges-Henri-Lévesque de Roberval, suite à un incendie survenu en 2022. Le projet incluait la remise à niveau parasismique du bâtiment. l’ajout d’espaces communs, et la construction d’un nouvel espace extérieur partagé avec les installations voisines de la caisse Desjardins.",
    image: "/projets/23037/1.webp",
    featured: true,
  },
  {
    slug: "batiment-des-travaux-publics-a-essipit",
    no: "24054",
    title: "Bâtiment des travaux publics à Essipit",
    client: "Le Conseil de la Première Nation des Innus Essipit",
    location: "Essipit",
    year: "2026",
    budget: "7,5 M$",
    markets: ["Institutionnel", "Municipal", "Communautés autochtones"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois", "Structures hybrides"],
    description:
      "Construction d’un nouveau bâtiment destiné à supporter les opérations des travaux publics dans la communauté. Le bâtiment est entièrement réalisé en système constructif hybride acier/ossature légère de bois.",
    image: "/projets/24054/1.webp",
    gallery: ["/projets/24054/2.webp"],
  },
  {
    slug: "la-maison-du-quai",
    no: "24058",
    title: "La Maison du Quai",
    client: "La Maison du Quai",
    location: "L’Anse-St-Jean",
    year: "2024",
    budget: "1 M$",
    markets: ["Commercial", "Tourisme"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Reconstruction d’un bâtiment abritant divers commerces après un incendie. Le projet prend place en face du quai du village de L’Anse-St-Jean.",
    image: "/projets/24058/1.webp",
  },
  {
    slug: "logements-coderr-alma",
    no: "24067",
    title: "Logements Coderr - Alma",
    client: "Groupe Coderr",
    location: "Alma",
    year: "2025",
    budget: "18 M$",
    markets: ["Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction d’un bâtiment de 60 logements à prix modiques à Alma dans le cadre de l’initiative des logements abordables du Groupe Coderr, visent entre autres à favoriser l’inclusion sociale, réduire l’itinérance, soutenir le développement économique local.",
    image: "/projets/24067/1.webp",
    gallery: ["/projets/24067/2.webp"],
  },
  {
    slug: "pavillon-campagnard",
    no: "24095",
    title: "Pavillon Campagnard",
    client: "Municipalité de Rivière-Éternité",
    location: "Rivière-Éternité",
    year: "2025",
    budget: "1,8 M$",
    markets: ["Institutionnel", "Municipal", "Tourisme"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Lamellé-collé / Bois massif"],
    description:
      "Construction d’un pavillon municipal dans la première phase du Parc du Campagnard, à Rivière-Éternité. Ce bâtiment accompagnera l’offre de services au citoyen pour l’utilisation du parc, permettre les activités de rassemblement et continent un bloc sanitaire destiné à l’usage des amateurs de motoneige en hiver.",
    image: "/projets/24095/1.webp",
    gallery: ["/projets/24095/2.webp", "/projets/24095/3.webp", "/projets/24095/4.webp"],
    featured: true,
  },
  {
    slug: "place-alfred-boivin-phase-2",
    no: "24109",
    title: "Place Alfred Boivin - Phase 2",
    client: "Groupe BP",
    location: "Chicoutimi",
    year: "2026",
    budget: "12 M$",
    markets: ["Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction de la phase 2 de la Place Alfred Boivin, une nouvelle aile de 42 logements en ossature légère de bois avec rangements en sous-sol.",
    image: "/projets/24109/1.webp",
  },
  {
    slug: "projet-laforest",
    no: "24125",
    title: "Projet Laforest",
    client: "Construction Dinamo",
    location: "Québec",
    year: "2026",
    markets: ["Multilogement"],
    services: ["Services consultatifs / Études préparatoires", "Services aux entrepreneurs / Conception-construction"],
    expertises: ["Ossatures légères de bois", "Hors-normes"],
    description:
      "Construction du complexe Laforest, un projet de 358 condos locatifs à Québec. SAGA s’est vu octroyé le mandat d’élaborer la solution technique liée à la construction d’une enveloppe de bâtiment novatrice en ossature légère de bois. Le gouvernement du Québec a investi une somme de plus de 1M$ pour cette portion du projet dans le cadre de son programme Innovation Bois.",
    image: "/projets/24125/1.webp",
    featured: true,
  },
  {
    slug: "logements-coderr-chicoutimi",
    no: "25064",
    title: "Logements Coderr - Chicoutimi",
    client: "Groupe Coderr",
    location: "Chicoutimi",
    year: "2026",
    budget: "23 M$",
    markets: ["Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction d’un bâtiment de 79 logements à prix modiques à Chicoutimi dans le cadre de l’initiative des logements abordables du Groupe Coderr, visent entre autres à favoriser l’inclusion sociale, réduire l’itinérance, soutenir le développement économique local.",
    image: "/projets/25064/1.webp",
    gallery: ["/projets/25064/2.webp"],
  },
  {
    slug: "residence-h-uqac",
    no: "25083",
    title: "Résidence H, UQAC",
    client: "Réseau de l’Université du Québec",
    location: "Chicoutimi",
    year: "2026",
    budget: "10,5 M$",
    markets: ["Institutionnel", "Scolaire", "Multilogement"],
    services: ["Conception / Planification", "Services durant l’exécution"],
    expertises: ["Ossatures légères de bois"],
    description:
      "Construction du pavillon H aux résidences étudiantes de l’UQAC. Il s’agit d’un bâtiment d’appartements et de chambres sur 4 étages en ossature légère de bois, relié par un corridor à un pavillon de cuisines et d’espaces communs.",
    image: "/projets/25083/1.webp",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

/* ------------------------------------------------------------------
   Tri — trois axes indépendants, jamais croisés entre eux.
   ------------------------------------------------------------------ */

export const filterAxes = ["marches", "expertises", "services"] as const;
export type FilterAxis = (typeof filterAxes)[number];

export type ActiveFilter = { axis: FilterAxis; value: string } | null;

export function matchesFilter(p: Project, filter: ActiveFilter): boolean {
  if (!filter) return true;
  const pool =
    filter.axis === "marches"
      ? (p.markets as readonly string[])
      : filter.axis === "expertises"
        ? (p.expertises as readonly string[])
        : (p.services as readonly string[]);
  return pool.includes(filter.value);
}

export function filterProjects(
  filter: ActiveFilter,
  list: Project[] = projects,
): Project[] {
  return list.filter((p) => matchesFilter(p, filter));
}

/** Projets à proposer au bas d'une fiche, en respectant le tri actif s'il y en a un. */
export function relatedProjects(
  slug: string,
  filter: ActiveFilter,
  list: Project[] = projects,
): Project[] {
  const scoped = filterProjects(filter, list).filter((p) => p.slug !== slug);
  if (scoped.length >= 4) return scoped;
  // Le tri actif ne laisse pas assez de projets : compléter avec les autres.
  const seen = new Set(scoped.map((p) => p.slug));
  const rest = list.filter((p) => p.slug !== slug && !seen.has(p.slug));
  return [...scoped, ...rest];
}

/** Sérialise le tri actif dans l'URL pour le retrouver sur la fiche du projet. */
export function filterToQuery(filter: ActiveFilter): string {
  return filter ? `?tri=${filter.axis}:${encodeURIComponent(filter.value)}` : "";
}

export function filterFromQuery(raw: string | null | undefined): ActiveFilter {
  if (!raw) return null;
  const sep = raw.indexOf(":");
  if (sep < 0) return null;
  const axis = raw.slice(0, sep) as FilterAxis;
  const value = raw.slice(sep + 1);
  if (!filterAxes.includes(axis) || !value) return null;
  return { axis, value };
}
