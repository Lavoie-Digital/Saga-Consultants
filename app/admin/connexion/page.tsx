import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginForm from "@/components/admin/login-form";
import { isAdminConfigured, isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-green-deep px-6 py-16 text-cream">
      <div className="w-full max-w-sm">
        <p className="eyebrow !text-powder">SAGA Consultants</p>
        <h1 className="mt-4 font-display text-3xl font-medium tracking-tight">
          Espace privé
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-powder-soft">
          Gestion des projets affichés sur le site.
        </p>

        {isAdminConfigured() ? (
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        ) : (
          <div className="mt-10 rounded-sm border border-line-invert p-5 text-sm leading-relaxed text-powder-soft">
            <p className="text-cream">Aucun mot de passe n’est configuré.</p>
            <p className="mt-3">
              Ajoutez <code className="font-mono text-xs">ADMIN_PASSWORD</code>{" "}
              dans <code className="font-mono text-xs">.env.local</code> (voir{" "}
              <code className="font-mono text-xs">.env.example</code>), puis
              redémarrez le serveur.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
