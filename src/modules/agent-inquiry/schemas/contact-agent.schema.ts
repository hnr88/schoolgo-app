import { z } from 'zod';

import {
  CHILD_AGE_MAX,
  CHILD_AGE_MIN,
  MESSAGE_MAX,
} from '@/modules/agent-inquiry/constants/agent-inquiry.constants';

export const contactAgentSchema = z.object({
  parentName: z.string().trim().min(1).max(120),
  parentEmail: z.string().trim().email().max(255),
  parentPhone: z.string().trim().max(40).optional().or(z.literal('')),
  childAge: z.number().int().min(CHILD_AGE_MIN).max(CHILD_AGE_MAX).optional(),
  message: z.string().trim().min(1).max(MESSAGE_MAX),
});

export type ContactAgentFormValues = z.infer<typeof contactAgentSchema>;
