import { z } from 'zod';
import {
  AGENT_NOTIFICATION_DIGESTS,
  AGENT_NOTIFICATION_EVENTS,
} from '@/modules/agent-settings/constants/agent-settings.constants';

const channelSchema = z.object({
  inApp: z.boolean(),
  email: z.boolean(),
});

const eventsShape = AGENT_NOTIFICATION_EVENTS.reduce(
  (acc, event) => ({ ...acc, [event]: channelSchema }),
  {} as Record<(typeof AGENT_NOTIFICATION_EVENTS)[number], typeof channelSchema>,
);

export const agentNotificationsSchema = z.object({
  events: z.object(eventsShape),
  digest: z.enum(AGENT_NOTIFICATION_DIGESTS),
  sendOnEnter: z.boolean(),
  appendSignature: z.boolean(),
  signature: z.string().trim().max(500, 'signatureMax').optional().or(z.literal('')),
});

export type AgentNotificationsValues = z.infer<typeof agentNotificationsSchema>;
