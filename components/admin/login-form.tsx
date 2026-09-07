"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { login, type LoginState } from "@/lib/auth-actions";

export default function LoginForm() {
  const params = useSearchParams();
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className="mt-10 flex flex-col gap-4">
      <input type="hidden" name="suite" value={params.get("suite") ?? "/admin"} />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-powder"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="w-full rounded-sm border border-line-invert bg-transparent px-4 py-3 text-base text-cream outline-none transition-colors placeholder:text-powder/50 focus:border-powder"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-brown-light">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-brown px-7 py-3.5 text-sm font-medium tracking-tight text-cream transition-colors hover:bg-brown-light disabled:opacity-60 cursor-pointer"
      >
        {pending ? "Vérification…" : "Entrer"}
      </button>
    </form>
  );
}
