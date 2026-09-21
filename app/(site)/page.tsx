import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import Manifesto from "@/components/home/manifesto";
import SavoirFaire from "@/components/home/savoir-faire";
import Accomplishments from "@/components/home/accomplishments";
import ParallaxBand from "@/components/parallax-band";

export const metadata: Metadata = {
  // `default` plutôt que le gabarit « %s — SAGA Consultants » : l'accueil
  // porte déjà le nom de l'entreprise.
  title: {
    absolute:
      "SAGA Consultants — Génie-conseil en structures à Saguenay et Lévis",
  },
  description:
    "Firme de génie-conseil spécialisée en structures au Saguenay et à Lévis. Plans et devis, surveillance de chantier, rétrofit structural, bois massif, charpentes d’acier et modulaire volumétrique.",
  alternates: { canonical: "/" },
};

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Hero />

      <div id="la-firme">
        <Manifesto />
      </div>

      {/* Respirations en profondeur : l'image dérive, les sections opaques
          glissent par-dessus. */}
      <ParallaxBand
        src="/bureau/aire-ouverte.webp"
        alt="L’aire de travail ouverte des bureaux de SAGA"
      />

      <SavoirFaire />

      <ParallaxBand
        src="/projets/22015/2.webp"
        alt="Passerelle piétonne du cœur du village de Petit-Saguenay"
      />

      <Accomplishments />
    </>
  );
}
