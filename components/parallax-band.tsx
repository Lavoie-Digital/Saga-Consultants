"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Bandeau image qui dérive plus lentement que la page : les sections opaques
 * qui l'encadrent semblent glisser par-dessus. C'est ce qui donne la
 * profondeur entre les sous-sections, sans `background-attachment: fixed`
 * (cassé sur iOS).
 */
export default function ParallaxBand({
  src,
  alt,
  height = "clamp(16rem, 34vw, 30rem)",
  children,
}: {
  src: string;
  alt: string;
  height?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // L'image est surdimensionnée de 20 % en hauteur : elle peut donc dériver
  // de ±10 % sans jamais découvrir le bord du cadre.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      style={{ height }}
      className="relative isolate overflow-hidden bg-green-darkest"
    >
      <motion.div style={reduce ? undefined : { y }} className="absolute -inset-y-[10%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-green-darkest/45" />
      <div className="absolute inset-0 bg-green-deep/30 mix-blend-multiply" />
      {children && (
        <div className="container-saga relative z-10 flex h-full items-center">
          {children}
        </div>
      )}
    </div>
  );
}
