import { expertises } from "./expertise";
import type { Project } from "./projects";
import { serviceFamilies } from "./services";
import { memberKey, team } from "./team";
import { markets, offices, site } from "./site";

/**
 * Données structurées et URL canoniques.
 *
 * Le balisage schema.org sert deux publics : les moteurs classiques, qui en
 * tirent les rich results (fiche entreprise, fil d'Ariane), et les moteurs
 * génératifs, qui s'en servent pour rattacher des faits à une entité. D'où
 * le soin mis à ne déclarer que des faits vérifiés — une donnée inventée
 * ici se retrouve citée telle quelle dans une réponse d'IA.
 */

const FALLBACK_SITE_URL = "https://www.sagaconsultants.ca";

/**
 * Normalise l'URL du site.
 *
 * `NEXT_PUBLIC_SITE_URL` est saisie à la main dans la console de
 * l'hébergeur, et le protocole y est souvent oublié (« sagaconsultants.ca »).
 * Sans cette tolérance, `new URL()` lève et c'est tout le build qui tombe,
 * pour une virgule dans un panneau de configuration. On complète ce qui
 * manque, et on retombe sur le domaine par défaut si la valeur est
 * inexploitable — le site reste déployable dans tous les cas.
 */
function normalizeSiteUrl(raw: string | undefined): string {
  const value = (raw ?? "").trim();
  if (!value) return FALLBACK_SITE_URL;

  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    // `origin` retire au passage le chemin et la barre oblique finale.
    return new URL(withScheme).origin;
  } catch {
    console.warn(
      `NEXT_PUBLIC_SITE_URL inexploitable (${value}) — repli sur ${FALLBACK_SITE_URL}.`,
    );
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/* Identifiants stables : les nœuds se référencent entre eux plutôt que de
   se répéter, et restent les mêmes d'une page à l'autre. */
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const officeId = (id: string) => `${SITE_URL}/#bureau-${id}`;

const phoneE164 = site.contact.phoneHref.replace("tel:", "");

function postalAddress(o: (typeof offices)[number]) {
  return {
    "@type": "PostalAddress",
    streetAddress: o.streetAddress,
    addressLocality: o.addressLocality,
    addressRegion: o.addressRegion,
    postalCode: o.postalCode,
    addressCountry: "CA",
  };
}

function officeNode(o: (typeof offices)[number]) {
  return {
    "@type": "ProfessionalService",
    "@id": officeId(o.id),
    name: `${site.name} — ${o.city}`,
    parentOrganization: { "@id": ORG_ID },
    url: absoluteUrl("/contact"),
    telephone: phoneE164,
    email: site.contact.email,
    address: postalAddress(o),
    ...(o.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: o.geo.latitude,
            longitude: o.geo.longitude,
          },
        }
      : {}),
    hasMap: o.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
  };
}

/** Catalogue de services — c'est ce qui permet de répondre « que fait SAGA ? ». */
function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Services de génie-conseil en structures",
    itemListElement: serviceFamilies.map((f) => ({
      "@type": "OfferCatalog",
      name: f.label,
      description: f.promise,
      itemListElement: f.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    })),
  };
}

/**
 * Graphe de l'entreprise, injecté sur toutes les pages publiques.
 * Un seul `@graph` évite de répéter l'organisation dans chaque page.
 */
export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: site.name,
        url: SITE_URL,
        description: site.longPitch,
        slogan: site.tagline,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.webp"),
          width: 1500,
          height: 559,
        },
        image: absoluteUrl("/bureau/facade-bureau.webp"),
        telephone: phoneE164,
        email: site.contact.email,
        address: offices.map(postalAddress),
        location: offices.map((o) => ({ "@id": officeId(o.id) })),
        sameAs: [site.social.linkedin, site.social.facebook],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "Informations et soumissions",
            telephone: phoneE164,
            email: site.contact.email,
            areaServed: "CA",
            availableLanguage: ["fr-CA", "en-CA"],
          },
        ],
        // Territoires où des mandats ont réellement été livrés.
        areaServed: [
          "Québec",
          "Ontario",
          "Terre-Neuve-et-Labrador",
          "Nunavut",
          "Colombie-Britannique",
        ].map((name) => ({ "@type": "AdministrativeArea", name })),
        // Rattache l'entité à ses domaines : le levier principal côté
        // moteurs génératifs pour « qui fait du lamellé-collé au Saguenay ? ».
        knowsAbout: [
          ...expertises.map((e) => e.label),
          ...markets,
          "Génie-conseil",
          "Ingénierie des structures",
          "Plans et devis de structure",
          "Surveillance de chantier",
        ],
        hasOfferCatalog: offerCatalog(),
      },
      ...offices.map(officeNode),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: site.name,
        inLanguage: "fr-CA",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/**
 * Les gens de SAGA. Les chiens du bureau sont exclus : la blague se lit très
 * bien sur la page, beaucoup moins dans un graphe de connaissances.
 */
export function employeesLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: SITE_URL,
    employee: team
      .filter((m) => m.group !== "Mascottes")
      .map((m) => ({
        "@type": "Person",
        name: memberKey(m),
        jobTitle: m.role,
        worksFor: { "@id": ORG_ID },
      })),
  };
}

/** Page de contact : rattache les deux bureaux déjà décrits dans le graphe. */
export function contactPageLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": absoluteUrl("/contact#page"),
    url: absoluteUrl("/contact"),
    name: `Nous joindre — ${site.name}`,
    inLanguage: "fr-CA",
    about: { "@id": ORG_ID },
    mainEntity: offices.map((o) => ({ "@id": officeId(o.id) })),
  };
}

/** Fil d'Ariane — Google l'affiche sous le titre dans les résultats. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Fiche de projet. schema.org n'a pas de type « projet de construction » :
 * `CreativeWork` est le plus proche sans tordre le vocabulaire.
 */
export function projectLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/projets/${project.slug}#projet`),
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projets/${project.slug}`),
    image: [project.image, ...(project.gallery ?? [])].map((src) =>
      src.startsWith("http") ? src : absoluteUrl(src),
    ),
    creator: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(project.client ? { sourceOrganization: { "@type": "Organization", name: project.client } } : {}),
    ...(project.location
      ? { locationCreated: { "@type": "Place", name: project.location } }
      : {}),
    about: [...project.markets, ...project.expertises].map((name) => ({
      "@type": "Thing",
      name,
    })),
    inLanguage: "fr-CA",
  };
}

/** Liste des réalisations, pour que la page Projets se lise comme un index. */
export function projectListLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projets réalisés par SAGA Consultants",
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/projets/${p.slug}`),
      name: p.title,
    })),
  };
}
