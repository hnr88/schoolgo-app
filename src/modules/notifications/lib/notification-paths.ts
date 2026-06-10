import type { Portal } from '@/lib/portal-url';

import type { NotificationEntityType, NotificationEventType } from '../types/notification.types';

export const TEST_RESULTS_ANCHOR = 'test-results';

function portalBasePath(portal: Portal | null): string {
  return portal === 'parent' ? '/parent' : '/dashboard';
}

export function notificationsListPath(portal: Portal | null): string {
  return `${portalBasePath(portal)}/notifications`;
}

export function notificationEntityPath(
  portal: Portal | null,
  eventType: NotificationEventType,
  entityType: NotificationEntityType,
  entityDocumentId: string | null,
): string | null {
  const base = portalBasePath(portal);

  if (eventType === 'test_results_ready') {
    if (entityType === 'application' && entityDocumentId) {
      return `${base}/applications/${entityDocumentId}#${TEST_RESULTS_ANCHOR}`;
    }
    return `${base}/results`;
  }

  if (!entityDocumentId) return null;

  if (entityType === 'application') return `${base}/applications/${entityDocumentId}`;
  if (entityType === 'message') return `${base}/applications/${entityDocumentId}`;
  if (entityType === 'student') return `${base}/students/${entityDocumentId}`;

  return null;
}
