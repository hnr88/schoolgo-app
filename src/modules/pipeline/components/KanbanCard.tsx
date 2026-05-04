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

  return (
    <Link href={`/dashboard/applications/${application.documentId}`}>
      <div className="rounded-lg border border-border bg-white p-3 transition-shadow hover:shadow-md">
        <div className="mb-1.5">
          <p className="text-sm font-semibold text-foreground">
            {student.firstName} {student.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{school.name}</p>
        </div>

        {(targetYearLevel ?? targetIntake) && (
          <p className="mb-1.5 text-xs text-muted-foreground">
            {[targetYearLevel, targetIntake].filter(Boolean).join(' · ')}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <ApplicationStatusBadge status={status} />
          <span className={cn('text-xs font-medium tabular-nums', formatDaysClass(daysInStatus))}>
            {t('daysLabel', { count: daysInStatus })}
          </span>
        </div>
      </div>
    </Link>
  );
}
