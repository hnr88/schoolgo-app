import { z } from 'zod';

export const agentDeleteAccountSchema = z.object({
  password: z.string().min(1, 'deletePasswordRequired'),
});

export type AgentDeleteAccountValues = z.infer<typeof agentDeleteAccountSchema>;
