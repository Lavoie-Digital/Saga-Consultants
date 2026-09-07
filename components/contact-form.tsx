"use client";

import Link from "next/link";
import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { submitInquiry, type ContactState } from "@/lib/contact-actions";
import { markets } from "@/lib/site";

const field =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-stone-400 focus:border-ink";
const labelCls =
  "font-mono text-[0.7rem] uppercase tracking-[0.15em] text-stone-500";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitInquiry,
    { status: "idle" },
  );
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-5 rounded-sm border border-line bg-paper-2 p-10"
      >
        <CheckCircle weight="light" className="size-12 text-ink" />
        <div>
          <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
            Message envoyé.
          </h3>
          <p className="mt-2 max-w-sm text-pretty text-base leading-relaxed text-stone-600">
            Merci. Nous revenons vers vous sous peu pour discuter de votre
            projet de structure.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {/* Pot de miel — invisible pour les humains, tentant pour les robots. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelCls}>
            Nom *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Votre nom"
            className={field}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="text-xs text-stone-600">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelCls}>
            Courriel *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            className={field}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-xs text-stone-600">{errors.email}</span>
          )}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="org" className={labelCls}>
            Organisation
          </label>
          <input
            id="org"
            name="org"
            type="text"
            autoComplete="organization"
            placeholder="Entreprise (facultatif)"
            className={field}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="market" className={labelCls}>
            Type de projet
          </label>
          <select id="market" name="market" defaultValue="" className={field}>
            <option value="" disabled>
              Sélectionner…
            </option>
            {markets.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelCls}>
          Votre projet *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Quelques mots sur votre projet, son échéancier et sa localisation."
          className={`${field} resize-none`}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="text-xs text-stone-600">{errors.message}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-3 rounded-full bg-brown px-8 py-4 text-sm font-medium tracking-tight text-cream transition-all duration-300 hover:bg-brown-deep active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {pending ? (
            <>
              <CircleNotch weight="bold" className="size-4 animate-spin" />
              Envoi…
            </>
          ) : (
            <>
              Envoyer le message
              <span aria-hidden>→</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {state.message && (
            <motion.span
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-sm text-sm text-stone-600"
            >
              {state.message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Loi 25 — l'usage des renseignements doit être annoncé au point de collecte. */}
      <p className="max-w-md text-xs leading-relaxed text-stone-400">
        Les renseignements transmis servent uniquement à répondre à votre
        demande. Voir notre{" "}
        <Link
          href="/politique-de-confidentialite"
          className="link-underline text-stone-500"
        >
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}
