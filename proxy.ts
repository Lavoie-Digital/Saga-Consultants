import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

/**
 * Depuis Next.js 16, ce qui s'appelait « middleware » s'appelle « proxy ».
 *
 * Contrôle optimiste seulement : on redirige vers la page de connexion quand
 * le cookie de session est absent, pour éviter d'afficher une coquille vide.
 * La vérification qui fait autorité (signature, révocation, liste blanche)
 * a lieu côté serveur dans `requireAdmin`, à chaque lecture et chaque action.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/connexion") {
    if (!request.cookies.has(SESSION_COOKIE)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/connexion";
      url.search = `?suite=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
