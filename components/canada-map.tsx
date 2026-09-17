import { CANADA_REGIONS, CANADA_VIEWBOX } from "@/lib/canada-map";

/**
 * Provinces et territoires où SAGA a livré des mandats. L'ordre est celui de
 * l'affichage : le Québec d'abord, c'est le territoire principal.
 */
export const ACTIVE_REGIONS = ["qc", "on", "nl", "nu", "bc"] as const;

export const activeRegionLabels = ACTIVE_REGIONS.map(
  (code) => CANADA_REGIONS.find((r) => r.code === code)!.label,
);

/**
 * Carte du Canada décorative : les territoires desservis sont pleins,
 * les autres restent en filet. Purement illustratif — `aria-hidden`, la
 * liste des territoires est donnée en texte à côté.
 */
export default function CanadaMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={CANADA_VIEWBOX}
      className={className}
      aria-hidden
      focusable="false"
    >
      {CANADA_REGIONS.map((r) => {
        const active = (ACTIVE_REGIONS as readonly string[]).includes(r.code);
        return (
          <path
            key={r.code}
            d={r.d}
            className={
              active
                ? "fill-powder/25 stroke-powder/70"
                : "fill-cream/[0.03] stroke-cream/15"
            }
            strokeWidth={1.5}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
