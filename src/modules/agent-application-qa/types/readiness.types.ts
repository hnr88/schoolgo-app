import type { z } from 'zod';
import type {
  readinessGapSchema,
  schoolReadinessResultSchema,
  readinessCheckResponseSchema,
  readinessFormSchema,
  READINESS_VERDICTS,
  READINESS_CHECK_STATUSES,
} from '@/modules/agent-application-qa/schemas/readiness.schema';

export type ReadinessVerdict = (typeof READINESS_VERDICTS)[number];
export type ReadinessCheckStatus = (typeof READINESS_CHECK_STATUSES)[number];
export type ReadinessGap = z.infer<typeof readinessGapSchema>;
export type SchoolReadinessResult = z.infer<typeof schoolReadinessResultSchema>;
export type ReadinessCheckResponse = z.infer<typeof readinessCheckResponseSchema>;
export type ReadinessFormValues = z.infer<typeof readinessFormSchema>;

export interface ReadinessCheckRequest {
  studentDocumentId: string;
  schoolIds: string[];
}

export interface ReadinessStudentOption {
  documentId: string;
  firstName: string | null;
  lastName: string | null;
  currentYearLevel: string | null;
}

export interface ReadinessSchoolOption {
  documentId: string;
  label: string;
}
