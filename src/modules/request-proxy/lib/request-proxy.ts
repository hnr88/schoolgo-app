import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { contentStaticRoutes } from '@/modules/content-pages';
import { isNonIndexableHost } from '@/modules/seo';
import {
  COUNTRY_TO_LOCALE,
  PUBLIC_CONTENT_PREFIXES,
  SECURITY_HEADERS,
} from '@/modules/request-proxy/constants/request-proxy.constants';

// Host -> portal resolution lives in portal-resolution.ts (import-light: env
// only) so it can be unit-tested without pulling next-intl navigation through
// this module.
export {
  isTrustedHost,
  resolvePortal,
} from '@/modules/request-proxy/lib/portal-resolution';

function withSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export function withRobotsHeader(
  response: NextResponse,
  hostname: string,
): NextResponse {
  if (isNonIndexableHost(hostname)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return withSecurityHeaders(response);
}

export function isPublicContentPath(path: string) {
  return PUBLIC_CONTENT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function isPublicStaticContentPath(path: string) {
  return contentStaticRoutes.includes(
    path as (typeof contentStaticRoutes)[number],
  );
}

export function detectLocale(request: NextRequest): string {
  const country =
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry');

  if (country) {
    const geoLocale = COUNTRY_TO_LOCALE[country];
    if (geoLocale && routing.locales.includes(geoLocale as (typeof routing.locales)[number])) {
      return geoLocale;
    }
  }

  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return routing.defaultLocale;

  const preferred = acceptLang
    .split(',')
    .map((s) => s.trim().split(';')[0].split('-')[0])
    .find((code) =>
      routing.locales.includes(code as (typeof routing.locales)[number]),
    );

  return preferred ?? routing.defaultLocale;
}
