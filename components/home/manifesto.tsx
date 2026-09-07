import Image from "next/image";
import { Reveal } from "@/components/anim";
import { ArrowLink } from "@/components/ui";
import SectionLabel from "@/components/section-label";

export default function Manifesto() {
  return (
    <section className="container-saga py-16 md:py-24">
      <SectionLabel>La firme</SectionLabel>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-14">
        {/* Text */}
        <div className="md:col-span-7">
          <Reveal>
            <span className="eyebrow">Notre vision de l’ingénierie</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.4rem)] font-medium leading-[1.12] tracking-tight text-ink text-balance">
              Nous sommes passionnés de réalisations bien ficelées.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 max-w-2xl space-y-5 text-pretty text-lg leading-relaxed text-stone-600">
              <p>
                Nous offrons les services d’ingénierie requis pour la
                réalisation de tous projets liés aux structures, petites ou
                grandes, simples ou complexes.
              </p>
              <p>
                Pour nous, savoir calculer les bons éléments structuraux, ça ne
                suffit pas sans le jugement pour prendre les bonnes décisions.{" "}
                <span className="text-ink">
                  Comprendre la réalité de gestion, de financement, de
                  rentabilité et de contraintes de temps de nos clients, c’est
                  ce qui nous permet de bien les accompagner
                </span>{" "}
                — surtout quand un projet sort de l’ordinaire.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 border-t border-line pt-7">
              <ArrowLink href="/equipe">Rencontrer l’équipe</ArrowLink>
            </div>
          </Reveal>
        </div>

        {/* Image */}
        <div className="md:col-span-5">
          <Reveal delay={0.05}>
            <div className="md:sticky md:top-28">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-paper-2">
                <Image
                  src="/bureau/detail-plans-saga.webp"
                  alt="Plans de structure annotés sur une table de travail SAGA"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-green-deep/15 mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
