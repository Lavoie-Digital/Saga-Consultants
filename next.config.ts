import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Visuels de projets téléversés depuis /admin vers Cloud Storage.
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
  experimental: {
    serverActions: {
      // Les images sont déjà réduites dans le navigateur avant l'envoi ;
      // cette marge couvre un lot de plusieurs photos d'un coup.
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
