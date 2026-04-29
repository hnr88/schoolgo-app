import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAlternateLanguageUrls, getLocalizedPath, siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/parent',
    '/school',
    '/agent',
    '/parent/search',
    '/school/search',
    '/agent/search',
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
