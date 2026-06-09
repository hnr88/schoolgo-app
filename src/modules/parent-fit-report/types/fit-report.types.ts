import type { z } from 'zod';
import type { SchoolHit } from '@/modules/school-search';
import type { ParentStudent } from '@/modules/students';
import type { FIT_REPORT_YEAR_LEVELS } from '@/modules/parent-fit-report/constants/fit-report.constants';
import type { fitCheckResultSchema } from '@/modules/parent-fit-report/schemas/fit-check.schema';

export type FitReportYearLevel = (typeof FIT_REPORT_YEAR_LEVELS)[number];

export type FitCheckResult = z.infer<typeof fitCheckResultSchema>;

export type FitCheckTone = 'pass' | 'warn' | 'fail';

export type FitReportRowStatus = 'pending' | 'error' | 'success';

export type FitReportCheckKey = 'age' | 'cricos';

export interface FitReportCheckItem {
  key: FitReportCheckKey;
  tone: FitCheckTone;
}

export interface FitReportRow {
  school: SchoolHit;
  status: FitReportRowStatus;
  result: FitCheckResult | null;
  checks: FitReportCheckItem[];
}

export interface FitReportQueryState {
  data: FitCheckResult | undefined;
  isError: boolean;
}

export interface FitReportControlsProps {
  students: ParentStudent[];
  studentId: string | null;
  yearLevel: FitReportYearLevel | null;
  onStudentChange: (documentId: string) => void;
  onYearLevelChange: (level: FitReportYearLevel) => void;
}

export interface FitReportGridProps {
  rows: FitReportRow[];
}

export interface FitReportRowCardProps {
  row: FitReportRow;
}
