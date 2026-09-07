import { Reveal } from "@/components/anim";
import SectionLabel from "@/components/section-label";
import DragScroller from "@/components/drag-scroller";
import { serviceFamilies } from "@/lib/services";
import { expertises } from "@/lib/expertise";

function BlockLead({ lead, title }: { lead: string; title: string }) {
  return (
    <>
      <Reveal>
        <p className="max-w-2xl text-pretty font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.2] tracking-tight text-ink">
          {lead}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="eyebrow mt-7 border-t border-line pt-6">{title}</p>
      </Reveal>
    </>
  );
}

export default function SavoirFaire() {
  return (
    <section className="bg-cream">
      <div className="container-saga py-16 md:py-24">
        <SectionLabel>Notre savoir-faire</SectionLabel>

        <Reveal>
          <p className="mt-10 max-w-3xl text-pretty text-lg leading-relaxed text-stone-600 md:text-xl">
            SAGA travaille avec les donneurs d’ouvrage publics et privés — des
            concepteurs de structures curieux, qui s’intéressent au projet
            autant qu’à la charpente.
          </p>
        </Reveal>

        {/* ---------------- Services ---------------- */}
        <div className="mt-16 md:mt-24">
          <BlockLead
            lead="Une expérience cumulée diversifiée pour nous permettre de bien épauler nos clients."
            title="Le genre de services que nous rendons"
          />

          {/* Quatre colonnes sur grand écran ; en dessous, la bande se tire à la main. */}
          <DragScroller
            ariaLabel="Nos familles de services"
            className="mt-10 bleed-gutter lg:mx-0 lg:px-0"
            innerClassName="gap-6 lg:w-full lg:gap-8"
          >
            {serviceFamilies.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal
                  key={s.label}
                  delay={(i % 4) * 0.06}
                  className="w-[17rem] shrink-0 lg:w-auto lg:flex-1 lg:shrink"
                >
                  <div className="flex h-full flex-col border-t border-line-strong pt-6">
                    <Icon
                      weight="thin"
                      className="size-12 shrink-0 text-ink"
                      aria-hidden
                    />
                    <h3 className="mt-6 font-display text-lg font-medium leading-[1.2] tracking-tight text-ink">
                      {s.label}
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-brown">
                      {s.promise}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-line pt-5">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="text-pretty text-sm leading-relaxed text-stone-500"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </DragScroller>
        </div>

        {/* ---------------- Expertises ---------------- */}
        <div className="mt-20 md:mt-28">
          <BlockLead
            lead="Des touche-à-tout curieux et motivés par la connaissance, ça ouvre les horizons."
            title="Le type de structures que nous maîtrisons"
          />

          <div className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-12">
            {expertises.map((e, i) => {
              const Icon = e.icon;
              return (
                <Reveal key={e.label} delay={(i % 2) * 0.05}>
                  <div className="group flex items-start gap-5 border-b border-line py-6">
                    <Icon
                      weight="thin"
                      className="mt-0.5 size-8 shrink-0 text-brown"
                      aria-hidden
                    />
                    <div>
                      <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-ink">
                        {e.label}
                      </h3>
                      <p className="mt-1.5 text-pretty text-sm leading-relaxed text-stone-500">
                        {e.blurb}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
