export const FIT_REPORT_YEAR_LEVELS = [
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

export const FIT_REPORT_YEAR_LEVEL_LABEL_KEYS: Record<
  (typeof FIT_REPORT_YEAR_LEVELS)[number],
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

export const MAX_FIT_REPORT_SCHOOLS = 20;
