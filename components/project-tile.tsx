import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectTile({
  project,
  /** Tri actif, transmis à la fiche pour ses suggestions de bas de page. */
  query = "",
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw",
}: {
  project: Project;
  query?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/projets/${project.slug}${query}`}
      className="group relative block aspect-square overflow-hidden rounded-sm bg-paper-2"
    >
      {/* Le « swing » : l'agrandissement dépasse légèrement puis se repose. */}
      <Image
        src={project.image}
        alt={`${project.title} — ${project.description}`}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-swing)] group-hover:scale-[1.07] group-hover:rotate-[0.7deg]"
      />

      {/* Voile + infos révélés au survol */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/90 via-green-deep/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-paper/70">
          {project.markets.join(" · ")}
        </p>
        <h3 className="mt-1.5 font-display text-base font-medium leading-tight tracking-tight text-paper">
          {project.title}
        </h3>
        <p className="mt-0.5 text-xs text-paper/70">{project.year}</p>
      </div>
    </Link>
  );
}
