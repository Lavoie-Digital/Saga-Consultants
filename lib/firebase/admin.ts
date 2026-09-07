import "server-only";

import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

/**
 * SDK admin Firebase — serveur uniquement.
 *
 * La clé de service contourne toutes les règles de sécurité : ce module ne
 * doit jamais être importé depuis un composant client. L'import
 * « server-only » fait échouer la compilation si ça arrive.
 */

const APP_NAME = "saga-admin";

/**
 * Les variables d'environnement multilignes sont souvent stockées avec des
 * « \n » littéraux (Vercel, GitHub Actions, .env). On les rétablit, et on
 * retire d'éventuels guillemets englobants.
 */
function readPrivateKey(): string | undefined {
  const raw = process.env.FIREBASE_PRIVATE_KEY;
  if (!raw) return undefined;
  return raw.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = readPrivateKey();

/** Vrai quand les trois secrets du compte de service sont présents. */
export const isFirebaseAdminConfigured = Boolean(
  projectId && clientEmail && privateKey,
);

let cached: App | undefined;

function adminApp(): App {
  if (cached) return cached;
  if (!isFirebaseAdminConfigured) {
    throw new Error(
      "Firebase admin non configuré : renseigner FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL et FIREBASE_PRIVATE_KEY dans .env.local " +
        "(voir .env.example).",
    );
  }
  // Le rechargement à chaud réexécute ce module : réutiliser l'app existante.
  cached = getApps().some((a) => a.name === APP_NAME)
    ? getApp(APP_NAME)
    : initializeApp(
        {
          credential: cert({ projectId, clientEmail, privateKey }),
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        },
        APP_NAME,
      );
  return cached;
}

export const adminDb = () => getFirestore(adminApp());
export const adminAuth = () => getAuth(adminApp());
export const adminBucket = () => getStorage(adminApp()).bucket();
