'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { NOTIFICATION_EVENT_ICON, NOTIFICATION_PRIORITY_DOT } from '../constants/notification.constants';
import type { ParentNotification } from '../types/notification.types';

interface NotificationItemProps {
  notification: ParentNotification;
  onMarkRead: (documentId: string) => void;
}

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const t = useTranslations('ParentNotifications');
  const format = useFormatter();
  const {
    documentId,
    eventType,
    title,
    body,
    priority,
    readAt,
    createdAt,
    entityType,
    entityDocumentId,
  } = notification;

  const Icon = NOTIFICATION_EVENT_ICON[eventType];
  const isUnread = readAt === null;

  const href =
    entityType === 'application' && entityDocumentId
      ? (`/parent/applications/${entityDocumentId}` as const)
      : entityType === 'student' && entityDocumentId
        ? (`/parent/students/${entityDocumentId}` as const)
        : null;

  const handleActivate = () => {
    if (isUnread) onMarkRead(documentId);
  };

  const content = (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-transparent px-4 py-3 transition-colors',
        isUnread ? 'bg-muted/40' : 'bg-card',
      )}
    >
      <span className='mt-1.5 flex shrink-0 items-center'>
        <span className={cn('h-2 w-2 rounded-full', NOTIFICATION_PRIORITY_DOT[priority])} aria-hidden />
      </span>
      <span className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground'>
        <Icon className='h-4 w-4' aria-hidden />
      </span>
      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <div className='flex items-start justify-between gap-2'>
          <p className='truncate text-sm font-semibold text-ink-900'>{title}</p>
          {isUnread && (
            <span className='shrink-0 text-xs font-medium text-vivid-coral'>{t('unread')}</span>
          )}
        </div>
        {body && <p className='text-sm text-muted-foreground'>{body}</p>}
        <time dateTime={createdAt} className='text-xs text-foggy'>
          {format.relativeTime(new Date(createdAt))}
        </time>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={handleActivate} className='block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
        {content}
      </Link>
    );
  }

  if (isUnread) {
    return (
      <button
        type='button'
        onClick={handleActivate}
        className='block w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      >
        {content}
      </button>
    );
  }

  return content;
}
