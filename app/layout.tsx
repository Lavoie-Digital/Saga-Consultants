import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

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
  metadataBase: new URL("https://www.sagaconsultants.ca"),
  title: {
    default: "SAGA Consultants — Génie-conseil en structures",
    template: "%s — SAGA Consultants",
  },
  description:
    "Firme de génie-conseil spécialisée en structures. La beauté des solutions simples — conception intégrée, coordination et expertise structurale au Saguenay–Lac-Saint-Jean.",
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
    description: "La beauté des solutions simples.",
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
      className={`${geist.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      <body className="grain min-h-[100dvh] bg-paper text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
