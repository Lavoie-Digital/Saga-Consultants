import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className="group cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-2">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.scope}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-green-deep/0 transition-colors duration-500 group-hover:bg-green-deep/15" />
        <div className="absolute right-4 top-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-paper/90 opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight weight="light" className="size-5 text-ink" />
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-4">
        <div>
          <h3 className="text-lg font-medium tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">{project.scope}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-stone-400">
            {project.sector}
          </p>
          <p className="mt-1 font-mono text-[0.7rem] text-stone-400">
            {project.year}
          </p>
        </div>
      </div>
    </article>
  );
}
