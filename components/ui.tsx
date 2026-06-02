"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

/* ---------- Magnetic: element pulls toward cursor ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Primary button (filled / outline) ---------- */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 cursor-pointer";
  const styles = {
    solid: "bg-brown text-cream hover:bg-brown-deep",
    outline:
      "border border-line-strong text-ink hover:bg-brown hover:text-cream hover:border-brown",
    ghost: "text-ink hover:text-brown",
  }[variant];

  return (
    <Magnetic strength={0.25}>
      <Link href={href} className={`${base} ${styles} ${className}`}>
        <span>{children}</span>
        <ArrowUpRight
          weight="light"
          className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </Magnetic>
  );
}

/* ---------- Inline arrow link ---------- */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-ink transition-colors duration-300 hover:text-brown cursor-pointer ${className}`}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight
        weight="light"
        className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
