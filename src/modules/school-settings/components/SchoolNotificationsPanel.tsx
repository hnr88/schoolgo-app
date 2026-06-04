'use client';

import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useSchoolNotificationPreferences } from '@/modules/school-settings/queries/use-school-notification-preferences.query';
import { SchoolNotificationPreferencesForm } from '@/modules/school-settings/components/SchoolNotificationPreferencesForm';

function NotificationsSkeleton() {
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

export function SchoolNotificationsPanel() {
  const t = useTranslations('SchoolNotificationPreferences');
  const { data, isLoading, isError, refetch } = useSchoolNotificationPreferences();

  if (isLoading) {
    return <NotificationsSkeleton />;
  }

  if (isError || !data) {
    return <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  return <SchoolNotificationPreferencesForm preferences={data} />;
}
