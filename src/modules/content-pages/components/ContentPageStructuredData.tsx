import {
  getContentPageSchemas,
  safeJsonLd,
} from '@/modules/content-pages/lib/content-page-schema';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

interface ContentPageStructuredDataProps {
  page: ContentPage;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
}

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
