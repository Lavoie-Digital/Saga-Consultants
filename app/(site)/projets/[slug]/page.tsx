import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/page-hero";
import { Reveal } from "@/components/anim";
import RelatedProjects from "@/components/related-projects";
import { getProject, getProjects } from "@/lib/projects-store";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — SAGA Consultants`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

function Row({ label, value }: { label: string; value?: string }) {
  // Les champs encore absents du registre de projets sont simplement masqués.
  if (!value) return null;
  return (
    <div className="border-t border-line py-4">
      <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-400">
        {label}
      </dt>
      <dd className="mt-1.5 text-pretty text-[0.95rem] leading-relaxed text-ink">
        {value}
      </dd>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  return (
    <>
      {/* Le titre vit dans la colonne de texte, pas sur l'image. */}
      <PageHero
        eyebrow={project.markets.join(" · ")}
        image={project.image}
        imageAlt={project.title}
        minHeight="clamp(20rem, 46vh, 32rem)"
      />

      <section className="container-saga py-16 md:py-24">
        <Reveal>
          <Link
            href="/projets"
            className="group inline-flex items-center gap-2 text-sm tracking-tight text-stone-500 transition-colors hover:text-ink"
          >
            <ArrowLeft
              weight="light"
              className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5"
            />
            <span className="link-underline">Tous les projets</span>
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-14">
          {/* Description sommaire, puis la mosaïque de photos — les deux
              partagent la même largeur de colonne. */}
          <div className="md:col-span-7">
            <Reveal>
              <h1 className="font-display text-[clamp(1.9rem,4.4vw,3.25rem)] font-medium uppercase leading-[1.04] tracking-tight text-ink text-balance">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 text-pretty text-base leading-relaxed text-stone-600 md:text-lg md:leading-relaxed">
                {project.description}
              </p>
            </Reveal>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-1.5 md:mt-14">
                {project.gallery.map((src, i) => {
                  // Une tuile large toutes les trois : grande, deux demies,
                  // grande — la mosaïque respire au lieu de s'aligner en grille.
                  const wide = i % 3 === 0;
                  return (
                    <Reveal
                      key={src}
                      delay={(i % 3) * 0.05}
                      className={wide ? "col-span-2" : ""}
                    >
                      <div
                        className={`relative overflow-hidden rounded-sm bg-paper-2 ${
                          wide ? "aspect-[16/10]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} — vue ${i + 2}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>

          {/* Fiche technique — colonne étroite, collée au bord droit */}
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.05}>
              <dl>
                <Row label="Client" value={project.client} />
                <Row label="Localisation" value={project.location} />
                <Row label="Année" value={project.year} />
                <Row label="Budget de construction" value={project.budget} />
                <Row label="Types de marchés" value={project.markets.join(", ")} />
                <Row
                  label="Types de services"
                  value={project.services.join(", ")}
                />
                <Row
                  label="Expertises impliquées"
                  value={project.expertises.join(", ")}
                />
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Suggestions — alignées sur le tri actif au moment du clic */}
      <section className="bg-green-deep pb-16 text-cream md:pb-20">
        <Suspense fallback={null}>
          <RelatedProjects slug={project.slug} projects={all} />
        </Suspense>
      </section>
    </>
  );
}
