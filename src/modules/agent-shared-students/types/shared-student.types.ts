import type { z } from 'zod';
import type {
  sharedStudentShareSchema,
  sharedStudentsResponseSchema,
  SHARED_STUDENT_STATUSES,
} from '@/modules/agent-shared-students/schemas/shared-student.schema';

export type SharedStudentStatus = (typeof SHARED_STUDENT_STATUSES)[number];
export type SharedStudentShare = z.infer<typeof sharedStudentShareSchema>;
export type SharedStudentsResponse = z.infer<typeof sharedStudentsResponseSchema>;
