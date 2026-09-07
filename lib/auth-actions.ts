"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkPassword,
  createSessionValue,
  isAdminConfigured,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
} from "./auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return {
      error:
        "Aucun mot de passe n’est configuré sur le serveur (ADMIN_PASSWORD).",
    };
  }

  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    return { error: "Mot de passe incorrect." };
  }

  (await cookies()).set(
    SESSION_COOKIE,
    createSessionValue(),
    SESSION_COOKIE_OPTIONS,
  );

  const next = String(formData.get("suite") ?? "/admin");
  // Ne rediriger que vers l'espace privé : une valeur venue du formulaire ne
  // doit pas pouvoir envoyer ailleurs.
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/connexion");
}
