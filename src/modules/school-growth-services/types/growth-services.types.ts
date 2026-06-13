import type { z } from 'zod';
import type {
  growthEngagementSchema,
  growthEngagementStatusSchema,
  growthServiceCategorySchema,
  growthServiceSchema,
  purchaseEngagementResponseSchema,
  purchaseEngagementSchema,
} from '@/modules/school-growth-services/schemas/growth-services.schema';

export type GrowthServiceCategory = z.infer<typeof growthServiceCategorySchema>;

export type GrowthEngagementStatus = z.infer<typeof growthEngagementStatusSchema>;

export type GrowthService = z.infer<typeof growthServiceSchema>;

export type GrowthEngagement = z.infer<typeof growthEngagementSchema>;

export type PurchaseEngagementFormValues = z.infer<typeof purchaseEngagementSchema>;

export type PurchaseEngagementResult = z.infer<
  typeof purchaseEngagementResponseSchema
>['data'];
