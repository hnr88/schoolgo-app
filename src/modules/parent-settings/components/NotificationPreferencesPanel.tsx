'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useNotificationPreferences } from '@/modules/parent-settings/queries/use-notification-preferences.query';
import { NotificationPreferencesForm } from '@/modules/parent-settings/components/NotificationPreferencesForm';

function NotificationPreferencesSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-5 w-48' />
      <Skeleton className='h-16 w-full' />
      <Skeleton className='h-16 w-full' />
      <Skeleton className='h-16 w-full' />
      <Skeleton className='h-10 w-40' />
    </div>
  );
}

export function NotificationPreferencesPanel() {
  const t = useTranslations('NotificationPreferences');
  const { data, isLoading, isError, refetch } = useNotificationPreferences();

  if (isLoading) {
    return <NotificationPreferencesSkeleton />;
  }

  if (isError || !data) {
    return <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  return <NotificationPreferencesForm preferences={data} />;
}
