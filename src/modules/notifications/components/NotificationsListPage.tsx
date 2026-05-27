'use client';

import { useTranslations } from 'next-intl';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
import { NotificationItem } from '../components/NotificationItem';
import { useParentNotifications } from '../queries/use-parent-notifications.query';
import { useMarkNotificationRead } from '../queries/use-mark-notification-read.mutation';
import { useMarkAllNotificationsRead } from '../queries/use-mark-all-notifications-read.mutation';
import { NOTIFICATIONS_DEFAULT_PAGE_SIZE } from '../constants/notification.constants';
import type { NotificationTimeGroup, ParentNotification } from '../types/notification.types';

const GROUP_ORDER: NotificationTimeGroup[] = ['today', 'yesterday', 'this_week', 'older'];

const GROUP_LABEL_KEY: Record<NotificationTimeGroup, string> = {
  today: 'groupToday',
  yesterday: 'groupYesterday',
  this_week: 'groupThisWeek',
  older: 'groupOlder',
};

function groupByTimeGroup(items: ParentNotification[]): Record<NotificationTimeGroup, ParentNotification[]> {
  const groups: Record<NotificationTimeGroup, ParentNotification[]> = {
    today: [],
    yesterday: [],
    this_week: [],
    older: [],
  };
  for (const item of items) groups[item.timeGroup].push(item);
  return groups;
}

export function NotificationsListPage() {
  const t = useTranslations('ParentNotifications');
  const { data, isLoading } = useParentNotifications({ pageSize: NOTIFICATIONS_DEFAULT_PAGE_SIZE });
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = data?.data ?? [];
  const grouped = groupByTimeGroup(notifications);

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex flex-wrap items-center justify-between gap-3'>
        <h2 className='font-display text-2xl font-bold text-ink-900'>{t('title')}</h2>
        <Button
          variant='outline'
          onClick={() => markAllRead.mutate()}
          disabled={markAllRead.isPending || notifications.length === 0}
        >
          {t('markAllRead')}
        </Button>
      </header>

      {isLoading ? (
        <div className='flex flex-col gap-3 rounded-xl border border-border bg-card p-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex items-start gap-3'>
              <Skeleton className='h-8 w-8 shrink-0 rounded-full' />
              <div className='flex flex-1 flex-col gap-2'>
                <Skeleton className='h-4 w-1/3' />
                <Skeleton className='h-3 w-2/3' />
              </div>
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState icon={Bell} title={t('empty')} description={t('emptyDescription')} />
      ) : (
        <div className='flex flex-col gap-6'>
          {GROUP_ORDER.filter((group) => grouped[group].length > 0).map((group) => (
            <section key={group} className='flex flex-col gap-2'>
              <h3 className='px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                {t(GROUP_LABEL_KEY[group])}
              </h3>
              <div className='flex flex-col gap-1 rounded-xl border border-border bg-card p-2'>
                {grouped[group].map((notification) => (
                  <NotificationItem
                    key={notification.documentId}
                    notification={notification}
                    onMarkRead={(id) => markRead.mutate(id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
