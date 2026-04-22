import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const PROD_DOMAIN = 'schoolgo.com.au';

const SUBDOMAIN_PREFIX: Record<string, string> = {
  agent: 'agent',
  school: 'school',
};

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';

  if (hostname.endsWith(PROD_DOMAIN)) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const maybeLocale = segments[0];
    const hasLocale =
      maybeLocale !== undefined &&
      routing.locales.includes(maybeLocale as (typeof routing.locales)[number]);

    if (segments.includes('launching-soon')) {
      return NextResponse.next();
    }

    const locale = hasLocale ? maybeLocale : routing.defaultLocale;
    url.pathname = `/${locale}/launching-soon`;
    return NextResponse.redirect(url);
  }

  const subdomain = hostname.split('.')[0];
  const prefix = SUBDOMAIN_PREFIX[subdomain];

  if (prefix) {
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
      if (second !== prefix) {
        const restPath = rest.length > 0 ? `/${rest.join('/')}` : '';
        url.pathname = `/${locale}/${prefix}${second ? `/${second}` : ''}${restPath}`;
      }
    } else {
      const cleanPath = pathname === '/' ? '' : pathname;
      url.pathname = `/${locale}/${prefix}${cleanPath}`;
    }

    return NextResponse.rewrite(url);
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
    if (second !== 'parent') {
      const restPath = rest.length > 0 ? `/${rest.join('/')}` : '';
      url.pathname = `/${locale}/parent${second ? `/${second}` : ''}${restPath}`;
    }
  } else {
    const cleanPath = pathname === '/' ? '' : pathname;
    url.pathname = `/${locale}/parent${cleanPath}`;
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
};
