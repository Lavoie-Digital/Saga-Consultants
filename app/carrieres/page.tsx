import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import WhySaga from "@/components/why-saga";
import { Reveal } from "@/components/anim";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Carrières",
  description:
    "Postes ouverts chez SAGA Consultants : ingénierie en structures et conception. Horaires flexibles, conception intégrée et projets variés au Saguenay–Lac-Saint-Jean.",
};

/* NOTE: postes et liens d’offre à mettre à jour par SAGA.
   `url` = lien direct vers l’annonce (LinkedIn, Indeed, etc.). */
type Position = {
  title: string;
  type: string;
  location: string;
  description: string;
  highlights: string[];
  url: string;
};

const positions: Position[] = [
  {
    title: "Ingénieur·e en structures",
    type: "Temps plein",
    location: "Jonquière, QC",
    description:
      "Concevoir et coordonner la structure de projets multirésidentiels, commerciaux et institutionnels, du concept à la surveillance de chantier.",
    highlights: [
      "Membre de l’OIQ (ou en voie de l’être)",
      "Conception intégrée et coordination",
      "Plans, devis et surveillance",
    ],
    url: "https://www.linkedin.com/",
  },
  {
    title: "Technicien·ne en conception (BIM)",
    type: "Temps plein",
    location: "Jonquière, QC",
    description:
      "Produire les plans et modèles structuraux en étroite collaboration avec les ingénieurs, dans un environnement de conception intégrée.",
    highlights: [
      "Maîtrise de Revit / AutoCAD",
      "Dessin technique structural",
      "Sens du détail et de la coordination",
    ],
    url: "https://www.linkedin.com/",
  },
];

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

      {/* Open positions */}
      <section className="container-saga py-16 md:py-24">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium uppercase leading-none tracking-tight">
              Postes ouverts
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="font-mono text-xs tracking-[0.1em] text-brown">
              {String(positions.length).padStart(2, "0")} en ce moment
            </span>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          {positions.map((p) => (
            <Reveal key={p.title}>
              <article className="group rounded-sm border border-line bg-cream p-8 transition-colors duration-500 hover:border-brown/40 md:p-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-stone-500">
                        {p.type}
                      </span>
                      <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-stone-500">
                        {p.location}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-tight tracking-tight text-ink">
                      {p.title}
                    </h3>
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-brown px-7 py-3.5 text-sm font-medium tracking-tight text-cream transition-all duration-300 hover:bg-brown-deep active:scale-[0.98] cursor-pointer"
                  >
                    Voir l’offre
                    <ArrowUpRight
                      weight="light"
                      className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>

                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-stone-600">
                  {p.description}
                </p>

                <ul className="mt-7 grid gap-x-8 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-3">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-stone-600"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brown" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Spontaneous application */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-sm bg-paper-2 p-8 sm:flex-row sm:items-center md:p-10">
            <p className="max-w-md text-pretty text-base leading-relaxed text-stone-700">
              Aucun poste ne vous correspond ? Envoyez-nous une candidature
              spontanée — nous gardons toujours un œil sur les bons profils.
            </p>
            <a
              href={`mailto:${site.contact.email}?subject=Candidature spontanée`}
              className="group inline-flex shrink-0 items-center gap-2.5 text-sm font-medium tracking-tight text-ink transition-colors duration-300 hover:text-brown cursor-pointer"
            >
              <span className="link-underline">Candidature spontanée</span>
              <ArrowUpRight
                weight="light"
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
