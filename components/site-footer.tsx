import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  FacebookLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { offices, site } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-deep text-cream">
      <div className="container-saga">
        {/* Bandeau d'appel — une seule ligne, le gros bloc a été retiré */}
        <div className="flex flex-col gap-5 border-b border-line-invert py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-tight tracking-tight text-cream">
            Un projet de structure ? Parlons-en.
          </p>
          <Link
            href="/contact"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-brown px-7 py-3.5 text-sm font-medium tracking-tight text-cream transition-colors duration-300 hover:bg-brown-light cursor-pointer"
          >
            Nous joindre
            <ArrowRight
              weight="light"
              className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Colonnes — la navigation a été retirée : le bouton ci-dessus la remplace */}
        <div className="grid gap-10 py-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Image
              src="/logo.webp"
              alt="SAGA Consultants"
              width={1500}
              height={559}
              className="h-9 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-powder">
              {site.shortPitch} {site.tagline}.
            </p>
          </div>

          {offices.map((o) => (
            <div key={o.id} className="sm:col-span-1 md:col-span-3">
              <p className="eyebrow !text-powder">{o.city}</p>
              <address className="mt-5 text-sm not-italic leading-relaxed text-powder-soft">
                <a
                  href={o.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {o.address}
                  <br />
                  {o.locality}
                </a>
              </address>
            </div>
          ))}

          <div className="md:col-span-2">
            <p className="eyebrow !text-powder">Nous joindre</p>
            <div className="mt-5 space-y-2 text-sm text-powder-soft">
              <p>
                <a
                  href={site.contact.phoneHref}
                  className="transition-colors hover:text-cream"
                >
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-cream"
                >
                  {site.contact.email}
                </a>
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SAGA Consultants sur LinkedIn"
                className="flex size-10 items-center justify-center rounded-full border border-line-invert transition-colors hover:bg-cream hover:text-green-deep cursor-pointer"
              >
                <LinkedinLogo weight="light" className="size-5" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SAGA Consultants sur Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-line-invert transition-colors hover:bg-cream hover:text-green-deep cursor-pointer"
              >
                <FacebookLogo weight="light" className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="flex flex-col gap-3 border-t border-line-invert py-7 font-mono text-xs uppercase tracking-[0.15em] text-powder sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/politique-de-confidentialite"
              className="transition-colors hover:text-cream"
            >
              Politique de confidentialité
            </Link>
            {/* Accès à l'espace privé — discret, mais volontairement visible
                pour que l'équipe le retrouve sans marque-page. */}
            <Link
              href="/admin"
              className="text-powder/50 transition-colors hover:text-cream"
            >
              Espace privé
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
