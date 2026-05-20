import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { env } from '@/lib/env';
import { contentStaticRoutes } from '@/modules/content-pages';
import { isNonIndexableHost } from '@/modules/seo';
import {
  COUNTRY_TO_LOCALE,
  PUBLIC_CONTENT_PREFIXES,
  SECURITY_HEADERS,
} from '@/modules/request-proxy/constants/request-proxy.constants';
import type { RequestPortal } from '@/modules/request-proxy/types/request-proxy.types';

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
const parentHost = extractHost(env.NEXT_PUBLIC_PARENT_URL);
const knownHosts = new Set<string>(
  [agentHost, schoolHost, parentHost].filter((host): host is string => host !== null),
);

export function resolvePortal(hostname: string): RequestPortal {
  if (agentHost && hostname === agentHost) return 'agent';
  if (schoolHost && hostname === schoolHost) return 'school';
  return 'parent';
}

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

export function isTrustedHost(hostname: string): boolean {
  if (knownHosts.size === 0) return true;
  if (knownHosts.has(hostname)) return true;
  return hostname.endsWith('.localhost') || hostname === 'localhost';
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
