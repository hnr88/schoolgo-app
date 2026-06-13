import { z } from 'zod';
import type { SchemaTranslator } from '@/modules/school-profile/types/schema.types';

export const SCHOOL_TYPES = ['combined', 'primary', 'secondary'] as const;

export const SCHOOL_SECTORS = ['government', 'non-government', 'catholic'] as const;

export const SCHOOL_GENDERS = ['co_ed', 'boys', 'girls'] as const;

export const SCHOOL_ACCOMMODATIONS = ['boarding', 'homestay', 'both', 'none'] as const;

export const RELIGIOUS_AFFILIATIONS = [
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
] as const;

export function createKeyFactsSchema(t: SchemaTranslator) {
  return z.object({
    welcomeMessage: z
      .string()
      .trim()
      .max(5000, { message: t('welcomeMessageMax') })
      .optional()
      .or(z.literal('')),
    schoolType: z.enum(SCHOOL_TYPES).nullable(),
    sector: z.enum(SCHOOL_SECTORS).nullable(),
    gender: z.enum(SCHOOL_GENDERS).nullable(),
    accommodation: z.enum(SCHOOL_ACCOMMODATIONS).nullable(),
    religiousAffiliation: z.enum(RELIGIOUS_AFFILIATIONS).nullable(),
  });
}

export type KeyFactsValues = z.infer<ReturnType<typeof createKeyFactsSchema>>;
