'use client';

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
          className='group flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 no-underline shadow-1 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        >
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
              bg,
              color,
            )}
          >
            <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
          </span>
          <span className='text-sm font-semibold text-ink-900'>{t(labelKey)}</span>
        </Link>
      ))}
    </div>
  );
}
