import { Reveal } from "@/components/anim";

/**
 * Repère de sous-section : pastille + libellé court + filet.
 * Volontairement sans numérotation — le libellé seul suffit à se situer.
 */
export default function SectionLabel({
  children,
  tone = "light",
  right,
}: {
  children: React.ReactNode;
  /** `light` = sur fond crème, `dark` = sur fond vert. */
  tone?: "light" | "dark";
  /** Contenu optionnel aligné à droite du filet (lien « voir tout », etc.). */
  right?: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <Reveal>
      <div
        className={`flex items-center justify-between gap-6 border-b pb-5 ${
          dark ? "border-line-invert" : "border-line"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`size-1.5 shrink-0 rounded-full ${
              dark ? "bg-brown-light" : "bg-brown"
            }`}
          />
          <span
            className={`font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] ${
              dark ? "text-brown-light" : "text-brown"
            }`}
          >
            {children}
          </span>
        </div>
        {right}
      </div>
    </Reveal>
  );
}
