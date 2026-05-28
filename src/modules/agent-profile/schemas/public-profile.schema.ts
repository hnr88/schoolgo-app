import { z } from 'zod';

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

export const publicProfileSchema = z.object({
  companyName: z.string().trim().min(1, 'Company name is required').max(255),
  roleTitle: optionalText(100),
  countryOfOperation: optionalText(100),
  qeacNumber: optionalText(50),
  phone: optionalText(50),
  website: optionalText(255),
  bio: z.string().trim().max(2000).optional().or(z.literal('')),
});

export type PublicProfileValues = z.infer<typeof publicProfileSchema>;
