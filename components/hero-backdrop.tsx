"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const SLIDE_MS = 6000;

/**
 * Arrière-plan d'entête. Avec plusieurs images, elles s'enchaînent en fondu ;
 * avec une seule, c'est une simple image fixe.
 */
export default function HeroBackdrop({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const cycles = images.length > 1 && !reduce;

  useEffect(() => {
    if (!cycles) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [cycles, images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          // Seule la première image porte le texte alternatif : les suivantes
          // sont des variantes décoratives de la même scène.
          alt={i === 0 ? alt : ""}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
