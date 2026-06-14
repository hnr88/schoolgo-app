'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { FOCUS_RING } from '@/modules/core';
import { PARENT_QUICK_ACTIONS } from '@/modules/dashboard/parent/constants/parent-dashboard.constants';

const TILE_CLASS = cn(
  'group flex items-center gap-3 rounded-xl bg-gray-50 px-6 py-4 no-underline transition-[transform,background-color,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-rausch-50 hover:shadow-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
  FOCUS_RING,
);

export function ParentQuickActions() {
  const t = useTranslations('ParentDashboard');

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
    </div>
  );
}
