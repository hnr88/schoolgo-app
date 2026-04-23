import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const LAUNCHING_SOON = process.env.NEXT_PUBLIC_LAUNCHING_SOON === 'true';

function extractHost(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const agentHost = extractHost(process.env.NEXT_PUBLIC_AGENT_URL);
const schoolHost = extractHost(process.env.NEXT_PUBLIC_SCHOOL_URL);

function resolvePortal(hostname: string): 'agent' | 'school' | 'parent' {
  if (agentHost && hostname === agentHost) return 'agent';
  if (schoolHost && hostname === schoolHost) return 'school';
  return 'parent';
}

export function proxy(request: NextRequest) {
  const rawHost =
    request.headers.get('x-forwarded-host') ??
    request.headers.get('host') ??
    '';
  const hostname = rawHost.split(':')[0];
  const portal = resolvePortal(hostname);

  if (LAUNCHING_SOON) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;
    const segments = pathname.split('/').filter(Boolean);

    if (segments.includes('launching-soon')) {
      return NextResponse.next();
    }

    const maybeLocale = segments[0];
    const hasLocale =
      maybeLocale !== undefined &&
      routing.locales.includes(maybeLocale as (typeof routing.locales)[number]);
    const locale = hasLocale ? maybeLocale : routing.defaultLocale;
    url.pathname = `/${locale}/launching-soon`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale =
    maybeLocale !== undefined &&
    routing.locales.includes(maybeLocale as (typeof routing.locales)[number]);
  const locale = hasLocale ? maybeLocale : routing.defaultLocale;

  if (hasLocale) {
    const [, second, ...rest] = segments;
    if (second !== portal) {
      const restPath = rest.length > 0 ? `/${rest.join('/')}` : '';
      url.pathname = `/${locale}/${portal}${second ? `/${second}` : ''}${restPath}`;
    }
  } else {
    const cleanPath = pathname === '/' ? '' : pathname;
    url.pathname = `/${locale}/${portal}${cleanPath}`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
};
