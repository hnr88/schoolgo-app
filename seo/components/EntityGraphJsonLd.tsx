import type { Thing, WithContext } from "schema-dts";

import { sanitizeJsonLd } from "@/modules/seo/lib/json-ld";

type EntityGraphJsonLdProps = {
  entities: WithContext<Thing>[];
};

export function EntityGraphJsonLd({ entities }: EntityGraphJsonLdProps) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": entities,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(graph) }}
    />
  );
}
