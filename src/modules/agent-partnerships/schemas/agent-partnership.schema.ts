import { z } from 'zod';

export const PARTNERSHIP_STATUSES = ['active', 'pending', 'denied', 'removed'] as const;
export const SCHOOL_PARTNERSHIP_STATUSES = ['none', ...PARTNERSHIP_STATUSES] as const;
export const PARTNERSHIP_REQUESTED_BY = ['school', 'agent'] as const;

const partnershipSchoolSchema = z.object({
  documentId: z.string(),
  name: z.string().nullish(),
  suburb: z.string().nullish(),
  state: z.string().nullish(),
});

export const agentPartnershipSchema = z.object({
  documentId: z.string(),
  status: z.enum(PARTNERSHIP_STATUSES),
  requestedBy: z.enum(PARTNERSHIP_REQUESTED_BY),
  approvedAt: z.string().nullish(),
  removedAt: z.string().nullish(),
  school: partnershipSchoolSchema.nullish(),
});

export const myPartnershipsResponseSchema = z.object({
  data: z.array(agentPartnershipSchema),
});

export const partnershipStatusResponseSchema = z.object({
  data: z.object({
    status: z.enum(SCHOOL_PARTNERSHIP_STATUSES),
    partnershipDocumentId: z.string().nullable(),
  }),
});
