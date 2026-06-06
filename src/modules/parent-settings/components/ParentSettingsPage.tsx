'use client';

import { Bell, KeyRound, SlidersHorizontal, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ErrorState } from '@/modules/core';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { useMe } from '@/modules/parent-settings/queries/use-me.query';
import { ProfileForm } from '@/modules/parent-settings/components/ProfileForm';
import { PasswordForm } from '@/modules/parent-settings/components/PasswordForm';
import { PreferencesForm } from '@/modules/parent-settings/components/PreferencesForm';
import { NotificationPreferencesPanel } from '@/modules/parent-settings/components/NotificationPreferencesPanel';
import { SettingsSkeleton } from '@/modules/parent-settings/components/SettingsSkeleton';
import { SettingsCard } from '@/modules/parent-settings/components/SettingsCard';

const TAB_TRIGGER_CLASS =
  'text-foreground/80 data-active:bg-rausch-50 data-active:text-rausch-700';

export function ParentSettingsPage() {
  const t = useTranslations('ParentSettings');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { data: me, isLoading, isError, refetch } = useMe();

  if (isError) {
    return (
      <ErrorState framed message={t('loadError')} onRetry={() => refetch()} retryLabel={t('retry')} />
    );
  }

  if (isLoading || !isAuthenticated || !me) {
    return <SettingsSkeleton />;
  }

  return (
    <Tabs defaultValue='profile' className='gap-6'>
      <TabsList className='max-w-full overflow-x-auto overflow-y-hidden'>
        <TabsTrigger value='profile' className={TAB_TRIGGER_CLASS}>
          {t('tabProfile')}
        </TabsTrigger>
        <TabsTrigger value='password' className={TAB_TRIGGER_CLASS}>
          {t('tabPassword')}
        </TabsTrigger>
        <TabsTrigger value='preferences' className={TAB_TRIGGER_CLASS}>
          {t('tabPreferences')}
        </TabsTrigger>
        <TabsTrigger value='notifications' className={TAB_TRIGGER_CLASS}>
          {t('tabNotifications')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value='profile'>
        <SettingsCard
          icon={UserRound}
          title={t('profileCardTitle')}
          description={t('profileCardDescription')}
        >
          <ProfileForm me={me} />
        </SettingsCard>
      </TabsContent>

      <TabsContent value='password'>
        <SettingsCard
          icon={KeyRound}
          title={t('passwordCardTitle')}
          description={t('passwordCardDescription')}
        >
          <PasswordForm />
        </SettingsCard>
      </TabsContent>

      <TabsContent value='preferences'>
        <SettingsCard
          icon={SlidersHorizontal}
          title={t('preferencesCardTitle')}
          description={t('preferencesCardDescription')}
        >
          <PreferencesForm me={me} />
        </SettingsCard>
      </TabsContent>

      <TabsContent value='notifications'>
        <SettingsCard
          icon={Bell}
          title={t('notificationsCardTitle')}
          description={t('notificationsCardDescription')}
        >
          <NotificationPreferencesPanel />
        </SettingsCard>
      </TabsContent>
    </Tabs>
  );
}
