import { z } from 'zod';
import {
  PASSWORD_HAS_LOWERCASE,
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_UPPERCASE,
} from '@/modules/auth/constants/password-policy.constants';
import { SCHOOL_PASSWORD_MIN_LENGTH } from '@/modules/school-settings/constants/school-settings.constants';

export const schoolPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    password: z
      .string()
      .min(
        SCHOOL_PASSWORD_MIN_LENGTH,
        `Password must be at least ${SCHOOL_PASSWORD_MIN_LENGTH} characters`,
      )
      .regex(PASSWORD_HAS_UPPERCASE, 'Password must contain an uppercase letter')
      .regex(PASSWORD_HAS_LOWERCASE, 'Password must contain a lowercase letter')
      .regex(PASSWORD_HAS_NUMBER, 'Password must contain a number'),
    passwordConfirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export type SchoolPasswordValues = z.infer<typeof schoolPasswordSchema>;
