'use client';

import { useTranslations } from 'next-intl';
import { Bell, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/modules/dashboard';
import { EmptyState, ErrorState, SurfaceCard } from '@/modules/core';
import { NotificationItem } from '../components/NotificationItem';
import { NotificationFilters } from '../components/NotificationFilters';
import { NotificationsSkeleton } from '../components/NotificationsSkeleton';
import { useParentNotificationsInfinite } from '../queries/use-parent-notifications-infinite.query';
import { useMarkNotificationRead } from '../queries/use-mark-notification-read.mutation';
import { useMarkAllNotificationsRead } from '../queries/use-mark-all-notifications-read.mutation';
import { useNotificationFilters } from '../hooks/useNotificationFilters';
import { groupByTimeGroup } from '../lib/group-notifications';
import { GROUP_LABEL_KEY, GROUP_ORDER } from '../constants/notification.constants';

export function NotificationsListPage() {
  const t = useTranslations('ParentNotifications');
  const filters = useNotificationFilters();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useParentNotificationsInfinite({
    eventType: filters.eventType,
    read: filters.read,
  });
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];
  const grouped = groupByTimeGroup(notifications);
  const visibleGroups = GROUP_ORDER.filter((group) => grouped[group].length > 0);

  return (
    <div className='flex flex-col gap-6'>
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Button
            variant='outline'
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending || notifications.length === 0}
          >
            {t('markAllRead')}
          </Button>
        }
      />

      <NotificationFilters
        unreadOnly={filters.unreadOnly}
        onUnreadOnlyChange={filters.setUnreadOnly}
        eventFilter={filters.eventFilter}
        onEventFilterChange={filters.setEventFilter}
      />

      {isLoading ? (
        <NotificationsSkeleton />
      ) : isError ? (
        <ErrorState
          message={t('errorDescription')}
          onRetry={() => refetch()}
          retryLabel={t('retry')}
          framed
        />
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title={filters.isFiltered ? t('filteredEmpty') : t('empty')}
          description={
            filters.isFiltered ? t('filteredEmptyDescription') : t('emptyDescription')
          }
          framed
        />
      ) : (
        <div className='flex flex-col gap-6'>
          {visibleGroups.map((group) => (
            <section key={group} className='flex flex-col gap-2'>
              <h3 className='px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
                {t(GROUP_LABEL_KEY[group])}
              </h3>
              <SurfaceCard padding='none' className='flex flex-col gap-1 p-2'>
                {grouped[group].map((notification) => (
                  <NotificationItem
                    key={notification.documentId}
                    notification={notification}
                    onMarkRead={(id) => markRead.mutate(id)}
                    isMarkingRead={markRead.isPending}
                  />
                ))}
              </SurfaceCard>
            </section>
          ))}

          {hasNextPage && (
            <Button
              variant='outline'
              className='self-center'
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              aria-busy={isFetchingNextPage}
            >
              {isFetchingNextPage && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden />
              )}
              {t('loadMore')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
