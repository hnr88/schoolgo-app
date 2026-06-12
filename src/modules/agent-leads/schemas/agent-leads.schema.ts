import { z } from 'zod';

export const LEAD_STATUSES = ['new', 'read', 'responded', 'closed'] as const;

export const leadStatusSchema = z.enum(LEAD_STATUSES);

export const agentLeadSchema = z.object({
  documentId: z.string(),
  parentName: z.string(),
  parentEmail: z.string(),
  parentPhone: z.string().nullish(),
  childAge: z.number().nullish(),
  message: z.string(),
  // Loosened from z.enum: an unknown backend status must not break the table.
  status: z.string(),
  createdAt: z.string(),
  school: z
    .object({
      documentId: z.string(),
      name: z.string().nullish(),
    })
    .nullish(),
});

export const agentLeadsResponseSchema = z.object({
  data: z.array(agentLeadSchema),
  meta: z.object({
    total: z.number().optional(),
  }),
});
