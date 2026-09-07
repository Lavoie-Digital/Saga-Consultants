"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import ProjectTile from "@/components/project-tile";
import FilterSelect, { type Option } from "@/components/filter-select";
import {
  filterProjects,
  filterToQuery,
  matchesFilter,
  type ActiveFilter,
  type FilterAxis,
  type Project,
} from "@/lib/projects";
import { expertiseLabels, markets, serviceLabels } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const AXES: { axis: FilterAxis; label: string; options: readonly string[] }[] = [
  { axis: "marches", label: "Marchés", options: markets },
  { axis: "expertises", label: "Expertises", options: expertiseLabels },
  { axis: "services", label: "Services", options: serviceLabels },
];

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  /* Les trois axes ne se croisent pas : un seul tri est actif à la fois. */
  const [active, setActive] = useState<ActiveFilter>(null);
  const [openAxis, setOpenAxis] = useState<FilterAxis | null>(null);

  const list = filterProjects(active, projects);
  const query = filterToQuery(active);

  /* Compter les projets par valeur permet de griser les choix qui ne
     donneraient rien — et d'annoncer d'avance l'ampleur du tri. */
  const counts = useMemo(() => {
    const out: Record<FilterAxis, Option[]> = {
      marches: [],
      expertises: [],
      services: [],
    };
    for (const { axis, options } of AXES) {
      out[axis] = options.map((value) => ({
        value,
        count: projects.filter((p) => matchesFilter(p, { axis, value })).length,
      }));
    }
    return out;
  }, [projects]);

  return (
    <div className="container-saga pb-24">
      {/* Barre de tri — trois menus, une seule ligne */}
      <div className="sticky top-[72px] z-30 mb-10 bleed-gutter border-b border-line bg-paper/90 py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
            {AXES.map(({ axis, label }) => (
              <FilterSelect
                key={axis}
                label={label}
                options={counts[axis]}
                value={active?.axis === axis ? active.value : null}
                open={openAxis === axis}
                onOpenChange={(o) => setOpenAxis(o ? axis : null)}
                // Un seul axe à la fois : choisir ici remplace le tri courant.
                onSelect={(value) => setActive(value ? { axis, value } : null)}
              />
            ))}
          </div>

          <div className="flex items-center gap-5">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-400">
              {list.length} projet{list.length > 1 ? "s" : ""}
            </p>
            <AnimatePresence>
              {active && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActive(null)}
                  className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-ink cursor-pointer"
                >
                  Réinitialiser
                  <X weight="bold" className="size-3" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grille — cinq de large, interlignes serrés */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {list.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <ProjectTile project={project} query={query} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {list.length === 0 && (
        <p className="py-20 text-center text-stone-500">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
