import { z } from 'zod';
import { PHONE_PATTERN } from '@/modules/parent-settings/constants/parent-settings.constants';

export const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'firstNameRequired').max(100),
  lastName: z.string().trim().min(1, 'lastNameRequired').max(100),
  phone: z
    .string()
    .trim()
    .max(50)
    .refine((value) => value === '' || PHONE_PATTERN.test(value), 'phoneInvalid')
    .or(z.literal('')),
});

export type ProfileValues = z.infer<typeof profileSchema>;
