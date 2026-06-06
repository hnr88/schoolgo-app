export type TestType =
  | 'aeas'
  | 'ielts'
  | 'pte'
  | 'cambridge'
  | 'toefl'
  | 'duolingo'
  | 'istart'
  | 'idat'
  | 'other';

export type VerificationStatus =
  | 'unverified'
  | 'verifying'
  | 'issuer_verified'
  | 'direct_delivered'
  | 'revoked';

export interface TestResultReportDocument {
  documentId: string;
  fileName: string | null;
  file: { url: string; name: string } | null;
}

export interface TestResult {
  id: number;
  documentId: string;
  testType: TestType;
  overallScore: string;
  subScores: Record<string, unknown> | null;
  testDate: string;
  verificationStatus: VerificationStatus;
  candidateNumber: string | null;
  notes: string | null;
  verifiedAt: string | null;
  reportDocument?: TestResultReportDocument | null;
  student: {
    documentId: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

export interface TestResultsResponse {
  data: TestResult[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface UseTestResultsParams {
  studentDocumentId?: string;
  page?: number;
  pageSize?: number;
}
