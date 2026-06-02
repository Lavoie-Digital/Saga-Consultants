import Link from "next/link";
import Image from "next/image";
import { FacebookLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { nav, site } from "@/lib/site";

export default function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-green-deep text-cream">
      <div className="container-saga">
        {/* Big CTA strip */}
        <div className="grid gap-10 border-b border-line-invert py-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow !text-powder">Travaillons ensemble</p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-pretty">
              Un projet de structure ?<br />
              Parlons-en.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-brown px-7 py-4 text-sm font-medium tracking-tight text-cream transition-colors duration-300 hover:bg-brown-light cursor-pointer"
            >
              Nous joindre
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/logo.webp"
              alt="SAGA Consultants"
              width={170}
              height={40}
              className="h-9 w-auto"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-powder">
              {site.shortPitch} {site.tagline}.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow !text-powder">Navigation</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-powder-soft transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow !text-powder">Nous joindre</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-powder-soft">
              <p>
                {site.contact.address}
                <br />
                {site.contact.city}
              </p>
              <p>
                <a
                  href={site.contact.phoneHref}
                  className="transition-colors hover:text-cream"
                >
                  {site.contact.phone}
                </a>
                <br />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-cream"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-10 items-center justify-center rounded-full border border-line-invert transition-colors hover:bg-cream hover:text-green-deep cursor-pointer"
              >
                <LinkedinLogo weight="light" className="size-5" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-line-invert transition-colors hover:bg-cream hover:text-green-deep cursor-pointer"
              >
                <FacebookLogo weight="light" className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-line-invert py-8 font-mono text-xs uppercase tracking-[0.15em] text-powder sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-cream">
              Politique de confidentialité
            </Link>
            <span>{site.contact.region}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
