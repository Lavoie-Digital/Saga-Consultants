export type Member = {
  name: string;
  role: string;
  group: "Direction" | "Ingénierie" | "Conception" | "Administration";
  /* Portrait dans /public/team/<slug>.webp — laisser vide tant que la photo
     n'est pas fournie (une vignette à initiales est alors affichée). */
  photo?: string;
};

/* NOTE: les rôles sont des hypothèses à valider par SAGA. */
export const team: Member[] = [
  { name: "Marc-Olivier", role: "Ingénieur associé", group: "Direction", photo: "/team/marc-olivier.webp" },
  { name: "Simon", role: "Ingénieur associé", group: "Direction", photo: "/team/simon.webp" },
  { name: "Mario", role: "Ingénieur principal", group: "Ingénierie", photo: "/team/mario.webp" },
  { name: "Mathieu", role: "Ingénieur en structures", group: "Ingénierie", photo: "/team/mathieu.webp" },
  { name: "François", role: "Ingénieur en structures", group: "Ingénierie", photo: "/team/francois.webp" },
  { name: "Alexandre", role: "Ingénieur en structures", group: "Ingénierie", photo: "/team/alexandre.webp" },
  { name: "Mischaël", role: "Ingénieur en structures", group: "Ingénierie", photo: "/team/mischael.webp" },
  { name: "Florian", role: "Ingénieur en structures", group: "Ingénierie", photo: "/team/florian.webp" },
  { name: "Jocelyn", role: "Ingénieur en structures", group: "Ingénierie", photo: "/team/jocelyn.webp" },
  { name: "Xavier", role: "Concepteur — BIM", group: "Conception", photo: "/team/xavier.webp" },
  { name: "Élisabeth", role: "Technicienne en génie civil", group: "Conception", photo: "/team/elisabeth.webp" },
  { name: "Gabrielle", role: "Conceptrice — dessin technique", group: "Conception", photo: "/team/gabrielle.webp" },
  { name: "Jahia", role: "Conceptrice — dessin technique", group: "Conception", photo: "/team/jahia.webp" },
  { name: "Aatu", role: "Concepteur — dessin technique", group: "Conception", photo: "/team/aatu.webp" },
  { name: "Jennifer", role: "Direction administrative", group: "Administration", photo: "/team/jennifer.webp" },
  { name: "Marie-Claude", role: "Adjointe administrative", group: "Administration", photo: "/team/marie-claude.webp" },
];

export const teamGroups = [
  "Direction",
  "Ingénierie",
  "Conception",
  "Administration",
] as const;
