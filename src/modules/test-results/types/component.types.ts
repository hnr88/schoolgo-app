import type { TestResult } from '@/modules/test-results/types/test-result.types';

export interface TestResultsListProps {
  studentDocumentId?: string;
}

export interface TestResultCardProps {
  result: TestResult;
}

export interface StudentSelectorOption {
  documentId: string;
  firstName: string;
  lastName: string;
}

export interface TestResultsPanelProps {
  studentDocumentId?: string;
}
