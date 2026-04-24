import type { Portal } from '@/lib/portal-url';

const PORTAL_DASHBOARD_PATHS: Record<Portal, string | null> = {
  parent: null,
  agent: '/dashboard',
  school: null,
};

export function getPortalDashboardPath(portal: Portal): string | null {
  return PORTAL_DASHBOARD_PATHS[portal];
}
