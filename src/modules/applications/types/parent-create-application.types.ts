import type { Control, UseFormReturn } from 'react-hook-form';
import type {
  PARENT_TARGET_INTAKES,
  PARENT_TARGET_YEAR_LEVELS,
  ParentCreateApplicationFormValues,
} from '@/modules/applications/schemas/parent-create-application.schema';
import type {
  SchoolOption,
  StudentOption,
} from '@/modules/applications/types/create-application.types';

export type ParentTargetYearLevel = (typeof PARENT_TARGET_YEAR_LEVELS)[number];
export type ParentTargetIntake = (typeof PARENT_TARGET_INTAKES)[number];

export interface ParentCreateApplicationInput {
  student: string;
  school: string;
  targetYearLevel: ParentTargetYearLevel;
  targetIntake: ParentTargetIntake;
  boardingRequired: boolean;
}

export type ParentCreateApplicationErrorKind = 'ageBlock' | 'cricos' | 'unknown';

export interface ParentCreateApplicationError {
  kind: ParentCreateApplicationErrorKind;
  message: string;
}

export interface ParentFitCheckParams {
  school: string;
  student: string;
  targetYearLevel: ParentTargetYearLevel;
}

export interface ParentFitCheckAgeCap {
  ok: boolean;
  studentAge: number;
  maxAgeForLevel: number;
  minAge: number;
  reason?: 'age_year_mismatch';
}

export interface ParentFitCheckCricos {
  status: string;
  ok: boolean;
}

export interface ParentFitCheckResult {
  eligible: boolean;
  ageCap: ParentFitCheckAgeCap;
  cricos: ParentFitCheckCricos;
  hints: string[];
}

export type ParentEligibilityTone = 'eligible' | 'warning' | 'blocker';

export interface ParentCreateApplicationEligibility {
  form: UseFormReturn<ParentCreateApplicationFormValues>;
  fitCheck: ParentFitCheckResult | undefined;
  isFitCheckLoading: boolean;
  isHardBlocked: boolean;
}

export interface ParentCreateApplicationFormProps {
  students: StudentOption[];
  isLoadingStudents: boolean;
  presetSchool: SchoolOption | null;
  isSubmitting: boolean;
  onSubmit: (values: ParentCreateApplicationFormValues) => void;
}

export interface ParentStudentPickerFieldProps {
  control: Control<ParentCreateApplicationFormValues>;
  students: StudentOption[];
  isLoading: boolean;
}

export interface ParentSchoolPickerFieldProps {
  control: Control<ParentCreateApplicationFormValues>;
  presetSchool: SchoolOption | null;
}

export interface ParentApplicationEligibilityNoticeProps {
  fitCheck: ParentFitCheckResult | undefined;
  isLoading: boolean;
}
