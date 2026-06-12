import type { AustralianState } from '@/modules/school-search';

// Full state names so a free-text query like "victoria" can match the VIC
// region suggestion (the school dataset only stores the short code).
export const AU_STATE_NAMES: Record<AustralianState, string> = {
  NSW: 'New South Wales',
  VIC: 'Victoria',
  QLD: 'Queensland',
  SA: 'South Australia',
  WA: 'Western Australia',
  TAS: 'Tasmania',
  NT: 'Northern Territory',
  ACT: 'Australian Capital Territory',
};

export const AUTOCOMPLETE_STATE_ORDER: readonly AustralianState[] = [
  'NSW',
  'VIC',
  'QLD',
  'SA',
  'WA',
  'TAS',
  'NT',
  'ACT',
];

export const AUTOCOMPLETE_MAX_STATES = 3;
