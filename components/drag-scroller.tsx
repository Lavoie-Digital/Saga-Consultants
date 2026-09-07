"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Bande horizontale qu'on attrape à la souris pour la faire défiler.
 *
 * `autoplay` fait avancer la bande lentement toute seule ; combiné à `loop`
 * (le parent duplique alors sa liste), le défilement est sans couture. Le
 * mouvement s'arrête au survol, au focus clavier, pendant le glissé et si
 * l'utilisateur a demandé moins d'animations.
 */
export default function DragScroller({
  children,
  className = "",
  innerClassName = "",
  autoplay = false,
  loop = false,
  /** Vitesse de l'autoplay, en pixels par frame (~60 fps). */
  speed = 0.35,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const down = useRef(false);
  const moved = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const paused = useRef(false);

  /* Ramène le défilement dans la première moitié : la seconde est un clone. */
  const wrap = useCallback(() => {
    const el = ref.current;
    if (!el || !loop) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  }, [loop]);

  /* ---- autoplay ---- */
  useEffect(() => {
    if (!autoplay || reduce) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Normalise sur 60 fps pour que la vitesse ne dépende pas de l'écran.
      const frames = Math.min((now - last) / 16.667, 4);
      last = now;
      if (!paused.current && !down.current) {
        el.scrollLeft += speed * frames;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, reduce, speed, wrap]);

  /* ---- glissé à la souris (le tactile garde le défilement natif) ---- */
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch" || e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    down.current = true;
    moved.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!down.current) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (!moved.current && Math.abs(dx) > 4) {
      moved.current = true;
      el.classList.add("is-dragging");
      el.setPointerCapture?.(e.pointerId);
    }
    if (!moved.current) return;
    el.scrollLeft = startScroll.current - dx;
    wrap();
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!down.current) return;
    down.current = false;
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-dragging");
    if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
    // Le clic qui suit un glissé part avant les timers : il est avalé par
    // onClickCapture, puis ce minuteur relâche le drapeau pour le clic suivant.
    setTimeout(() => (moved.current = false), 0);
  }

  /* Un glissé ne doit pas se terminer en clic sur la vignette du dessous. */
  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (!moved.current) return;
    e.preventDefault();
    e.stopPropagation();
    moved.current = false;
  }

  return (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={`drag-scroll ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      <div className={`flex w-max shrink-0 ${innerClassName}`}>{children}</div>
    </div>
  );
}
