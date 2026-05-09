import type {
  AustralianState,
  Curriculum,
  School,
} from '@/modules/school-search/types/school.types';

export const PRICE_MIN = 5000;
export const PRICE_MAX = 60000;

export const CURRICULUM_OPTIONS: readonly Curriculum[] = [
  'VCE',
  'HSC',
  'IB',
  'QCE',
  'WACE',
  'SACE',
] as const;

export const STATE_OPTIONS: readonly AustralianState[] = [
  'VIC',
  'NSW',
  'QLD',
  'SA',
  'WA',
  'TAS',
  'ACT',
  'NT',
] as const;

export const STATE_BOUNDS: Record<AustralianState, [[number, number], [number, number]]> = {
  VIC: [[-39.2, 140.9], [-33.9, 150.0]],
  NSW: [[-37.5, 141.0], [-28.1, 153.6]],
  QLD: [[-29.2, 138.0], [-10.0, 153.5]],
  SA:  [[-38.1, 129.0], [-26.0, 141.0]],
  WA:  [[-35.1, 112.9], [-13.7, 129.0]],
  TAS: [[-43.6, 144.5], [-39.5, 148.5]],
  ACT: [[-35.9, 148.7], [-35.1, 149.4]],
  NT:  [[-26.0, 129.0], [-10.9, 138.0]],
};

export const FILTER_CHIP_IDS = [
  'topRated',
  'boarding',
  'coed',
  'scholarships',
  'openDays',
] as const;

export type FilterChipId = (typeof FILTER_CHIP_IDS)[number];

export const MOCK_SCHOOLS: School[] = [
  {
    id: '1',
    name: 'Scotch College Melbourne',
    suburb: 'Hawthorn',
    state: 'VIC',
    tuitionAud: 38500,
    curriculum: 'VCE',
    isTopRated: true,
    isBoardingAvailable: false,
    isCoeducational: false,
    hasScholarships: true,
    hasOpenDays: true,
    lat: -37.82,
    lng: 145.03,
  },
  {
    id: '2',
    name: 'Sydney Grammar School',
    suburb: 'Darlinghurst',
    state: 'NSW',
    tuitionAud: 41200,
    curriculum: 'HSC',
    isTopRated: false,
    isBoardingAvailable: false,
    isCoeducational: false,
    hasScholarships: false,
    hasOpenDays: true,
    lat: -33.88,
    lng: 151.22,
  },
  {
    id: '3',
    name: 'Brisbane Grammar School',
    suburb: 'Spring Hill',
    state: 'QLD',
    tuitionAud: 32800,
    curriculum: 'QCE',
    isTopRated: true,
    isBoardingAvailable: true,
    isCoeducational: false,
    hasScholarships: true,
    hasOpenDays: false,
    lat: -27.46,
    lng: 153.02,
  },
];
