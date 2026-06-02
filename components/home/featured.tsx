import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/anim";
import { ArrowLink } from "@/components/ui";
import ProjectCard from "@/components/project-card";
import { featuredProjects, type Project } from "@/lib/projects";

export default function Featured() {
  const [lead, ...others] = featuredProjects;
  const rest = others.slice(0, 2);

  return (
    <section className="bg-paper-2 py-20 md:py-24">
      <div className="container-saga">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <Reveal>
              <span className="eyebrow">03 — Projets sélectionnés</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-tight">
                Des structures
                <br />
                qui tiennent.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ArrowLink href="/projets">Tous les projets</ArrowLink>
          </Reveal>
        </div>

        {/* Lead project — large */}
        <Reveal>
          <Link href="/projets" className="group mt-12 block">
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-paper-3">
                  {/* reuse ProjectCard styling via direct image for the lead */}
                  <ProjectCardLead project={lead} />
                </div>
              </div>
              <div className="md:col-span-4 md:pb-2">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-stone-400">
                  {lead.sector} · {lead.year}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
                  {lead.title}
                </h3>
                <p className="mt-3 max-w-xs text-pretty text-sm leading-relaxed text-stone-600">
                  {lead.scope}. {lead.location}.
                </p>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Rest — grid */}
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <Link href="/projets" className="block">
                <ProjectCard project={project} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCardLead({ project }: { project: Project }) {
  return (
    <>
      <Image
        src={project.image}
        alt={`${project.title} — ${project.scope}`}
        fill
        sizes="(max-width: 768px) 100vw, 66vw"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-green-deep/0 transition-colors duration-500 group-hover:bg-green-deep/15" />
      <div className="absolute right-5 top-5 flex size-12 translate-y-2 items-center justify-center rounded-full bg-paper/90 opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight weight="light" className="size-5 text-ink" />
      </div>
    </>
  );
}
