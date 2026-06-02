import Image from "next/image";
import { Reveal } from "@/components/anim";

const principles = [
  {
    n: "01",
    title: "Conception intégrée",
    body: "Tous les intervenants autour de la table dès le départ. La structure devient un langage commun plutôt qu’une contrainte de fin de parcours.",
  },
  {
    n: "02",
    title: "Maximiser le potentiel",
    body: "Lire le potentiel réel d’un site et d’un programme pour en tirer la solution la plus simple, la plus juste et la plus durable.",
  },
  {
    n: "03",
    title: "La valeur par le design",
    body: "Une structure bien pensée crée de la valeur : moins de matière, moins de coûts, plus de clarté architecturale.",
  },
  {
    n: "04",
    title: "Communication transparente",
    body: "Un dialogue ouvert, du concept à la livraison. Vous savez toujours où en est votre projet, et pourquoi.",
  },
];

export default function Approach() {
  return (
    <section className="container-saga py-20 md:py-24">
      <div className="grid gap-14 md:grid-cols-12">
        {/* Sticky left */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal>
              <span className="eyebrow">03 — Notre approche</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-balance">
                Un vecteur de coordination et d’intégration.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-sm bg-paper-2">
                <Image
                  src="/espace-collaboratif.webp"
                  alt="Espace collaboratif des bureaux de SAGA Consultants"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Principles list */}
        <div className="md:col-span-6 md:col-start-7">
          <div className="border-t border-line">
            {principles.map((p) => (
              <Reveal key={p.n}>
                <div className="grid grid-cols-12 gap-4 border-b border-line py-10">
                  <span className="col-span-2 font-mono text-xs tracking-[0.1em] text-stone-400">
                    {p.n}
                  </span>
                  <div className="col-span-10">
                    <h3 className="text-xl font-medium tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-stone-600">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
