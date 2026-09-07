import { CANADA_REGIONS } from "@/lib/canada-map";
import { offices, QUEBEC_VIEWBOX } from "@/lib/site";

const quebec = CANADA_REGIONS.find((r) => r.code === "qc")!;

/**
 * Petite carte du Québec avec nos deux bureaux. Chaque épingle est un lien
 * vers l'emplacement dans Google Maps.
 */
export default function QuebecMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={QUEBEC_VIEWBOX}
      className={className}
      role="img"
      aria-label="Carte du Québec situant les bureaux de Saguenay et de Lévis"
    >
      <path
        d={quebec.d}
        className="fill-paper-3 stroke-line-strong"
        strokeWidth={1}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {offices.map((o, i) => {
        // Les deux bureaux sont proches : on écarte les étiquettes verticalement.
        const above = i === 0;
        return (
          <a
            key={o.id}
            href={o.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer"
          >
            <title>{`${o.city} — ouvrir dans Google Maps`}</title>
            {/* Halo au survol */}
            <circle
              cx={o.pin.x}
              cy={o.pin.y}
              r={11}
              className="fill-brown/0 transition-[fill] duration-300 group-hover:fill-brown/20"
            />
            <circle
              cx={o.pin.x}
              cy={o.pin.y}
              r={4}
              className="fill-brown transition-[r] duration-300"
            />
            <text
              x={o.pin.x + 12}
              y={o.pin.y + (above ? -8 : 16)}
              className="fill-ink font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 group-hover:fill-brown"
            >
              {o.city}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
