import { z } from 'zod';

export const tourFormSchema = z.object({
  title: z.string().trim().min(1).max(255),
  startsAt: z.string().min(1),
  location: z.string().trim().max(255).optional(),
  capacity: z.number().int().min(1),
  description: z.string().trim().optional(),
});

export type TourFormValues = z.infer<typeof tourFormSchema>;
