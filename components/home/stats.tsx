import { Reveal } from "@/components/anim";
import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <section className="bg-green-deep text-cream">
      <div className="container-saga py-20 md:py-20">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-l border-line-invert pl-6">
                <p className="font-display text-[clamp(2.75rem,6vw,5rem)] font-medium leading-none tracking-tight">
                  {s.value}
                </p>
                <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-powder">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
