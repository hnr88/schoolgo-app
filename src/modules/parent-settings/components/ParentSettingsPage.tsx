'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, SurfaceCard } from '@/modules/core';
import { useMe } from '@/modules/parent-settings/queries/use-me.query';
import { ProfileForm } from '@/modules/parent-settings/components/ProfileForm';
import { PasswordForm } from '@/modules/parent-settings/components/PasswordForm';
import { PreferencesForm } from '@/modules/parent-settings/components/PreferencesForm';
import { NotificationPreferencesPanel } from '@/modules/parent-settings/components/NotificationPreferencesPanel';

function SettingsSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-11 w-72 rounded-lg' />
      <SurfaceCard elevation='flat' padding='lg'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-40' />
        </div>
      </SurfaceCard>
    </div>
  );
}

const TAB_TRIGGER_CLASS =
  'text-foreground/70 data-active:bg-rausch-50 data-active:text-rausch-700';

export function ParentSettingsPage() {
  const t = useTranslations('ParentSettings');
  const { data: me, isLoading, isError, refetch } = useMe();

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  if (isError || !me) {
    return <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />;
  }

  return (
    <Tabs defaultValue='profile' className='gap-6'>
      <TabsList>
        <TabsTrigger value='profile' className={TAB_TRIGGER_CLASS}>{t('tabProfile')}</TabsTrigger>
        <TabsTrigger value='password' className={TAB_TRIGGER_CLASS}>{t('tabPassword')}</TabsTrigger>
        <TabsTrigger value='preferences' className={TAB_TRIGGER_CLASS}>{t('tabPreferences')}</TabsTrigger>
        <TabsTrigger value='notifications' className={TAB_TRIGGER_CLASS}>{t('tabNotifications')}</TabsTrigger>
      </TabsList>

      <TabsContent value='profile'>
        <SurfaceCard elevation='flat' padding='lg'>
          <ProfileForm me={me} />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='password'>
        <SurfaceCard elevation='flat' padding='lg'>
          <PasswordForm />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='preferences'>
        <SurfaceCard elevation='flat' padding='lg'>
          <PreferencesForm me={me} />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='notifications'>
        <SurfaceCard elevation='flat' padding='lg'>
          <NotificationPreferencesPanel />
        </SurfaceCard>
      </TabsContent>
    </Tabs>
  );
}
