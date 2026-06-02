"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Marquee({
  items,
  duration = 28,
  className = "",
}: {
  items: string[];
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const track = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max items-center"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="display whitespace-nowrap px-8 text-[clamp(2.5rem,8vw,7rem)] text-ink/85">
              {item}
            </span>
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full bg-brown"
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
