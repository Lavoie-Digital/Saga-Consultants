import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Squared industrial grotesque for display — engineering, not abstract.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  // Même source que le sitemap et les canonicals, pour qu'ils ne
  // divergent jamais entre le local et la production.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SAGA Consultants — Génie-conseil en structures",
    template: "%s — SAGA Consultants",
  },
  description:
    "Firme de génie-conseil spécialisée en structures. Nous considérons l’ensemble d’un projet, pas seulement nos feuilles de calcul, pour maximiser notre valeur ajoutée. Bureaux à Saguenay et à Lévis.",
  keywords: [
    "génie-conseil",
    "ingénierie structurale",
    "structures",
    "Saguenay",
    "Jonquière",
    "conception intégrée",
    "expertise structurale",
  ],
  openGraph: {
    title: "SAGA Consultants — Génie-conseil en structures",
    description: "Un savoir-faire qui va au-delà des plans.",
    locale: "fr_CA",
    type: "website",
    siteName: "SAGA Consultants",
  },
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr-CA"
      // Le défilement doux est voulu pour les ancres, pas pour les changements
      // de route — cet attribut dit à Next.js de le neutraliser à la navigation.
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      {/* Le layout racine ne pose que la page : l'en-tête et le pied de page
          publics appartiennent au groupe (site), pas à l'espace privé. */}
      <body className="grain min-h-[100dvh] bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
