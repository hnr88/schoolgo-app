import { z } from 'zod';

const filtersSchema = z.record(z.string(), z.unknown()).optional();

export const searchRequestSchema = z.object({
  query: z.string().max(200).optional().default(''),
  filters: filtersSchema,
  allOf: z.array(z.record(z.string(), z.unknown())).max(10).optional(),
  anyOf: z.array(z.record(z.string(), z.unknown())).max(10).optional(),
  noneOf: z.array(z.record(z.string(), z.unknown())).max(10).optional(),
  facets: z.union([z.boolean(), z.array(z.string().max(50)).max(30)]).optional(),
  sortBy: z.string().max(50).optional(),
  location: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      radiusKm: z.number().min(1).max(5000).optional(),
    })
    .optional(),
  limit: z.number().int().min(1).max(500).optional().default(20),
  offset: z.number().int().min(0).max(1000000).optional(),
  page: z.number().int().min(1).max(10000).optional(),
  matchingStrategy: z.enum(['last', 'all', 'frequency']).optional(),
});

export type SearchRequestInput = z.input<typeof searchRequestSchema>;
