import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { Reveal } from "@/components/anim";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment SAGA Consultants recueille, utilise, conserve et protège les renseignements personnels transmis par son site web, conformément à la Loi 25.",
};

/* Rédigée pour la Loi 25 (Loi 64) — Loi sur la protection des renseignements
   personnels dans le secteur privé (RLRQ c. P-39.1), dont l'article 8.2 exige
   qu'une entreprise qui recueille des renseignements personnels par un site
   web y publie sa politique de confidentialité en termes simples et clairs.

   À VALIDER PAR SAGA avant mise en ligne : le nom du responsable de la
   protection des renseignements personnels, le délai de conservation retenu
   et la liste réelle des fournisseurs (hébergeur, messagerie). */

const UPDATED = "7 septembre 2026";

/* Par défaut, la loi désigne la personne ayant la plus haute autorité dans
   l'entreprise. À remplacer par la personne effectivement désignée. */
const PRIVACY_OFFICER = {
  title: "Responsable de la protection des renseignements personnels",
  name: "La personne ayant la plus haute autorité chez SAGA Consultants",
};

type Section = { heading: string; body: React.ReactNode };

export default function PrivacyPage() {
  const sections: Section[] = [
    {
      heading: "Ce que couvre cette politique",
      body: (
        <>
          <p>
            La présente politique explique comment {site.name} recueille,
            utilise, communique, conserve et protège les renseignements
            personnels obtenus par l’entremise de son site web. Elle est
            publiée conformément à la <em>Loi sur la protection des
            renseignements personnels dans le secteur privé</em> (Québec),
            telle que modifiée par la Loi 25.
          </p>
          <p>
            Un renseignement personnel est un renseignement qui concerne une
            personne physique et qui, directement ou indirectement, permet de
            l’identifier.
          </p>
        </>
      ),
    },
    {
      heading: "Les renseignements que nous recueillons",
      body: (
        <>
          <p>
            Nous ne recueillons que ce dont nous avons besoin pour répondre à
            votre demande.
          </p>
          <ul>
            <li>
              <strong>Formulaire de contact</strong> — votre nom, votre adresse
              courriel, le nom de votre organisation (facultatif), le type de
              projet et le contenu de votre message.
            </li>
            <li>
              <strong>Candidatures</strong> — les renseignements que vous nous
              transmettez de votre propre initiative par courriel, dont votre
              curriculum vitæ.
            </li>
            <li>
              <strong>Données techniques</strong> — les journaux de connexion
              de notre hébergeur (adresse IP, type de navigateur, pages
              consultées), conservés à des fins de sécurité et de
              fonctionnement du site.
            </li>
          </ul>
          <p>
            Nous n’utilisons pas de témoins (« cookies ») publicitaires, ni de
            profilage, ni d’outil de suivi à des fins de marketing. Aucune
            décision fondée exclusivement sur un traitement automatisé n’est
            prise à votre sujet.
          </p>
        </>
      ),
    },
    {
      heading: "Pourquoi nous les utilisons",
      body: (
        <ul>
          <li>Répondre à votre demande et assurer le suivi de nos échanges.</li>
          <li>Préparer une offre de services ou évaluer un mandat éventuel.</li>
          <li>Traiter une candidature à un poste.</li>
          <li>Assurer la sécurité et le bon fonctionnement du site.</li>
          <li>
            Respecter nos obligations légales, réglementaires et
            professionnelles.
          </li>
        </ul>
      ),
    },
    {
      heading: "Votre consentement",
      body: (
        <p>
          En nous transmettant vos renseignements par le formulaire de contact
          ou par courriel, vous consentez à ce que nous les utilisions aux fins
          décrites ci-dessus. Vous pouvez retirer votre consentement en tout
          temps en nous écrivant ; nous cesserons alors d’utiliser vos
          renseignements, sous réserve de nos obligations légales de
          conservation.
        </p>
      ),
    },
    {
      heading: "À qui nous les communiquons",
      body: (
        <>
          <p>
            Nous ne vendons ni ne louons vos renseignements personnels. Nous ne
            les communiquons qu’aux personnes qui en ont besoin :
          </p>
          <ul>
            <li>
              les membres de notre équipe concernés par votre demande ou votre
              candidature ;
            </li>
            <li>
              nos fournisseurs techniques (hébergement du site et service de
              messagerie), liés par des engagements de confidentialité et
              autorisés à traiter les renseignements uniquement pour nous
              rendre service ;
            </li>
            <li>
              toute autorité à qui la loi nous oblige à les communiquer.
            </li>
          </ul>
          <p>
            Certains de ces fournisseurs peuvent héberger des renseignements à
            l’extérieur du Québec. Le cas échéant, nous procédons à l’évaluation
            des facteurs relatifs à la vie privée exigée par la loi avant toute
            communication hors Québec.
          </p>
        </>
      ),
    },
    {
      heading: "Liens vers des sites tiers",
      body: (
        <p>
          Notre site contient des liens vers des services externes, notamment
          Google Maps et nos pages de réseaux sociaux. Lorsque vous suivez un
          de ces liens, vous quittez notre site et les pratiques de
          confidentialité du service concerné s’appliquent. Nous n’intégrons
          pas ces services directement dans nos pages.
        </p>
      ),
    },
    {
      heading: "Conservation et destruction",
      body: (
        <p>
          Nous conservons vos renseignements uniquement le temps nécessaire aux
          fins pour lesquelles ils ont été recueillis, puis nous les détruisons
          de façon sécuritaire ou nous les anonymisons. Les demandes qui ne
          mènent pas à un mandat sont détruites une fois le suivi terminé ; les
          dossiers liés à un mandat sont conservés selon les exigences légales,
          contractuelles et professionnelles applicables au génie-conseil.
        </p>
      ),
    },
    {
      heading: "Comment nous les protégeons",
      body: (
        <p>
          Nous appliquons des mesures de sécurité raisonnables et adaptées à la
          sensibilité des renseignements : accès restreint aux personnes
          autorisées, comptes protégés par mot de passe, chiffrement des
          échanges avec le site et sauvegardes. Advenant un incident de
          confidentialité présentant un risque de préjudice sérieux, nous
          aviserons les personnes concernées et la Commission d’accès à
          l’information, comme la loi l’exige, et l’incident sera consigné à
          notre registre.
        </p>
      ),
    },
    {
      heading: "Vos droits",
      body: (
        <>
          <p>Vous avez le droit :</p>
          <ul>
            <li>d’accéder aux renseignements personnels que nous détenons sur vous ;</li>
            <li>d’en demander la rectification s’ils sont inexacts, incomplets ou équivoques ;</li>
            <li>d’en demander la suppression lorsque leur conservation n’est plus justifiée ;</li>
            <li>de retirer votre consentement à leur utilisation ;</li>
            <li>
              de porter plainte auprès de la Commission d’accès à l’information
              du Québec si vous êtes insatisfait de notre réponse.
            </li>
          </ul>
          <p>
            Nous répondons aux demandes dans les 30 jours suivant leur
            réception. Nous pouvons devoir vérifier votre identité avant de
            donner suite.
          </p>
        </>
      ),
    },
    {
      heading: "Nous joindre",
      body: (
        <>
          <p>
            Pour exercer vos droits ou pour toute question sur cette politique,
            écrivez à notre {PRIVACY_OFFICER.title.toLowerCase()} :
          </p>
          <p>
            {PRIVACY_OFFICER.name}
            <br />
            {site.name}
            <br />
            {offices[0].address}, {offices[0].locality}
            <br />
            <a
              href={`mailto:${site.contact.email}`}
              className="link-underline text-ink"
            >
              {site.contact.email}
            </a>
            {" · "}
            <a href={site.contact.phoneHref} className="link-underline text-ink">
              {site.contact.phone}
            </a>
          </p>
        </>
      ),
    },
    {
      heading: "Modifications",
      body: (
        <p>
          Nous pouvons modifier cette politique pour tenir compte de
          l’évolution de nos pratiques ou de la loi. La version en vigueur est
          toujours celle publiée sur cette page, avec sa date de mise à jour.
        </p>
      ),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        titleLines={["Politique de confidentialité"]}
        intro="Ce que nous recueillons, pourquoi, pendant combien de temps — et comment reprendre la main sur vos renseignements."
        image="/bureau/mur-saga.webp"
        imageAlt="L’enseigne SAGA sur le mur de bois du bureau"
      />

      <section className="container-saga py-16 md:py-24">
        <Reveal>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-stone-400">
            Dernière mise à jour — {UPDATED}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-8 md:col-start-3">
            <div className="flex flex-col">
              {sections.map((s, i) => (
                <Reveal key={s.heading} delay={0.03}>
                  <article
                    className={`border-t border-line py-9 ${
                      i === sections.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <h2 className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-tight tracking-tight text-ink">
                      {s.heading}
                    </h2>
                    <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-stone-600 [&_a]:text-ink [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                      {s.body}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
