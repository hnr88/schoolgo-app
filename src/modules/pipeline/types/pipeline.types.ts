import type { ApplicationStatus, Application } from '@/modules/applications/types/application.types';

export interface PipelineColumn {
  id: string;
  label: string;
  statuses: ApplicationStatus[];
  color: string;
  dotColor: string;
  agentToStatus?: ApplicationStatus;
}

export interface PipelineViewProps {
  columns: PipelineColumn[];
  applicationsByColumn: Record<string, Application[]>;
  isLoading: boolean;
}

export interface PipelineData {
  applications: Application[];
  byColumn: Record<string, Application[]>;
  total: number;
}

export interface ChangeStageVariables {
  applicationDocumentId: string;
  toStatus: ApplicationStatus;
}
