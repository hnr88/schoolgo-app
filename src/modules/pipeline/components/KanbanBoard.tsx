'use client';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Skeleton } from '@/components/ui/skeleton';
import { KanbanColumn } from '@/modules/pipeline/components/KanbanColumn';
import { KanbanCard } from '@/modules/pipeline/components/KanbanCard';
import { useKanbanDnd } from '@/modules/pipeline/hooks/useKanbanDnd';
import type { KanbanBoardProps } from '@/modules/pipeline/types/component.types';

function KanbanBoardSkeleton() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex min-w-72 flex-col gap-3 rounded-lg border border-border bg-card p-3">
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
  const { sensors, activeApplication, handleDragStart, handleDragEnd, handleDragCancel } = useKanbanDnd();

  if (isLoading) {
    return (
      <div className="flex gap-5 overflow-x-auto pb-4">
        <KanbanBoardSkeleton />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-5 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            applications={applicationsByColumn[column.id] ?? []}
            isLoading={false}
          />
        ))}
      </div>
      <DragOverlay>{activeApplication ? <KanbanCard application={activeApplication} isOverlay /> : null}</DragOverlay>
    </DndContext>
  );
}
