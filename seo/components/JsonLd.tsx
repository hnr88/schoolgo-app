import type { Thing, WithContext } from "schema-dts";

import { sanitizeJsonLd } from "@/modules/seo/lib/json-ld";

type JsonLdProps<T extends Thing> = {
  data: WithContext<T>;
};

export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(data) }}
    />
  );
}
