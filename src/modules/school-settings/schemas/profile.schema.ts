import { z } from 'zod';

export const schoolProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
});

export type SchoolProfileValues = z.infer<typeof schoolProfileSchema>;
