import { FEE_MAX, FEE_MIN } from '@/modules/school-search/constants/filter-options.constants';
import type {
  Accommodation,
  EnglishTestScore,
  EntryTerm,
  EntryYearLevel,
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
  accommodation: Accommodation[];
  religiousAffiliations: ReligiousAffiliation[];
  entryYearLevels: EntryYearLevel[];
  studentAge: number | null;
  entryTerms: EntryTerm[];
  programTypes: ProgramType[];
  atarAvailable: boolean;
  englishLanguageSupport: boolean;
  englishTest: EnglishTestScore | null;
  feeMin: number;
  feeMax: number;
  sortBy: SortOption;
}

export function mapStoreToTypedRequest(
  store: SchoolSearchStoreSnapshot,
): TypedSearchRequest {
  const trimmedQuery = store.query.trim();
  const trimmedSuburb = store.suburb?.trim();
  const trimmedPostcode = store.postcode?.trim();

  return {
    q: trimmedQuery || undefined,
    states: store.states.length ? store.states : undefined,
    suburb: trimmedSuburb || undefined,
    postcode: trimmedPostcode || undefined,
    sectors: store.sectors.length ? store.sectors : undefined,
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
    englishTest: store.englishTest ?? undefined,
    feeMin: store.feeMin > FEE_MIN ? store.feeMin : undefined,
    feeMax: store.feeMax < FEE_MAX ? store.feeMax : undefined,
    sortBy: store.sortBy,
    page: 1,
    pageSize: 24,
  };
}
