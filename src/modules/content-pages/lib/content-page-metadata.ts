import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import {
  getCanonicalPath,
  siteUrl,
} from '@/modules/seo';
import {
  CONTENT_PAGE_DEFAULT_IMAGE,
  CONTENT_PAGE_META_DESCRIPTION_LIMIT,
} from '@/modules/content-pages/constants/content-page-metadata.constants';
import type { ContentPageMetadataInput } from '@/modules/content-pages/types/content-page-metadata.types';

function getSeoDescription(description: string) {
  if (description.length <= CONTENT_PAGE_META_DESCRIPTION_LIMIT) return description;
  return `${description.slice(0, CONTENT_PAGE_META_DESCRIPTION_LIMIT - 3).trimEnd()}...`;
}

export function getContentDefaultCanonical(path: string) {
  return getCanonicalPath(path, routing.defaultLocale);
}

export function getContentDefaultLanguages(path: string) {
  const canonical = getContentDefaultCanonical(path);
  return {
    'x-default': canonical,
    [routing.defaultLocale]: canonical,
  };
}

export function getContentPageMetadata({
  page,
  path,
  locale,
  type,
}: ContentPageMetadataInput): Metadata {
  const description = getSeoDescription(page.description);
  const image = page.image || CONTENT_PAGE_DEFAULT_IMAGE;
  const imageUrl = `${siteUrl}${image}`;
  const canonical = getContentDefaultCanonical(path);

  return {
    title: `${page.title} | SchoolGo`,
    description,
    keywords: page.schemaKeywords,
    category: page.eyebrow,
    applicationName: 'SchoolGo',
    authors: [{ name: 'SchoolGo' }],
    publisher: 'SchoolGo',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical,
      languages: getContentDefaultLanguages(path),
    },
    openGraph: {
      title: page.title,
      description,
      url: canonical,
      siteName: 'SchoolGo',
      locale: locale === routing.defaultLocale ? routing.defaultLocale : locale,
      type,
      publishedTime: page.lastReviewed,
      modifiedTime: page.lastReviewed,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: page.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description,
      images: [imageUrl],
    },
    other: {
      'ai-summary': page.aiSummary.answer,
      'content-owner': page.decisionPoints[0]?.owner ?? 'SchoolGo content operations',
      'last-reviewed': page.lastReviewed,
    },
  };
}
