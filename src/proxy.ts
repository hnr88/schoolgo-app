import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { env } from '@/lib/env';
import { isNonIndexableHost } from '@/modules/seo';

const LAUNCHING_SOON = env.NEXT_PUBLIC_LAUNCHING_SOON === 'true';

function extractHost(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const agentHost = extractHost(env.NEXT_PUBLIC_AGENT_URL);
const schoolHost = extractHost(env.NEXT_PUBLIC_SCHOOL_URL);

function resolvePortal(hostname: string): 'agent' | 'school' | 'parent' {
  if (agentHost && hostname === agentHost) return 'agent';
  if (schoolHost && hostname === schoolHost) return 'school';
  return 'parent';
}

const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://picsum.photos https://images.unsplash.com https://staging-api.schoolgo.com.au https://api.schoolgo.com.au https://*.schoolgo.com.au https://*.tile.openstreetmap.org",
    "font-src 'self' data:",
    "connect-src 'self' https://staging-api.schoolgo.com.au https://api.schoolgo.com.au https://nominatim.openstreetmap.org https://*.tile.openstreetmap.org",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

function withSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

function withRobotsHeader(response: NextResponse, hostname: string): NextResponse {
  if (isNonIndexableHost(hostname)) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return withSecurityHeaders(response);
}

const KNOWN_HOSTS = new Set<string>(
  [agentHost, schoolHost, extractHost(env.NEXT_PUBLIC_PARENT_URL)].filter(
    (h): h is string => h !== null,
  ),
);

function isTrustedHost(hostname: string): boolean {
  if (KNOWN_HOSTS.size === 0) return true;
  if (KNOWN_HOSTS.has(hostname)) return true;
  if (hostname.endsWith('.localhost') || hostname === 'localhost') return true;
  return false;
}

const COUNTRY_TO_LOCALE: Record<string, string> = {
  CN: 'zh',
  TW: 'zh',
  HK: 'zh',
  KR: 'ko',
  MY: 'ms',
  SG: 'ms',
  VN: 'vi',
  TH: 'th',
};

const PUBLIC_CONTENT_PREFIXES = [
  'admissions',
  'fees',
  'international',
  'curriculum',
  'student-life',
  'boarding',
  'partners',
  'school-solutions',
  'events',
  'pathways',
  'company',
  'school-search',
] as const;

function isPublicContentPath(path: string) {
  return PUBLIC_CONTENT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function detectLocale(request: NextRequest): string {
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
  if (acceptLang) {
    const preferred = acceptLang
      .split(',')
      .map((s) => s.trim().split(';')[0].split('-')[0])
      .find((code) =>
        routing.locales.includes(code as (typeof routing.locales)[number]),
      );
    if (preferred) return preferred;
  }

  return routing.defaultLocale;
}

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const rawHost = (forwardedHost && isTrustedHost(forwardedHost.split(':')[0]))
    ? forwardedHost
    : request.headers.get('host') ?? '';
  const hostname = rawHost.split(':')[0];
  const portal = resolvePortal(hostname);

  if (LAUNCHING_SOON) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;
    const segments = pathname.split('/').filter(Boolean);

    if (segments.includes('launching-soon')) {
      return withRobotsHeader(NextResponse.next(), hostname);
    }

    const maybeLocale = segments[0];
    const hasLocale =
      maybeLocale !== undefined &&
      routing.locales.includes(maybeLocale as (typeof routing.locales)[number]);
    const locale = hasLocale ? maybeLocale : routing.defaultLocale;
    url.pathname = `/${locale}/launching-soon`;
    return withRobotsHeader(NextResponse.redirect(url), hostname);
  }

  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale =
    maybeLocale !== undefined &&
    routing.locales.includes(maybeLocale as (typeof routing.locales)[number]);

  if (!hasLocale) {
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
    const preferredLocale = localeCookie ?? detectLocale(request);

    if (preferredLocale !== routing.defaultLocale) {
      url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`;
      return withRobotsHeader(NextResponse.redirect(url), hostname);
    }
  }

  const locale = hasLocale ? maybeLocale : routing.defaultLocale;

  const isRootPath = hasLocale ? segments.length === 1 : pathname === '/';
  const loggedInPortal = request.cookies.get('schoolgo-logged-in')?.value;

  if (loggedInPortal && isRootPath && loggedInPortal === portal) {
    url.pathname = `/${locale}/dashboard`;
    return withRobotsHeader(NextResponse.redirect(url), hostname);
  }

  const pathAfterLocale = hasLocale ? segments.slice(1).join('/') : pathname.replace(/^\//, '');
  if (pathAfterLocale === 'launching-soon') {
    url.pathname = `/${locale}/launching-soon`;
    return withRobotsHeader(NextResponse.rewrite(url), hostname);
  }

  if (pathAfterLocale === 'search') {
    if (!hasLocale) {
      url.pathname = `/${locale}/search`;
      return withRobotsHeader(NextResponse.rewrite(url), hostname);
    }
    return withRobotsHeader(NextResponse.next(), hostname);
  }

  if (pathAfterLocale === 'guides' || pathAfterLocale.startsWith('guides/')) {
    if (!hasLocale) {
      url.pathname = `/${locale}/${pathAfterLocale}`;
      return withRobotsHeader(NextResponse.rewrite(url), hostname);
    }
    return withRobotsHeader(NextResponse.next(), hostname);
  }

  if (
    pathAfterLocale === 'resources' ||
    pathAfterLocale.startsWith('resources/') ||
    ['about', 'contact'].includes(pathAfterLocale) ||
    isPublicContentPath(pathAfterLocale)
  ) {
    if (!hasLocale) {
      url.pathname = `/${locale}/${pathAfterLocale}`;
      return withRobotsHeader(NextResponse.rewrite(url), hostname);
    }
    return withRobotsHeader(NextResponse.next(), hostname);
  }

  const isPortalSearchPath = pathAfterLocale === `${portal}/search`;
  if (loggedInPortal && loggedInPortal === portal && isPortalSearchPath) {
    url.pathname = `/${locale}/dashboard/search`;
    return withRobotsHeader(NextResponse.redirect(url), hostname);
  }

  if (hasLocale) {
    const [, second, ...rest] = segments;
    if (second !== portal) {
      const restPath = rest.length > 0 ? `/${rest.join('/')}` : '';
      url.pathname = `/${locale}/${portal}${second ? `/${second}` : ''}${restPath}`;
    }
  } else {
    const cleanPath = pathname === '/' ? '' : pathname;
    if (segments[0] === portal) {
      url.pathname = `/${locale}${cleanPath}`;
    } else {
      url.pathname = `/${locale}/${portal}${cleanPath}`;
    }
  }

  return withRobotsHeader(NextResponse.rewrite(url), hostname);
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
};
