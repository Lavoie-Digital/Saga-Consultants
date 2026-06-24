import Image from "next/image";
import { Reveal } from "@/components/anim";
import { ArrowLink } from "@/components/ui";
import { team } from "@/lib/team";

function initialsOf(name: string) {
  return name
    .split(/[\s-]/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamPreview() {
  const preview = team.slice(0, 8);

  return (
    <section className="container-saga py-10 md:py-14">
      <Reveal>
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <span className="size-1.5 rounded-full bg-brown" />
          <span className="eyebrow">03 — Équipe</span>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-center md:gap-14">
        {/* Text */}
        <div className="md:col-span-5">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.12] tracking-tight text-ink text-balance">
              Les gens derrière les structures.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-stone-600">
              Une équipe multidisciplinaire d’ingénieurs, de concepteurs et de
              personnel de soutien qui croit qu’une bonne structure commence par
              une bonne conversation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7">
              <ArrowLink href="/equipe">Rencontrer l’équipe</ArrowLink>
            </div>
          </Reveal>
        </div>

        {/* Photos */}
        <div className="md:col-span-7">
          <Reveal delay={0.05}>
            <div className="grid grid-cols-4 gap-3">
              {preview.map((m) => (
                <div
                  key={m.name}
                  className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-3"
                >
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 15vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-display text-2xl font-medium tracking-tight text-stone-400">
                        {initialsOf(m.name)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
