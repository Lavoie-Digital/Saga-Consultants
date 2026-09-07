export type Member = {
  firstName: string;
  lastName?: string;
  /** Titre exact fourni par SAGA. */
  role: string;
  group: Group;
  /** Portrait dans /public/team/. Absent = vignette à initiales. */
  photo?: string;
};

export const teamGroups = [
  "Direction",
  "Ingénierie",
  "Technique et conception",
  "Relève",
  "Administration",
  "Mascottes",
] as const;
export type Group = (typeof teamGroups)[number];

/* Source : « Titres employés.xlsx » (2026-09-07).
   L'ordre de ce tableau est celui de la grille de portraits : Aatu et Jaya,
   les chiens du bureau, ferment la marche.
   À VALIDER : « CPI » est laissé tel quel (candidat·e à la profession
   d'ingénieur). Simon Gravel est en attente de portrait, donc pas encore
   dans la grille. */
export const team: Member[] = [
  {
    firstName: "Marc-Olivier",
    lastName: "Gagnon",
    role: "Ingénieur / Associé",
    group: "Direction",
    photo: "/team/marc-olivier-gagnon.webp",
  },
  {
    firstName: "Simon",
    lastName: "Savard",
    role: "Ingénieur / Associé",
    group: "Direction",
    photo: "/team/simon-savard.webp",
  },

  {
    firstName: "Alexandre",
    lastName: "Lavoie",
    role: "Ingénieur",
    group: "Ingénierie",
    photo: "/team/alexandre-lavoie.webp",
  },
  {
    firstName: "Mathieu",
    lastName: "Fortin",
    role: "Ingénieur",
    group: "Ingénierie",
    photo: "/team/mathieu-fortin.webp",
  },
  {
    firstName: "Jocelyn",
    lastName: "Tremblay",
    role: "Ingénieur",
    group: "Ingénierie",
    photo: "/team/jocelyn-tremblay.webp",
  },
  {
    firstName: "Florian",
    lastName: "Caffier",
    role: "CPI",
    group: "Ingénierie",
    photo: "/team/florian-caffier.webp",
  },
  {
    firstName: "Élisabeth",
    lastName: "Gagnon-Brûlé",
    role: "CPI",
    group: "Ingénierie",
    photo: "/team/elisabeth-gagnon-brule.webp",
  },
  {
    firstName: "Gabrielle",
    lastName: "Wagner",
    role: "CPI",
    group: "Ingénierie",
    photo: "/team/gabrielle-wagner.webp",
  },
  {
    firstName: "Victoria",
    lastName: "Levasseur",
    role: "CPI",
    group: "Ingénierie",
    photo: "/team/victoria-levasseur.webp",
  },

  {
    firstName: "François",
    lastName: "Lebrun",
    role: "Technicien / Coordonnateur BIM",
    group: "Technique et conception",
    photo: "/team/francois-lebrun.webp",
  },
  {
    firstName: "Jennifer",
    lastName: "Tremblay",
    role: "Technicienne",
    group: "Technique et conception",
    photo: "/team/jennifer-tremblay.webp",
  },
  {
    firstName: "Nicolas",
    lastName: "Caouette",
    role: "Technicien",
    group: "Technique et conception",
    photo: "/team/nicolas-caouette.webp",
  },
  {
    firstName: "Mischael",
    lastName: "Bechu",
    role: "Dessinateur",
    group: "Technique et conception",
    photo: "/team/mischael-bechu.webp",
  },
  {
    firstName: "Charles",
    lastName: "Simard",
    role: "Dessinateur",
    group: "Technique et conception",
    photo: "/team/charles-simard.webp",
  },

  {
    firstName: "Xavier",
    lastName: "Laroche",
    role: "Stagiaire en ingénierie",
    group: "Relève",
    photo: "/team/xavier-laroche.webp",
  },
  {
    firstName: "Jean-David",
    lastName: "Pouliot",
    role: "Stagiaire en ingénierie",
    group: "Relève",
    photo: "/team/jean-david-pouliot.webp",
  },
  {
    firstName: "Justin",
    lastName: "Vienneau",
    role: "Stagiaire en ingénierie",
    group: "Relève",
    photo: "/team/justin-vienneau.webp",
  },

  {
    firstName: "Mario",
    lastName: "Poirier",
    role: "Technicien comptable / Coordonnateur administratif",
    group: "Administration",
    photo: "/team/mario-poirier.webp",
  },
  {
    firstName: "Marie-Claude",
    lastName: "Tremblay",
    /* À VALIDER : absente de la liste des titres, rôle repris de l'ancien site. */
    role: "Adjointe administrative",
    group: "Administration",
    photo: "/team/marie-claude-tremblay.webp",
  },

  /* Les chiens du bureau — d'où « projets nichés » et « os-pérations ». */
  {
    firstName: "Aatu",
    role: "Coordonnateur des projets nichés",
    group: "Mascottes",
    photo: "/team/aatu.webp",
  },
  {
    firstName: "Jaya",
    role: "Directrice adjointe aux os-pérations",
    group: "Mascottes",
    photo: "/team/jaya.webp",
  },
];

/** Clé stable — deux Simon dans l'équipe, le prénom seul ne suffit pas. */
export const memberKey = (m: Member) =>
  `${m.firstName} ${m.lastName ?? ""}`.trim();

/* Les règles du jeu qui définissent notre équipe. */
export const teamValues = [
  {
    title: "Curiosité",
    body: "On pousse notre connaissance par plaisir. Chaque apprentissage compte, et ça se cumule !",
  },
  {
    title: "Qualité",
    body: "Tout ce qui sort du bureau est réfléchi, vu et revu.",
  },
  {
    title: "Climat de projet",
    body: "On est là pour accompagner — nos clients et nos collègues — pas juste pour livrer des plans.",
  },
  {
    title: "Respect",
    body: "Envers les collègues, les clients, les autres intervenants.",
  },
  {
    title: "Autonomie",
    body: "On laisse nos gens grandir librement — ça donne des professionnels perspicaces et efficaces.",
  },
] as const;
