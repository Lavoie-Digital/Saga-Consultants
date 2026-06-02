import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ContactForm from "@/components/contact-form";
import { Reveal } from "@/components/anim";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Joindre SAGA Consultants — 2438, rue Saint-Dominique, Jonquière, QC. Téléphone (581) 222-0225, info@sagaconsultants.ca.",
};

const labelCls =
  "font-mono text-[0.7rem] uppercase tracking-[0.15em] text-stone-500";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        titleLines={["Parlons structure"]}
        intro="Une idée, un mandat, une question technique ? La conversation est le premier livrable."
        image="/stock/building.jpg"
        imageAlt="Tours en structure d’acier et de verre vues en contre-plongée"
      />

      <section className="container-saga py-20 md:py-24">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Coordinates */}
          <div className="md:col-span-4">
            <Reveal>
              <div className="space-y-10">
                <div>
                  <p className={labelCls}>Bureau</p>
                  <address className="mt-3 text-lg not-italic leading-relaxed text-ink">
                    {site.contact.address}
                    <br />
                    {site.contact.city}
                  </address>
                </div>
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

      {/* Map */}
      <section className="container-saga pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-sm border border-line">
            <iframe
              title="Carte — SAGA Consultants, Jonquière"
              src="https://www.google.com/maps?q=2438+rue+Saint-Dominique+Jonqui%C3%A8re+QC&output=embed"
              className="h-[420px] w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
