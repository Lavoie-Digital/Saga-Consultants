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
      <PageHero
        eyebrow={project.markets.join(" · ")}
        titleLines={[project.title]}
        image={project.image}
        imageAlt={project.title}
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

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Description sommaire */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-pretty text-xl leading-relaxed text-stone-600 md:text-2xl md:leading-relaxed">
                {project.description}
              </p>
            </Reveal>
          </div>

          {/* Fiche technique */}
          <div className="md:col-span-5">
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

        {/* Photos */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16 grid gap-1.5 md:mt-24 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.05}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-2">
                  <Image
                    src={src}
                    alt={`${project.title} — vue ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}
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
