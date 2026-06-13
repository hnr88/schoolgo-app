import type { z } from 'zod';
import type {
  yieldScenarioSchema,
  yieldPlanIntakeSchema,
  waitlistStatusSchema,
  waitlistEntrySchema,
  addWaitlistSchema,
  promoteWaitlistSchema,
} from '@/modules/school-capacity-planner/schemas/capacity-planner.schema';

export type YieldScenario = z.infer<typeof yieldScenarioSchema>;
export type YieldPlanIntake = z.infer<typeof yieldPlanIntakeSchema>;
export type WaitlistStatus = z.infer<typeof waitlistStatusSchema>;
export type WaitlistEntry = z.infer<typeof waitlistEntrySchema>;
export type AddWaitlistFormValues = z.infer<typeof addWaitlistSchema>;
export type PromoteWaitlistFormValues = z.infer<typeof promoteWaitlistSchema>;
