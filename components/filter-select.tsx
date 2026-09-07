"use client";

import { useEffect, useId, useRef } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";

export type Option = { value: string; count: number };

/**
 * Menu déroulant de tri. Un seul menu est ouvert à la fois — le parent tient
 * cet état, ce qui évite d'avoir deux panneaux superposés.
 */
export default function FilterSelect({
  label,
  options,
  value,
  open,
  onOpenChange,
  onSelect,
}: {
  label: string;
  options: Option[];
  /** Valeur retenue sur cet axe, ou null. */
  value: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (value: string | null) => void;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!ref.current?.contains(e.target as Node)) onOpenChange(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onOpenChange(!open)}
        className={`flex w-full items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-left text-sm tracking-tight transition-colors duration-300 cursor-pointer sm:w-auto ${
          value
            ? "border-brown bg-brown text-cream"
            : "border-line text-stone-600 hover:border-line-strong hover:text-ink"
        }`}
      >
        <span className="truncate">
          <span
            className={`font-mono text-[0.58rem] uppercase tracking-[0.16em] ${
              value ? "text-cream/70" : "text-stone-400"
            }`}
          >
            {label}
          </span>
          <span className="ml-2.5">{value ?? "Tous"}</span>
        </span>
        <CaretDown
          weight="bold"
          className={`size-3 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          id={id}
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-[calc(100%+0.5rem)] z-50 max-h-[60vh] w-[min(22rem,calc(100vw-2.5rem))] overflow-y-auto rounded-sm border border-line bg-cream py-1.5 shadow-[0_18px_50px_-20px_rgba(32,33,28,0.45)]"
        >
          <button
            type="button"
            role="option"
            aria-selected={value === null}
            onClick={() => {
              onSelect(null);
              onOpenChange(false);
            }}
            className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-stone-600 transition-colors hover:bg-paper-3 hover:text-ink cursor-pointer"
          >
            Tous
            {value === null && <Check weight="bold" className="size-3.5 text-brown" />}
          </button>

          <div className="my-1.5 h-px bg-line" />

          {options.map((o) => {
            const selected = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={o.count === 0}
                onClick={() => {
                  onSelect(selected ? null : o.value);
                  onOpenChange(false);
                }}
                className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-stone-600 transition-colors hover:bg-paper-3 hover:text-ink disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent cursor-pointer"
              >
                <span className="text-pretty">{o.value}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-[0.62rem] text-stone-400">
                    {o.count}
                  </span>
                  {selected && <Check weight="bold" className="size-3.5 text-brown" />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
