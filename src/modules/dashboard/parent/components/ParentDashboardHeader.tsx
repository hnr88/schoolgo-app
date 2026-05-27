'use client';

import { useTranslations } from 'next-intl';
import { UserPlus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { getTimeOfDay } from '@/modules/dashboard/lib/get-time-of-day';

export function ParentDashboardHeader() {
  const t = useTranslations('ParentDashboard');
  const displayName = useAuthStore((s) => s.user?.displayName);

  const firstName = displayName?.split(' ')[0] || t('greetingFallbackName');
  const greeting = t(`greeting_${getTimeOfDay()}`);

  return (
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold text-ink-900'>
          {greeting} <span className='text-primary'>{firstName}</span>
        </h1>
        <p className='text-sm text-foggy'>{t('subtitle')}</p>
      </div>
      <Link href='/parent/students/new'>
        <Button className='gap-1.5'>
          <UserPlus className='h-4 w-4' aria-hidden='true' />
          {t('addStudent')}
        </Button>
      </Link>
    </div>
  );
}
