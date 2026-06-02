"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { sectors } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full border-b border-line bg-transparent py-3 text-base text-ink outline-none transition-colors duration-300 placeholder:text-stone-400 focus:border-ink";
const labelCls =
  "font-mono text-[0.7rem] uppercase tracking-[0.15em] text-stone-500";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (name.length < 2) e.name = "Veuillez indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Adresse courriel invalide.";
    if (message.length < 10) e.message = "Décrivez brièvement votre projet.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("loading");
    try {
      // Pas de backend connecté — simulation d'envoi.
      await new Promise((r) => setTimeout(r, 1100));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
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
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-mono text-xs uppercase tracking-[0.15em] text-stone-500 underline-offset-4 hover:text-ink hover:underline cursor-pointer"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
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
          <label htmlFor="sector" className={labelCls}>
            Type de projet
          </label>
          <select id="sector" name="sector" defaultValue="" className={field}>
            <option value="" disabled>
              Sélectionner…
            </option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Autre">Autre</option>
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
          disabled={status === "loading"}
          className="group inline-flex items-center gap-3 rounded-full bg-brown px-8 py-4 text-sm font-medium tracking-tight text-cream transition-all duration-300 hover:bg-brown-deep active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {status === "loading" ? (
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
          {status === "error" && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-stone-600"
            >
              Une erreur est survenue. Réessayez ou écrivez-nous directement.
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
