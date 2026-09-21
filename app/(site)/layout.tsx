import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import JsonLd from "@/components/json-ld";
import { organizationGraph } from "@/lib/seo";

/**
 * Habillage du site public. L'espace privé (/admin) a le sien, ce qui évite
 * que l'en-tête fixe du site vienne se superposer à celui de l'administration.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Entreprise, bureaux et catalogue de services — présents sur toutes
          les pages publiques, jamais sur l'espace privé. */}
      <JsonLd data={organizationGraph()} />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
