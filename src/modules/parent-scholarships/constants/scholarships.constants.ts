export const SCHOLARSHIP_TYPES = ['merit', 'need', 'sibling', 'regional'] as const;

export const SCHOLARSHIP_TYPE_LABEL_KEYS: Record<(typeof SCHOLARSHIP_TYPES)[number], string> = {
  merit: 'type_merit',
  need: 'type_need',
  sibling: 'type_sibling',
  regional: 'type_regional',
};

export const SCHOLARSHIP_YEAR_LEVELS = [
  'gr4',
  'gr5',
  'gr6',
  'yr7',
  'yr8',
  'yr9',
  'yr10',
  'yr11',
  'yr12',
] as const;

export const SCHOLARSHIP_YEAR_LEVEL_LABEL_KEYS: Record<
  (typeof SCHOLARSHIP_YEAR_LEVELS)[number],
  string
> = {
  gr4: 'yearLevel_gr4',
  gr5: 'yearLevel_gr5',
  gr6: 'yearLevel_gr6',
  yr7: 'yearLevel_yr7',
  yr8: 'yearLevel_yr8',
  yr9: 'yearLevel_yr9',
  yr10: 'yearLevel_yr10',
  yr11: 'yearLevel_yr11',
  yr12: 'yearLevel_yr12',
};

/** Radix Select forbids an empty value, so an explicit "any" sentinel maps to no filter. */
export const FACET_ANY = 'any';

export const SCHOLARSHIP_BROWSE_PAGE_SIZE = 50;
