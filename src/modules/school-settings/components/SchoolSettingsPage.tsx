'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, SurfaceCard } from '@/modules/core';
import { useSchoolMe } from '@/modules/school-settings/queries/use-school-me.query';
import { SchoolProfileForm } from '@/modules/school-settings/components/SchoolProfileForm';
import { SchoolSecuritySection } from '@/modules/school-settings/components/SchoolSecuritySection';
import { SchoolNotificationsPanel } from '@/modules/school-settings/components/SchoolNotificationsPanel';
import { SchoolPreferencesForm } from '@/modules/school-settings/components/SchoolPreferencesForm';

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
  'text-foreground/70 data-active:bg-arches-50 data-active:text-arches-700';

export function SchoolSettingsPage() {
  const t = useTranslations('SchoolSettings');
  const { data: me, isLoading, isError, refetch } = useSchoolMe();

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
        <TabsTrigger value='security' className={TAB_TRIGGER_CLASS}>{t('tabSecurity')}</TabsTrigger>
        <TabsTrigger value='notifications' className={TAB_TRIGGER_CLASS}>
          {t('tabNotifications')}
        </TabsTrigger>
        <TabsTrigger value='preferences' className={TAB_TRIGGER_CLASS}>
          {t('tabPreferences')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value='profile'>
        <SurfaceCard elevation='flat' padding='lg'>
          <SchoolProfileForm me={me} />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='security'>
        <SurfaceCard elevation='flat' padding='lg'>
          <SchoolSecuritySection />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='notifications'>
        <SurfaceCard elevation='flat' padding='lg'>
          <SchoolNotificationsPanel />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='preferences'>
        <SurfaceCard elevation='flat' padding='lg'>
          <SchoolPreferencesForm me={me} />
        </SurfaceCard>
      </TabsContent>
    </Tabs>
  );
}
