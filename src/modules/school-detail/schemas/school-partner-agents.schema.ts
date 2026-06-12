import { z } from 'zod';

export const schoolPartnerAgentSchema = z.object({
  documentId: z.string(),
  slug: z.string().nullable(),
  companyName: z.string().nullable(),
  displayName: z.string().nullable(),
  headline: z.string().nullable(),
  roleTitle: z.string().nullable(),
  countryOfOperation: z.string().nullable(),
  contactName: z.string(),
  photoUrl: z.string().nullable(),
  verified: z.boolean(),
  qeacValidationStatus: z.string().nullable(),
  yearsExperience: z.number().nullable(),
  approvedAt: z.string().nullable(),
});

export const schoolPartnerAgentsResponseSchema = z.object({
  data: z.array(schoolPartnerAgentSchema),
});

export type SchoolPartnerAgentsResponse = z.infer<typeof schoolPartnerAgentsResponseSchema>;
