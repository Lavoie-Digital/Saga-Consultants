import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ProjectsGallery from "@/components/projects-gallery";
import { getProjects } from "@/lib/projects-store";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Des centaines de réalisations en génie des structures — multirésidentiel, institutionnel, commercial, industriel, hôtellerie, récréatif et patrimonial.",
};

/* Les projets viennent de Firestore une fois l’espace admin en service :
   on regénère la page au plus tard toutes les 5 minutes, et tout de suite
   après une modification (revalidatePath depuis l’admin). */
export const revalidate = 300;

export default async function ProjetsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Nos accomplissements"
        titleLines={["Structures réalisées"]}
        intro="Avec des centaines de réalisations depuis sa fondation, SAGA a su créer de la valeur pour ses clients dans plusieurs projets dont nous sommes particulièrement fiers. Voici quelques-unes de ces réussites."
        image="/projets/24125/1.webp"
        imageAlt="Complexe Laforest — enveloppe en ossature légère de bois"
      />
      <div className="pt-4 md:pt-8" />
      <ProjectsGallery projects={projects} />
    </>
  );
}
