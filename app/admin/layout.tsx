import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/admin/logout-button";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Administration",
  // L'espace privé ne doit jamais se retrouver dans un index de recherche.
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const signedIn = await isAuthenticated();

  return (
    <div className="min-h-[100dvh] bg-paper">
      {signedIn && (
        <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-xl">
          <div className="container-saga flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-5">
              <Link href="/admin" className="flex items-center gap-3">
                <Image
                  src="/logo.webp"
                  alt="SAGA Consultants"
                  width={1500}
                  height={559}
                  className="h-6 w-auto brightness-0 opacity-90"
                />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brown">
                  Administration
                </span>
              </Link>
              <Link
                href="/projets"
                target="_blank"
                className="link-underline text-sm text-stone-500 hover:text-ink"
              >
                Voir le site
              </Link>
            </div>
            <LogoutButton />
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
