'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { CalendarDays, UserPlus } from 'lucide-react';
import { CtaLink } from '@/modules/design-system';
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
    <div className='flex flex-wrap items-center justify-between gap-4'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-display text-display-h1 font-bold tracking-tight text-ink-900'>
          {greeting} <span className='text-primary'>{firstName}</span>
        </h1>
        <p className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foggy'>
          <span className='inline-flex items-center gap-1.5'>
            <CalendarDays className='h-4 w-4 text-foggy' strokeWidth={1.75} aria-hidden='true' />
            {today}
          </span>
          {!isLoading && (
            <>
              <span className='h-1 w-1 rounded-full bg-quill' aria-hidden='true' />
              <span
                className={cn(
                  'font-semibold',
                  actionItems.length > 0 ? 'text-arches-700' : 'text-vivid-mint-strong',
                )}
              >
                {t('headerContextAttention', { count: actionItems.length })}
              </span>
            </>
          )}
        </p>
      </div>
      <CtaLink href='/parent/students/new' variant='primary' size='md'>
        <UserPlus className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
        {t('addStudent')}
      </CtaLink>
    </div>
  );
}
