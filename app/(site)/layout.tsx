import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

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
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
