import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectTile({
  project,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: {
  project: Project;
  sizes?: string;
}) {
  return (
    <article className="group relative aspect-square cursor-pointer overflow-hidden rounded-sm bg-paper-2">
      <Image
        src={project.image}
        alt={`${project.title} — ${project.scope}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      {/* Voile + infos révélés au survol */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/90 via-green-deep/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-paper/70">
          {project.sector}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-medium leading-tight tracking-tight text-paper">
          {project.title}
        </h3>
      </div>
    </article>
  );
}
