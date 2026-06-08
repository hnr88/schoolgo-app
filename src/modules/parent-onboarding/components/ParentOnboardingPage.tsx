'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useRequireAuth } from '@/modules/auth';
import { useMe } from '@/modules/parent-settings';
import { ParentOnboardingWizard } from '@/modules/parent-onboarding/components/ParentOnboardingWizard';

export function ParentOnboardingPage() {
  useRequireAuth();
  const t = useTranslations('ParentOnboarding');
  const router = useRouter();
  const { data: me, isLoading } = useMe();

  useEffect(() => {
    if (me && me.profileCompleted) router.replace('/parent/dashboard');
  }, [me, router]);

  if (isLoading || !me || me.profileCompleted) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Loader2 className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-page-surface px-6 py-10 lg:px-10'>
      <div className='flex max-w-canvas flex-col gap-8'>
        <header className='flex flex-col gap-2'>
          <h1 className='font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl'>
            {t('title')}
          </h1>
          <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
        </header>
        <ParentOnboardingWizard me={me} />
      </div>
    </main>
  );
}
