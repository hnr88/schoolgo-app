import { PUBLIC_ONLY } from '@/lib/deliverable-config';
import { FEE_MAX, FEE_MIN } from '@/modules/school-search/constants/filter-options.constants';
import { stripAdvancedFields } from '@/modules/school-search/lib/search-capabilities';
import type {
  Accommodation,
  EnglishTestScore,
  EntryTerm,
  EntryYearLevel,
  Gender,
  ProgramType,
  ReligiousAffiliation,
  Sector,
  SortOption,
} from '@/modules/school-search/types/filter.types';
import type { TypedSearchRequest } from '@/modules/school-search/types/search-api.types';
import type { AustralianState } from '@/modules/school-search/types/school.types';

export interface SchoolSearchStoreSnapshot {
  query: string;
  suburb: string;
  postcode: string;
  states: AustralianState[];
  sectors: Sector[];
  gender?: Gender[];
  accommodation: Accommodation[];
  religiousAffiliations: ReligiousAffiliation[];
  entryYearLevels: EntryYearLevel[];
  studentAge: number | null;
  entryTerms: EntryTerm[];
  programTypes: ProgramType[];
  atarAvailable: boolean;
  englishLanguageSupport: boolean;
  scholarshipAvailable: boolean;
  englishTest: EnglishTestScore | null;
  feeMin: number;
  feeMax: number;
  sortBy: SortOption;
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function isLocationDisplayQuery(query: string, suburb: string, postcode: string): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery || !suburb) return false;

  const normalizedSuburb = normalizeSearchText(suburb);
  const normalizedPostcode = normalizeSearchText(postcode);
  const locationLabels = [
    normalizedSuburb,
    normalizedPostcode,
    `${normalizedSuburb}${normalizedPostcode}`,
  ];

  return locationLabels.includes(normalizedQuery);
}

export function mapStoreToTypedRequest(
  store: SchoolSearchStoreSnapshot,
  isAuthenticated: boolean,
): TypedSearchRequest {
  const trimmedQuery = store.query.trim();
  const trimmedSuburb = store.suburb?.trim();
  const trimmedPostcode = store.postcode?.trim();
  const shouldSendQuery = !isLocationDisplayQuery(
    trimmedQuery,
    trimmedSuburb,
    trimmedPostcode,
  );

  const request: TypedSearchRequest = {
    q: shouldSendQuery ? trimmedQuery || undefined : undefined,
    states: store.states.length ? store.states : undefined,
    suburb: trimmedSuburb || undefined,
    postcode: trimmedPostcode || undefined,
    sectors: store.sectors.length ? store.sectors : undefined,
    gender: store.gender?.length
      ? store.gender.map((g) => (g === 'co-ed' ? 'co_ed' : g))
      : undefined,
    accommodation: store.accommodation.length ? store.accommodation : undefined,
    religiousAffiliations: store.religiousAffiliations.length
      ? store.religiousAffiliations
      : undefined,
    entryYearLevels: store.entryYearLevels.length ? store.entryYearLevels : undefined,
    studentAge: store.studentAge ?? undefined,
    entryTerms: store.entryTerms.length ? store.entryTerms : undefined,
    programTypes: store.programTypes.length ? store.programTypes : undefined,
    atarAvailable: store.atarAvailable || undefined,
    englishLanguageSupport: store.englishLanguageSupport || undefined,
    scholarshipAvailable: store.scholarshipAvailable || undefined,
    englishTest: store.englishTest ?? undefined,
    feeMin: store.feeMin > FEE_MIN ? store.feeMin : undefined,
    feeMax: store.feeMax < FEE_MAX ? store.feeMax : undefined,
    sortBy: store.sortBy,
    page: 1,
    pageSize: 24,
  };

  return stripAdvancedFields(request, PUBLIC_ONLY || isAuthenticated);
}
