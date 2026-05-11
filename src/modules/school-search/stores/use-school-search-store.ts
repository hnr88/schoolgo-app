import { create } from 'zustand';
import type {
  AustralianState,
  Curriculum,
} from '@/modules/school-search/types/school.types';
import { PRICE_MIN, PRICE_MAX } from '@/modules/school-search/constants/school.constants';

interface MapBounds {
  lat: number;
  lng: number;
  radiusKm: number;
}

interface SchoolSearchState {
  query: string;
  priceMin: number;
  priceMax: number;
  curricula: Curriculum[];
  states: AustralianState[];
  englishTests: boolean;
  activeChips: string[];
  mapBounds: MapBounds;
  geocodedQuery: string;
  setQuery: (q: string) => void;
  setPriceRange: (min: number, max: number) => void;
  toggleCurriculum: (c: Curriculum) => void;
  toggleState: (s: AustralianState) => void;
  setEnglishTests: (value: boolean) => void;
  toggleChip: (id: string) => void;
  setMapBounds: (bounds: MapBounds) => void;
  setGeocodedQuery: (q: string) => void;
  resetCount: number;
  reset: () => void;
}

const DEFAULT_MAP_BOUNDS: MapBounds = {
  lat: -28,
  lng: 133,
  radiusKm: 5000,
};

const initialState = {
  query: '',
  priceMin: PRICE_MIN,
  priceMax: PRICE_MAX,
  curricula: [] as Curriculum[],
  states: [] as AustralianState[],
  englishTests: false,
  activeChips: [] as string[],
  mapBounds: DEFAULT_MAP_BOUNDS,
  geocodedQuery: '',
  resetCount: 0,
};

export const useSchoolSearchStore = create<SchoolSearchState>((set) => ({
  ...initialState,
  setQuery: (query) => set({ query }),
  setPriceRange: (priceMin, priceMax) =>
    set({
      priceMin: Math.max(PRICE_MIN, priceMin),
      priceMax: Math.min(PRICE_MAX, priceMax),
    }),
  toggleCurriculum: (c) =>
    set((s) => ({
      curricula: s.curricula.includes(c)
        ? s.curricula.filter((x) => x !== c)
        : [...s.curricula, c],
    })),
  toggleState: (st) =>
    set((s) => ({
      states: s.states.includes(st)
        ? s.states.filter((x) => x !== st)
        : [...s.states, st],
    })),
  setEnglishTests: (value) => set({ englishTests: value }),
  toggleChip: (id) =>
    set((s) => ({
      activeChips: s.activeChips.includes(id)
        ? s.activeChips.filter((x) => x !== id)
        : [...s.activeChips, id],
    })),
  setMapBounds: (mapBounds) => set({ mapBounds }),
  setGeocodedQuery: (geocodedQuery) => set({ geocodedQuery }),
  reset: () => set((s) => ({ ...initialState, resetCount: s.resetCount + 1 })),
}));
