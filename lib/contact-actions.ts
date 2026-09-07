"use server";

import { escapeHtml, sendEmail } from "./email";
import { adminDb, isFirebaseAdminConfigured } from "./firebase/admin";
import { COLLECTIONS } from "./firebase/config";
import { markets, site } from "./site";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, org: 160, message: 4000 };

const clean = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "").trim().slice(0, max);

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Pot de miel : un champ invisible que seuls les robots remplissent.
  if (clean(formData.get("website"), 100)) {
    return { status: "success" };
  }

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email);
  const org = clean(formData.get("org"), MAX.org);
  const message = clean(formData.get("message"), MAX.message);
  const rawMarket = clean(formData.get("market"), 80);
  const market = (markets as readonly string[]).includes(rawMarket)
    ? rawMarket
    : "";

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Veuillez indiquer votre nom.";
  if (!EMAIL_RE.test(email)) errors.email = "Adresse courriel invalide.";
  if (message.length < 10) errors.message = "Décrivez brièvement votre projet.";
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  const inquiry = {
    name,
    email,
    org,
    market,
    message,
    receivedAt: new Date().toISOString(),
  };

  // 1. Conserver la demande. Firestore est la source de vérité : même si
  //    l'envoi du courriel échoue, la demande n'est pas perdue.
  let stored = false;
  if (isFirebaseAdminConfigured) {
    try {
      await adminDb().collection(COLLECTIONS.inquiries).add(inquiry);
      stored = true;
    } catch (err) {
      console.error("Enregistrement de la demande impossible", err);
    }
  }

  // 2. Prévenir l'équipe.
  const lines = [
    `Nom : ${name}`,
    `Courriel : ${email}`,
    org && `Organisation : ${org}`,
    market && `Type de projet : ${market}`,
    "",
    message,
  ].filter(Boolean) as string[];

  const internal = await sendEmail({
    to: process.env.CONTACT_TO_EMAIL || site.contact.email,
    replyTo: email,
    subject: `Demande du site — ${name}${org ? ` (${org})` : ""}`,
    text: lines.join("\n"),
    html: lines.map((l) => `<p>${escapeHtml(l)}</p>`).join(""),
    templateId: process.env.SENDGRID_TEMPLATE_CONTACT_INTERNAL || undefined,
    dynamicTemplateData: inquiry,
  });

  // Aucun canal n'a réellement pris la demande — ni Firestore, ni SendGrid.
  // On préfère l'admettre plutôt que d'afficher un accusé de réception
  // trompeur : sans clés configurées, le message serait perdu en silence.
  if (!stored && !internal.sent) {
    return {
      status: "error",
      message:
        "Nous n’arrivons pas à transmettre votre message pour le moment. " +
        `Écrivez-nous directement à ${site.contact.email}.`,
    };
  }

  // 3. Accuser réception à la personne (un échec ici est sans conséquence :
  //    la demande est déjà entre nos mains).
  await sendEmail({
    to: email,
    subject: "Nous avons bien reçu votre message — SAGA Consultants",
    text:
      `Bonjour ${name},\n\n` +
      "Merci pour votre message. Nous revenons vers vous sous peu pour " +
      "discuter de votre projet de structure.\n\n" +
      `— L’équipe de ${site.name}\n${site.contact.phone}`,
    templateId: process.env.SENDGRID_TEMPLATE_CONTACT_ACK || undefined,
    dynamicTemplateData: inquiry,
  });

  return { status: "success" };
}
