/**
 * Constantes partagées côté Firebase.
 *
 * Le SDK client a été retiré quand l'espace privé est passé au mot de passe
 * partagé : plus rien ne parle à Firebase depuis le navigateur. Tous les
 * accès passent par le SDK admin, côté serveur — d'où l'absence de variables
 * `NEXT_PUBLIC_FIREBASE_*`.
 */

/** Collections Firestore. */
export const COLLECTIONS = {
  projects: "projects",
  /** Demandes reçues par le formulaire de contact. */
  inquiries: "inquiries",
} as const;

/** Préfixe des visuels de projet dans Cloud Storage. */
export const STORAGE_PROJECTS_PREFIX = "projets";
