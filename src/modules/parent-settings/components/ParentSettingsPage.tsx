'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState } from '@/modules/core';
import { useMe } from '@/modules/parent-settings/queries/use-me.query';
import { ProfileForm } from '@/modules/parent-settings/components/ProfileForm';
import { PasswordForm } from '@/modules/parent-settings/components/PasswordForm';
import { PreferencesForm } from '@/modules/parent-settings/components/PreferencesForm';

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
        <TabsTrigger value='profile' className='text-foreground/80'>{t('tabProfile')}</TabsTrigger>
        <TabsTrigger value='password' className='text-foreground/80'>{t('tabPassword')}</TabsTrigger>
        <TabsTrigger value='preferences' className='text-foreground/80'>{t('tabPreferences')}</TabsTrigger>
      </TabsList>

      <TabsContent value='profile'>
        <section className='rounded-xl border border-border bg-card p-6'>
          <ProfileForm me={me} />
        </section>
      </TabsContent>

      <TabsContent value='password'>
        <section className='rounded-xl border border-border bg-card p-6'>
          <PasswordForm />
        </section>
      </TabsContent>

      <TabsContent value='preferences'>
        <section className='rounded-xl border border-border bg-card p-6'>
          <PreferencesForm me={me} />
        </section>
      </TabsContent>
    </Tabs>
  );
}
