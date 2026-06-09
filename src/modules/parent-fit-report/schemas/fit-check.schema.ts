import { z } from 'zod';

export const fitCheckResultSchema = z.object({
  eligible: z.boolean(),
  ageCap: z.object({
    ok: z.boolean(),
    studentAge: z.number(),
    maxAgeForLevel: z.number(),
    minAge: z.number(),
    reason: z.literal('age_year_mismatch').optional(),
  }),
  cricos: z.object({
    status: z.string(),
    ok: z.boolean(),
  }),
  hints: z.array(z.string()),
});
