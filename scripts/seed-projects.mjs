/**
 * Amorçage de Firestore avec le registre de projets, brouillons compris.
 *
 *   npm run seed:projects              # tout le registre
 *   npm run seed:projects -- --no-drafts   # seulement les projets publiables
 *
 * Idempotent : la clé est le numéro de dossier SAGA (`no`), donc relancer le
 * script met à jour les documents existants au lieu d'en créer des doublons.
 *
 * Les photos restent servies depuis /public. Les nouveaux projets ajoutés
 * depuis /admin, eux, stockent leurs visuels dans Cloud Storage — les deux
 * cohabitent sans problème.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/* --- lecture de .env.local sans dépendance --- */
function loadEnv() {
  let raw;
  try {
    raw = readFileSync(path.join(root, ".env.local"), "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    let [, key, value] = m;
    value = value.trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnv();

const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
  process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error(
    "Clés Firebase manquantes. Renseignez FIREBASE_PROJECT_ID, " +
      "FIREBASE_CLIENT_EMAIL et FIREBASE_PRIVATE_KEY dans .env.local " +
      "(voir .env.example).",
  );
  process.exit(1);
}

initializeApp({
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();

/* --- lecture des jeux statiques, sans passer par TypeScript --- */
function readArray(file, exportName) {
  const source = readFileSync(path.join(root, "lib", file), "utf8");
  const marker = `export const ${exportName}`;
  const start = source.indexOf("[", source.indexOf(marker));
  const end = source.indexOf("\n];", start) + 2;
  // Ces fichiers sont générés : littéraux JS sûrs, pas de la saisie externe.
  return new Function(`return ${source.slice(start, end + 1)}`)();
}

const withDrafts = !process.argv.includes("--no-drafts");
const projects = [
  ...readArray("projects.ts", "projects: Project[]"),
  ...(withDrafts ? readArray("projects-drafts.ts", "draftProjects") : []),
];

let created = 0;
let updated = 0;

for (const p of projects) {
  const doc = {
    no: p.no ?? "",
    slug: p.slug,
    title: p.title,
    client: p.client ?? "",
    location: p.location ?? "",
    year: p.year ?? "",
    budget: p.budget ?? "",
    markets: p.markets ?? [],
    services: p.services ?? [],
    expertises: p.expertises ?? [],
    description: p.description ?? "",
    image: p.image ?? "",
    gallery: p.gallery ?? [],
    featured: p.featured === true,
    published: Boolean(p.image),
    updatedAt: new Date().toISOString(),
  };

  const existing = await db
    .collection("projects")
    .where("no", "==", doc.no)
    .limit(1)
    .get();

  if (existing.empty) {
    await db.collection("projects").add(doc);
    created++;
    console.log(`+ ${doc.no}  ${doc.title}`);
  } else {
    await existing.docs[0].ref.set(doc, { merge: true });
    updated++;
    console.log(`~ ${doc.no}  ${doc.title}`);
  }
}

console.log(`\n${created} créé(s), ${updated} mis à jour.`);
process.exit(0);
