import { z } from 'zod';

export const autocompleteSuburbsQuerySchema = z.object({
  q: z.string().min(1).max(200),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

export type AutocompleteSuburbsQuery = z.infer<typeof autocompleteSuburbsQuerySchema>;
