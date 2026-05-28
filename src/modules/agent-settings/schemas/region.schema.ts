import { z } from 'zod';
import {
  AGENT_DATE_FORMATS,
  AGENT_INTERFACE_LANGUAGES,
  AGENT_TIMEZONES,
} from '@/modules/agent-settings/constants/agent-settings.constants';

export const agentRegionSchema = z.object({
  interfaceLanguage: z.enum(AGENT_INTERFACE_LANGUAGES),
  timezone: z.enum(AGENT_TIMEZONES),
  dateFormat: z.enum(AGENT_DATE_FORMATS),
});

export type AgentRegionValues = z.infer<typeof agentRegionSchema>;
