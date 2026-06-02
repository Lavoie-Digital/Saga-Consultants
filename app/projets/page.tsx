import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ProjectsGallery from "@/components/projects-gallery";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Une sélection de projets structuraux réalisés par SAGA Consultants — multirésidentiel, institutionnel, commercial, industriel, hôtellerie et patrimonial.",
};

export default function ProjetsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projets"
        titleLines={["Structures réalisées"]}
        intro="Du logement à l’institutionnel, chaque projet est une réponse structurale à un programme et à un lieu."
        image="/stock/construction.jpg"
        imageAlt="Charpente d’acier d’un bâtiment en construction avec grues"
      />
      <div className="pt-4 md:pt-8" />
      <ProjectsGallery />
    </>
  );
}
