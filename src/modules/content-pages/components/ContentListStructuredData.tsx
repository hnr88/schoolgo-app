import { siteUrl } from '@/modules/seo';
import type { ContentListStructuredDataProps } from '@/modules/content-pages/types/content-component-props.types';

function safeJson(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function ContentListStructuredData({
  name,
  description,
  href,
  items,
}: ContentListStructuredDataProps) {
  const pageUrl = absoluteUrl(href);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: pageUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SchoolGo',
      url: siteUrl,
    },
    mainEntity: {
      '@type': 'ItemList',
      name,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        description: item.description,
        url: absoluteUrl(item.href),
      })),
    },
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: safeJson(schema) }}
    />
  );
}
