"use client";

import { useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import ProjectCard from "@/components/project-card";
import { projects } from "@/lib/projects";
import { sectors } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const filters = ["Tous", ...sectors] as const;

export default function ProjectsGallery() {
  const [active, setActive] = useState<(typeof filters)[number]>("Tous");

  const list =
    active === "Tous"
      ? projects
      : projects.filter((p) => p.sector === active);

  return (
    <div className="container-saga pb-24">
      {/* Filter bar */}
      <div className="sticky top-[68px] z-30 -mx-[clamp(1.25rem,5vw,5rem)] mb-12 border-b border-line bg-paper/85 px-[clamp(1.25rem,5vw,5rem)] py-4 backdrop-blur-xl">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`relative rounded-full px-4 py-2 text-sm tracking-tight transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-paper" : "text-stone-500 hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-brown"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          layout
          className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
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
                <ProjectCard
                  project={project}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
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
