import Image from "next/image";
import { Reveal } from "@/components/anim";
import { ArrowLink } from "@/components/ui";

export default function Manifesto() {
  return (
    <section className="container-saga py-14 md:py-20">
      <Reveal>
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <span className="size-1.5 rounded-full bg-brown" />
          <span className="eyebrow">01 — La firme</span>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:gap-14">
        {/* Text */}
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,3.8vw,3.4rem)] font-medium leading-[1.12] tracking-tight text-ink text-balance">
              Nous sommes des passionnés de structures intégrées.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-stone-600 md:text-xl">
              Nous offrons les services d’ingénierie requis pour la réalisation
              de tous projets de construction de structures, petites ou grandes,
              simples ou complexes.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-t border-line pt-7">
              <span className="eyebrow">Notre vision de l’ingénierie</span>
              <div className="mt-5 max-w-2xl space-y-5 text-pretty text-lg leading-relaxed text-stone-600">
                <p>
                  La firme a été fondée avec l’idée que la construction d’un
                  nouvel ouvrage nécessite une conception impliquant tous les
                  intervenants ; le travail en silo mène inévitablement à des
                  coûts de construction de base élevés, à des coordinations de
                  chantier coûteuses et à un ouvrage final performant sous son
                  potentiel maximal.
                </p>
                <p>
                  <span className="text-ink">
                    SAGA s’implique dans un projet comme un vecteur de
                    coordination et d’intégration.
                  </span>{" "}
                  Nos concepteurs combinent la connaissance technique des
                  structures à la vision d’ensemble des besoins du projet.
                </p>
                <p>
                  Nous croyons que de traiter tous les intervenants sur une base
                  égalitaire optimise le flot des idées.
                </p>
              </div>
              <div className="mt-8">
                <ArrowLink href="/equipe">Rencontrer l’équipe</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Image */}
        <div className="md:col-span-5">
          <Reveal delay={0.05}>
            <div className="md:sticky md:top-28">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-paper-2">
                <Image
                  src="/stock/building.jpg"
                  alt="Structures contemporaines en acier et en verre"
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
