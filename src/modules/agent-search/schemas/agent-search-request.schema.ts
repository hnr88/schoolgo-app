import { z } from 'zod';

const agentSortBySchema = z.enum([
  'relevance',
  'experience',
  'name_asc',
  'name_desc',
  'recently_verified',
]);

export const agentSearchRequestSchema = z.object({
  q: z.string().max(200).optional(),
  countriesServed: z.array(z.string().max(100)).max(20).optional(),
  languages: z.array(z.string().max(100)).max(20).optional(),
  services: z.array(z.string().max(100)).max(20).optional(),
  verifiedOnly: z.boolean().optional(),
  sortBy: agentSortBySchema.optional(),
  page: z.number().int().min(1).max(10_000).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
});

export type AgentSearchRequestInput = z.infer<typeof agentSearchRequestSchema>;
