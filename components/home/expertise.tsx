import Link from "next/link";
import { Reveal } from "@/components/anim";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { featuredExpertises } from "@/lib/expertise";

export default function Expertise() {
  return (
    <section className="bg-green-deep text-cream">
      <div className="container-saga py-14 md:py-20">
        <Reveal>
          <div className="flex items-center gap-3 border-b border-line-invert pb-5">
            <span className="size-1.5 rounded-full bg-brown-light" />
            <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-brown-light">
              02 — Expertise
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-x-10 gap-y-10 md:mt-10 md:grid-cols-3">
          {featuredExpertises.map((e, i) => {
            const Icon = e.icon;
            return (
              <Reveal key={e.n} delay={(i % 3) * 0.06}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-sm border border-line-invert text-powder">
                      <Icon weight="light" className="size-6" />
                    </span>
                    <span className="font-mono text-xs tracking-[0.1em] text-cream/45">
                      {e.n}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-cream">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-cream/70">
                    {e.blurb}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 border-t border-line-invert pt-7">
            <Link
              href="/expertise"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-cream transition-colors duration-300 hover:text-powder"
            >
              <span className="link-underline">Toute notre expertise</span>
              <ArrowUpRight
                weight="light"
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
