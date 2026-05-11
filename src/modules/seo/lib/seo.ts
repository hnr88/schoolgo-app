import { routing } from '@/i18n/routing';
import { env } from '@/lib/env';

const DEFAULT_SITE_URL = 'https://schoolgo.com.au';

export const siteUrl = (
  env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
).replace(/\/$/, '');

export function isNonIndexableHost(hostname: string): boolean {
  const normalizedHost = hostname.toLowerCase();
  return (
    normalizedHost === 'localhost' ||
    normalizedHost.endsWith('.localhost') ||
    normalizedHost.startsWith('staging-') ||
    normalizedHost.includes('.staging.') ||
    normalizedHost.includes('-staging.')
  );
}

export function isNonIndexableSite(): boolean {
  try {
    return isNonIndexableHost(new URL(siteUrl).hostname);
  } catch {
    return false;
  }
}

export const robotsPolicy = isNonIndexableSite()
  ? {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    }
  : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    };

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function getLocalizedPath(path: string, locale: string): string {
  const normalizedPath = normalizePath(path);
  if (locale === routing.defaultLocale) return normalizedPath;
  return normalizedPath === '/'
    ? `/${locale}`
    : `/${locale}${normalizedPath}`;
}

export function getCanonicalPath(path: string, locale: string): string {
  return getLocalizedPath(path, locale);
}

export function getAlternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    'x-default': getLocalizedPath(path, routing.defaultLocale),
  };
  for (const locale of routing.locales) {
    languages[locale] = getLocalizedPath(path, locale);
  }
  return languages;
}

export function getAbsoluteUrl(path: string): string {
  return `${siteUrl}${getLocalizedPath(path, routing.defaultLocale)}`;
}

export function getAlternateLanguageUrls(path: string): Record<string, string> {
  return Object.fromEntries(
    Object.entries(getAlternateLanguages(path)).map(([locale, href]) => [
      locale,
      `${siteUrl}${href}`,
    ]),
  );
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SchoolGo',
    url: siteUrl,
    logo: `${siteUrl}/logos/logo-red.png`,
    description:
      'Find and compare the best schools across Australia for international students.',
  };
}

export function faqPageJsonLd(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
