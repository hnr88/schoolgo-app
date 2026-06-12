import { create } from 'zustand';
import { AGENT_PAGE_SIZE } from '@/modules/agent-search/constants/agent-search.constants';
import type { AgentSortBy } from '@/modules/agent-search/types/agent-search.types';

interface AgentSearchState {
  q: string;
  countriesServed: string[];
  languages: string[];
  services: string[];
  verifiedOnly: boolean;
  sortBy: AgentSortBy;
  page: number;
  pageSize: number;
  resetCount: number;

  setQuery: (q: string) => void;
  toggleCountry: (country: string) => void;
  toggleLanguage: (language: string) => void;
  toggleService: (service: string) => void;
  setVerifiedOnly: (value: boolean) => void;
  setSortBy: (sortBy: AgentSortBy) => void;
  setPage: (page: number) => void;
  reset: () => void;
}

const initialState = {
  q: '',
  countriesServed: [] as string[],
  languages: [] as string[],
  services: [] as string[],
  verifiedOnly: true,
  sortBy: 'relevance' as AgentSortBy,
  page: 1,
  pageSize: AGENT_PAGE_SIZE,
  resetCount: 0,
};

function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export const useAgentSearchStore = create<AgentSearchState>((set) => ({
  ...initialState,
  setQuery: (q) => set({ q, page: 1 }),
  toggleCountry: (country) =>
    set((s) => ({ countriesServed: toggleArrayItem(s.countriesServed, country), page: 1 })),
  toggleLanguage: (language) =>
    set((s) => ({ languages: toggleArrayItem(s.languages, language), page: 1 })),
  toggleService: (service) =>
    set((s) => ({ services: toggleArrayItem(s.services, service), page: 1 })),
  setVerifiedOnly: (verifiedOnly) => set({ verifiedOnly, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }),
  setPage: (page) => set({ page: Math.max(1, page) }),
  reset: () => set((s) => ({ ...initialState, resetCount: s.resetCount + 1 })),
}));
