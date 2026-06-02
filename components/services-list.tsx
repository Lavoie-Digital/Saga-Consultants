import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/anim";
import { services } from "@/lib/site";

export default function ServicesList() {
  const total = String(services.length).padStart(2, "0");

  return (
    <div className="flex flex-col">
      {services.map((service, i) => {
        const flip = i % 2 === 1;
        return (
          <Reveal key={service.index}>
            <article className="group grid items-center gap-8 border-t border-line py-12 md:grid-cols-12 md:gap-14 md:py-20">
              {/* Image */}
              <div
                className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-3">
                  <Image
                    src={service.image}
                    alt={`${service.title} — projet réalisé par SAGA Consultants`}
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
                </div>
              </div>

              {/* Text */}
              <div
                className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}
              >
                <div className="flex items-center gap-3 font-mono text-xs tracking-[0.1em] text-brown">
                  <span>{service.index}</span>
                  <span className="h-px w-8 bg-brown/40" />
                  <span className="text-stone-400">{total}</span>
                </div>

                <h3 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.05] tracking-tight text-ink">
                  {service.title}
                </h3>

                <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-stone-600">
                  {service.blurb}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {service.details.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-stone-500 transition-colors duration-300 group-hover:border-brown/40 group-hover:text-stone-700"
                    >
                      {d}
                    </li>
                  ))}
                </ul>

                <ArrowUpRight
                  weight="light"
                  className="mt-8 size-6 text-stone-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brown"
                />
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
