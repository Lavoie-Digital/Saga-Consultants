"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Reveal: fade + rise when scrolled into view ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- MaskLines: lines that clip-rise sequentially ---------- */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // Observe the stable (non-transformed) wrapper so the IntersectionObserver
  // reads a reliable rect — the lines themselves start translated off-box.
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.08em" }}
        >
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={reduce ? false : { y: "110%" }}
            animate={reduce ? undefined : { y: inView ? "0%" : "110%" }}
            transition={{
              duration: 1.05,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------- Stagger container + item ---------- */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Stagger({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}
