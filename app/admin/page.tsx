import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import DeleteProjectButton from "@/components/admin/delete-project-button";
import { isAuthenticated } from "@/lib/auth";
import { togglePublished } from "@/lib/admin-actions";
import { isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { getAllProjects } from "@/lib/projects-store";

export const dynamic = "force-dynamic";

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ enregistre?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/connexion");

  const [projects, { enregistre }] = await Promise.all([
    getAllProjects(),
    searchParams,
  ]);
  const live = projects.filter((p) => p.published && p.image).length;

  return (
    <main className="container-saga py-12">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
            Projets
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            {projects.length} au total · {live} en ligne
          </p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 rounded-full bg-brown px-6 py-3 text-sm font-medium tracking-tight text-cream transition-colors hover:bg-brown-deep cursor-pointer"
        >
          <Plus weight="bold" className="size-4" />
          Nouveau projet
        </Link>
      </div>

      {enregistre && (
        <p className="mt-6 rounded-sm border border-brown/30 bg-brown/5 px-5 py-3 text-sm text-ink">
          Projet enregistré.
        </p>
      )}

      {!isFirebaseAdminConfigured && (
        <p className="mt-6 rounded-sm border border-line bg-cream px-5 py-4 text-sm leading-relaxed text-stone-600">
          Firebase n’est pas configuré : cette liste montre les données
          statiques du dépôt, en lecture seule. Renseignez les clés dans{" "}
          <code className="font-mono text-xs">.env.local</code> puis lancez{" "}
          <code className="font-mono text-xs">npm run seed:projects</code> pour
          les importer dans Firestore.
        </p>
      )}

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {projects.map((p) => (
          <li
            key={p.id ?? p.slug}
            className="flex flex-wrap items-center gap-x-6 gap-y-4 py-4"
          >
            <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-paper-2">
              {p.image && (
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium tracking-tight text-ink">
                {p.title}
              </p>
              <p className="mt-0.5 truncate text-sm text-stone-500">
                {[p.no, p.location, p.year].filter(Boolean).join(" · ")}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${
                p.published
                  ? "bg-green-deep text-cream"
                  : "border border-line text-stone-500"
              }`}
            >
              {p.published ? "En ligne" : "Brouillon"}
            </span>

            {p.id ? (
              <div className="flex shrink-0 items-center gap-4">
                <form action={togglePublished}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="slug" value={p.slug} />
                  <input
                    type="hidden"
                    name="published"
                    value={p.published ? "0" : "1"}
                  />
                  <button
                    type="submit"
                    className="link-underline text-sm text-stone-500 hover:text-ink cursor-pointer"
                  >
                    {p.published ? "Retirer" : "Publier"}
                  </button>
                </form>
                <Link
                  href={`/admin/projets/${p.id}`}
                  className="link-underline text-sm text-ink"
                >
                  Modifier
                </Link>
                <DeleteProjectButton id={p.id} slug={p.slug} title={p.title} />
              </div>
            ) : (
              <span className="shrink-0 text-sm text-stone-400">
                Données statiques
              </span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
