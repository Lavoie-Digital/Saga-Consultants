import Link from "next/link";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/admin/project-form";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  if (!(await isAuthenticated())) redirect("/admin/connexion");

  return (
    <main className="container-saga max-w-3xl py-12">
      <Link href="/admin" className="link-underline text-sm text-stone-500">
        ← Projets
      </Link>
      <h1 className="mt-5 border-b border-line pb-6 font-display text-3xl font-medium tracking-tight text-ink">
        Nouveau projet
      </h1>
      <div className="mt-10">
        <ProjectForm />
      </div>
    </main>
  );
}
