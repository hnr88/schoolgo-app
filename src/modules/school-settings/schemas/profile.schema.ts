import { z } from 'zod';

const PHONE_PATTERN = /^[+]?[0-9\s().-]{6,}$/;

export const schoolProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  phone: z
    .union([
      z.literal(''),
      z
        .string()
        .trim()
        .max(50, 'Phone must be 50 characters or fewer')
        .regex(PHONE_PATTERN, 'Enter a valid phone number'),
    ])
    .optional(),
});

export type SchoolProfileValues = z.infer<typeof schoolProfileSchema>;
