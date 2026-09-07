"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "./auth";
import { adminBucket, adminDb } from "./firebase/admin";
import { COLLECTIONS, STORAGE_PROJECTS_PREFIX } from "./firebase/config";
import { getAllProjects } from "./projects-store";
import { expertiseLabels, markets, serviceLabels } from "./site";

export type ActionState = { error?: string; ok?: string };

/* ------------------------------------------------------------------ */

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Deux projets ne peuvent pas partager la même adresse. */
async function uniqueSlug(base: string, selfId?: string) {
  const all = await getAllProjects();
  const taken = new Set(all.filter((p) => p.id !== selfId).map((p) => p.slug));
  if (!taken.has(base)) return base;
  for (let i = 2; i < 100; i++) {
    const candidate = `${base}-${i}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `${base}-${Date.now()}`;
}

/** Ne retient que les valeurs présentes dans la taxonomie officielle. */
function pickFrom(values: string[], allowed: readonly string[]) {
  return values.filter((v) => (allowed as readonly string[]).includes(v));
}

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projets");
  if (slug) revalidatePath(`/projets/${slug}`);
  revalidatePath("/admin");
}

/* ------------------------------------------------------------------
   Téléversement des visuels
   ------------------------------------------------------------------ */

const ALLOWED_TYPES = new Set(["image/webp", "image/jpeg", "image/png"]);
const MAX_BYTES = 8 * 1024 * 1024;

async function uploadFiles(files: File[], slug: string): Promise<string[]> {
  const bucket = adminBucket();
  const urls: string[] = [];

  for (const file of files) {
    if (file.size === 0) continue;
    if (!ALLOWED_TYPES.has(file.type)) {
      throw new Error(`Format non accepté : ${file.name} (${file.type}).`);
    }
    if (file.size > MAX_BYTES) {
      throw new Error(`${file.name} dépasse 8 Mo même après réduction.`);
    }

    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const path = `${STORAGE_PROJECTS_PREFIX}/${slug}/${randomUUID()}.${ext}`;
    const blob = bucket.file(path);

    await blob.save(Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      metadata: { cacheControl: "public, max-age=31536000, immutable" },
    });
    // Les visuels de projets sont publics par nature ; Next/Image les sert
    // ensuite depuis storage.googleapis.com (voir next.config.ts).
    await blob.makePublic();
    urls.push(`https://storage.googleapis.com/${bucket.name}/${path}`);
  }

  return urls;
}

/* ------------------------------------------------------------------
   Enregistrement d'un projet
   ------------------------------------------------------------------ */

export async function saveProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const id = (formData.get("id") as string) || undefined;
  const title = ((formData.get("title") as string) ?? "").trim();
  if (!title) return { error: "Le nom du projet est obligatoire." };

  const requestedSlug = ((formData.get("slug") as string) ?? "").trim();
  const slug = await uniqueSlug(slugify(requestedSlug || title), id);

  const text = (k: string) => ((formData.get(k) as string) ?? "").trim();
  const list = (k: string) => formData.getAll(k).map(String);

  // Visuels déjà en place, moins ceux que l'utilisateur a retirés.
  const removed = new Set(list("removeImage"));
  const kept = list("existingImage").filter((u) => !removed.has(u));

  let uploaded: string[] = [];
  try {
    const files = formData
      .getAll("newImages")
      .filter((f): f is File => f instanceof File);
    uploaded = await uploadFiles(files, slug);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Téléversement impossible.",
    };
  }

  const images = [...kept, ...uploaded];
  if (images.length === 0) {
    return {
      error: "Ajoutez au moins une photo : la première sert de visuel principal.",
    };
  }

  const data = {
    no: text("no"),
    slug,
    title,
    client: text("client"),
    location: text("location"),
    year: text("year"),
    budget: text("budget"),
    markets: pickFrom(list("markets"), markets),
    services: pickFrom(list("services"), serviceLabels),
    expertises: pickFrom(list("expertises"), expertiseLabels),
    description: text("description"),
    image: images[0],
    gallery: images.slice(1),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    updatedAt: new Date().toISOString(),
  };

  const col = adminDb().collection(COLLECTIONS.projects);
  try {
    if (id) await col.doc(id).set(data, { merge: true });
    else await col.add(data);
  } catch (err) {
    console.error("Enregistrement du projet impossible", err);
    return { error: "L’enregistrement a échoué. Réessayez." };
  }

  revalidatePublicPages(slug);
  redirect("/admin?enregistre=1");
}

/* ------------------------------------------------------------------
   Publication / suppression
   ------------------------------------------------------------------ */

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return;
  const next = formData.get("published") === "1";

  await adminDb()
    .collection(COLLECTIONS.projects)
    .doc(id)
    .set(
      { published: next, updatedAt: new Date().toISOString() },
      { merge: true },
    );

  revalidatePublicPages((formData.get("slug") as string) || undefined);
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return;

  const slug = (formData.get("slug") as string) || undefined;

  // On retire aussi les fichiers du projet dans Storage, pour ne pas
  // accumuler des visuels orphelins.
  if (slug) {
    try {
      await adminBucket().deleteFiles({
        prefix: `${STORAGE_PROJECTS_PREFIX}/${slug}/`,
      });
    } catch (err) {
      console.error("Nettoyage des visuels impossible", err);
    }
  }

  await adminDb().collection(COLLECTIONS.projects).doc(id).delete();
  revalidatePublicPages(slug);
}
