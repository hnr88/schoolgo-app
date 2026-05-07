import type { SearchRequest, SearchRequestFilters } from '@/modules/school-search/types/search-api.types';
import type { AustralianState, Curriculum } from '@/modules/school-search/types/school.types';
import { PRICE_MIN, PRICE_MAX } from '@/modules/school-search/constants/school.constants';

interface StoreState {
  query: string;
  priceMin: number;
  priceMax: number;
  curricula: Curriculum[];
  states: AustralianState[];
  englishTests: boolean;
  activeChips: string[];
}

const CHIP_TO_FILTER: Record<string, Partial<SearchRequestFilters>> = {
  boarding: { boardingAvailable: true },
  coed: { gender: ['co_ed'] },
  scholarships: { scholarshipAvailable: true },
};

export function mapFiltersToRequest(store: StoreState): SearchRequest {
  const filters: SearchRequestFilters = {};

  if (store.states.length > 0) {
    filters.state = store.states;
  }

  const isFullRange = store.priceMin <= PRICE_MIN && store.priceMax >= PRICE_MAX;
  if (!isFullRange) {
    filters.lowestAnnualTuition = {
      ...(store.priceMin > PRICE_MIN ? { min: store.priceMin } : {}),
      ...(store.priceMax < PRICE_MAX ? { max: store.priceMax } : {}),
    };
  }

  if (store.englishTests) {
    filters.templateRequiresEnglishTest = true;
  }

  for (const chip of store.activeChips) {
    const mapped = CHIP_TO_FILTER[chip];
    if (mapped) Object.assign(filters, mapped);
  }

  return {
    query: store.query,
    filters: Object.keys(filters).length > 0 ? filters : undefined,
    facets: true,
    limit: 20,
  };
}
