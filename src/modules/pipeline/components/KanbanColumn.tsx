'use client';

import { useTranslations } from 'next-intl';
import { useDroppable } from '@dnd-kit/core';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { KanbanCard } from '@/modules/pipeline/components/KanbanCard';
import { MAX_CARDS_PER_COLUMN } from '@/modules/pipeline/constants/pipeline.constants';
import type { ColumnDropData, KanbanColumnProps } from '@/modules/pipeline/types/component.types';

function KanbanColumnSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-24 w-full rounded-lg" />
    </div>
  );
}

export function KanbanColumn({ column, applications, isLoading }: KanbanColumnProps) {
  const t = useTranslations('Pipeline');
  const visible = applications.slice(0, MAX_CARDS_PER_COLUMN);
  const overflow = applications.length - MAX_CARDS_PER_COLUMN;
  const droppable: ColumnDropData = { column };
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    disabled: !column.agentToStatus,
    data: droppable,
  });

  return (
    <section
      ref={setNodeRef}
      aria-label={t(column.label)}
      className={cn(
        'flex min-w-72 flex-col rounded-lg border border-border p-3 transition-shadow duration-200 ease-out-quart',
        column.color,
        isOver && column.agentToStatus && 'ring-2 ring-ring ring-offset-2',
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className={cn('h-2 w-2 shrink-0 rounded-full', column.dotColor)} aria-hidden="true" />
        <h3 className="font-display text-sm font-bold tracking-tight text-ink-900">{t(column.label)}</h3>
        <span className="ml-auto rounded-full border border-border bg-card px-2 py-0.5 text-xs font-semibold text-foggy tabular-nums shadow-1">
          {applications.length}
        </span>
      </div>

      {isLoading ? (
        <KanbanColumnSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((application) => (
            <KanbanCard key={application.documentId} application={application} />
          ))}
          {overflow > 0 && (
            <Link
              href="/dashboard/applications"
              className="rounded-md py-1 text-center text-xs font-semibold text-babu-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t('moreApplications', { count: overflow })}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
