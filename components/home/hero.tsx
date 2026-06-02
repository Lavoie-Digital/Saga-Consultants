"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { MaskLines } from "@/components/anim";
import { ButtonLink } from "@/components/ui";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const facts = [
  { k: "Fondée en", v: "2020" },
  { k: "Projets livrés", v: "150+" },
  { k: "Territoire", v: "Saguenay–Lac-St-Jean" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-green-darkest text-cream"
    >
      {/* Background image */}
      <motion.div
        style={{ y, scale }}
        initial={reduce ? false : { scale: 1.18, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1.06, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src="/stock/steel.jpg"
          alt="Ingénieur concevant des plans de structure"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Legibility + brand wash */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-green-darkest via-green-darkest/70 to-green-darkest/35"
      />
      <div className="absolute inset-0 bg-green-deep/35 mix-blend-multiply" />

      {/* Content */}
      <div className="container-saga relative z-10 flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-16">
        {/* top tag */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="absolute left-[clamp(1.25rem,5vw,5rem)] top-28 flex items-center gap-3 md:top-32"
        >
          <span className="size-1.5 rounded-full bg-brown-light" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/80">
            Génie-conseil · Structures
          </span>
        </motion.div>

        <h1 className="display text-[clamp(2.75rem,9.5vw,9rem)] text-cream">
          <MaskLines
            lines={["La beauté", "des solutions", "simples."]}
            delay={0.25}
          />
        </h1>

        <div className="mt-8 flex flex-col gap-8 border-t border-line-invert pt-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="max-w-md text-pretty text-base leading-relaxed text-cream/85"
          >
            {site.shortPitch} Nous concevons des structures justes — là où
            l’ingénierie rejoint l’architecture.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="/projets">Voir les projets</ButtonLink>
            <a
              href="#manifeste"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-sm font-medium tracking-tight text-cream transition-colors duration-300 hover:bg-cream hover:text-green-darkest cursor-pointer"
            >
              Découvrir
              <ArrowDown weight="light" className="size-4" />
            </a>
          </motion.div>
        </div>

        {/* Facts strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line-invert sm:grid-cols-3"
        >
          {facts.map((f) => (
            <div key={f.k} className="bg-cream/[0.04] px-5 py-4 backdrop-blur-sm">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cream/55">
                {f.k}
              </p>
              <p className="mt-1 font-display text-lg font-medium tracking-tight text-cream">
                {f.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
