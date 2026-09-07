"use client";

import { useSearchParams } from "next/navigation";
import ProjectsMarquee from "@/components/projects-marquee";
import {
  filterFromQuery,
  filterToQuery,
  relatedProjects,
  type Project,
} from "@/lib/projects";

/**
 * Bande de bas de fiche. Elle reprend le tri qui était actif au moment de
 * choisir ce projet (transmis dans l'URL), et retombe sur l'ensemble des
 * projets si ce tri laisse trop peu de résultats.
 */
export default function RelatedProjects({
  slug,
  projects,
}: {
  slug: string;
  projects: Project[];
}) {
  const params = useSearchParams();
  const filter = filterFromQuery(params.get("tri"));
  const list = relatedProjects(slug, filter, projects);
  const query = filterToQuery(filter);

  return (
    <>
      <div className="container-saga">
        <div className="flex items-baseline justify-between gap-6 border-t border-line-invert pb-6 pt-10">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brown-light">
            {filter ? filter.value : "D’autres réalisations"}
          </p>
        </div>
      </div>
      <ProjectsMarquee
        projects={list}
        query={query}
        ariaLabel="Autres projets"
      />
    </>
  );
}
