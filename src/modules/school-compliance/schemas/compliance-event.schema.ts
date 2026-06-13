import { z } from 'zod';

export const complianceEventTypeSchema = z.enum([
  'issued',
  'started',
  'expiring_soon',
  'expired',
  'caaw_issued',
  'breach_flagged',
]);

export const complianceEventFormSchema = z.object({
  applicationDocumentId: z.string().min(1, 'required'),
  type: complianceEventTypeSchema,
  dueAt: z.string().optional(),
  note: z.string().max(2000).optional(),
});
