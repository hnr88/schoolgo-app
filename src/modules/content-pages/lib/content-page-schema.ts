import { siteUrl } from '@/modules/seo';
import { getContentHref } from '@/modules/content-pages/data/content-pages';
import type { ContentPage } from '@/modules/content-pages/types/content-pages.types';

interface ContentPageSchemaInput {
  page: ContentPage;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
}

function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function safeJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

export function getContentPageSchemas({
  page,
  getPageHref = getContentHref,
  getCategoryHref = (categorySlug) => `/resources/category/${categorySlug}`,
}: ContentPageSchemaInput): Record<string, unknown>[] {
  const pageUrl = absoluteUrl(getPageHref(page));
  const categoryUrl = absoluteUrl(getCategoryHref(page.category));
  const image = {
    '@type': 'ImageObject',
    url: absoluteUrl(page.image),
    caption: page.imageAlt,
  };

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: pageUrl,
      isPartOf: { '@type': 'WebSite', name: 'SchoolGo', url: siteUrl },
      primaryImageOfPage: image,
      audience: { '@type': 'Audience', audienceType: page.audience },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#proof'] },
      significantLink: page.actionPaths.map((path) => absoluteUrl(path.href)),
      mentions: page.aiSummary.entities.map((entity) => ({ '@type': 'Thing', name: entity })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title,
      name: page.title,
      description: page.description,
      image: absoluteUrl(page.image),
      dateModified: page.lastReviewed,
      mainEntityOfPage: pageUrl,
      keywords: page.schemaKeywords.join(', '),
      publisher: { '@type': 'Organization', name: 'SchoolGo', url: siteUrl },
      about: page.searchSignals.map((signal) => ({
        '@type': 'Thing',
        name: signal.label,
        description: signal.value,
      })),
      abstract: page.aiSummary.answer,
      hasPart: page.decisionPoints.map((point) => ({
        '@type': 'WebPageElement',
        name: point.title,
        description: `${point.summary} Owner: ${point.owner}. Evidence: ${point.evidence}`,
        url: point.href ? absoluteUrl(point.href) : pageUrl,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: page.eyebrow, item: categoryUrl },
        { '@type': 'ListItem', position: 3, name: page.title, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: `${page.title} entity signals`,
      hasDefinedTerm: page.searchSignals.map((signal) => ({
        '@type': 'DefinedTerm',
        name: signal.label,
        description: signal.value,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: page.title,
      description: page.subtitle,
      step: page.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.description,
        url: step.href ? absoluteUrl(step.href) : pageUrl,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${page.title} action paths`,
      itemListElement: page.actionPaths.map((path, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: path.label,
        description: path.description,
        url: absoluteUrl(path.href),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${page.title} proof points`,
      itemListElement: page.proofPoints.map((point, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: point.label,
        description: `${point.detail} Confidence: ${point.confidence}`,
        url: point.href ? absoluteUrl(point.href) : pageUrl,
      })),
    },
  ];
}
