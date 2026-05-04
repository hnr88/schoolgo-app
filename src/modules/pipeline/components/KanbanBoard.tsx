'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { KanbanColumn } from '@/modules/pipeline/components/KanbanColumn';
import type { KanbanBoardProps } from '@/modules/pipeline/types/component.types';

function KanbanBoardSkeleton() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex min-w-72 flex-col gap-3 rounded-xl p-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      ))}
    </>
  );
}

export function KanbanBoard({ columns, applicationsByColumn, isLoading }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {isLoading ? (
        <KanbanBoardSkeleton />
      ) : (
        columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            applications={applicationsByColumn[column.id] ?? []}
            isLoading={false}
          />
        ))
      )}
    </div>
  );
}
