"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { saveProject, type ActionState } from "@/lib/admin-actions";
import type { StoredProject } from "@/lib/projects-store";
import { expertiseLabels, markets, serviceLabels } from "@/lib/site";

const field =
  "w-full rounded-sm border border-line bg-cream px-4 py-2.5 text-base text-ink outline-none transition-colors focus:border-brown";
const labelCls =
  "font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-500";

/** Réduit une image dans le navigateur avant l'envoi. */
const MAX_EDGE = 2000;
const WEBP_QUALITY = 0.82;

async function downscale(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
    );
    if (!blob) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    // Format exotique ou navigateur récalcitrant : on envoie l'original,
    // le serveur refusera s'il est trop lourd.
    return file;
  }
}

function CheckGroup({
  legend,
  name,
  options,
  selected,
}: {
  legend: string;
  name: string;
  options: readonly string[];
  selected: string[];
}) {
  return (
    <fieldset>
      <legend className={labelCls}>{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            className="cursor-pointer rounded-full border border-line px-3.5 py-1.5 text-sm text-stone-600 transition-colors has-[:checked]:border-brown has-[:checked]:bg-brown has-[:checked]:text-cream"
          >
            <input
              type="checkbox"
              name={name}
              value={o}
              defaultChecked={selected.includes(o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ProjectForm({ project }: { project?: StoredProject }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    saveProject,
    {},
  );

  const existing = project
    ? [project.image, ...(project.gallery ?? [])].filter(Boolean)
    : [];
  const [removed, setRemoved] = useState<string[]>([]);
  const [pickedNames, setPickedNames] = useState<string[]>([]);
  const filesRef = useRef<File[]>([]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const chosen = Array.from(e.target.files ?? []);
    filesRef.current = await Promise.all(chosen.map(downscale));
    setPickedNames(filesRef.current.map((f) => f.name));
    // Le champ natif garde les fichiers d'origine : on soumet nos versions
    // réduites à la place, via submitWithFiles.
    e.target.value = "";
  }

  function submitWithFiles(formData: FormData) {
    formData.delete("newImages");
    for (const f of filesRef.current) formData.append("newImages", f);
    return formAction(formData);
  }

  const kept = existing.filter((u) => !removed.includes(u));

  return (
    <form action={submitWithFiles} className="flex flex-col gap-10">
      {project?.id && <input type="hidden" name="id" value={project.id} />}
      {kept.map((u) => (
        <input key={u} type="hidden" name="existingImage" value={u} />
      ))}
      {removed.map((u) => (
        <input key={u} type="hidden" name="removeImage" value={u} />
      ))}

      {state.error && (
        <p
          role="alert"
          className="rounded-sm border border-brown/40 bg-brown/5 px-5 py-3 text-sm text-ink"
        >
          {state.error}
        </p>
      )}

      {/* Identité */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className={labelCls}>Nom du projet *</span>
          <input
            name="title"
            required
            defaultValue={project?.title}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Client</span>
          <input name="client" defaultValue={project?.client} className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>N° de dossier SAGA</span>
          <input name="no" defaultValue={project?.no} className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Localisation</span>
          <input
            name="location"
            defaultValue={project?.location}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Année</span>
          <input
            name="year"
            inputMode="numeric"
            defaultValue={project?.year}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Budget de construction</span>
          <input
            name="budget"
            placeholder="12 M$"
            defaultValue={project?.budget}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Adresse web</span>
          <input
            name="slug"
            placeholder="généré à partir du nom"
            defaultValue={project?.slug}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className={labelCls}>Description sommaire</span>
          <textarea
            name="description"
            rows={5}
            defaultValue={project?.description}
            className={`${field} resize-y`}
          />
        </label>
      </div>

      {/* Classement */}
      <div className="flex flex-col gap-7 border-t border-line pt-8">
        <CheckGroup
          legend="Types de marchés"
          name="markets"
          options={markets}
          selected={project?.markets ?? []}
        />
        <CheckGroup
          legend="Types de services"
          name="services"
          options={serviceLabels}
          selected={project?.services ?? []}
        />
        <CheckGroup
          legend="Expertises impliquées"
          name="expertises"
          options={expertiseLabels}
          selected={project?.expertises ?? []}
        />
      </div>

      {/* Photos */}
      <div className="border-t border-line pt-8">
        <p className={labelCls}>Photos</p>
        <p className="mt-2 text-sm text-stone-500">
          La première photo sert de visuel principal. Les images sont réduites
          automatiquement avant l’envoi.
        </p>

        {kept.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {kept.map((url, i) => (
              <div
                key={url}
                className="group relative aspect-square overflow-hidden rounded-sm bg-paper-2"
              >
                <Image src={url} alt="" fill sizes="20vw" className="object-cover" />
                {i === 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-green-deep px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cream">
                    Principale
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setRemoved((r) => [...r, url])}
                  className="absolute inset-x-0 bottom-0 bg-ink/80 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cream opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="mt-5 flex w-fit cursor-pointer items-center gap-3 rounded-full border border-line px-5 py-2.5 text-sm text-stone-600 transition-colors hover:border-brown hover:text-ink">
          Ajouter des photos
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onPick}
            className="sr-only"
          />
        </label>
        {pickedNames.length > 0 && (
          <p className="mt-3 text-sm text-stone-500">
            {pickedNames.length} photo{pickedNames.length > 1 ? "s" : ""} prête
            {pickedNames.length > 1 ? "s" : ""} à téléverser :{" "}
            {pickedNames.join(", ")}
          </p>
        )}
      </div>

      {/* Publication */}
      <div className="flex flex-wrap items-center gap-8 border-t border-line pt-8">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project ? project.published : false}
            className="size-4 accent-[var(--color-brown)]"
          />
          Publier sur le site
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured ?? false}
            className="size-4 accent-[var(--color-brown)]"
          />
          Mettre en avant sur l’accueil
        </label>
      </div>

      <div className="flex items-center gap-6 border-t border-line pt-8">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-brown px-7 py-3.5 text-sm font-medium tracking-tight text-cream transition-colors hover:bg-brown-deep disabled:opacity-60 cursor-pointer"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        <Link href="/admin" className="link-underline text-sm text-stone-500">
          Annuler
        </Link>
      </div>
    </form>
  );
}
