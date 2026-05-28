import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@/modules/agent-settings/constants/agent-settings.constants';

export const agentPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
    passwordConfirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export type AgentPasswordValues = z.infer<typeof agentPasswordSchema>;
