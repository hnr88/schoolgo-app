import type { Portal } from '@/lib/portal-url';

const PORTAL_DASHBOARD_PATHS: Record<Portal, string> = {
  parent: '/dashboard',
  agent: '/dashboard',
  school: '/dashboard',
};

export function getPortalDashboardPath(portal: Portal): string {
  return PORTAL_DASHBOARD_PATHS[portal];
}
