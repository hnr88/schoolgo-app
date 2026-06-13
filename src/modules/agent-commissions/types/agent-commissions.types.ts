import type { z } from 'zod';
import type {
  COMMISSION_MILESTONES,
  COMMISSION_STATUSES,
  commissionRowSchema,
  commissionSummarySchema,
  commissionsListResponseSchema,
} from '@/modules/agent-commissions/schemas/agent-commissions.schema';

export type CommissionStatus = (typeof COMMISSION_STATUSES)[number];
export type CommissionMilestone = (typeof COMMISSION_MILESTONES)[number];

export type CommissionRow = z.infer<typeof commissionRowSchema>;
export type CommissionSummary = z.infer<typeof commissionSummarySchema>;
export type CommissionsListResponse = z.infer<typeof commissionsListResponseSchema>;

export interface CommissionFilters {
  status: CommissionStatus | 'all';
  milestone: CommissionMilestone | 'all';
}
