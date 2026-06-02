"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { nav, site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="SAGA Consultants — accueil"
      className="flex items-baseline gap-2"
    >
      <span
        className={`font-display text-2xl font-medium leading-none tracking-tight transition-colors duration-300 ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        SAGA
      </span>
      <span
        className={`font-mono text-[0.6rem] uppercase tracking-[0.3em] transition-colors duration-300 ${
          light ? "text-cream/60" : "text-stone-400"
        }`}
      >
        Consultants
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Every page opens on a dark image header: light header until scroll.
  const light = !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled
              ? "border-b border-line bg-paper/80 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="container-saga flex items-center justify-between py-5">
            <Wordmark light={light} />

            <nav className="hidden items-center gap-9 lg:flex">
              {nav.slice(1).map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`link-underline text-sm tracking-tight transition-colors duration-300 ${
                      light
                        ? active
                          ? "text-cream"
                          : "text-cream/65 hover:text-cream"
                        : active
                          ? "text-ink"
                          : "text-stone-500 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="ml-1 inline-flex items-center rounded-full bg-brown px-5 py-2 text-sm tracking-tight text-cream transition-colors duration-300 hover:bg-brown-deep cursor-pointer"
              >
                Démarrer un projet
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex items-center gap-2 lg:hidden cursor-pointer"
            >
              <span
                className={`font-mono text-xs uppercase tracking-[0.2em] ${
                  light ? "text-cream/70" : "text-stone-500"
                }`}
              >
                Menu
              </span>
              <List
                weight="light"
                className={`size-6 ${light ? "text-cream" : "text-ink"}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] bg-green-deep text-cream"
          >
            <div className="container-saga flex h-full flex-col">
              <div className="flex items-center justify-between py-5">
                <span className="font-display text-2xl tracking-tight text-cream">
                  SAGA
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-powder">
                    Fermer
                  </span>
                  <X weight="light" className="size-6 text-cream" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, ease: EASE, duration: 0.6 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line-invert py-5 font-display text-[clamp(2.25rem,9vw,4.5rem)] font-medium leading-none tracking-tight text-cream transition-colors hover:text-powder"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-1 py-8 font-mono text-xs uppercase tracking-[0.15em] text-powder">
                <a href={site.contact.phoneHref} className="hover:text-cream">
                  {site.contact.phone}
                </a>
                <a href={`mailto:${site.contact.email}`} className="hover:text-cream">
                  {site.contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
