'use client';

import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core';
import type { DeadlineRowView } from '@/modules/dashboard/types/agent-dashboard.types';

export function DeadlinesList({ deadlines }: { deadlines: DeadlineRowView[] }) {
  const t = useTranslations('Dashboard.deadlines');

  return (
    <div className='flex flex-col rounded-xl border border-border bg-card shadow-1'>
      <div className='border-b border-divider px-6 py-5'>
        <h2 className='text-base font-bold text-ink-900'>{t('title')}</h2>
      </div>
      {deadlines.length === 0 ? (
        <EmptyState icon={CheckCircle} title={t('empty')} />
      ) : (
        <div className='flex flex-col divide-y divide-divider'>
          {deadlines.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              className='group flex items-center gap-4 px-6 py-4 no-underline transition-colors hover:bg-muted'
            >
              <span
                className={cn(
                  'flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl',
                  d.toneClass,
                )}
              >
                <span className='text-lg font-bold leading-tight'>{d.day}</span>
                <span className='text-xs font-medium uppercase'>{d.month}</span>
              </span>
              <div className='min-w-0 flex-1'>
                <span className='text-sm font-medium text-ink-900 group-hover:text-primary-strong'>
                  {d.label}
                </span>
                {d.description && (
                  <span className='mt-0.5 block text-xs text-foggy'>{d.description}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
