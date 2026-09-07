import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/page-hero";
import ContactForm from "@/components/contact-form";
import SectionLabel from "@/components/section-label";
import QuebecMap from "@/components/quebec-map";
import { Reveal } from "@/components/anim";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nous joindre",
  description:
    "Joindre SAGA Consultants — bureaux de Saguenay et de Lévis. Téléphone (581) 222-0225, info@sagaconsultants.ca.",
};

const labelCls =
  "font-mono text-[0.7rem] uppercase tracking-[0.15em] text-stone-500";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Nous joindre"
        titleLines={["Parlons structure"]}
        intro="Une idée, un mandat, une question technique ? La conversation est le premier livrable."
        image="/bureau/facade-bureau.webp"
        imageAlt="La façade du bureau de SAGA Consultants"
      />

      <section className="container-saga py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          {/* Coordinates */}
          <div className="md:col-span-4">
            <Reveal>
              <div className="space-y-10">
                <div>
                  <p className={labelCls}>Téléphone</p>
                  <a
                    href={site.contact.phoneHref}
                    className="link-underline mt-3 inline-block text-lg text-ink"
                  >
                    {site.contact.phone}
                  </a>
                </div>
                <div>
                  <p className={labelCls}>Courriel</p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-underline mt-3 inline-block text-lg text-ink"
                  >
                    {site.contact.email}
                  </a>
                </div>
                <div>
                  <p className={labelCls}>Heures</p>
                  <p className="mt-3 text-lg leading-relaxed text-ink">
                    Lun – Ven
                    <br />
                    <span className="text-stone-500">8 h 00 – 17 h 00</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bureaux — carte cliquable vers l'épingle Google Maps */}
      <section className="container-saga pb-24">
        <SectionLabel>Nos bureaux</SectionLabel>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="md:col-span-6">
            <Reveal>
              <div className="flex flex-col divide-y divide-line border-y border-line">
                {offices.map((o) => (
                  <a
                    key={o.id}
                    href={o.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-6 py-7"
                  >
                    <div>
                      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                        {o.city}
                      </h2>
                      <address className="mt-2 text-base not-italic leading-relaxed text-stone-600">
                        {o.address}
                        <br />
                        {o.locality}
                      </address>
                    </div>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-stone-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-brown group-hover:bg-brown group-hover:text-cream">
                      <ArrowUpRight weight="light" className="size-5" />
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-sm text-stone-400">
                Cliquez sur un bureau — ou sur son épingle — pour l’ouvrir dans
                Google Maps.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-6">
            <Reveal delay={0.05}>
              <QuebecMap className="mx-auto h-auto w-full max-w-md" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
