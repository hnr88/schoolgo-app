import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAlternateLanguageUrls, getLocalizedPath, siteUrl } from '@/modules/seo';
import {
  contentCategories,
  contentPages,
  contentTotalPages,
  getContentHref,
} from '@/modules/content-pages';
import { GUIDE_SLUGS } from '@/modules/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const resourcePageRoutes = Array.from(
    { length: contentTotalPages - 1 },
    (_, index) => `/resources/page/${index + 2}`,
  );
  const routes = [
    '/',
    '/parent',
    '/school',
    '/agent',
    '/parent/search',
    '/school/search',
    '/agent/search',
    '/search',
    '/guides',
    ...GUIDE_SLUGS.map((slug) => `/guides/${slug}`),
    '/resources',
    '/about',
    '/contact',
    '/admissions',
    '/fees',
    '/student-life',
    ...resourcePageRoutes,
    ...contentCategories.map((category) => `/resources/category/${category.slug}`),
    ...contentPages.map(getContentHref),
  ];

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${getLocalizedPath(route, locale)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : route.includes('/search') ? 0.6 : 0.8,
      alternates: {
        languages: getAlternateLanguageUrls(route),
      },
    })),
  );
}
