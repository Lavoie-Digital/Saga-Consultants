"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Plus,
  X,
  Scales,
  Compass,
  Buildings,
  Stack,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const benefits: { n: string; title: string; body: string; icon: PhosphorIcon }[] =
  [
    {
      n: "01",
      title: "Équilibre travail–vie",
      body: "Des horaires flexibles et une organisation qui respecte votre vie en dehors du bureau.",
      icon: Scales,
    },
    {
      n: "02",
      title: "Liberté individuelle",
      body: "L’autonomie de mener vos mandats, soutenue par une équipe et une méthode solides.",
      icon: Compass,
    },
    {
      n: "03",
      title: "Espaces dynamiques",
      body: "Des bureaux pensés pour la collaboration, le calme et la concentration.",
      icon: Buildings,
    },
    {
      n: "04",
      title: "Projets qui comptent",
      body: "Du multirésidentiel à l’institutionnel : des structures réelles, dans votre région.",
      icon: Stack,
    },
  ];

export default function WhySaga() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Trigger — a clearly clickable card */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group block w-full overflow-hidden rounded-sm border border-line bg-cream p-7 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-brown/45 hover:shadow-[0_30px_60px_-26px_rgba(20,33,27,0.3)] md:p-10 cursor-pointer"
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <span className="eyebrow">En savoir plus</span>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-medium uppercase leading-[1.06] tracking-tight text-ink">
              Pourquoi travailler avec nous ?
            </h2>
          </div>

          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line-strong text-brown transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90 group-hover:border-brown group-hover:bg-brown group-hover:text-cream md:size-16">
            <Plus weight="light" className="size-6 md:size-7" />
          </span>
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-green-darkest/70 backdrop-blur-md"
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Pourquoi travailler avec nous"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-sm bg-cream p-7 shadow-[0_40px_80px_-20px_rgba(20,33,27,0.35)] sm:p-10 md:p-12"
            >
              <div className="flex items-start justify-between gap-6 border-b border-line pb-6">
                <div>
                  <span className="eyebrow">Pourquoi SAGA</span>
                  <h3 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-medium uppercase leading-[1.05] tracking-tight text-ink">
                    Travailler avec nous
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-300 hover:bg-ink hover:text-cream cursor-pointer"
                >
                  <X weight="light" className="size-5" />
                </button>
              </div>

              <div className="mt-2">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={b.n}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: EASE,
                        delay: 0.12 + i * 0.08,
                      }}
                      className="flex items-start gap-5 border-b border-line py-6 last:border-b-0"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-line-strong text-brown">
                        <Icon weight="light" className="size-6" />
                      </span>
                      <div>
                        <h4 className="font-display text-xl font-medium tracking-tight text-ink">
                          {b.title}
                        </h4>
                        <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-stone-600">
                          {b.body}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
