import type { TUITION_LEVELS } from '@/modules/school-tuition-editor/constants/tuition-levels';

export type TuitionLevel = (typeof TUITION_LEVELS)[number];

export interface TuitionRow {
  documentId: string;
  level: TuitionLevel;
  annualAmountAud: number;
}

export interface TuitionRowsResponse {
  data: TuitionRow[];
}

export interface TuitionSaveRow {
  level: TuitionLevel;
  annualAmountAud: number;
}

export interface TuitionSavePayload {
  rows: TuitionSaveRow[];
}

export interface TuitionStaffMe {
  documentId: string;
  permissionLevel: 'admin' | 'staff';
}

export interface TuitionStaffMeResponse {
  data: TuitionStaffMe;
}

export interface TuitionEditorRow {
  level: TuitionLevel;
  value: string;
  serverAmount: number | null;
  isDirty: boolean;
  hasError: boolean;
}
