import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const SUBDOMAIN_PREFIX: Record<string, string> = {
  agent: 'agent',
  school: 'school',
};

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
  const hostname = request.headers.get('host') ?? '';
  const subdomain = hostname.split('.')[0];

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
      return NextResponse.redirect(url);
    }
  }

  const prefix = SUBDOMAIN_PREFIX[subdomain];

  if (prefix) {
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
