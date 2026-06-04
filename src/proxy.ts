import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import {
  detectLocale,
  isPublicContentPath,
  isPublicStaticContentPath,
  isTrustedHost,
  LAUNCHING_SOON,
  resolvePortal,
  withRobotsHeader,
} from '@/modules/request-proxy';

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
    isPublicStaticContentPath(pathAfterLocale) ||
    isPublicContentPath(pathAfterLocale)
  ) {
    if (!hasLocale) {
      url.pathname = `/${locale}/${pathAfterLocale}`;
      return withRobotsHeader(NextResponse.rewrite(url), hostname);
    }
    return withRobotsHeader(NextResponse.next(), hostname);
  }

  // Agent/school dashboards have a dedicated /{portal}/dashboard/search route, so a
  // logged-in user hitting the public /{portal}/search is sent to /dashboard/search.
  // The parent portal has NO public search — /parent/search is now the protected
  // in-dashboard search (see PORTAL_NAV.parent), so it must be served directly with
  // no redirect. The portal !== 'parent' guard below preserves that behavior.
  const isPortalSearchPath = pathAfterLocale === `${portal}/search`;
  if (loggedInPortal && loggedInPortal === portal && isPortalSearchPath && portal !== 'parent') {
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
