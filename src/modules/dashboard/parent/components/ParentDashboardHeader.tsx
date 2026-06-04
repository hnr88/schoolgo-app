'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { CalendarDays, UserPlus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { getTimeOfDay } from '@/modules/dashboard/lib/get-time-of-day';
import { useParentDerivedApplications } from '@/modules/dashboard/parent/hooks/useParentDerivedApplications';

export function ParentDashboardHeader() {
  const t = useTranslations('ParentDashboard');
  const format = useFormatter();
  const displayName = useAuthStore((s) => s.user?.displayName);
  const { actionItems, isLoading } = useParentDerivedApplications();

  const firstName = displayName?.split(' ')[0] || t('greetingFallbackName');
  const greeting = t(`greeting_${getTimeOfDay()}`);
  const today = format.dateTime(new Date(), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className='flex flex-wrap items-center justify-between gap-4 border-b border-divider pb-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl'>
          {greeting} <span className='text-primary'>{firstName}</span>
        </h1>
        <p className='flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-foggy'>
          <span className='inline-flex items-center gap-1.5'>
            <CalendarDays className='h-3.5 w-3.5' strokeWidth={1.75} aria-hidden='true' />
            {today}
          </span>
          {!isLoading && (
            <>
              <span aria-hidden='true'>·</span>
              <span
                className={cn(
                  'font-medium',
                  actionItems.length > 0 ? 'text-arches-700' : 'text-vivid-mint',
                )}
              >
                {t('headerContextAttention', { count: actionItems.length })}
              </span>
            </>
          )}
        </p>
      </div>
      <Link href='/parent/students/new' className={cn(buttonVariants(), 'gap-1.5')}>
        <UserPlus className='h-4 w-4' aria-hidden='true' />
        {t('addStudent')}
      </Link>
    </div>
  );
}
