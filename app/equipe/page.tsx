import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import { Reveal } from "@/components/anim";
import { team, teamGroups, type Member } from "@/lib/team";

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
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-3">
        {m.photo ? (
          <>
            <Image
              src={m.photo}
              alt={`${m.name} — ${m.role}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover grayscale-[0.15] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-green-deep/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-5xl font-medium tracking-tight text-stone-400 transition-colors duration-500 group-hover:text-brown">
              {initialsOf(m.name)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 border-t border-line pt-3.5">
        <p className="font-display text-lg font-medium tracking-tight text-ink">
          {m.name}
        </p>
        <p className="mt-0.5 text-sm text-stone-500">{m.role}</p>
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
        {teamGroups.map((group, gi) => {
          const members = team.filter((m) => m.group === group);
          if (members.length === 0) return null;
          return (
            <div key={group} className={gi === 0 ? "" : "mt-20 md:mt-28"}>
              <Reveal>
                <div className="mb-8 flex items-baseline justify-between border-b border-line pb-5">
                  <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                    {group}
                  </h2>
                  <span className="font-mono text-xs tracking-[0.1em] text-brown">
                    {String(members.length).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>

              <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {members.map((m, i) => (
                  <Reveal key={m.name} delay={(i % 4) * 0.05}>
                    <MemberCard m={m} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
