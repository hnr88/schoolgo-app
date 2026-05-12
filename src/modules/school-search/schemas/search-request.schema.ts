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

const auStateSchema = z.enum(['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT']);
const sectorSchema = z.enum(['gov', 'non_gov', 'catholic']);
const accommodationSchema = z.enum(['boarding', 'homestay', 'both', 'none']);
const religiousAffiliationSchema = z.enum([
  'non_denominational',
  'anglican',
  'baptist',
  'lutheran',
  'uniting_church',
  'presbyterian',
  'islamic',
  'jewish',
  'buddhist',
  'coptic_orthodox',
  'greek_orthodox',
  'seventh_day_adventist',
  'quaker',
  'interdenominational_christian',
]);
const entryYearLevelSchema = z.enum([
  'gr4',
  'gr5',
  'gr6',
  'yr7',
  'yr8',
  'yr9',
  'yr10',
  'yr11',
  'yr12',
]);
const entryTermSchema = z.enum(['term1', 'term2', 'term3', 'term4']);
const programTypeSchema = z.enum(['australian_cert', 'ib', 'elicos']);
const englishTestTypeSchema = z.enum([
  'aeas',
  'idat',
  'duolingo',
  'ielts',
  'pte',
  'cambridge',
]);
const sortOptionSchema = z.enum([
  'name_asc',
  'tuition_low_high',
  'tuition_high_low',
  'state_asc',
  'name_desc',
  'enrolment_open_first',
  'application_deadline_asc',
  'school_size_asc',
  'school_size_desc',
  'international_pct_asc',
  'international_pct_desc',
]);

export const typedSearchRequestSchema = z.object({
  q: z.string().max(200).optional(),
  states: z.array(auStateSchema).max(8).optional(),
  suburb: z.string().max(120).optional(),
  postcode: z.string().max(8).optional(),
  sectors: z.array(sectorSchema).max(3).optional(),
  accommodation: z.array(accommodationSchema).max(4).optional(),
  religiousAffiliations: z.array(religiousAffiliationSchema).max(14).optional(),
  entryYearLevels: z.array(entryYearLevelSchema).max(9).optional(),
  studentAge: z.number().int().min(4).max(20).optional(),
  entryTerms: z.array(entryTermSchema).max(4).optional(),
  programTypes: z.array(programTypeSchema).max(3).optional(),
  atarAvailable: z.boolean().optional(),
  englishLanguageSupport: z.boolean().optional(),
  englishTest: z
    .object({
      testType: englishTestTypeSchema,
      score: z.number().min(0).max(300),
    })
    .optional(),
  feeMin: z.number().min(0).max(200_000).optional(),
  feeMax: z.number().min(0).max(200_000).optional(),
  sortBy: sortOptionSchema.optional(),
  bbox: z
    .object({
      north: z.number().min(-90).max(90),
      south: z.number().min(-90).max(90),
      east: z.number().min(-180).max(180),
      west: z.number().min(-180).max(180),
    })
    .optional(),
  page: z.number().int().min(1).max(1000).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
});

export type TypedSearchRequestInput = z.infer<typeof typedSearchRequestSchema>;
