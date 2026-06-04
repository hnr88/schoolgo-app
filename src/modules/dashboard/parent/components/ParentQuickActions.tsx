'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import {
  PARENT_PAYMENTS_ACTION,
  PARENT_QUICK_ACTIONS,
} from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

const TILE_CLASS =
  'group flex items-center gap-3 rounded-xl bg-muted px-5 py-4 no-underline transition-[transform,background-color,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-rausch-50 hover:shadow-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card';

export function ParentQuickActions() {
  const t = useTranslations('ParentDashboard');
  const { icon: PaymentsIcon } = PARENT_PAYMENTS_ACTION;

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      {PARENT_QUICK_ACTIONS.map(({ href, icon: Icon, labelKey }) => (
        <Link key={labelKey} href={href} className={TILE_CLASS}>
          <Icon className='h-5 w-5 shrink-0 text-primary-strong' strokeWidth={1.75} aria-hidden='true' />
          <span className='flex-1 text-sm font-semibold text-ink-900'>{t(labelKey)}</span>
          <ArrowUpRight
            className='h-4 w-4 shrink-0 text-foggy transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-strong'
            strokeWidth={2}
            aria-hidden='true'
          />
        </Link>
      ))}
      <Link href='/parent/payments' className={TILE_CLASS}>
        <PaymentsIcon
          className='h-5 w-5 shrink-0 text-primary-strong'
          strokeWidth={1.75}
          aria-hidden='true'
        />
        <span className='flex-1 text-sm font-semibold text-ink-900'>
          {t(PARENT_PAYMENTS_ACTION.labelKey)}
        </span>
        <span className='shrink-0 rounded-full border border-border bg-card px-2 py-0.5 text-xs font-medium text-foggy'>
          {t('comingSoon')}
        </span>
      </Link>
    </div>
  );
}
