import { create } from 'zustand';
import type {
  AustralianState,
  Curriculum,
} from '@/modules/school-search/types/school.types';
import type {
  Accommodation,
  EnglishTestScore,
  EntryTerm,
  EntryYearLevel,
  Gender,
  ProgramType,
  QuickChipId,
  ReligiousAffiliation,
  Sector,
  SortOption,
} from '@/modules/school-search/types/filter.types';
import {
  COMPARE_MAX_ADVANCED,
  FEE_MAX,
  FEE_MIN,
} from '@/modules/school-search/constants/filter-options.constants';

interface MapBounds {
  lat: number;
  lng: number;
  radiusKm: number;
}

interface SchoolSearchState {
  // free-text + location
  query: string;
  suburb: string;
  postcode: string;

  // fee range (canonical, top-bar slider writes here)
  feeMin: number;
  feeMax: number;

  // Group 1 — Location
  states: AustralianState[];

  // Group 2 — School profile
  sectors: Sector[];
  accommodation: Accommodation[];
  religiousAffiliations: ReligiousAffiliation[];

  // Group 3 — Enrolment & entry
  entryYearLevels: EntryYearLevel[];
  studentAge: number | null;
  entryTerms: EntryTerm[];

  // Group 4 — Academic
  programTypes: ProgramType[];
  atarAvailable: boolean;
  englishLanguageSupport: boolean;

  // Group 5 — English test scores
  englishTest: EnglishTestScore | null;

  // Top-bar quick chips (mirror multiple groups)
  quickChips: QuickChipId[];
  gender: Gender[];

  // Sort + selection
  sortBy: SortOption;
  compareList: string[];
  bookmarks: string[];

  // Legacy / map runtime state (used by existing map code; slated for cleanup)
  /** @deprecated alias for feeMin — remove in cleanup slice */
  priceMin: number;
  /** @deprecated alias for feeMax — remove in cleanup slice */
  priceMax: number;
  /** @deprecated curriculum is no longer a sidebar filter — kept until cleanup slice */
  curricula: Curriculum[];
  /** @deprecated renamed to englishLanguageSupport */
  englishTests: boolean;
  /** @deprecated replaced by quickChips */
  activeChips: string[];
  mapBounds: MapBounds;
  geocodedQuery: string;
  resetCount: number;

  // Setters — canonical
  setQuery: (q: string) => void;
  setSuburb: (suburb: string) => void;
  setPostcode: (postcode: string) => void;
  setFeeRange: (min: number, max: number) => void;
  toggleState: (s: AustralianState) => void;
  setStates: (states: AustralianState[]) => void;
  toggleSector: (s: Sector) => void;
  toggleAccommodation: (a: Accommodation) => void;
  toggleReligiousAffiliation: (r: ReligiousAffiliation) => void;
  toggleEntryYearLevel: (y: EntryYearLevel) => void;
  setEntryYearLevels: (levels: EntryYearLevel[]) => void;
  setStudentAge: (age: number | null) => void;
  toggleEntryTerm: (t: EntryTerm) => void;
  toggleProgramType: (p: ProgramType) => void;
  setAtarAvailable: (v: boolean) => void;
  setEnglishLanguageSupport: (v: boolean) => void;
  setEnglishTest: (test: EnglishTestScore | null) => void;
  setSortBy: (s: SortOption) => void;
  toggleCompare: (schoolId: string, max?: number) => boolean;
  isInCompare: (schoolId: string) => boolean;
  toggleBookmark: (schoolId: string) => void;
  isBookmarked: (schoolId: string) => boolean;
  toggleQuickChip: (id: QuickChipId) => void;
  toggleGender: (g: Gender) => void;

  // Legacy setters
  /** @deprecated use setFeeRange */
  setPriceRange: (min: number, max: number) => void;
  /** @deprecated curriculum no longer a filter */
  toggleCurriculum: (c: Curriculum) => void;
  /** @deprecated renamed to setEnglishLanguageSupport */
  setEnglishTests: (value: boolean) => void;
  /** @deprecated use toggleQuickChip */
  toggleChip: (id: string) => void;

  setMapBounds: (bounds: MapBounds) => void;
  setGeocodedQuery: (q: string) => void;
  reset: () => void;
}

const DEFAULT_MAP_BOUNDS: MapBounds = {
  lat: -28,
  lng: 133,
  radiusKm: 5000,
};

