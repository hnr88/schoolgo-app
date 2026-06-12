import { z } from 'zod';

export const autocompleteAgentsQuerySchema = z.object({
  q: z.string().min(1).max(200),
  limit: z.coerce.number().int().min(1).max(20).default(10),
});

export type AutocompleteAgentsQuery = z.infer<typeof autocompleteAgentsQuerySchema>;
