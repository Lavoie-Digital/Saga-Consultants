export type Office = {
  id: string;
  city: string;
  address: string;
  locality: string;
  /** Lien vers l'épingle Google Maps. */
  mapsUrl: string;
  /** Coordonnées de l'épingle dans le repère de `QUEBEC_VIEWBOX`. */
  pin: { x: number; y: number };
};

/** Cadrage du tracé « qc » de `canada-map`, resserré sur la province. */
export const QUEBEC_VIEWBOX = "590 405 319 372";

/* NOTE: l'adresse civique du bureau de Lévis reste à confirmer par SAGA —
   la fiche pointe pour l'instant vers une recherche Google Maps nominative. */
export const offices: Office[] = [
  {
    id: "saguenay",
    city: "Saguenay",
    address: "2438, rue Saint-Dominique",
    locality: "Jonquière, QC  G7X 6K5",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=2438+rue+Saint-Dominique+Jonqui%C3%A8re+QC+G7X+6K5",
    pin: { x: 753.4, y: 682.4 },
  },
  {
    id: "levis",
    city: "Lévis",
    address: "Adresse à confirmer",
    locality: "Lévis, QC",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=SAGA+Consultants+L%C3%A9vis+QC",
    pin: { x: 765.2, y: 714.3 },
  },
];

export const site = {
  name: "SAGA Consultants",
  tagline: "Un savoir-faire qui va au-delà des plans",
  shortPitch: "Firme de génie-conseil spécialisée en structures.",
  longPitch:
    "Firme de génie-conseil spécialisée en structures. Nous considérons l’ensemble d’un projet, pas seulement nos feuilles de calcul, pour maximiser notre valeur ajoutée.",
  contact: {
    phone: "(581) 222-0225",
    phoneHref: "tel:+15812220225",
    email: "info@sagaconsultants.ca",
  },
  social: {
    /* NOTE: page LinkedIn à confirmer par SAGA avant mise en ligne. */
    linkedin: "https://www.linkedin.com/company/saga-consultants/",
    facebook: "https://www.facebook.com/profile.php?id=100057437260102",
  },
} as const;

/** Bureau principal — utilisé pour les données structurées et le pied de page. */
export const headOffice = offices[0];

export const nav = [
  { label: "La Firme", href: "/" },
  { label: "Projets", href: "/projets" },
  { label: "Équipe", href: "/equipe" },
  { label: "Carrières", href: "/carrieres" },
] as const;

/* ------------------------------------------------------------------
   Taxonomies — les trois axes de tri de la page Projets.
   ------------------------------------------------------------------ */

/* Reprises telles quelles du registre de projets — ce sont aussi les clés
   de tri de la page Projets, elles doivent correspondre au caractère près. */
export const markets = [
  "Institutionnel",
  "Multilogement",
  "Commercial",
  "Scolaire",
  "Tourisme",
  "Municipal",
  "Paramunicipal",
  "Industriel / Énergie / Minier",
  "Patrimoine",
  "Communautés autochtones",
] as const;

export const serviceLabels = [
  "Conception / Planification",
  "Services durant l’exécution",
  "Services consultatifs / Études préparatoires",
  "Services aux entrepreneurs / Conception-construction",
] as const;

export const expertiseLabels = [
  "Ossatures légères de bois",
  "Rétrofit structural",
  "Lamellé-collé / Bois massif",
  "Maintien d’actifs",
  "Charpentes d’acier",
  "Hors-normes",
  "Structures hybrides",
  "Modulaire volumétrique",
  "Coffrage isolant",
  "Exécutions complexes",
] as const;
export type Market = (typeof markets)[number];
export type ServiceLabel = (typeof serviceLabels)[number];
export type ExpertiseLabel = (typeof expertiseLabels)[number];
