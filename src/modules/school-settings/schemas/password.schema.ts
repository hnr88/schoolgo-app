import { z } from 'zod';
import { SCHOOL_PASSWORD_MIN_LENGTH } from '@/modules/school-settings/constants/school-settings.constants';

export const schoolPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    password: z
      .string()
      .min(SCHOOL_PASSWORD_MIN_LENGTH, `Password must be at least ${SCHOOL_PASSWORD_MIN_LENGTH} characters`),
    passwordConfirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export type SchoolPasswordValues = z.infer<typeof schoolPasswordSchema>;
