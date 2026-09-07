/**
 * Configuration du SDK client Firebase.
 *
 * Ces valeurs sont publiques par conception : elles identifient le projet,
 * elles ne l'autorisent pas. Ce sont les règles de sécurité Firestore et
 * Storage qui protègent les données. Le secret, lui, est la clé de service
 * du SDK admin — elle reste côté serveur (voir lib/firebase/admin.ts).
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Tant que les clés ne sont pas fournies, le site tourne sur ses données statiques. */
export const isFirebaseClientConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

/** Collections Firestore. */
export const COLLECTIONS = {
  projects: "projects",
  /** Demandes reçues par le formulaire de contact. */
  inquiries: "inquiries",
} as const;

/** Préfixe des visuels de projet dans Cloud Storage. */
export const STORAGE_PROJECTS_PREFIX = "projets";
