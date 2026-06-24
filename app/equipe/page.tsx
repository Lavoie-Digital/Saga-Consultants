import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import { Reveal } from "@/components/anim";
import { team, type Member } from "@/lib/team";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "Ingénieurs, concepteurs et personnel de soutien : l’équipe de SAGA Consultants conçoit des structures en conception intégrée au Saguenay–Lac-Saint-Jean.",
};

function initialsOf(name: string) {
  return name
    .split(/[\s-]/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function MemberCard({ m }: { m: Member }) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-3">
      {m.photo ? (
        <Image
          src={m.photo}
          alt={`${m.name} — ${m.role}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-5xl font-medium tracking-tight text-stone-400 transition-colors duration-500 group-hover:text-brown">
            {initialsOf(m.name)}
          </span>
        </div>
      )}

      {/* Voile + infos révélés au survol */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-deep/85 via-green-deep/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <p className="font-display text-lg font-medium leading-tight tracking-tight text-paper">
          {m.name}
        </p>
        <p className="mt-1 text-sm text-paper/75">{m.role}</p>
      </div>
    </div>
  );
}

export default function EquipePage() {
  return (
    <>
      <PageHero
        eyebrow="Équipe"
        titleLines={["Les gens derrière les structures"]}
        intro="Une équipe multidisciplinaire qui croit qu’une structure bien conçue commence par une bonne conversation."
        image="/stock/team.jpg"
        imageAlt="Équipe de SAGA Consultants en collaboration autour d’une table"
      />

      <section className="container-saga py-16 md:py-24">
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between border-b border-line pb-5">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Notre équipe
            </h2>
            <span className="font-mono text-xs tracking-[0.1em] text-brown">
              {String(team.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.05}>
              <MemberCard m={m} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