const initialState = {
  query: '',
  suburb: '',
  postcode: '',
  feeMin: FEE_MIN,
  feeMax: FEE_MAX,
  states: [] as AustralianState[],
  sectors: [] as Sector[],
  accommodation: [] as Accommodation[],
  religiousAffiliations: [] as ReligiousAffiliation[],
  entryYearLevels: [] as EntryYearLevel[],
  studentAge: null as number | null,
  entryTerms: [] as EntryTerm[],
  programTypes: [] as ProgramType[],
  atarAvailable: false,
  englishLanguageSupport: false,
  englishTest: null as EnglishTestScore | null,
  quickChips: [] as QuickChipId[],
  gender: [] as Gender[],
  sortBy: 'name-asc' as SortOption,
  compareList: [] as string[],
  bookmarks: [] as string[],

  // Legacy mirrors
  priceMin: FEE_MIN,
  priceMax: FEE_MAX,
  curricula: [] as Curriculum[],
  englishTests: false,
  activeChips: [] as string[],
  mapBounds: DEFAULT_MAP_BOUNDS,
  geocodedQuery: '',
  resetCount: 0,
};

function toggleArrayItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export const useSchoolSearchStore = create<SchoolSearchState>((set, get) => ({
  ...initialState,
  setQuery: (query) => set({ query }),
  setSuburb: (suburb) => set({ suburb }),
  setPostcode: (postcode) => set({ postcode }),
  setFeeRange: (feeMin, feeMax) =>
    set({
      feeMin: Math.max(FEE_MIN, feeMin),
      feeMax: Math.min(FEE_MAX, feeMax),
      priceMin: Math.max(FEE_MIN, feeMin),
      priceMax: Math.min(FEE_MAX, feeMax),
    }),
  toggleState: (st) => set((s) => ({ states: toggleArrayItem(s.states, st) })),
  setStates: (states) => set({ states }),
  toggleSector: (sec) => set((s) => ({ sectors: toggleArrayItem(s.sectors, sec) })),
  toggleAccommodation: (a) =>
    set((s) => ({ accommodation: toggleArrayItem(s.accommodation, a) })),
  toggleReligiousAffiliation: (r) =>
    set((s) => ({ religiousAffiliations: toggleArrayItem(s.religiousAffiliations, r) })),
  toggleEntryYearLevel: (y) =>
    set((s) => ({ entryYearLevels: toggleArrayItem(s.entryYearLevels, y) })),
  setEntryYearLevels: (entryYearLevels) => set({ entryYearLevels }),
  setStudentAge: (studentAge) => set({ studentAge }),
  toggleEntryTerm: (t) => set((s) => ({ entryTerms: toggleArrayItem(s.entryTerms, t) })),
  toggleProgramType: (p) =>
    set((s) => ({ programTypes: toggleArrayItem(s.programTypes, p) })),
  setAtarAvailable: (atarAvailable) => set({ atarAvailable }),
  setEnglishLanguageSupport: (englishLanguageSupport) =>
    set({ englishLanguageSupport, englishTests: englishLanguageSupport }),
  setEnglishTest: (englishTest) => set({ englishTest }),
  setSortBy: (sortBy) => set({ sortBy }),
  toggleCompare: (schoolId, max = COMPARE_MAX_ADVANCED) => {
    const current = get().compareList;
    if (current.includes(schoolId)) {
      set({ compareList: current.filter((id) => id !== schoolId) });
      return true;
    }
    if (current.length >= max) return false;
    set({ compareList: [...current, schoolId] });
    return true;
  },
  isInCompare: (schoolId) => get().compareList.includes(schoolId),
  toggleBookmark: (schoolId) =>
    set((s) => ({ bookmarks: toggleArrayItem(s.bookmarks, schoolId) })),
  isBookmarked: (schoolId) => get().bookmarks.includes(schoolId),
  toggleQuickChip: (id) => set((s) => ({ quickChips: toggleArrayItem(s.quickChips, id) })),
  toggleGender: (g) => set((s) => ({ gender: toggleArrayItem(s.gender, g) })),

  setPriceRange: (priceMin, priceMax) =>
    set({
      priceMin: Math.max(FEE_MIN, priceMin),
      priceMax: Math.min(FEE_MAX, priceMax),
      feeMin: Math.max(FEE_MIN, priceMin),
      feeMax: Math.min(FEE_MAX, priceMax),
    }),
  toggleCurriculum: (c) =>
    set((s) => ({ curricula: toggleArrayItem(s.curricula, c) })),
  setEnglishTests: (value) =>
    set({ englishTests: value, englishLanguageSupport: value }),
  toggleChip: (id) => set((s) => ({ activeChips: toggleArrayItem(s.activeChips, id) })),
  setMapBounds: (mapBounds) => set({ mapBounds }),
  setGeocodedQuery: (geocodedQuery) => set({ geocodedQuery }),
  reset: () => set((s) => ({ ...initialState, resetCount: s.resetCount + 1 })),
}));
