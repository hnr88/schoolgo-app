import type { z } from 'zod';
import type { TUITION_LEVELS } from '@/modules/school-tuition-editor/constants/tuition-levels';
import type {
  tuitionRowRecordSchema,
  tuitionRowsResponseSchema,
  tuitionStaffMeResponseSchema,
  tuitionStaffMeSchema,
} from '@/modules/school-tuition-editor/schemas/tuition-row.schema';

export type TuitionLevel = (typeof TUITION_LEVELS)[number];

export type TuitionRow = z.infer<typeof tuitionRowRecordSchema>;

export type TuitionRowsResponse = z.infer<typeof tuitionRowsResponseSchema>;

export interface TuitionSaveRow {
  level: TuitionLevel;
  annualAmountAud: number;
}

export interface TuitionSavePayload {
  rows: TuitionSaveRow[];
}

export type TuitionStaffMe = z.infer<typeof tuitionStaffMeSchema>;

export type TuitionStaffMeResponse = z.infer<typeof tuitionStaffMeResponseSchema>;

export interface TuitionEditorRow {
  level: TuitionLevel;
  value: string;
  serverAmount: number | null;
  isDirty: boolean;
  hasError: boolean;
}
