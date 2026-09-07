import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import WhySaga from "@/components/why-saga";
import { Reveal } from "@/components/anim";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Carrières",
  description:
    "SAGA Consultants est toujours ouvert aux candidatures spontanées en ingénierie des structures et en conception. Horaires flexibles, conception intégrée et projets variés au Saguenay–Lac-Saint-Jean.",
};

export default function CarrieresPage() {
  return (
    <>
      <PageHero
        eyebrow="Carrières · Rejoindre l’équipe"
        titleLines={["Bâtir une carrière, pas juste un poste"]}
        intro="Nous embauchons des gens curieux qui aiment les structures simples et le travail bien fait."
        image="/stock/office.jpg"
        imageAlt="Espace de bureau lumineux au plafond de béton apparent"
      />

      {/* Why work with us — opens a modal */}
      <section className="container-saga pt-14 md:pt-20">
        <WhySaga />
      </section>

      {/* Always open to applications */}
      <section className="container-saga py-16 md:py-24">
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-line bg-cream p-8 md:p-14">
            <span className="flex w-fit items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-stone-500">
              <span className="size-1.5 rounded-full bg-brown" />
              Toujours ouvert
            </span>

            <h2 className="mt-6 max-w-3xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-medium uppercase leading-[1.05] tracking-tight text-ink">
              Ouvert à recevoir votre candidature
            </h2>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-stone-600 md:text-lg">
              Nous n’avons pas d’affichage en ce moment, mais nous gardons
              toujours un œil sur les bons profils — ingénierie des structures
              comme conception. Présentez-vous, parlez-nous de ce qui vous
              motive et de ce que vous aimez construire.
            </p>

            <div className="mt-9 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-stone-500">
                Envoyez votre CV et quelques mots à{" "}
                <a
                  href={`mailto:${site.contact.email}?subject=Candidature spontanée`}
                  className="link-underline text-ink"
                >
                  {site.contact.email}
                </a>
              </p>

              <a
                href={`mailto:${site.contact.email}?subject=Candidature spontanée`}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-brown px-7 py-3.5 text-sm font-medium tracking-tight text-cream transition-all duration-300 hover:bg-brown-deep active:scale-[0.98] cursor-pointer"
              >
                Postuler maintenant
                <ArrowUpRight
                  weight="light"
                  className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
