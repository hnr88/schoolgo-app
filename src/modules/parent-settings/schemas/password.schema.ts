import { z } from 'zod';
import {
  PASSWORD_HAS_LETTER,
  PASSWORD_HAS_NUMBER,
  PASSWORD_MIN_LENGTH,
} from '@/modules/parent-settings/constants/parent-settings.constants';

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'passwordCurrentRequired'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, 'passwordMinLength')
      .refine((value) => PASSWORD_HAS_LETTER.test(value), 'passwordNeedsLetter')
      .refine((value) => PASSWORD_HAS_NUMBER.test(value), 'passwordNeedsNumber'),
    passwordConfirmation: z.string().min(1, 'passwordConfirmRequired'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'passwordMismatch',
    path: ['passwordConfirmation'],
  });

export type PasswordValues = z.infer<typeof passwordSchema>;
