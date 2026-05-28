import type { Portal } from '@/lib/portal-url';

import type { NotificationEntityType } from '../types/notification.types';

function portalBasePath(portal: Portal | null): string {
  return portal === 'parent' ? '/parent' : '/dashboard';
}

export function notificationsListPath(portal: Portal | null): string {
  return `${portalBasePath(portal)}/notifications`;
}

export function notificationEntityPath(
  portal: Portal | null,
  entityType: NotificationEntityType,
  entityDocumentId: string | null,
): string | null {
  if (!entityDocumentId) return null;

  const base = portalBasePath(portal);

  if (entityType === 'application') return `${base}/applications/${entityDocumentId}`;
  if (entityType === 'student') return `${base}/students/${entityDocumentId}`;

  return null;
}
