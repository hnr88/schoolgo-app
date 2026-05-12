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
const sectorSchema = z.enum(['government', 'non-government', 'catholic']);
const accommodationSchema = z.enum(['boarding', 'homestay', 'both', 'none']);
const religiousAffiliationSchema = z.enum([
  'non-denominational',
  'anglican',
  'baptist',
  'lutheran',
  'uniting-church',
  'presbyterian',
  'islamic',
  'jewish',
  'buddhist',
  'coptic-orthodox',
  'greek-orthodox',
  'seventh-day-adventist',
  'quaker',
  'interdenominational-christian',
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
const programTypeSchema = z.enum(['australian-cert', 'ib', 'elicos']);
const englishTestTypeSchema = z.enum([
  'aeas',
  'idat',
  'duolingo',
  'ielts',
  'pte',
  'cambridge',
]);
const sortOptionSchema = z.enum([
  'name-asc',
  'tuition-asc',
  'tuition-desc',
  'state',
  'name-desc',
  'enrolment-status',
  'application-deadline-asc',
  'school-size-asc',
  'school-size-desc',
  'international-pct-asc',
  'international-pct-desc',
]);

const englishTestScoreBounds: Record<
  z.infer<typeof englishTestTypeSchema>,
  { min: number; max: number; step: number }
> = {
  aeas: { min: 1, max: 80, step: 1 },
  idat: { min: 1, max: 100, step: 1 },
  duolingo: { min: 10, max: 160, step: 5 },
  ielts: { min: 1.0, max: 9.0, step: 0.5 },
  pte: { min: 10, max: 90, step: 1 },
  cambridge: { min: 100, max: 230, step: 1 },
};

export const typedSearchRequestSchema = z
  .object({
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
        type: englishTestTypeSchema,
        score: z.number(),
      })
      .optional(),
    feeMin: z.number().min(0).max(200_000).optional(),
    feeMax: z.number().min(0).max(200_000).optional(),
    sortBy: sortOptionSchema.optional(),
    bbox: z
      .object({
        swLat: z.number().min(-90).max(90),
        swLng: z.number().min(-180).max(180),
        neLat: z.number().min(-90).max(90),
        neLng: z.number().min(-180).max(180),
      })
      .optional(),
    page: z.number().int().min(1).max(1000).optional(),
    pageSize: z.number().int().min(1).max(100).optional(),
  })
  .superRefine((value, ctx) => {
    if (!value.englishTest) {
      return;
    }
    const { type, score } = value.englishTest;
    const bounds = englishTestScoreBounds[type];
    if (!bounds) {
      return;
    }
    if (score < bounds.min || score > bounds.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Score for ${type} must be between ${bounds.min} and ${bounds.max}`,
        path: ['englishTest', 'score'],
      });
      return;
    }
    const offset = score - bounds.min;
    const remainder = Math.round((offset / bounds.step - Math.round(offset / bounds.step)) * 1e6);
    if (remainder !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Score for ${type} must be in increments of ${bounds.step}`,
        path: ['englishTest', 'score'],
      });
    }
  });

export type TypedSearchRequestInput = z.infer<typeof typedSearchRequestSchema>;
