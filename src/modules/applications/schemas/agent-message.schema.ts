import { z } from 'zod';
import { AGENT_MESSAGE_MAX_LENGTH } from '@/modules/applications/constants/agent-message.constants';

export const agentMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'composerRequired')
    .max(AGENT_MESSAGE_MAX_LENGTH, 'charCountExceeded'),
});

export type AgentMessageFormValues = z.infer<typeof agentMessageSchema>;
