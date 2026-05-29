export type ApplicationTemplateStatus = 'draft' | 'published' | 'superseded';

export type TemplateStepType =
  | 'english_test'
  | 'documents'
  | 'fee'
  | 'personal_statement'
  | 'interview'
  | 'entrance_exam'
  | 'custom';

export interface RequiredDocumentEntry {
  documentType: string;
  required: boolean;
  instructions?: string;
}

export interface AcceptedTestEntry {
  testType: string;
  minimumScore: number | null;
}

export interface TemplateStep {
  stepType: TemplateStepType;
  required?: boolean;
  requiredDocuments?: RequiredDocumentEntry[];
  acceptedTests?: AcceptedTestEntry[];
  amount?: number;
  refundable?: boolean;
  wordLimit?: number;
  name?: string;
  instructions?: string;
}

export interface TemplateData {
  steps: TemplateStep[];
}

export interface ApplicationTemplate {
  documentId: string;
  version: number;
  status: ApplicationTemplateStatus;
  tier?: string;
  templateData: TemplateData | Record<string, unknown>;
  publishedAt: string | null;
  supersededAt: string | null;
  supersededByVersion: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationTemplatePayload {
  templateData: TemplateData;
}

export interface TemplateStepError {
  stepIndex: number;
  stepType: string;
  errors: string[];
}

export interface TemplateWarning {
  stepIndex: number | null;
  message: string;
}

export interface TemplateValidationResult {
  valid: boolean;
  stepErrors: TemplateStepError[];
  warnings: TemplateWarning[];
  message: string | null;
}

export interface StrapiSingle<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiList<T> {
  data: T[];
  meta: Record<string, unknown>;
}
