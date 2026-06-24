"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Compass,
  ClipboardText,
  ArrowUpRight,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { services, type Service } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

// One technical icon per service (engineering, not abstract).
const ICONS = [Compass, ClipboardText];

function FeatureRow({
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
  const flip = i % 2 === 1;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
      className="group grid items-stretch overflow-hidden rounded-sm border border-line bg-cream transition-colors duration-500 hover:border-brown/45 md:grid-cols-2"
    >
      {/* Image */}
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-paper-2 md:aspect-auto md:min-h-[24rem] ${
          flip ? "md:order-2" : ""
        }`}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-green-deep/10 transition-colors duration-500 group-hover:bg-green-deep/0" />
      </div>

      {/* Content */}
      <div className="flex flex-col p-8 md:p-12">
        <div className="flex items-start justify-between">
          <span className="flex size-14 items-center justify-center rounded-sm border border-line-strong text-brown transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-brown group-hover:bg-brown group-hover:text-cream">
            <Icon weight="light" className="size-7" />
          </span>
          <span className="font-mono text-xs tracking-[0.1em] text-stone-400">
            {service.index} <span className="text-stone-300">/ {total}</span>
          </span>
        </div>

        <h3 className="mt-8 font-display text-[1.8rem] font-medium leading-[1.1] tracking-tight text-ink md:text-[2rem]">
          {service.title}
        </h3>
        <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-stone-600">
          {service.blurb}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-8">
          {service.details.map((d) => (
            <li
              key={d}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-stone-500 transition-colors duration-300 group-hover:border-brown/30"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ServicesShowcase() {
  const total = String(services.length).padStart(2, "0");

  return (
    <div className="flex flex-col gap-5">
      {services.map((s, i) => (
        <FeatureRow
          key={s.index}
          service={s}
          Icon={ICONS[i] ?? Compass}
          i={i}
          total={total}
        />
      ))}

      {/* CTA band completes the section */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay: services.length * 0.05 }}
      >
        <Link
          href="/contact"
          className="group flex flex-col justify-between gap-8 overflow-hidden rounded-sm bg-green-deep p-8 text-cream transition-colors duration-500 hover:bg-green-darkest sm:flex-row sm:items-center md:p-12"
        >
          <div>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-powder">
              Un mandat en tête ?
            </span>
            <span className="mt-4 block font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.05] tracking-tight">
              Discutons de votre projet.
            </span>
          </div>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line-invert transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-cream group-hover:text-green-deep">
            <ArrowUpRight weight="light" className="size-6" />
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
