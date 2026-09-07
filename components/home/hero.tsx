"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { MaskLines } from "@/components/anim";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

// Carrousel d’arrière-plan — diversité de projets structuraux.
const heroVideos = [
  "/stock/hero-1.mp4",
  "/stock/hero-2.mp4",
  "/stock/hero-3.mp4",
  "/stock/hero-4.mp4",
];
const SLIDE_MS = 7000;

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

  // Carrousel : avance d’une vidéo à l’autre avec fondu enchaîné.
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % heroVideos.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Joue la vidéo active depuis le début, met les autres en pause.
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-green-darkest text-cream"
    >
      {/* Background — carrousel vidéo */}
      <motion.div
        style={{ y, scale }}
        initial={reduce ? false : { scale: 1.18, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1.06, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0"
      >
        {heroVideos.map((src, i) => (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            autoPlay={i === 0}
            muted
            loop
            playsInline
            poster="/stock/steel.jpg"
            aria-hidden
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}
      </motion.div>

      {/* Legibility + brand wash */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-green-darkest via-green-darkest/70 to-green-darkest/35"
      />
      <div className="absolute inset-0 bg-green-deep/35 mix-blend-multiply" />

      {/* Content */}
      <div className="container-saga relative z-10 flex flex-1 flex-col justify-end pb-16 pt-32 md:pb-20">
        {/* top tag */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="absolute left-[var(--gutter)] top-28 flex items-center gap-3 md:top-32"
        >
          <span className="size-1.5 rounded-full bg-brown-light" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cream/80">
            Génie-conseil · Structures
          </span>
        </motion.div>

        {/* Sur mobile, la colonne est haute et vide au-dessus du titre : le
            logo occupe ce vide, centré dedans. Sur grand écran, celui de
            l'en-tête suffit. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          className="flex flex-1 items-center justify-center md:hidden"
        >
          <div className="relative w-[68%] max-w-[19rem]">
            <Image
              src="/logo.webp"
              alt=""
              width={1500}
              height={559}
              aria-hidden
              priority
              className="h-auto w-full opacity-70"
            />
            {/* Reflet : un dégradé qui traverse, découpé à la forme du logo. */}
            <span aria-hidden className="logo-sheen absolute inset-0" />
          </div>
        </motion.div>

        <h1 className="display text-[clamp(2.5rem,7.6vw,7rem)] text-cream">
          <MaskLines
            lines={["Un savoir-faire", "qui va au-delà", "des plans"]}
            delay={0.25}
          />
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-8 max-w-xl border-t border-line-invert pt-8 text-pretty text-base leading-relaxed text-cream/85 md:text-lg"
        >
          {site.longPitch}
        </motion.p>
      </div>
    </section>
  );
}
