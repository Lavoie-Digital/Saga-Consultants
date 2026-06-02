import { Reveal } from "@/components/anim";
import { ButtonLink } from "@/components/ui";

const steps = [
  {
    n: "01",
    title: "Comprendre",
    body: "On lit le programme, le site et les contraintes avant de tracer la moindre ligne.",
  },
  {
    n: "02",
    title: "Concevoir",
    body: "On cherche la structure la plus simple qui sert le projet, coordonnée avec tous les intervenants.",
  },
  {
    n: "03",
    title: "Accompagner",
    body: "On suit la réalisation sur le terrain, jusqu’à l’attestation de conformité finale.",
  },
];

export default function Method() {
  return (
    <section className="container-saga py-20 md:py-28">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Reveal>
            <span className="eyebrow">La méthode</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,3rem)] font-medium leading-[1.08] tracking-tight text-ink text-balance">
              Simple à dire, rigoureuse à exécuter.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ButtonLink href="/contact">Discuter d’un mandat</ButtonLink>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-sm border border-line md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="h-full border-b border-line bg-cream p-8 last:border-b-0 md:border-b-0 md:border-r md:p-10 md:[&:last-child]:border-r-0">
              <span className="font-display text-5xl font-medium tracking-tight text-brown/35">
                {s.n}
              </span>
              <h3 className="mt-6 text-xl font-medium tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-stone-600">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
