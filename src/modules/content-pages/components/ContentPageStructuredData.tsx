import {
  getContentPageSchemas,
  safeJsonLd,
} from '@/modules/content-pages/lib/content-page-schema';
import type { ContentPageStructuredDataProps } from '@/modules/content-pages/types/content-component-props.types';

export function ContentPageStructuredData(props: ContentPageStructuredDataProps) {
  return (
    <>
      {getContentPageSchemas(props).map((schema, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
        />
      ))}
    </>
  );
}
