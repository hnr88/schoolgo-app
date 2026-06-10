import { z } from 'zod';

export const claimSchema = z.object({
  schoolDocumentId: z.string().min(1),
  roleTitle: z.string().min(1),
});

export type ClaimValues = z.infer<typeof claimSchema>;
