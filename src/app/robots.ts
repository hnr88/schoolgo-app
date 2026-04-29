import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { isNonIndexableHost, isNonIndexableSite, siteUrl } from '@/lib/seo';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  const rawHost =
    requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const hostname = rawHost?.split(':')[0] ?? '';

  if (isNonIndexableSite() || isNonIndexableHost(hostname)) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
