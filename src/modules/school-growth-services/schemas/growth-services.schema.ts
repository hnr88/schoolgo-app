import { z } from 'zod';
import {
  GROWTH_BILLING_TYPES,
  GROWTH_ENGAGEMENT_STATUSES,
  GROWTH_SERVICE_CATEGORIES,
} from '@/modules/school-growth-services/constants/growth-services.constants';

export const growthServiceCategorySchema = z.enum(GROWTH_SERVICE_CATEGORIES).catch('profile');
export const growthBillingTypeSchema = z.enum(GROWTH_BILLING_TYPES).catch('oneoff');
export const growthEngagementStatusSchema = z.enum(GROWTH_ENGAGEMENT_STATUSES).catch('requested');

export const growthServiceSchema = z.object({
  documentId: z.string(),
  name: z.string(),
  category: growthServiceCategorySchema,
  description: z.string().nullable().default(null),
  priceAud: z.coerce.number(),
  billingType: growthBillingTypeSchema,
  active: z.boolean(),
  school: z
    .object({ documentId: z.string(), name: z.string().nullable().default(null) })
    .nullable()
    .default(null),
});

export const growthServicesResponseSchema = z.object({
  data: z.array(growthServiceSchema),
});

const engagementInvoiceSchema = z.object({
  documentId: z.string(),
  invoiceNumber: z.string().nullable().default(null),
  amountAud: z.coerce.number().nullable().default(null),
  status: z.string().nullable().default(null),
});

const engagementServiceSchema = z.object({
  documentId: z.string(),
  name: z.string(),
  category: growthServiceCategorySchema,
  priceAud: z.coerce.number().nullable().default(null),
  billingType: growthBillingTypeSchema,
});

export const growthEngagementSchema = z.object({
  documentId: z.string(),
  status: growthEngagementStatusSchema,
  startedAt: z.string().nullable().default(null),
  deliverables: z.record(z.string(), z.unknown()).nullable().default(null),
  createdAt: z.string(),
  growthService: engagementServiceSchema.nullable().default(null),
  invoice: engagementInvoiceSchema.nullable().default(null),
});

export const growthEngagementsResponseSchema = z.object({
  data: z.array(growthEngagementSchema),
});

export const purchaseEngagementSchema = z.object({
  growthService: z.string().min(1, 'required'),
});

export const purchaseEngagementResponseSchema = z.object({
  data: z.object({
    documentId: z.string(),
    status: growthEngagementStatusSchema,
    growthService: z.object({
      documentId: z.string(),
      name: z.string(),
      category: growthServiceCategorySchema,
      billingType: growthBillingTypeSchema,
    }),
    invoiceDocumentId: z.string(),
    amountAud: z.coerce.number(),
  }),
});
