export type ApplicationTemplateStatus = 'draft' | 'active' | 'archived';

export interface ApplicationTemplate {
  documentId: string;
  name: string;
  version: number;
  status: ApplicationTemplateStatus;
  updatedAt: string;
}

export interface ApplicationTemplatePayload {
  name: string;
}
