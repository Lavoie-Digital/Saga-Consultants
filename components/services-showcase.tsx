"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import {
  Compass,
  ClipboardText,
  Waveform,
  Ruler,
  HardHat,
  ArrowUpRight,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { services, type Service } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

// One technical icon per service (engineering, not abstract).
const ICONS = [Compass, ClipboardText, Waveform, Ruler, HardHat];

function SpotlightCard({
  service,
  Icon,
  i,
  total,
}: {
  service: Service;
  Icon: PhosphorIcon;
  i: number;
  total: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(106,80,58,0.13), transparent 72%)`;

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-cream p-8 transition-colors duration-500 hover:border-brown/45 md:p-10"
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between">
        <span className="flex size-14 items-center justify-center rounded-sm border border-line-strong text-brown transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-brown group-hover:bg-brown group-hover:text-cream">
          <Icon weight="light" className="size-7" />
        </span>
        <span className="font-mono text-xs tracking-[0.1em] text-stone-400">
          {service.index} <span className="text-stone-300">/ {total}</span>
        </span>
      </div>

      <h3 className="relative mt-8 font-display text-[1.6rem] font-medium leading-[1.1] tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="relative mt-4 text-pretty text-[0.95rem] leading-relaxed text-stone-600">
        {service.blurb}
      </p>

      <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-7">
        {service.details.map((d) => (
          <li
            key={d}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-stone-500 transition-colors duration-300 group-hover:border-brown/30"
          >
            {d}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ServicesShowcase() {
  const total = String(services.length).padStart(2, "0");

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5">
      {services.map((s, i) => (
        <SpotlightCard
          key={s.index}
          service={s}
          Icon={ICONS[i] ?? Compass}
          i={i}
          total={total}
        />
      ))}

      {/* CTA tile completes the grid */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay: services.length * 0.07 }}
      >
        <Link
          href="/contact"
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm bg-green-deep p-8 text-cream transition-colors duration-500 hover:bg-green-darkest md:p-10"
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-powder">
            Un mandat en tête ?
          </span>
          <span className="mt-10 flex items-end justify-between gap-4">
            <span className="font-display text-[1.7rem] font-medium leading-[1.05] tracking-tight">
              Discutons de
              <br />
              votre projet.
            </span>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line-invert transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-cream group-hover:text-green-deep">
              <ArrowUpRight weight="light" className="size-5" />
            </span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
