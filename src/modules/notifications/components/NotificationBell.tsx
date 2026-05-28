'use client';

import { Bell } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';

import { notificationsListPath } from '../lib/notification-paths';
import { useParentUnreadCount } from '../queries/use-parent-unread-count.query';

export function NotificationBell() {
  const t = useTranslations('ParentNotifications');
  const userType = useAuthStore((s) => s.userType);
  const { data: count = 0 } = useParentUnreadCount();

  const hasUnread = count > 0;
  const badgeLabel = count > 99 ? '99+' : String(count);

  return (
    <Link
      href={notificationsListPath(userType)}
      aria-label={t('bellLabel')}
      className='relative flex h-9 w-9 items-center justify-center rounded-xl text-ink-900 outline-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
    >
      <Bell className='h-5 w-5' strokeWidth={1.5} />
      {hasUnread && (
        <span className='absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-vivid-coral px-1 text-caption font-bold leading-none text-white'>
          {badgeLabel}
        </span>
      )}
    </Link>
  );
}
