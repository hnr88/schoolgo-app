'use client';

import { useFormatter, useNow, useTranslations } from 'next-intl';
import { Bell, Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';
import { NOTIFICATION_EVENT_ICON, NOTIFICATION_PRIORITY_DOT } from '../constants/notification.constants';
import { notificationEntityPath } from '../lib/notification-paths';
import type { ParentNotification } from '../types/notification.types';

interface NotificationItemProps {
  notification: ParentNotification;
  onMarkRead: (documentId: string) => void;
  isMarkingRead?: boolean;
}

export function NotificationItem({ notification, onMarkRead, isMarkingRead }: NotificationItemProps) {
  const t = useTranslations('ParentNotifications');
  const format = useFormatter();
  const now = useNow();
  const userType = useAuthStore((s) => s.userType);
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

  const Icon = NOTIFICATION_EVENT_ICON[eventType] ?? Bell;
  const isUnread = readAt === null;
  const href = notificationEntityPath(userType, eventType, entityType, entityDocumentId);

  const handleNavigate = () => {
    if (isUnread) onMarkRead(documentId);
  };

  const body0 = (
    <div className='flex min-w-0 flex-1 items-start gap-3'>
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
            <span className='shrink-0 text-xs font-medium text-vivid-coral-strong'>{t('unread')}</span>
          )}
        </div>
        {body && <p className='text-sm text-muted-foreground'>{body}</p>}
        <time dateTime={createdAt} className='text-xs text-foggy'>
          {format.relativeTime(new Date(createdAt), { now })}
        </time>
      </div>
    </div>
  );

  const primary = href ? (
    <Link
      href={href}
      onClick={handleNavigate}
      className='flex min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    >
      {body0}
    </Link>
  ) : (
    body0
  );

  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded-lg border border-transparent px-4 py-3 transition-colors',
        isUnread ? 'bg-muted/40' : 'bg-card',
      )}
    >
      {primary}
      {isUnread && (
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          onClick={() => onMarkRead(documentId)}
          disabled={isMarkingRead}
          aria-label={t('markRead')}
          title={t('markRead')}
          className='shrink-0'
        >
          <Check className='h-4 w-4' aria-hidden />
        </Button>
      )}
    </div>
  );
}
