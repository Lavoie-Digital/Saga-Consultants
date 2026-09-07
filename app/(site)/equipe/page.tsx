import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import SectionLabel from "@/components/section-label";
import { Reveal } from "@/components/anim";
import { ArrowLink } from "@/components/ui";
import { memberKey, team, teamValues, type Member } from "@/lib/team";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "Une équipe de curieux, de minutieux et de faciles à approcher. Les visages qui font SAGA Consultants, jour après jour.",
};

/* Photos prises au bureau, en fondu enchaîné — toutes avec du monde dedans. */
const officeShots = [
  "/bureau/equipe-groupe.webp",
  "/bureau/equipe-exterieur.webp",
  "/bureau/aire-ouverte.webp",
  "/bureau/salle-conference.webp",
  "/bureau/collegues-rire.webp",
];

function initialsOf(m: Member) {
  return `${m.firstName[0]}${m.lastName?.[0] ?? ""}`.toUpperCase();
}

function MemberCard({ m }: { m: Member }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-sm bg-paper-3">
      {m.photo ? (
        <Image
          src={m.photo}
          alt={`${memberKey(m)} — ${m.role}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          /* Les fichiers sont déjà carrés et recadrés sur le visage à la
             génération : aucun décalage à appliquer ici. */
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-swing)] group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-4xl font-medium tracking-tight text-stone-400">
            {initialsOf(m)}
          </span>
        </div>
      )}

      {/* Prénom + rôle au survol — pas de fiche individuelle pour le moment */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/90 via-green-deep/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-base font-medium leading-tight tracking-tight text-paper">
          {m.firstName}
        </p>
        <p className="mt-0.5 text-xs leading-snug text-paper/75">{m.role}</p>
      </div>
    </div>
  );
}

export default function EquipePage() {
  return (
    <>
      <PageHero
        eyebrow="Équipe"
        titleLines={["Les gens derrière notre travail"]}
        intro="Une équipe de curieux, de minutieux et de faciles à approcher. Voici les visages qui font SAGA, jour après jour."
        image={officeShots}
        imageAlt="L’équipe de SAGA Consultants au bureau"
      />

      {/* Les règles du jeu */}
      <section className="container-saga py-16 md:py-24">
        <SectionLabel>Les règles du jeu qui définissent notre équipe</SectionLabel>

        <div className="mt-10 grid border-t border-line md:mt-14 md:grid-cols-2 md:gap-x-14">
          {teamValues.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.05}>
              <div className="flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:gap-8">
                <h2 className="shrink-0 font-display text-xl font-medium leading-tight tracking-tight text-ink sm:w-44">
                  {v.title}
                </h2>
                <p className="text-pretty text-[0.95rem] leading-relaxed text-stone-600">
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <ArrowLink href="/carrieres">
              Besoin d’un changement de trajectoire ?
            </ArrowLink>
          </div>
        </Reveal>
      </section>

      {/* Grille de portraits — cinq de large */}
      <section className="container-saga pb-24">
        <SectionLabel
          right={
            <span className="font-mono text-xs tracking-[0.1em] text-brown">
              {String(team.length).padStart(2, "0")}
            </span>
          }
        >
          Notre équipe
        </SectionLabel>

        <div className="mt-10 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((m, i) => (
            <Reveal key={memberKey(m)} delay={(i % 5) * 0.04}>
              <MemberCard m={m} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
