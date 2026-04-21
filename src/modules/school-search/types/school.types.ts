export type AustralianState = 'VIC' | 'NSW' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'ACT' | 'NT';
export type Curriculum = 'VCE' | 'HSC' | 'IB' | 'QCE' | 'WACE' | 'SACE';

export interface School {
  id: string;
  name: string;
  suburb: string;
  state: AustralianState;
  tuitionAud: number;
  curriculum: Curriculum;
  isTopRated: boolean;
  isBoardingAvailable: boolean;
  isCoeducational: boolean;
  hasScholarships: boolean;
  hasOpenDays: boolean;
  /** Latitude for map pin */
  lat: number;
  /** Longitude for map pin */
  lng: number;
}

export interface SchoolFilters {
  query: string;
  priceMin: number;
  priceMax: number;
  curricula: Curriculum[];
  states: AustralianState[];
  englishTests: boolean;
  activeChips: string[];
}
