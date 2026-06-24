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
  { label: "La Firme", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Expertise", href: "/expertise" },
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
