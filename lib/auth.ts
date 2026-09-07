import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Accès à l'espace privé par mot de passe partagé.
 *
 * Un seul secret pour toute l'équipe : c'est plus simple qu'un compte par
 * personne, mais ça veut dire pas de trace de qui a modifié quoi, et un
 * changement de mot de passe à chaque départ. Si l'espace privé devait un
 * jour servir à plus que la gestion des projets, il faudrait revenir à des
 * comptes nominatifs.
 *
 * Le cookie ne contient pas le mot de passe : c'est une date d'expiration
 * signée en HMAC avec `ADMIN_SESSION_SECRET`. Impossible à forger sans le
 * secret, et il se périme tout seul.
 */

export const SESSION_COOKIE = "saga_admin";
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 14; // deux semaines

function password() {
  return process.env.ADMIN_PASSWORD ?? "";
}

/**
 * À défaut de secret dédié, on en dérive un du mot de passe : ça garde le
 * cookie infalsifiable et invalide toutes les sessions quand le mot de passe
 * change. Un `ADMIN_SESSION_SECRET` explicite reste préférable.
 */
function secret() {
  return process.env.ADMIN_SESSION_SECRET || `derive:${password()}`;
}

export const isAdminConfigured = () => password().length > 0;

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Comparaison à durée constante — ne renseigne pas sur le préfixe correct. */
function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  // timingSafeEqual exige des longueurs égales ; on masque l'écart par un
  // HMAC de chaque côté, dont la sortie est toujours de même taille.
  const ha = createHmac("sha256", "cmp").update(ba).digest();
  const hb = createHmac("sha256", "cmp").update(bb).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(candidate: string): boolean {
  if (!isAdminConfigured()) return false;
  return safeEqual(candidate, password());
}

export function createSessionValue(): string {
  const expires = Date.now() + SESSION_MAX_AGE_S * 1000;
  // Le nonce évite que deux sessions ouvertes la même milliseconde soient
  // strictement identiques.
  const payload = `${expires}.${randomBytes(8).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

function isValidSession(value: string | undefined): boolean {
  if (!value || !isAdminConfigured()) return false;
  const at = value.lastIndexOf(".");
  if (at < 0) return false;
  const payload = value.slice(0, at);
  const mac = value.slice(at + 1);
  if (!safeEqual(mac, sign(payload))) return false;
  const expires = Number(payload.split(".")[0]);
  return Number.isFinite(expires) && expires > Date.now();
}

export async function isAuthenticated(): Promise<boolean> {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return isValidSession(value);
}

/** À utiliser en tête des actions serveur de l'espace privé. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) throw new Error("Non autorisé.");
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_S,
};
