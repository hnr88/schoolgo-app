'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useSchoolMe } from '@/modules/school-settings/queries/use-school-me.query';
import { SchoolProfileForm } from '@/modules/school-settings/components/SchoolProfileForm';
import { SchoolPasswordForm } from '@/modules/school-settings/components/SchoolPasswordForm';
import { SchoolPreferencesForm } from '@/modules/school-settings/components/SchoolPreferencesForm';

function SettingsSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-10 w-72' />
      <div className='rounded-xl border border-border bg-card p-6'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-40' />
        </div>
      </div>
    </div>
  );
}

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
        <TabsTrigger value='profile' className='text-foreground/80'>{t('tabProfile')}</TabsTrigger>
        <TabsTrigger value='password' className='text-foreground/80'>{t('tabPassword')}</TabsTrigger>
        <TabsTrigger value='preferences' className='text-foreground/80'>{t('tabPreferences')}</TabsTrigger>
      </TabsList>

      <TabsContent value='profile'>
        <section className='rounded-xl border border-border bg-card p-6'>
          <SchoolProfileForm me={me} />
        </section>
      </TabsContent>

      <TabsContent value='password'>
        <section className='rounded-xl border border-border bg-card p-6'>
          <SchoolPasswordForm />
        </section>
      </TabsContent>

      <TabsContent value='preferences'>
        <section className='rounded-xl border border-border bg-card p-6'>
          <SchoolPreferencesForm me={me} />
        </section>
      </TabsContent>
    </Tabs>
  );
}
