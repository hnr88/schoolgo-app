import { z } from 'zod';

export const shareWithAgentSchema = z.object({
  agentDocumentId: z.string().trim().min(1, 'agentRequired'),
  note: z.string().trim().max(500).optional().or(z.literal('')),
});

export type ShareWithAgentFormValues = z.infer<typeof shareWithAgentSchema>;
