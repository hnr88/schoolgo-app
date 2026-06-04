'use client';

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, SurfaceCard } from '@/modules/core';
import { useAgentSettings } from '@/modules/agent-settings/queries/use-agent-settings.query';
import { AgentProfileForm } from '@/modules/agent-settings/components/AgentProfileForm';
import { AgentPasswordForm } from '@/modules/agent-settings/components/AgentPasswordForm';
import { AgentNotificationsForm } from '@/modules/agent-settings/components/AgentNotificationsForm';
import { AgentRegionForm } from '@/modules/agent-settings/components/AgentRegionForm';
import { AgentAccountSection } from '@/modules/agent-settings/components/AgentAccountSection';

function SettingsSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-10 w-96' />
      <SurfaceCard padding='lg'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-40' />
        </div>
      </SurfaceCard>
    </div>
  );
}

export function AgentSettingsPage() {
  const t = useTranslations('AgentSettings');
  const { data, isLoading, isError, refetch } = useAgentSettings();

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  if (isError || !data) {
    return <ErrorState message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} framed />;
  }

  return (
    <Tabs defaultValue='profile' className='gap-6'>
      <TabsList>
        <TabsTrigger value='profile' className='text-foreground/80'>{t('tabProfile')}</TabsTrigger>
        <TabsTrigger value='password' className='text-foreground/80'>{t('tabPassword')}</TabsTrigger>
        <TabsTrigger value='notifications' className='text-foreground/80'>{t('tabNotifications')}</TabsTrigger>
        <TabsTrigger value='region' className='text-foreground/80'>{t('tabRegion')}</TabsTrigger>
        <TabsTrigger value='account' className='text-foreground/80'>{t('tabAccount')}</TabsTrigger>
      </TabsList>

      <TabsContent value='profile'>
        <SurfaceCard padding='lg'>
          <AgentProfileForm user={data.user} profile={data.profile} />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='password'>
        <SurfaceCard padding='lg'>
          <AgentPasswordForm />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='notifications'>
        <SurfaceCard padding='lg'>
          <AgentNotificationsForm notifications={data.notifications} messaging={data.messaging} />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='region'>
        <SurfaceCard padding='lg'>
          <AgentRegionForm locale={data.locale} />
        </SurfaceCard>
      </TabsContent>

      <TabsContent value='account'>
        <SurfaceCard padding='lg'>
          <AgentAccountSection />
        </SurfaceCard>
      </TabsContent>
    </Tabs>
  );
}
