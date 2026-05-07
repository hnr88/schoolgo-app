import type { Thing, WithContext } from "schema-dts";

import { sanitizeJsonLd } from "@/modules/seo/lib/json-ld";

type MultiJsonLdProps = {
  items: WithContext<Thing>[];
};

export function MultiJsonLd({ items }: MultiJsonLdProps) {
  return (
    <>
      {items.map((item, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(item) }}
        />
      ))}
    </>
  );
}
