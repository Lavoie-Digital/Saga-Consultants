import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/anim";
import SectionLabel from "@/components/section-label";
import CountUp from "@/components/count-up";
import CanadaMap, { activeRegionLabels } from "@/components/canada-map";
import ProjectsMarquee from "@/components/projects-marquee";
import { getFeaturedProjects } from "@/lib/projects-store";

export default async function Accomplishments() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <section className="bg-green-deep text-cream">
      <div className="container-saga pt-16 md:pt-24">
        <SectionLabel tone="dark">Nos accomplissements</SectionLabel>

        {/* Compteur en avant-plan, carte du Canada en arrière-plan */}
        <div className="relative mt-10 md:mt-14">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] items-center justify-end md:flex"
            aria-hidden
          >
            <CanadaMap className="h-full w-full max-h-[26rem] object-contain" />
          </div>

          <div className="relative z-10 max-w-xl">
            <Reveal>
              <p className="font-display text-[clamp(4rem,11vw,9rem)] font-medium leading-[0.9] tracking-tight text-cream">
                <CountUp to={500} suffix="+" />
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-powder">
                Projets livrés depuis notre fondation
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-line-invert pt-7">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-brown-light">
                  Où nous avons travaillé
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                  {activeRegionLabels.map((label) => (
                    <li
                      key={label}
                      className="rounded-full border border-line-invert px-3 py-1.5 text-sm text-powder-soft"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Sur petit écran la carte passe sous le compteur */}
          <Reveal delay={0.1} className="md:hidden">
            <CanadaMap className="mt-10 h-auto w-full" />
          </Reveal>
        </div>
      </div>

      {/* Bande de projets — pleine largeur, on peut l'attraper pour la faire défiler */}
      <div className="mt-14 md:mt-20">
        <ProjectsMarquee projects={featuredProjects} />
      </div>

      <div className="container-saga pb-16 md:pb-24">
        <Reveal>
          <div className="mt-12 border-t border-line-invert pt-7">
            <Link
              href="/projets"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-cream transition-colors duration-300 hover:text-powder"
            >
              <span className="link-underline">Voir nos accomplissements</span>
              <ArrowUpRight
                weight="light"
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
