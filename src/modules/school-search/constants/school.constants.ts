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
