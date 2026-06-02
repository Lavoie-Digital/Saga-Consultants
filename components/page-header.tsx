import { MaskLines, Reveal } from "@/components/anim";

export default function PageHeader({
  eyebrow,
  titleLines,
  intro,
  index,
}: {
  eyebrow: string;
  titleLines: string[];
  intro?: string;
  index?: string;
}) {
  return (
    <header className="container-saga pt-32 md:pt-40">
      <Reveal>
        <div className="flex items-center justify-between border-b border-line pb-6">
          <span className="eyebrow">{eyebrow}</span>
          {index && <span className="eyebrow">{index}</span>}
        </div>
      </Reveal>

      <div className="grid gap-10 pt-10 md:grid-cols-12 md:pt-14">
        <h1 className="display text-[clamp(2.75rem,9vw,8rem)] md:col-span-9">
          <MaskLines lines={titleLines} lineClassName="text-ink" />
        </h1>
        {intro && (
          <div className="flex items-end md:col-span-3">
            <Reveal delay={0.3}>
              <p className="max-w-sm text-pretty text-base leading-relaxed text-stone-600">
                {intro}
              </p>
            </Reveal>
          </div>
        )}
      </div>
    </header>
  );
}
