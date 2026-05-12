import { z } from 'zod';

export const autocompleteSchoolsQuerySchema = z.object({
  q: z.string().min(1).max(200),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

export type AutocompleteSchoolsQuery = z.infer<typeof autocompleteSchoolsQuerySchema>;
