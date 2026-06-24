import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { Reveal } from "@/components/anim";
import { expertises } from "@/lib/expertise";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Notre champ d’expertise en génie des structures : modulaire, structure, bâtiment, mise à niveau parasismique, plans et devis et surveillance de travaux.",
};

export default function ExpertisePage() {
  const total = String(expertises.length).padStart(2, "0");

  return (
    <>
      <PageHero
        eyebrow="Expertise · Génie des structures"
        titleLines={["Notre champ d’expertise"]}
        intro="Du concept modulaire à la surveillance de chantier — une expertise complète en structures, à toutes les échelles."
        image="/stock/structure.jpg"
        imageAlt="Plans techniques et instruments de mesure sur une table de conception"
      />

      <section className="container-saga py-16 md:py-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-6">
            <span className="eyebrow">Ce que nous concevons</span>
            <span className="font-mono text-xs tracking-[0.1em] text-brown">
              {total}
            </span>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {expertises.map((e, i) => {
            const Icon = e.icon;
            return (
              <Reveal key={e.n} delay={(i % 2) * 0.06}>
                <div className="group flex h-full flex-col rounded-sm border border-line bg-cream p-8 transition-colors duration-500 hover:border-brown/45 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="flex size-14 items-center justify-center rounded-sm border border-line-strong text-brown transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-brown group-hover:bg-brown group-hover:text-cream">
                      <Icon weight="light" className="size-7" />
                    </span>
                    <span className="font-mono text-xs tracking-[0.1em] text-stone-400">
                      {e.n} <span className="text-stone-300">/ {total}</span>
                    </span>
                  </div>

                  <h2 className="mt-8 font-display text-[1.6rem] font-medium leading-[1.1] tracking-tight text-ink">
                    {e.title}
                  </h2>
                  <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-stone-600">
                    {e.blurb}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-7">
                    {e.details.map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-stone-500 transition-colors duration-300 group-hover:border-brown/30"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
