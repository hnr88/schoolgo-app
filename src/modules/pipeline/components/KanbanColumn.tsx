'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { KanbanCard } from '@/modules/pipeline/components/KanbanCard';
import { MAX_CARDS_PER_COLUMN } from '@/modules/pipeline/constants/pipeline.constants';
import type { KanbanColumnProps } from '@/modules/pipeline/types/component.types';

function KanbanColumnSkeleton() {
  return (
    <div className="flex flex-col gap-2">
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

  return (
    <div className={cn('flex min-w-72 flex-col rounded-xl p-3', column.color)}>
      <div className="mb-3 flex items-center gap-2">
        <span className={cn('h-2 w-2 shrink-0 rounded-full', column.dotColor)} />
        <span className="text-sm font-semibold text-foreground">{t(column.label)}</span>
        <span className="ml-auto rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {applications.length}
        </span>
      </div>

      {isLoading ? (
        <KanbanColumnSkeleton />
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((application) => (
            <KanbanCard key={application.documentId} application={application} />
          ))}
          {overflow > 0 && (
            <Link
              href="/dashboard/applications"
              className="py-1 text-center text-xs font-medium text-muted-foreground underline-offset-2 hover:underline"
            >
              {t('moreApplications', { count: overflow })}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
