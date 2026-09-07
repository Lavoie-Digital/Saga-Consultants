"use client";

import { deleteProject } from "@/lib/admin-actions";

/**
 * La suppression retire aussi les photos du projet dans Storage : on demande
 * confirmation avant d'envoyer le formulaire.
 */
export default function DeleteProjectButton({
  id,
  slug,
  title,
}: {
  id: string;
  slug: string;
  title: string;
}) {
  return (
    <form
      action={deleteProject}
      onSubmit={(e) => {
        const ok = window.confirm(
          `Supprimer « ${title} » ? Les photos du projet seront effacées. Cette action est définitive.`,
        );
        if (!ok) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        className="link-underline text-sm text-stone-400 hover:text-brown cursor-pointer"
      >
        Supprimer
      </button>
    </form>
  );
}
