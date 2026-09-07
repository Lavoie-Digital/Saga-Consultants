import { Reveal } from "@/components/anim";
import HeroBackdrop from "@/components/hero-backdrop";

export default function PageHero({
  eyebrow,
  titleLines,
  intro,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  titleLines: string[];
  intro?: string;
  /** Une image, ou plusieurs pour un fondu enchaîné. */
  image: string | string[];
  imageAlt: string;
  children?: React.ReactNode;
}) {
  const images = Array.isArray(image) ? image : [image];

  return (
    <header className="relative isolate overflow-hidden bg-green-darkest text-cream">
      <HeroBackdrop images={images} alt={imageAlt} />
      <div className="absolute inset-0 bg-gradient-to-t from-green-darkest via-green-darkest/75 to-green-darkest/45" />
      <div className="absolute inset-0 bg-green-deep/35 mix-blend-multiply" />

      <div className="container-saga relative z-10 pt-36 pb-14 md:pt-44 md:pb-20">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-brown-light" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/80">
              {eyebrow}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(1.9rem,4.6vw,3.5rem)] font-medium uppercase leading-[1.04] tracking-tight text-cream text-balance">
            {titleLines.join(" ")}
          </h1>
        </Reveal>

        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-cream/85 md:text-lg">
              {intro}
            </p>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  );
}
