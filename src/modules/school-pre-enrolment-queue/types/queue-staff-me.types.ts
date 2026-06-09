import type { z } from 'zod';
import type {
  queueStaffMeResponseSchema,
  queueStaffMeSchema,
} from '@/modules/school-pre-enrolment-queue/schemas/pre-enrolment-queue.schema';

export type QueueStaffMe = z.infer<typeof queueStaffMeSchema>;

export type QueueStaffMeResponse = z.infer<typeof queueStaffMeResponseSchema>;
