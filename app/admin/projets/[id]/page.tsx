import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ProjectForm from "@/components/admin/project-form";
import { isAuthenticated } from "@/lib/auth";
import { getProjectById } from "@/lib/projects-store";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/connexion");

  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <main className="container-saga max-w-3xl py-12">
      <Link href="/admin" className="link-underline text-sm text-stone-500">
        ← Projets
      </Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
          {project.title}
        </h1>
        {project.published && (
          <Link
            href={`/projets/${project.slug}`}
            target="_blank"
            className="link-underline text-sm text-stone-500"
          >
            Voir la fiche
          </Link>
        )}
      </div>
      <div className="mt-10">
        <ProjectForm project={project} />
      </div>
    </main>
  );
}
