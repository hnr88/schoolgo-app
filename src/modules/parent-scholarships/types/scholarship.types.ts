import type { z } from 'zod';
import type {
  scholarshipSchema,
  scholarshipBrowseResponseSchema,
  scholarshipMatchSchema,
  scholarshipMatchResponseSchema,
} from '@/modules/parent-scholarships/schemas/scholarship.schema';
import type {
  SCHOLARSHIP_TYPES,
  SCHOLARSHIP_YEAR_LEVELS,
} from '@/modules/parent-scholarships/constants/scholarships.constants';

export type Scholarship = z.infer<typeof scholarshipSchema>;
export type ScholarshipBrowseResponse = z.infer<typeof scholarshipBrowseResponseSchema>;
export type ScholarshipMatch = z.infer<typeof scholarshipMatchSchema>;
export type ScholarshipMatchResponse = z.infer<typeof scholarshipMatchResponseSchema>;

export type ScholarshipType = (typeof SCHOLARSHIP_TYPES)[number];
export type ScholarshipYearLevel = (typeof SCHOLARSHIP_YEAR_LEVELS)[number];

export interface ScholarshipFacets {
  type: ScholarshipType | null;
  yearLevel: ScholarshipYearLevel | null;
  nationality: string;
  minAmountAud: number | null;
  maxAmountAud: number | null;
}

export interface ScholarshipFacetParams {
  type?: ScholarshipType;
  yearLevel?: ScholarshipYearLevel;
  nationality?: string;
  minAmountAud?: number;
  maxAmountAud?: number;
}

export interface ScholarshipFacetControlsProps {
  facets: ScholarshipFacets;
  hasActiveFacets: boolean;
  onTypeChange: (type: ScholarshipType | null) => void;
  onYearLevelChange: (yearLevel: ScholarshipYearLevel | null) => void;
  onNationalityChange: (nationality: string) => void;
  onMinAmountChange: (minAmountAud: number | null) => void;
  onMaxAmountChange: (maxAmountAud: number | null) => void;
  onReset: () => void;
}
