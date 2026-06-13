'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { FOCUS_RING } from '@/modules/core';
import { QUICK_ACTIONS } from '@/modules/dashboard/constants/ui.constants';

export function QuickActions() {
  const t = useTranslations('Dashboard.quickActions');

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {QUICK_ACTIONS.map(({ href, icon: Icon, labelKey, bg, color }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'group flex flex-col gap-6 rounded-lg bg-card p-6 no-underline shadow-2 transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-3 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
            FOCUS_RING,
          )}
        >
          <span
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-md',
              bg,
              color,
            )}
          >
            <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
          </span>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-base font-semibold text-ink-900'>{t(labelKey)}</span>
            <ArrowUpRight
              className='h-4 w-4 shrink-0 text-foggy transition-colors group-hover:text-primary-strong'
              strokeWidth={2}
              aria-hidden='true'
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
