import { z } from 'zod';

export const PARENT_TARGET_YEAR_LEVELS = [
  'gr4',
  'gr5',
  'gr6',
  'yr7',
  'yr8',
  'yr9',
  'yr10',
  'yr11',
  'yr12',
] as const;

export const PARENT_TARGET_INTAKES = ['term1', 'term2', 'term3', 'term4'] as const;

export const parentCreateApplicationSchema = z.object({
  student: z.string().trim().min(1, 'studentRequired'),
  school: z.string().trim().min(1, 'schoolRequired'),
  targetYearLevel: z.enum(PARENT_TARGET_YEAR_LEVELS, { message: 'targetYearLevelRequired' }),
  targetIntake: z.enum(PARENT_TARGET_INTAKES, { message: 'targetIntakeRequired' }),
  boardingRequired: z.boolean(),
});

export type ParentCreateApplicationFormValues = z.infer<typeof parentCreateApplicationSchema>;
