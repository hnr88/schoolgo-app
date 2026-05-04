import type { ApplicationStatus, Application } from '@/modules/applications/types/application.types';

export interface PipelineColumn {
  id: string;
  label: string;
  statuses: ApplicationStatus[];
  color: string;
  dotColor: string;
}

export interface PipelineViewProps {
  columns: PipelineColumn[];
  applicationsByColumn: Record<string, Application[]>;
  isLoading: boolean;
}
