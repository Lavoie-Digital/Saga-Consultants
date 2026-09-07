import "server-only";

import { adminDb, isFirebaseAdminConfigured } from "./firebase/admin";
import { COLLECTIONS } from "./firebase/config";
import { projects as seedProjects, type Project } from "./projects";
import type { ExpertiseLabel, Market, ServiceLabel } from "./site";

/**
 * Accès aux projets.
 *
 * Tant que Firebase n'est pas configuré, le site sert le jeu de données
 * statique de `lib/projects.ts`. Dès que les clés sont en place, la même
 * fonction lit Firestore — les pages n'ont pas à savoir laquelle des deux
 * sources répond.
 */

export type StoredProject = Project & {
  /** Identifiant du document Firestore. Absent pour le jeu statique. */
  id?: string;
  /** Un projet non publié n'apparaît que dans l'espace d'administration. */
  published: boolean;
  /** Ordre d'affichage manuel ; à défaut, tri par année décroissante. */
  order?: number;
};

/** Le jeu statique est considéré comme entièrement publié. */
const seed: StoredProject[] = seedProjects.map((p) => ({ ...p, published: true }));

const str = (v: unknown, fallback = "") =>
  typeof v === "string" ? v : fallback;
const strArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

function fromDoc(
  id: string,
  d: FirebaseFirestore.DocumentData,
): StoredProject | null {
  const slug = str(d.slug);
  const title = str(d.title);
  // Un document sans slug ni titre est inexploitable : on l'ignore plutôt
  // que de faire tomber la page.
  if (!slug || !title) return null;

  return {
    id,
    slug,
    no: str(d.no),
    title,
    client: str(d.client) || undefined,
    location: str(d.location),
    year: str(d.year),
    budget: str(d.budget) || undefined,
    markets: strArray(d.markets) as Market[],
    services: strArray(d.services) as ServiceLabel[],
    expertises: strArray(d.expertises) as ExpertiseLabel[],
    description: str(d.description),
    image: str(d.image),
    gallery: strArray(d.gallery),
    featured: d.featured === true,
    published: d.published !== false,
    order: typeof d.order === "number" ? d.order : undefined,
  };
}

function sortProjects(list: StoredProject[]): StoredProject[] {
  return [...list].sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    return b.year.localeCompare(a.year) || a.title.localeCompare(b.title, "fr");
  });
}

/** Tous les projets, brouillons compris. Réservé à l'espace d'administration. */
export async function getAllProjects(): Promise<StoredProject[]> {
  if (!isFirebaseAdminConfigured) return sortProjects(seed);
  try {
    const snap = await adminDb().collection(COLLECTIONS.projects).get();
    const list = snap.docs
      .map((doc) => fromDoc(doc.id, doc.data()))
      .filter((p): p is StoredProject => p !== null);
    // Firestore vide (avant l'amorçage) : on continue de servir le jeu statique.
    return sortProjects(list.length > 0 ? list : seed);
  } catch (err) {
    console.error("Lecture Firestore impossible, repli sur les données statiques.", err);
    return sortProjects(seed);
  }
}

/** Projets visibles sur le site public. */
export async function getProjects(): Promise<StoredProject[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.published && p.image);
}

export async function getProject(slug: string): Promise<StoredProject | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getProjectById(id: string): Promise<StoredProject | null> {
  const all = await getAllProjects();
  return all.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProjects(): Promise<StoredProject[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  // Toujours de quoi remplir la bande défilante, même sans mise en avant.
  return featured.length >= 4 ? featured : all.slice(0, 10);
}
