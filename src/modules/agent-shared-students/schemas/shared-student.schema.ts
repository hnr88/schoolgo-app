import { z } from 'zod';

export const SHARED_STUDENT_STATUSES = ['active', 'revoked'] as const;

const sharedStudentSubsetSchema = z.object({
  documentId: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  currentYearLevel: z.string().nullish(),
  parentGuardianName: z.string().nullish(),
});

export const sharedStudentShareSchema = z.object({
  documentId: z.string(),
  status: z.enum(SHARED_STUDENT_STATUSES),
  sharedAt: z.string().nullish(),
  revokedAt: z.string().nullish(),
  student: sharedStudentSubsetSchema.nullish(),
});

// /student-agent-shares/mine returns a bare { data: [...] } envelope.
export const sharedStudentsResponseSchema = z.object({
  data: z.array(sharedStudentShareSchema),
});
