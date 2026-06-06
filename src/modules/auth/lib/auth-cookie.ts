import 'client-only';

import { LOGGED_IN_PORTAL_COOKIE } from '@/modules/request-proxy';
import type { Portal } from '@/lib/portal-url';

const ONE_YEAR_SECONDS = 31536000;

// The cookie is HOST-ONLY (no Domain attribute) so each portal subdomain keeps
// an independent session — logging into one portal never disturbs another in the
// same browser. The proxy only reads it on the same subdomain that set it, to
// send a logged-in user from that portal's root to its dashboard.
function secureAttribute(): string {
  return typeof window !== 'undefined' && window.location.protocol === 'https:'
    ? '; Secure'
    : '';
}

export function setLoggedInPortalCookie(portal: Portal): void {
  if (typeof document === 'undefined') return;
  document.cookie =
    `${LOGGED_IN_PORTAL_COOKIE}=${portal}; path=/; max-age=${ONE_YEAR_SECONDS}` +
    `; SameSite=Lax${secureAttribute()}`;
}

export function clearLoggedInPortalCookie(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${LOGGED_IN_PORTAL_COOKIE}=; path=/; max-age=0`;
}
