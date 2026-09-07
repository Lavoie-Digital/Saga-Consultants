import "server-only";

import sgMail from "@sendgrid/mail";

/**
 * Envoi de courriels via SendGrid.
 *
 * Tant que `SENDGRID_API_KEY` est absente, `sendEmail` ne lève pas : elle
 * journalise et renvoie `skipped`. Le formulaire de contact continue donc de
 * fonctionner (la demande est enregistrée), et le jour où la clé arrive,
 * l'envoi se met en route sans changer une ligne d'appelant.
 */

const apiKey = process.env.SENDGRID_API_KEY;

export const isEmailConfigured = Boolean(
  apiKey && process.env.SENDGRID_FROM_EMAIL,
);

if (apiKey) sgMail.setApiKey(apiKey);

export type EmailResult = { sent: boolean; skipped?: true; error?: string };

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  /** Gabarit dynamique SendGrid ; s'il est fourni, il remplace subject/text/html. */
  templateId?: string;
  dynamicTemplateData?: Record<string, unknown>;
};

export async function sendEmail(args: SendArgs): Promise<EmailResult> {
  if (!isEmailConfigured) {
    console.info(
      `[email] SENDGRID_API_KEY absente — courriel « ${args.subject} » non envoyé à ${args.to}.`,
    );
    return { sent: false, skipped: true };
  }

  const from = {
    email: process.env.SENDGRID_FROM_EMAIL!,
    name: process.env.SENDGRID_FROM_NAME || "SAGA Consultants",
  };

  try {
    await sgMail.send(
      args.templateId
        ? {
            to: args.to,
            from,
            replyTo: args.replyTo,
            templateId: args.templateId,
            dynamicTemplateData: args.dynamicTemplateData,
          }
        : {
            to: args.to,
            from,
            replyTo: args.replyTo,
            subject: args.subject,
            text: args.text,
            html: args.html ?? `<pre>${escapeHtml(args.text)}</pre>`,
          },
    );
    return { sent: true };
  } catch (err) {
    // Un échec d'envoi ne doit pas faire perdre la demande à l'utilisateur :
    // l'appelant décide quoi en faire.
    console.error("[email] envoi SendGrid en échec", err);
    return { sent: false, error: err instanceof Error ? err.message : "inconnu" };
  }
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
