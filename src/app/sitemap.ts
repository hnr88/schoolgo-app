import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAlternateLanguageUrls, getLocalizedPath, siteUrl } from '@/modules/seo';
import {
  contentCategories,
  contentPages,
  contentSectionRoutes,
  contentStaticRouteMap,
  contentStaticRoutes,
  contentTotalPages,
  getContentHref,
  getContentSectionPageHref,
  getContentSectionPages,
  getContentSectionRootHref,
  getContentStaticRootHref,
} from '@/modules/content-pages';
import { GUIDE_SLUGS } from '@/modules/guides';

function getDefaultContentLanguageUrls(route: string) {
  const url = `${siteUrl}${getLocalizedPath(route, routing.defaultLocale)}`;
  return {
    'x-default': url,
    [routing.defaultLocale]: url,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticContentSlugs = new Set<string>(Object.values(contentStaticRouteMap));
  const sectionContentSlugs = new Set(
    contentSectionRoutes.flatMap((section) =>
      getContentSectionPages(section).map((page) => page.slug),
    ),
  );
  const routedContentSlugs = new Set([
    ...staticContentSlugs,
    ...sectionContentSlugs,
  ]);
  const lastModified = new Date('2026-05-20T00:00:00.000Z');
  const resourcePageRoutes = Array.from(
    { length: contentTotalPages - 1 },
    (_, index) => `/resources/page/${index + 2}`,
  );
  const localizedRoutes = [
    '/',
    '/parent',
    '/school',
    '/agent',
    '/school/search',
    '/agent/search',
    '/search',
    '/guides',
    ...GUIDE_SLUGS.map((slug) => `/guides/${slug}`),
  ];
  const contentRoutes = [
    '/resources',
    ...contentStaticRoutes.map(getContentStaticRootHref),
    ...resourcePageRoutes,
    ...contentCategories.map((category) => `/resources/category/${category.slug}`),
    ...contentPages
      .filter((page) => !routedContentSlugs.has(page.slug))
      .map(getContentHref),
    ...contentSectionRoutes.map(getContentSectionRootHref),
    ...contentSectionRoutes.flatMap((section) =>
      getContentSectionPages(section)
        .filter((page) => !staticContentSlugs.has(page.slug))
        .map(getContentSectionPageHref),
    ),
  ];

  const localizedEntries = localizedRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${getLocalizedPath(route, locale)}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : route.includes('/search') ? 0.6 : 0.8,
      alternates: {
        languages: getAlternateLanguageUrls(route),
      },
    })),
  );

  const contentEntries = contentRoutes.map((route) => ({
    url: `${siteUrl}${getLocalizedPath(route, routing.defaultLocale)}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: getDefaultContentLanguageUrls(route),
    },
  }));

  return [...localizedEntries, ...contentEntries];
}
