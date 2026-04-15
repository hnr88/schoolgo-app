import { create } from 'zustand';
import type {
  AustralianState,
  Curriculum,
} from '@/modules/school-search/types/school.types';
import {
  PRICE_MIN,
  PRICE_MAX,
} from '@/modules/school-search/constants/school.constants';

interface SchoolSearchState {
  query: string;
  priceMin: number;
  priceMax: number;
  curricula: Curriculum[];
  states: AustralianState[];
  diagnosticTests: boolean;
  activeChips: string[];
  setQuery: (q: string) => void;
  setPriceRange: (min: number, max: number) => void;
  toggleCurriculum: (c: Curriculum) => void;
  toggleState: (s: AustralianState) => void;
  setDiagnosticTests: (value: boolean) => void;
  toggleChip: (id: string) => void;
  reset: () => void;
}

const initialState = {
  query: '',
  priceMin: 15000,
  priceMax: 45000,
  curricula: ['VCE'] as Curriculum[],
  states: ['VIC', 'NSW'] as AustralianState[],
  diagnosticTests: true,
  activeChips: ['top-rated'],
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
  setDiagnosticTests: (value) => set({ diagnosticTests: value }),
  toggleChip: (id) =>
    set((s) => ({
      activeChips: s.activeChips.includes(id)
        ? s.activeChips.filter((x) => x !== id)
        : [...s.activeChips, id],
    })),
  reset: () => set(initialState),
}));
