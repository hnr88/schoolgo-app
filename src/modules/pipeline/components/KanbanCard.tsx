'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { formatDaysClass } from '@/modules/applications/lib/format';
import type { KanbanCardProps } from '@/modules/pipeline/types/component.types';

export function KanbanCard({ application }: KanbanCardProps) {
  const t = useTranslations('Pipeline');
  const { student, school, targetYearLevel, targetIntake, status, daysInStatus } = application;
  const studentName = `${student.firstName} ${student.lastName}`;

  return (
    <Link
      href={`/dashboard/applications/${application.documentId}`}
      aria-label={`${studentName} — ${school.name}`}
      className='block rounded-md border border-border bg-card p-4 no-underline shadow-1 transition-transform duration-200 ease-out-quart hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
    >
      <div className='mb-1.5'>
        <p className='truncate text-sm font-semibold text-ink-900'>{studentName}</p>
        <p className='truncate text-xs text-foggy'>{school.name}</p>
      </div>

      {(targetYearLevel ?? targetIntake) && (
        <p className='mb-1.5 truncate text-xs text-foggy'>
          {[targetYearLevel, targetIntake].filter(Boolean).join(' · ')}
        </p>
      )}

      <div className='flex items-center justify-between gap-2'>
        <ApplicationStatusBadge status={status} />
        <span className={cn('text-xs font-medium tabular-nums', formatDaysClass(daysInStatus))}>
          {t('daysLabel', { count: daysInStatus })}
        </span>
      </div>
    </Link>
  );
}
