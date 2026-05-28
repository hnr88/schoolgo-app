import type { Portal } from '@/lib/portal-url';

export function portalSearchPath(portal: Portal): string {
  return portal === 'agent' ? '/dashboard/search' : '/parent/search';
}

export function portalSavedSchoolsPath(portal: Portal): string {
  return portal === 'agent' ? '/dashboard/saved-schools' : '/parent/saved-schools';
}

export function portalSavedSearchesPath(portal: Portal): string {
  return portal === 'agent' ? '/dashboard/saved-searches' : '/parent/saved-searches';
}
