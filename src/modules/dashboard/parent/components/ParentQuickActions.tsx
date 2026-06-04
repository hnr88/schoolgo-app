'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import {
  PARENT_PAYMENTS_ACTION,
  PARENT_QUICK_ACTIONS,
} from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

const TILE_CLASS =
  'group flex items-center gap-3 rounded-xl border border-background/10 bg-background/5 px-5 py-4 no-underline transition-[transform,background-color,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900';

export function ParentQuickActions() {
  const t = useTranslations('ParentDashboard');
  const { icon: PaymentsIcon } = PARENT_PAYMENTS_ACTION;

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      {PARENT_QUICK_ACTIONS.map(({ href, icon: Icon, labelKey }) => (
        <Link key={labelKey} href={href} className={TILE_CLASS}>
          <Icon className='h-5 w-5 shrink-0 text-background/70' strokeWidth={1.75} aria-hidden='true' />
          <span className='flex-1 text-sm font-semibold text-background'>{t(labelKey)}</span>
          <ArrowUpRight
            className='h-4 w-4 shrink-0 text-background/50 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            strokeWidth={2}
            aria-hidden='true'
          />
        </Link>
      ))}
      <Link href='/parent/payments' className={cn(TILE_CLASS, 'items-start')}>
        <PaymentsIcon
          className='h-5 w-5 shrink-0 text-background/70'
          strokeWidth={1.75}
          aria-hidden='true'
        />
        <span className='flex flex-1 flex-col'>
          <span className='text-sm font-semibold text-background'>
            {t(PARENT_PAYMENTS_ACTION.labelKey)}
          </span>
          <span className='text-xs text-background/60'>{t('comingSoon')}</span>
        </span>
      </Link>
    </div>
  );
}
