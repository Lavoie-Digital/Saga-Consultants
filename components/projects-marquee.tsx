"use client";

import Image from "next/image";
import Link from "next/link";
import DragScroller from "@/components/drag-scroller";
import type { Project } from "@/lib/projects";

/**
 * Bande de projets qui défile toute seule et qu'on peut attraper à la souris.
 * Chaque vignette mène à la fiche du projet.
 */
export default function ProjectsMarquee({
  projects,
  /** Tri actif à transmettre à la fiche, pour ses propres suggestions. */
  query = "",
  ariaLabel = "Projets réalisés",
}: {
  projects: Project[];
  query?: string;
  ariaLabel?: string;
}) {
  if (projects.length === 0) return null;

  // Liste dupliquée : le défilement automatique boucle sans couture.
  const row = [...projects, ...projects];

  return (
    <DragScroller
      ariaLabel={ariaLabel}
      autoplay
      loop
      speed={0.3}
      className="[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      innerClassName="gap-2"
    >
      {row.map((p, i) => (
        <Link
          key={`${p.slug}-${i}`}
          href={`/projets/${p.slug}${query}`}
          // La seconde moitié est un clone : invisible pour l'assistance technique.
          aria-hidden={i >= projects.length}
          tabIndex={i >= projects.length ? -1 : undefined}
          className="group relative aspect-[4/3] w-[clamp(12rem,17vw,18rem)] shrink-0 overflow-hidden rounded-sm bg-paper-2"
        >
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 12rem, 18rem"
            draggable={false}
            className="object-cover transition-transform duration-700 ease-[var(--ease-swing)] group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-darkest/90 via-green-darkest/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-powder">
              {p.markets.join(" · ")}
            </p>
            <h3 className="mt-1 font-display text-base font-medium leading-tight tracking-tight text-cream">
              {p.title}
            </h3>
            <p className="mt-1 text-xs text-cream/65">
              {p.location} · {p.year}
            </p>
          </div>
        </Link>
      ))}
    </DragScroller>
  );
}
