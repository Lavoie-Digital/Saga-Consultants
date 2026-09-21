import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "SAGA Consultants — génie-conseil en structures, Saguenay et Lévis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image de partage par défaut (réseaux sociaux, aperçus de lien).
 * Les fiches de projet ont la leur : leur `generateMetadata` déclare la photo
 * du projet, qui prend le dessus sur celle-ci.
 *
 * Pas de police personnalisée ici : `ImageResponse` devrait charger le
 * fichier à chaque rendu, alors que la valeur ajoutée sur une image de
 * partage est faible. On reste sur la pile système.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#234a3e",
          padding: "72px 80px",
          color: "#f1ece1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#b7c8bc",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#927152",
            }}
          />
          Génie-conseil · Structures
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            SAGA CONSULTANTS
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.3,
              color: "#d3ddd2",
              maxWidth: 900,
            }}
          >
            {site.tagline}.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(241,236,225,0.22)",
            paddingTop: 28,
            fontSize: 24,
            color: "#b7c8bc",
          }}
        >
          <div style={{ display: "flex" }}>Saguenay · Lévis</div>
          <div style={{ display: "flex" }}>sagaconsultants.ca</div>
        </div>
      </div>
    ),
    size,
  );
}
