import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/page-hero";
import SectionLabel from "@/components/section-label";
import ParallaxBand from "@/components/parallax-band";
import { Reveal } from "@/components/anim";
import { careerReasons, postings } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Carrières",
  description:
    "On mise sur ton autonomie et on te donne les ressources pour grandir. Six semaines de vacances dès l’arrivée, des projets variés et une équipe de touche-à-tout curieux.",
};

export default function CarrieresPage() {
  return (
    <>
      <PageHero
        eyebrow="Carrières"
        titleLines={["Besoin de changer ta trajectoire ?"]}
        intro="On ne mesure pas le succès à coup de rentabilité de projet. On mise sur ton autonomie, on te donne les ressources pour grandir, et on laisse le temps faire pour construire une équipe solide. Une carrière se structure autour d’expériences diversifiées et d’apprentissages connexes."
        image="/bureau/collegues-rire.webp"
        imageAlt="Deux collègues de SAGA à leur poste de travail"
      />

      {/* Pourquoi rejoindre notre équipe — sous-sections successives */}
      <section className="container-saga py-16 md:py-24">
        <SectionLabel>Pourquoi rejoindre notre équipe ?</SectionLabel>

        <div className="mt-12 flex flex-col gap-16 md:mt-16 md:gap-24">
          {careerReasons.map((r, i) => {
            const Icon = r.icon;
            const flip = i % 2 === 1;
            return (
              <Reveal key={r.title}>
                <div className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
                  <div
                    className={`md:col-span-6 ${flip ? "md:order-2" : ""}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-2">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-green-deep/10 mix-blend-multiply" />
                    </div>
                  </div>

                  <div className="md:col-span-6">
                    <Icon
                      weight="thin"
                      className="size-10 text-brown"
                      aria-hidden
                    />
                    <h2 className="mt-5 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium uppercase leading-[1.1] tracking-tight text-ink text-balance">
                      {r.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-stone-600 md:text-lg">
                      {r.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Rencontre l'équipe ! */}
      <ParallaxBand
        src="/bureau/equipe-groupe.webp"
        alt="L’équipe de SAGA Consultants sur la terrasse du bureau"
        height="clamp(18rem, 30vw, 26rem)"
      >
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium uppercase leading-[1.05] tracking-tight text-cream text-balance">
            Rencontre l’équipe !
          </h2>
          <Link
            href="/equipe"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-cream px-7 py-3.5 text-sm font-medium tracking-tight text-green-darkest transition-colors duration-300 hover:bg-powder cursor-pointer"
          >
            Voir les visages de SAGA
            <ArrowUpRight
              weight="light"
              className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </ParallaxBand>

      {/* Postes ouverts */}
      <section className="container-saga py-16 md:py-24">
        <SectionLabel>Postes ouverts</SectionLabel>

        {postings.length > 0 && (
          <ul className="mt-10 border-t border-line">
            {postings.map((p) => (
              <li
                key={p.title}
                className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-6"
              >
                <span className="font-display text-xl font-medium tracking-tight text-ink">
                  {p.title}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-stone-400">
                  {p.location} · {p.type}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Candidature spontanée — la photo est le lien */}
        <Reveal delay={0.05}>
          <Link
            href="/contact"
            className="group mt-10 grid items-stretch overflow-hidden rounded-sm border border-line bg-cream md:grid-cols-2"
          >
            {/* Local vide du bureau. À remplacer si SAGA fournit une photo
                de la salle de conférence vide. */}
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-2 md:aspect-auto md:min-h-[22rem]">
              <Image
                src="/bureau/local-vide-1.webp"
                alt="Salle de réunion vide au bureau de SAGA Consultants"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-swing)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-green-darkest/45 transition-colors duration-500 group-hover:bg-green-darkest/65" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="translate-y-2 rounded-full border border-cream/40 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-cream opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  Candidature spontanée
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium uppercase leading-[1.1] tracking-tight text-ink text-balance">
                Aucun poste affiché en ce moment
              </h2>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-stone-600 md:text-lg">
                Si aucun poste affiché ne correspond à tes aspirations,
                contacte-nous ! On est toujours curieux de rencontrer du
                nouveau monde.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-ink">
                <span className="link-underline">Écris-nous</span>
                <ArrowUpRight
                  weight="light"
                  className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
