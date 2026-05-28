import { z } from 'zod';

export const createApplicationSchema = z.object({
  student: z.string().min(1),
  school: z.string().min(1),
  targetYearLevel: z.string().min(1).max(20),
  targetIntake: z.string().min(1).max(50),
  boardingRequired: z.boolean(),
});

export type CreateApplicationFormValues = z.infer<typeof createApplicationSchema>;
