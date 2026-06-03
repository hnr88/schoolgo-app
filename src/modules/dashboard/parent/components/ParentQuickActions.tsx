'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  PARENT_PAYMENTS_ACTION,
  PARENT_QUICK_ACTIONS,
} from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

const TILE_CLASS =
  'flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-5 no-underline shadow-1 transition-colors';

export function ParentQuickActions() {
  const t = useTranslations('ParentDashboard');
  const { icon: PaymentsIcon } = PARENT_PAYMENTS_ACTION;

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {PARENT_QUICK_ACTIONS.map(({ href, icon: Icon, labelKey, bg, color }) => (
        <Link key={labelKey} href={href} className={cn(TILE_CLASS, 'hover:border-primary/30')}>
          <span
            className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', bg, color)}
          >
            <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
          </span>
          <span className='text-sm font-semibold text-ink-900'>{t(labelKey)}</span>
        </Link>
      ))}
      <Link href='/parent/payments' className={cn(TILE_CLASS, 'hover:border-primary/30')}>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
            PARENT_PAYMENTS_ACTION.bg,
            PARENT_PAYMENTS_ACTION.color,
          )}
        >
          <PaymentsIcon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
        </span>
        <span className='flex flex-col'>
          <span className='text-sm font-semibold text-ink-900'>
            {t(PARENT_PAYMENTS_ACTION.labelKey)}
          </span>
          <span className='text-xs text-foggy'>{t('comingSoon')}</span>
        </span>
      </Link>
    </div>
  );
}
