import { z } from 'zod';
import {
  PASSWORD_HAS_LOWERCASE,
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_UPPERCASE,
  PASSWORD_MIN_LENGTH,
} from '@/modules/agent-settings/constants/agent-settings.constants';

export const agentPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'currentPasswordRequired'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, 'passwordMinLength')
      .refine((value) => PASSWORD_HAS_UPPERCASE.test(value), 'passwordNeedsUppercase')
      .refine((value) => PASSWORD_HAS_LOWERCASE.test(value), 'passwordNeedsLowercase')
      .refine((value) => PASSWORD_HAS_NUMBER.test(value), 'passwordNeedsNumber'),
    passwordConfirmation: z.string().min(1, 'confirmPasswordRequired'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'passwordMismatch',
    path: ['passwordConfirmation'],
  });

export type AgentPasswordValues = z.infer<typeof agentPasswordSchema>;
