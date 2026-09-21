/**
 * Injecte un bloc JSON-LD.
 *
 * `<` est échappé : sans ça, une chaîne contenant « </script> » — un titre de
 * projet saisi depuis /admin, par exemple — fermerait la balise et permettrait
 * d'injecter du code dans la page.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
