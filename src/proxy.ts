import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { PUBLIC_ONLY } from '@/lib/deliverable-config';
import {
  detectLocale,
  isPublicContentPath,
  isPublicStaticContentPath,
  isTrustedHost,
  LAUNCHING_SOON,
  LOGGED_IN_PORTAL_COOKIE,
  resolvePortal,
  withRobotsHeader,
} from '@/modules/request-proxy';

// Auth-flow routes deactivated in the public-only deliverable. Matched on the
// final path segment so it works regardless of host->portal rewriting.
const PUBLIC_ONLY_DEACTIVATED_SEGMENTS = new Set([
  'sign-in',
  'sign-up',
  'forgot-password',
  'reset-password',
  'onboarding',
]);

export function proxy(request: NextRequest) {
  // Host comparisons are case-insensitive (DNS) and the configured portal hosts
  // are always lowercase, so normalise the incoming host once at the boundary.
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(':')[0].toLowerCase();
  const fallbackHost = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
  const hostname = forwardedHost && isTrustedHost(forwardedHost) ? forwardedHost : fallbackHost;
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
  // In the public-only deliverable no login can occur, so ignore any stale
  // portal-marker cookie — otherwise the root->/dashboard redirect below would
  // bounce against the deactivated dashboard and loop.
  const loggedInPortal = PUBLIC_ONLY
    ? undefined
    : request.cookies.get(LOGGED_IN_PORTAL_COOKIE)?.value;
  const pathAfterLocale = hasLocale ? segments.slice(1).join('/') : pathname.replace(/^\//, '');

  // Deactivate auth-flow routes (login/register/reset/onboarding) -> landing.
  if (PUBLIC_ONLY) {
    const lastSegment = pathAfterLocale.split('/').filter(Boolean).pop() ?? '';
    if (PUBLIC_ONLY_DEACTIVATED_SEGMENTS.has(lastSegment)) {
      url.pathname = `/${locale}`;
      url.search = '';
      return withRobotsHeader(NextResponse.redirect(url), hostname);
    }
  }

  // Send a user who is logged into THIS portal from its root to its dashboard.
  // The cookie is host-only, so it only reflects a session on this same
  // subdomain — cross-portal access is left to the per-origin session checked
  // client-side in useRequireAuth, which keeps each subdomain's login independent.
  if (loggedInPortal && isRootPath && loggedInPortal === portal) {
    url.pathname = `/${locale}/dashboard`;
    return withRobotsHeader(NextResponse.redirect(url), hostname);
  }
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

  // Public-only deliverable: compare is unlocked for everyone, so serve the
  // public /compare route directly instead of rewriting it to the per-portal
  // (protected) compare page (which would redirect to the landing / 404).
  if (PUBLIC_ONLY && pathAfterLocale === 'compare') {
    if (!hasLocale) {
      url.pathname = `/${locale}/compare`;
      return withRobotsHeader(NextResponse.rewrite(url), hostname);
    }
    return withRobotsHeader(NextResponse.next(), hostname);
  }

  if (pathAfterLocale === 'test' || pathAfterLocale.startsWith('test/')) {
    if (!hasLocale) {
      url.pathname = `/${locale}/${pathAfterLocale}`;
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
