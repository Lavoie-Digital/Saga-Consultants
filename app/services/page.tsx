import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ServicesShowcase from "@/components/services-showcase";
import { Reveal } from "@/components/anim";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Études préparatoires, expertises structurales, mise à niveau parasismique, plans et devis, surveillance de travaux. Le génie-conseil en structures, du concept au chantier.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services · Génie-conseil"
        titleLines={["Notre champ d’expertise"]}
        intro="Des services de consultation en ingénierie pour le multirésidentiel, le commercial, l’institutionnel et l’industriel — quelle que soit l’échelle."
        image="/stock/structure.jpg"
        imageAlt="Plans techniques et instruments de mesure sur une table de conception"
      />

      {/* Services — icon showcase */}
      <section className="container-saga py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6">
          <Reveal>
            <span className="eyebrow">Cinq volets, une logique</span>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="hidden font-mono text-xs uppercase tracking-[0.12em] text-stone-400 sm:block">
              Survolez chaque carte
            </span>
          </Reveal>
        </div>
        <ServicesShowcase />
      </section>
    </>
  );
}
