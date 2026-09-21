import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects-store";
import { absoluteUrl } from "@/lib/seo";

/* Regénéré aux mêmes intervalles que les pages projets : un projet publié
   depuis /admin apparaît dans le sitemap sans redéploiement. */
export const revalidate = 300;

const STATIC_PAGES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/projets", changeFrequency: "weekly", priority: 0.9 },
  { path: "/equipe", changeFrequency: "monthly", priority: 0.7 },
  { path: "/carrieres", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  {
    path: "/politique-de-confidentialite",
    changeFrequency: "yearly",
    priority: 0.2,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const now = new Date();

  return [
    ...STATIC_PAGES.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projets/${p.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
