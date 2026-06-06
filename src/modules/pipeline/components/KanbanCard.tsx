'use client';

import { useTranslations } from 'next-intl';
import { GripVertical } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { ApplicationStatusBadge } from '@/modules/applications/components/ApplicationStatusBadge';
import { formatDaysClass } from '@/modules/applications/lib/format';
import type { CardDragData, KanbanCardProps } from '@/modules/pipeline/types/component.types';

export function KanbanCard({ application, isOverlay = false }: KanbanCardProps) {
  const t = useTranslations('Pipeline');
  const { student, school, targetYearLevel, targetIntake, status, daysInStatus } = application;
  const studentName = `${student.firstName} ${student.lastName}`;
  const dragData: CardDragData = { application };
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.documentId,
    data: dragData,
    disabled: isOverlay,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        'relative rounded-lg border border-border bg-card shadow-1 transition-shadow duration-200 ease-out-quart',
        isOverlay ? 'shadow-2' : 'hover:shadow-2',
        isDragging && 'opacity-50',
      )}
    >
      <button
        type="button"
        aria-label={t('dragInstructions')}
        className="absolute right-2 top-2 z-10 flex h-6 w-6 cursor-grab touch-none items-center justify-center rounded-md text-foggy hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 active:cursor-grabbing disabled:cursor-default"
        disabled={isOverlay}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <Link
        href={`/dashboard/applications/${application.documentId}`}
        aria-label={`${studentName} — ${school.name}`}
        className="block rounded-lg p-4 pr-9 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="mb-1.5">
          <p className="truncate text-sm font-semibold text-ink-900">{studentName}</p>
          <p className="truncate text-xs text-foggy">{school.name}</p>
        </div>

        {(targetYearLevel ?? targetIntake) && (
          <p className="mb-1.5 truncate text-xs text-foggy">
            {[targetYearLevel, targetIntake].filter(Boolean).join(' · ')}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <ApplicationStatusBadge status={status} />
          <span className={cn('text-xs font-medium tabular-nums', formatDaysClass(daysInStatus))}>
            {t('daysLabel', { count: daysInStatus })}
          </span>
        </div>
      </Link>
    </div>
  );
}
