import type { Application } from '@/modules/applications/types/application.types';
import type { PipelineColumn } from '@/modules/pipeline/types/pipeline.types';

export interface KanbanBoardProps {
  columns: PipelineColumn[];
  applicationsByColumn: Record<string, Application[]>;
  isLoading: boolean;
}

export interface KanbanColumnProps {
  column: PipelineColumn;
  applications: Application[];
  isLoading: boolean;
}

export interface KanbanCardProps {
  application: Application;
}
