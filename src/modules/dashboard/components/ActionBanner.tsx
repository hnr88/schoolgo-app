'use client';

import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { FOCUS_RING } from '@/modules/core';
import { ACTION_PRIORITY_TONE } from '@/modules/dashboard/constants/agent-dashboard.constants';
import type { ActionRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function ActionBanner({ items }: { items: ActionRowView[] }) {
  const t = useTranslations('Dashboard.actionBanner');

  if (items.length === 0) return null;

  return (
    <div
      role='region'
      aria-label={t('title')}
      className='flex items-start gap-3 rounded-lg border border-babu-100 bg-babu-50 p-6'
    >
      <span className='flex size-9 shrink-0 items-center justify-center rounded-md bg-babu-100 text-babu-600'>
        <Info className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
      </span>
      <div className='flex min-w-0 flex-col gap-2'>
        <span className='text-xs font-bold uppercase tracking-wide text-babu-700'>
          {t('title')}
        </span>
        <ul className='flex flex-col gap-2'>
          {items.slice(0, 5).map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center gap-2 rounded-md no-underline',
                  FOCUS_RING,
                )}
              >
                <span
                  className={cn(
                    'shrink-0 rounded-pill px-2.5 py-0.5 text-xs font-semibold capitalize',
                    ACTION_PRIORITY_TONE[item.priority],
                  )}
                >
                  {item.priority}
                </span>
                <span className='text-sm text-ink-900 group-hover:underline'>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
