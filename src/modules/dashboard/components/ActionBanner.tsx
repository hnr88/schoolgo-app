'use client';

import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ACTION_PRIORITY_TONE } from '@/modules/dashboard/constants/agent-dashboard.constants';
import type { ActionRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function ActionBanner({ items }: { items: ActionRowView[] }) {
  const t = useTranslations('Dashboard.actionBanner');

  if (items.length === 0) return null;

  return (
    <div className='flex items-start gap-3 rounded-xl border border-babu-100 bg-babu-50 p-6'>
      <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-babu-100 text-babu-600'>
        <Info className='h-4 w-4' strokeWidth={2} />
      </span>
      <div className='flex flex-col gap-2'>
        <span className='text-xs font-bold uppercase tracking-wide text-babu-700'>
          {t('title')}
        </span>
        <ul className='flex flex-col gap-1.5'>
          {items.slice(0, 5).map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className='group flex items-center gap-2 no-underline'
              >
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold capitalize',
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
