'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { QUICK_ACTIONS } from '@/modules/dashboard/constants/ui.constants';

export function QuickActions() {
  const t = useTranslations('Dashboard.quickActions');

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
      {QUICK_ACTIONS.map(({ href, icon: Icon, labelKey, bg, color }) => (
        <Link
          key={href}
          href={href}
          className='group flex flex-col gap-5 rounded-2xl border border-divider bg-card p-5 no-underline shadow-1 transition-transform duration-200 ease-out-quart hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          <span
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
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
