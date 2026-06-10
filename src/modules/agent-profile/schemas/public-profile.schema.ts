import { z } from 'zod';

const optionalText = (max: number, maxKey: string) =>
  z.string().trim().max(max, maxKey).optional().or(z.literal(''));

export const publicProfileSchema = z.object({
  companyName: z.string().trim().min(1, 'companyNameRequired').max(255, 'companyNameMax'),
  roleTitle: optionalText(100, 'roleTitleMax'),
  countryOfOperation: optionalText(100, 'countryMax'),
  qeacNumber: optionalText(50, 'qeacNumberMax'),
  phone: optionalText(50, 'phoneMax'),
  website: optionalText(255, 'websiteMax'),
  bio: z.string().trim().max(2000, 'bioMax').optional().or(z.literal('')),
});

export type PublicProfileValues = z.infer<typeof publicProfileSchema>;
