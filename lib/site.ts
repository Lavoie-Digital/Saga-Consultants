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

export const offices: Office[] = [
  {
    id: "saguenay",
    city: "Saguenay",
    address: "2438, rue Saint-Dominique",
    locality: "Jonquière, QC  G7X 6K5",
    /* Fiche Google Maps de l'entreprise, fournie par SAGA. */
    mapsUrl:
      "https://www.google.com/maps/place/SAGA+Consultants+Inc/@48.4110255,-71.2584884,17z/data=!4m15!1m8!3m7!1s0x4cc029218f0fe449:0x8c2c311df47624d9!2s2438+Rue+Saint-Dominique,+Saguenay,+QC+G7X+6K5!3b1!8m2!3d48.4110255!4d-71.2559135!16s%2Fg%2F11xp9324c8!3m5!1s0x4cc0299b0615595f:0x6b8b4b6581624d63!8m2!3d48.4110345!4d-71.2559019!16s%2Fg%2F11qpgth16y",
    pin: { x: 753.4, y: 682.4 },
  },
  {
    id: "levis",
    city: "Lévis",
    address: "1190b, rue Courchevel, 4e étage",
    locality: "Lévis, QC  G6W 0M6",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=1190b+rue+Courchevel+L%C3%A9vis+QC+G6W+0M6",
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
    linkedin: "https://www.linkedin.com/company/saga-consultants-senc/",
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
