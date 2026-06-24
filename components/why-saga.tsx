"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Scales,
  Compass,
  Buildings,
  Stack,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/anim";

const EASE = [0.16, 1, 0.3, 1] as const;

const benefits: {
  n: string;
  title: string;
  short: string;
  body: string;
  icon: PhosphorIcon;
  image: string;
}[] = [
  {
    n: "01",
    title: "Équilibre travail–vie",
    short: "Équilibre",
    body: "Des horaires flexibles et une organisation qui respecte votre vie en dehors du bureau. On bâtit des structures, pas du surmenage.",
    icon: Scales,
    image: "/stock/office.jpg",
  },
  {
    n: "02",
    title: "Liberté individuelle",
    short: "Liberté",
    body: "L’autonomie de mener vos mandats du concept au chantier, soutenue par une équipe et une méthode solides.",
    icon: Compass,
    image: "/stock/structure.jpg",
  },
  {
    n: "03",
    title: "Espaces dynamiques",
    short: "Espaces",
    body: "Des bureaux pensés pour la collaboration, le calme et la concentration — un lieu où l’on a envie de concevoir.",
    icon: Buildings,
    image: "/espace-collaboratif.webp",
  },
  {
    n: "04",
    title: "Projets qui comptent",
    short: "Projets",
    body: "Du multirésidentiel à l’institutionnel : des structures réelles, dans votre région, dont vous serez fier·e.",
    icon: Stack,
    image: "/stock/building.jpg",
  },
];

export default function WhySaga() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = benefits[active];

  return (
    <div>
      <Reveal>
        <div className="border-b border-line pb-6">
          <span className="eyebrow">Pourquoi SAGA</span>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.75rem,4vw,3rem)] font-medium uppercase leading-[1.05] tracking-tight text-ink">
            Pourquoi travailler avec nous ?
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 overflow-hidden rounded-sm border border-line bg-cream">
          {/* Tabs on top */}
          <div className="flex flex-wrap border-b border-line">
            {benefits.map((b, i) => {
              const isActive = i === active;
              const Icon = b.icon;
              return (
                <button
                  key={b.n}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative flex flex-1 items-center justify-center gap-2.5 px-4 py-4 text-sm font-medium tracking-tight transition-colors duration-300 cursor-pointer md:px-6 md:py-5 ${
                    isActive ? "text-ink" : "text-stone-500 hover:text-ink"
                  } ${i > 0 ? "border-l border-line" : ""}`}
                >
                  <Icon
                    weight="light"
                    className={`size-5 shrink-0 transition-colors duration-300 ${
                      isActive ? "text-brown" : "text-stone-400 group-hover:text-brown"
                    }`}
                  />
                  <span className="hidden sm:inline">{b.title}</span>
                  <span className="sm:hidden">{b.short}</span>

                  {isActive && (
                    <motion.span
                      layoutId="why-tab-underline"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-brown"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel — photo + description */}
          <div className="grid md:grid-cols-2 md:min-h-[34rem]">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-2 md:aspect-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.n}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.n}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tracking-[0.1em] text-brown">
                      {current.n}
                    </span>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                      {current.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-pretty text-base leading-relaxed text-stone-600 md:text-lg">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
