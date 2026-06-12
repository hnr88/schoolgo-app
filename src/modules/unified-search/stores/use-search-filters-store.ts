'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchFiltersUiState {
  /** whether the left filter sidebar is expanded; collapse it to enlarge the map */
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
}

export const useSearchFiltersStore = create<SearchFiltersUiState>()(
  persist(
    (set) => ({
      open: true,
      setOpen: (value) => set({ open: value }),
      toggle: () => set((state) => ({ open: !state.open })),
    }),
    {
      name: 'schoolgo-search-filters-open',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ open: state.open }),
    },
  ),
);
