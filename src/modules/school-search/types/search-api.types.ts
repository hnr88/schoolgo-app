import type { AustralianState } from '@/modules/school-search/types/school.types';

export interface SearchRequestFilters {
  state?: AustralianState[];
  schoolType?: ('combined' | 'primary' | 'secondary')[];
  sector?: ('gov' | 'non_gov')[];
  gender?: ('co_ed' | 'boys' | 'girls')[];
  yearLevels?: ('primary' | 'junior_secondary' | 'senior_secondary')[];
  yearLevelMatch?: 'any' | 'all';
  lowestAnnualTuition?: { min?: number; max?: number };
  tuitionAnnual?: { min?: number; max?: number };
  applicationFee?: { min?: number; max?: number };
  totalEnrolment?: { min?: number; max?: number };
  scholarshipAvailable?: boolean;
  boardingAvailable?: boolean;
  hasActiveApplicationTemplate?: boolean;
  hasOpenCapacity?: boolean;
  templateRequiresEnglishTest?: boolean;
  [key: string]: unknown;
}

export interface SearchRequest {
  query?: string;
  filters?: SearchRequestFilters;
  allOf?: SearchRequestFilters[];
  anyOf?: SearchRequestFilters[];
  noneOf?: SearchRequestFilters[];
  facets?: boolean | string[];
  sortBy?: string;
  location?: { lat: number; lng: number; radiusKm?: number };
  limit?: number;
  offset?: number;
  page?: number;
  matchingStrategy?: 'last' | 'all' | 'frequency';
}

export interface SchoolHit {
  documentId: string;
  name: string;
  slug: string;
  state: string;
  suburb: string;
  postcode: string;
  schoolType: string;
  sector: string;
  gender: string;
  lowestAnnualTuition: number | null;
  highestAnnualTuition: number | null;
  scholarshipAvailable: boolean;
  boardingAvailable: boolean;
  hasActiveApplicationTemplate: boolean;
  hasOpenCapacity: boolean;
  totalEnrolment: number | null;
  internationalStudentPercentage: number | null;
  religiousAffiliation: string | null;
  curriculumOffered: string | null;
  levelsOffered: string | null;
  yearLevelBands: string[];
  capacityBands: string[];
  _geo: { lat: number; lng: number } | null;
  _formatted?: Record<string, string>;
}

export interface FacetDistribution {
  [attribute: string]: Record<string, number>;
}

export interface FacetStats {
  [attribute: string]: { min: number; max: number };
}

export interface SearchResponse {
  data: {
    hits: SchoolHit[];
    query: string;
    processingTimeMs: number;
    limit: number;
    offset: number;
    estimatedTotalHits: number;
    totalHits?: number;
    facetDistribution?: FacetDistribution;
    facetStats?: FacetStats;
    filters?: string[];
    sort?: string[];
  };
}
