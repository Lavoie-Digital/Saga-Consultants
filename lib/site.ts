export const site = {
  name: "SAGA Consultants",
  tagline: "La beauté des solutions simples",
  shortPitch:
    "Firme de génie-conseil spécialisée en structures.",
  contact: {
    address: "2438, rue Saint-Dominique",
    city: "Jonquière, QC  G7X 6K5",
    phone: "(581) 222-0225",
    phoneHref: "tel:+15812220225",
    email: "info@sagaconsultants.ca",
    region: "Saguenay–Lac-Saint-Jean",
  },
  social: {
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
  },
} as const;

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projets", href: "/projets" },
  { label: "Équipe", href: "/equipe" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  index: string;
  title: string;
  blurb: string;
  details: string[];
  image: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "Études préparatoires",
    blurb:
      "Analyser le potentiel structural d’un site ou d’un bâtiment avant la première ligne de plan.",
    details: [
      "Relevés et investigation de l’existant",
      "Validation des hypothèses de charge",
      "Esquisses de concept structural",
    ],
    image: "/centre-communautaire.webp",
  },
  {
    index: "02",
    title: "Rapports d’expertise",
    blurb:
      "Expertise structurale, études de faisabilité et évaluations post-désastre, signées et scellées.",
    details: [
      "Diagnostic d’intégrité structurale",
      "Faisabilité technique et budgétaire",
      "Évaluation post-sinistre",
    ],
    image: "/seminaire.webp",
  },
  {
    index: "03",
    title: "Mise à niveau parasismique",
    blurb:
      "Remettre les structures existantes aux normes actuelles de résistance et de sismicité.",
    details: [
      "Renforcement structural",
      "Mise aux normes parasismiques",
      "Réhabilitation du patrimoine bâti",
    ],
    image: "/centre-sante-equilibre.webp",
  },
  {
    index: "04",
    title: "Plans et devis",
    blurb:
      "Concevoir et documenter la structure de bâtiments neufs ou existants, du concept au chantier.",
    details: [
      "Bâtiments neufs et agrandissements",
      "Plans, devis et détails d’exécution",
      "Coordination interdisciplinaire (BIM)",
    ],
    image: "/ecole-scdm.webp",
  },
  {
    index: "05",
    title: "Surveillance de travaux",
    blurb:
      "Assurer que ce qui est bâti reflète fidèlement ce qui a été conçu, sur le terrain.",
    details: [
      "Surveillance de chantier",
      "Contrôle de la conformité",
      "Attestations de conformité",
    ],
    image: "/microtel.webp",
  },
];

export const sectors = [
  "Multirésidentiel",
  "Commercial",
  "Institutionnel",
  "Industriel",
  "Hôtellerie",
  "Récréatif",
  "Patrimonial",
] as const;

export type Sector = (typeof sectors)[number];

export const stats = [
  { value: "150+", label: "Projets livrés" },
  { value: "16", label: "Membres de l’équipe" },
  { value: "2020", label: "Année de fondation" },
  { value: "100 %", label: "Conception intégrée" },
];
