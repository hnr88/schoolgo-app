import { z } from 'zod';
import { TUITION_LEVELS } from '@/modules/school-tuition-editor/constants/tuition-levels';

export const tuitionAmountSchema = z.number().int().min(0);

export const tuitionRowSchema = z.object({
  level: z.enum(TUITION_LEVELS),
  annualAmountAud: tuitionAmountSchema,
});

export const tuitionSavePayloadSchema = z.object({
  rows: z.array(tuitionRowSchema).min(1),
});

export type TuitionSaveInput = z.infer<typeof tuitionSavePayloadSchema>;

export const tuitionRowRecordSchema = z.object({
  documentId: z.string(),
  level: z.enum(TUITION_LEVELS),
  annualAmountAud: z.number(),
});

export const tuitionRowsResponseSchema = z.object({
  data: z.array(tuitionRowRecordSchema),
});

export const tuitionStaffMeSchema = z.object({
  documentId: z.string(),
  permissionLevel: z.enum(['admin', 'staff']),
});

export const tuitionStaffMeResponseSchema = z.object({
  data: tuitionStaffMeSchema,
});
