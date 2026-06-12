import { create } from 'zustand';
import type { SearchMode } from '@/modules/unified-search/types/unified-search.types';

interface SearchModeState {
  mode: SearchMode;
  setMode: (mode: SearchMode) => void;
}

export const useSearchModeStore = create<SearchModeState>((set) => ({
  mode: 'schools',
  setMode: (mode) => set({ mode }),
}));
