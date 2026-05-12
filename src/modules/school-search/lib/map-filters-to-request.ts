import type {
  SearchRequest,
  SearchRequestFilters,
  TypedSearchRequest,
} from '@/modules/school-search/types/search-api.types';
import type { AustralianState, Curriculum } from '@/modules/school-search/types/school.types';
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
import { FEE_MIN, FEE_MAX } from '@/modules/school-search/constants/filter-options.constants';

interface MapBounds {
  lat: number;
  lng: number;
  radiusKm: number;
}

interface StoreState {
  query: string;
  suburb?: string;
  postcode?: string;
  feeMin?: number;
  feeMax?: number;
  states: AustralianState[];
  sectors?: Sector[];
  accommodation?: Accommodation[];
  religiousAffiliations?: ReligiousAffiliation[];
  entryYearLevels?: EntryYearLevel[];
  studentAge?: number | null;
  entryTerms?: EntryTerm[];
  programTypes?: ProgramType[];
  atarAvailable?: boolean;
  englishLanguageSupport?: boolean;
  englishTest?: EnglishTestScore | null;
  gender?: Gender[];
  sortBy?: SortOption;

  // Legacy mirrors
  priceMin: number;
  priceMax: number;
  curricula: Curriculum[];
  englishTests: boolean;
  activeChips: string[];
  mapBounds: MapBounds;
  geocodedQuery: string;
}

const CHIP_TO_FILTER: Record<string, Partial<SearchRequestFilters>> = {
  boarding: { boardingAvailable: true },
  coed: { gender: ['co_ed'] },
};

export function mapFiltersToRequest(store: StoreState): SearchRequest {
  const filters: SearchRequestFilters = {};

  if (store.states.length > 0) {
    filters.state = store.states;
  }

  const feeMin = store.feeMin ?? store.priceMin;
  const feeMax = store.feeMax ?? store.priceMax;
  const isFullRange = feeMin <= FEE_MIN && feeMax >= FEE_MAX;
  if (!isFullRange) {
    filters.tuitionAnnual = {
      ...(feeMin > FEE_MIN ? { min: feeMin } : {}),
      ...(feeMax < FEE_MAX ? { max: feeMax } : {}),
    };
  }

  if (store.sectors && store.sectors.length > 0) {
    const backendSectors = store.sectors
      .map((s): 'gov' | 'non_gov' | null => {
        if (s === 'government') return 'gov';
        if (s === 'non-government') return 'non_gov';
        return null;
      })
      .filter((s): s is 'gov' | 'non_gov' => s !== null);
    if (backendSectors.length > 0) filters.sector = backendSectors;
  }

  if (store.accommodation && store.accommodation.length > 0) {
    if (store.accommodation.includes('boarding') || store.accommodation.includes('both')) {
      filters.boardingAvailable = true;
    }
  }

  if (store.gender && store.gender.length > 0) {
    filters.gender = store.gender.map((g): 'boys' | 'girls' | 'co_ed' =>
      g === 'co-ed' ? 'co_ed' : g,
    );
  }

  if (store.englishLanguageSupport ?? store.englishTests) {
    filters.templateRequiresEnglishTest = true;
  }

  for (const chip of store.activeChips) {
    const mapped = CHIP_TO_FILTER[chip];
    if (mapped) Object.assign(filters, mapped);
  }

  const isLocationSearch = store.geocodedQuery !== '' && store.query === store.geocodedQuery;

  return {
    query: isLocationSearch ? '' : store.query,
    filters: Object.keys(filters).length > 0 ? filters : undefined,
    location: {
      lat: store.mapBounds.lat,
      lng: store.mapBounds.lng,
      radiusKm: store.mapBounds.radiusKm,
    },
    matchingStrategy: 'all',
    facets: true,
    limit: 500,
  };
}

export function mapFiltersToTypedRequest(store: StoreState): TypedSearchRequest {
  const request: TypedSearchRequest = {};

  const trimmedQuery = store.query.trim();
  if (trimmedQuery.length > 0) {
    request.q = trimmedQuery;
  }

  if (store.states.length > 0) {
    request.states = store.states;
  }

  if (store.suburb && store.suburb.length > 0) {
    request.suburb = store.suburb;
  }

  if (store.postcode && store.postcode.length > 0) {
    request.postcode = store.postcode;
  }

  if (store.sectors && store.sectors.length > 0) {
    request.sectors = store.sectors;
  }

  if (store.accommodation && store.accommodation.length > 0) {
    request.accommodation = store.accommodation;
  }

  if (store.religiousAffiliations && store.religiousAffiliations.length > 0) {
    request.religiousAffiliations = store.religiousAffiliations;
  }

  if (store.entryYearLevels && store.entryYearLevels.length > 0) {
    request.entryYearLevels = store.entryYearLevels;
  }

  if (store.studentAge !== null && store.studentAge !== undefined) {
    request.studentAge = store.studentAge;
  }

  if (store.entryTerms && store.entryTerms.length > 0) {
    request.entryTerms = store.entryTerms;
  }

  if (store.programTypes && store.programTypes.length > 0) {
    request.programTypes = store.programTypes;
  }

  if (store.atarAvailable === true) {
    request.atarAvailable = true;
  }

  if (store.englishLanguageSupport === true) {
    request.englishLanguageSupport = true;
  }

  if (store.englishTest) {
    request.englishTest = {
      type: store.englishTest.type,
      score: store.englishTest.score,
    };
  }

  const feeMin = store.feeMin ?? FEE_MIN;
  const feeMax = store.feeMax ?? FEE_MAX;
  if (feeMin > FEE_MIN) {
    request.feeMin = feeMin;
  }
  if (feeMax < FEE_MAX) {
    request.feeMax = feeMax;
  }

  if (store.sortBy) {
    request.sortBy = store.sortBy;
  }

  request.pageSize = 24;

  return request;
}
