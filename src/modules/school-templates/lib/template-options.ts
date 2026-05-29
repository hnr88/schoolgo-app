import type { TemplateStepType } from '@/modules/school-templates/types/school-templates.types';

export const STEP_TYPES: TemplateStepType[] = [
  'documents',
  'english_test',
  'fee',
  'personal_statement',
  'interview',
  'entrance_exam',
  'custom',
];

export const DOCUMENT_TYPES = [
  'passport',
  'birth_certificate',
  'school_reports',
  'transcript',
  'reference_letter',
  'financial_statement',
  'medical_certificate',
] as const;

export const ENGLISH_TEST_TYPES = [
  'ielts',
  'toefl',
  'pte',
  'aeas',
  'duolingo',
] as const;
