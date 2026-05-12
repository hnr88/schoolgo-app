import { z } from 'zod';

export const createSavedSearchSchema = z.object({
  name: z.string().min(1).max(100),
  filterState: z.record(z.string(), z.unknown()),
});

export type CreateSavedSearchInputDto = z.infer<typeof createSavedSearchSchema>;
