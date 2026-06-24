"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/anim";
import { featuredProjects } from "@/lib/projects";

// Duplicate the list so the marquee can loop seamlessly.
const row = [...featuredProjects, ...featuredProjects];

export default function ProjectsBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="py-10 md:py-14">
      <div className="container-saga">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <div className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-brown" />
              <span className="eyebrow">04 — Projets</span>
            </div>
            <Link
              href="/projets"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-ink transition-colors duration-300 hover:text-brown"
            >
              <span className="link-underline">Tous les projets</span>
              <ArrowUpRight
                weight="light"
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 max-w-2xl">
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-tight text-ink text-balance">
              Des structures réelles, dans votre région.
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-stone-600 md:text-lg">
              Du multirésidentiel à l’institutionnel, un aperçu des projets que
              nous avons conçus — du concept à la mise en chantier.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Scrolling band — contained, fading at both edges */}
      <div className="container-saga mt-8 md:mt-10">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <motion.div
            className="flex w-max gap-3"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          >
          {row.map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              href="/projets"
              className="group relative aspect-[3/2] w-[18rem] shrink-0 overflow-hidden rounded-sm bg-paper-2 sm:w-[22rem]"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 18rem, 22rem"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/85 via-green-deep/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-paper/70">
                  {p.sector}
                </p>
                <h3 className="mt-1 font-display text-lg font-medium leading-tight tracking-tight text-paper">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
