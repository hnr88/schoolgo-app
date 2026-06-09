'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, LogOut } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useRequireAuth, useLogoutRedirect } from '@/modules/auth';
import { useMe } from '@/modules/parent-settings';
import { Button } from '@/components/ui/button';
import { ParentOnboardingWizard } from '@/modules/parent-onboarding/components/ParentOnboardingWizard';

export function ParentOnboardingPage() {
  useRequireAuth();
  const t = useTranslations('ParentOnboarding');
  const router = useRouter();
  const { data: me, isLoading } = useMe();
  const { handleLogout } = useLogoutRedirect();

  useEffect(() => {
    if (me && me.profileCompleted) router.replace('/parent/dashboard');
  }, [me, router]);

  // Always-reachable escape: onboarding lives outside the dashboard chrome, so
  // without this a user stuck mid-onboarding has no way to sign out and switch
  // accounts. Rendered in both the loading branch and the wizard branch.
  const logoutButton = (
    <Button variant='ghost' size='sm' onClick={handleLogout} className='gap-2 text-muted-foreground'>
      <LogOut className='size-4' strokeWidth={1.5} />
      {t('logout')}
    </Button>
  );

  if (isLoading || !me || me.profileCompleted) {
    return (
      <div className='relative flex min-h-screen items-center justify-center'>
        <div className='absolute right-6 top-6'>{logoutButton}</div>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-page-surface px-6 py-10 lg:px-10'>
      <div className='flex max-w-canvas flex-col gap-8'>
        <header className='flex items-start justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <h1 className='font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl'>
              {t('title')}
            </h1>
            <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
          </div>
          {logoutButton}
        </header>
        <ParentOnboardingWizard me={me} />
      </div>
    </main>
  );
}
