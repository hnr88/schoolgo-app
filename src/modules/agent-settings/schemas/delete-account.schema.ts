import { z } from 'zod';

export const agentDeleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required to delete your account'),
});

export type AgentDeleteAccountValues = z.infer<typeof agentDeleteAccountSchema>;
