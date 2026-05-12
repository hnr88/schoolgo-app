import type { Portal } from '@/lib/portal-url';

export function getPortalSignUpHref(portal: Portal): string {
  switch (portal) {
    case 'agent':
      return '/agent/sign-up';
    case 'school':
      return '/school/sign-up';
    case 'parent':
    default:
      return '/parent/sign-up';
  }
}
