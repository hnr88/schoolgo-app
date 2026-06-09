import type { z } from 'zod';
import type {
  readinessItemSchema,
  readinessResponseSchema,
  READINESS_ITEM_STATUSES,
  READINESS_ITEM_TYPES,
} from '@/modules/parent-enrolment-readiness/schemas/enrolment-readiness.schema';

export type ReadinessItem = z.infer<typeof readinessItemSchema>;
export type ReadinessResponse = z.infer<typeof readinessResponseSchema>;
export type ReadinessItemType = (typeof READINESS_ITEM_TYPES)[number];
export type ReadinessItemStatus = (typeof READINESS_ITEM_STATUSES)[number];

export interface ReadinessGroup {
  applicationDocumentId: string;
  schoolName: string | null;
  studentName: string | null;
  items: ReadinessItem[];
  approved: number;
  total: number;
}
