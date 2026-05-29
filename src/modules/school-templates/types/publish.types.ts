import type { ApplicationTemplate } from '@/modules/school-templates/types/school-templates.types';

export interface PublishImpact {
  affectedDraftCount: number;
  message: string;
  action: string;
}

export interface PublishResult {
  template: ApplicationTemplate | null;
  impact: PublishImpact | null;
}
