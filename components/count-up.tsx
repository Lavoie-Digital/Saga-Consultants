"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Compteur qui s'incrémente une fois, quand il entre dans le champ. */
export default function CountUp({
  to,
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  // Sans animation, la valeur finale est rendue directement — pas d'effet.
  const display = reduce ? to : value;

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const ms = duration * 1000;
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1);
      // ease-out-expo — démarre vite, se pose doucement sur la valeur finale
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {/* La valeur finale est lue d'un coup par les lecteurs d'écran. */}
      <span aria-hidden>{display.toLocaleString("fr-CA")}</span>
      <span className="sr-only">{to.toLocaleString("fr-CA")}</span>
      {suffix}
    </span>
  );
}
