import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://schoolgo.au';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/compare', '/scholarships', '/admissions'];

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}${locale === routing.defaultLocale ? '' : `/${locale}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
  );
}
