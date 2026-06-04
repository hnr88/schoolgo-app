import { z } from 'zod';
import { PHONE_PATTERN } from '@/modules/agent-settings/constants/agent-settings.constants';

export const agentProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'firstNameRequired').max(100, 'firstNameMax'),
  lastName: z.string().trim().min(1, 'lastNameRequired').max(100, 'lastNameMax'),
  phone: z
    .string()
    .trim()
    .max(50, 'phoneMax')
    .refine((value) => value === '' || PHONE_PATTERN.test(value), 'phoneInvalid')
    .or(z.literal('')),
});

export type AgentProfileValues = z.infer<typeof agentProfileSchema>;
