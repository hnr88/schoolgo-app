import { z } from 'zod';

export const createApplicationSchema = z.object({
  student: z.string().min(1),
  school: z.string().min(1),
  targetYearLevel: z.string().min(1).max(20),
  targetIntake: z.string().min(1).max(50),
  boardingRequired: z.boolean(),
});

export type CreateApplicationFormValues = z.infer<typeof createApplicationSchema>;

export const bulkCreateApplicationSchema = z.object({
  student: z.string().min(1),
  schools: z.array(z.string().min(1)).min(1).max(20),
  targetYearLevel: z.string().min(1).max(20),
  targetIntake: z.string().min(1).max(50),
  boardingRequired: z.boolean(),
});

export type BulkCreateApplicationFormValues = z.infer<typeof bulkCreateApplicationSchema>;
