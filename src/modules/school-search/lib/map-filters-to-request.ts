import type { SearchRequest, SearchRequestFilters } from '@/modules/school-search/types/search-api.types';
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
    const backendSectors = store.sectors.filter((s): s is 'gov' | 'non_gov' =>
      s === 'gov' || s === 'non_gov',
    );
    if (backendSectors.length > 0) filters.sector = backendSectors;
  }

  if (store.accommodation && store.accommodation.length > 0) {
    if (store.accommodation.includes('boarding') || store.accommodation.includes('both')) {
      filters.boardingAvailable = true;
    }
  }

  if (store.gender && store.gender.length > 0) {
    filters.gender = store.gender;
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
