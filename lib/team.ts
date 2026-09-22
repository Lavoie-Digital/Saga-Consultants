export type Member = {
  firstName: string;
  lastName?: string;
  /**
   * Libellé de la vignette quand le prénom seul ne suffit pas. La grille
   * n'affiche que les prénoms ; « Mario » tout court renvoyait à une blague
   * de bureau, d'où son nom au complet.
   */
  displayName?: string;
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
   L'ordre de ce tableau n'est pas celui de l'affichage : voir `displayTeam`.
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
    firstName: "Louis-David",
    lastName: "Pouliot",
    role: "Stagiaire en ingénierie",
    group: "Relève",
    photo: "/team/louis-david-pouliot.webp",
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
    displayName: "Mario Poirier",
    role: "Technicien comptable / Coordonnateur administratif",
    group: "Administration",
    photo: "/team/mario-poirier.webp",
  },
  /* Les chiens du bureau — d'où « projets nichés » et « os-pérations ».
     Ils sont mêlés aux autres dans la grille, comme demandé. */
  {
    firstName: "Aatu",
    role: "Coordonnateur des projets nichés",
    group: "Mascottes",
    photo: "/team/aatu.webp",
  },
  {
    firstName: "Jaiia",
    role: "Directrice adjointe aux os-pérations",
    group: "Mascottes",
    photo: "/team/jaiia.webp",
  },
];

/** Clé stable — deux Simon dans l'équipe, le prénom seul ne suffit pas. */
export const memberKey = (m: Member) =>
  `${m.firstName} ${m.lastName ?? ""}`.trim();

/* Les associés ouvrent la grille ; le reste est brassé sans tenir compte du
   rôle, chiens du bureau compris. Le brassage est volontairement déterministe
   (générateur à graine fixe) : ça donne un ordre qui ne ressemble pas à un
   organigramme, mais qui reste identique d'un rendu à l'autre — sinon la
   grille sauterait à chaque rechargement, et le serveur et le navigateur
   afficheraient deux ordres différents. */
const LEAD = ["Marc-Olivier Gagnon", "Simon Savard"];

function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items];
  let state = seed;
  const next = () => {
    // Générateur congruentiel linéaire — suffisant pour brasser une liste.
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const displayTeam: Member[] = [
  ...LEAD.map((key) => team.find((m) => memberKey(m) === key)!),
  ...shuffled(
    team.filter((m) => !LEAD.includes(memberKey(m))),
    20260917,
  ),
];

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
