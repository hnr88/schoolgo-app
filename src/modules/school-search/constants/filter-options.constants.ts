import type {
  Accommodation,
  EnglishTestType,
  EntryTerm,
  EntryYearLevel,
  Gender,
  ProgramType,
  QuickChipId,
  ReligiousAffiliation,
  SchoolLevel,
  Sector,
  SortOption,
} from '@/modules/school-search/types/filter.types';
import type { AustralianState } from '@/modules/school-search/types/school.types';

export interface FilterOption<T extends string> {
  value: T;
  labelKey: string;
}

export const SECTOR_OPTIONS: readonly FilterOption<Sector>[] = [
  { value: 'government', labelKey: 'sector.government' },
  { value: 'non-government', labelKey: 'sector.nonGovernment' },
  { value: 'catholic', labelKey: 'sector.catholic' },
] as const;

export const ACCOMMODATION_OPTIONS: readonly FilterOption<Accommodation>[] = [
  { value: 'boarding', labelKey: 'accommodation.boarding' },
  { value: 'homestay', labelKey: 'accommodation.homestay' },
  { value: 'both', labelKey: 'accommodation.both' },
  { value: 'none', labelKey: 'accommodation.none' },
] as const;

export const RELIGIOUS_AFFILIATION_DEFAULT: readonly FilterOption<ReligiousAffiliation>[] = [
  { value: 'non-denominational', labelKey: 'religion.nonDenominational' },
  { value: 'anglican', labelKey: 'religion.anglican' },
  { value: 'baptist', labelKey: 'religion.baptist' },
  { value: 'lutheran', labelKey: 'religion.lutheran' },
  { value: 'uniting-church', labelKey: 'religion.unitingChurch' },
  { value: 'presbyterian', labelKey: 'religion.presbyterian' },
  { value: 'islamic', labelKey: 'religion.islamic' },
] as const;

export const RELIGIOUS_AFFILIATION_EXTRA: readonly FilterOption<ReligiousAffiliation>[] = [
  { value: 'jewish', labelKey: 'religion.jewish' },
  { value: 'buddhist', labelKey: 'religion.buddhist' },
  { value: 'coptic-orthodox', labelKey: 'religion.copticOrthodox' },
  { value: 'greek-orthodox', labelKey: 'religion.greekOrthodox' },
  { value: 'seventh-day-adventist', labelKey: 'religion.seventhDayAdventist' },
  { value: 'quaker', labelKey: 'religion.quaker' },
  { value: 'interdenominational-christian', labelKey: 'religion.interdenominationalChristian' },
] as const;

export const ENTRY_YEAR_LEVEL_OPTIONS: readonly FilterOption<EntryYearLevel>[] = [
  { value: 'gr4', labelKey: 'yearLevel.gr4' },
  { value: 'gr5', labelKey: 'yearLevel.gr5' },
  { value: 'gr6', labelKey: 'yearLevel.gr6' },
  { value: 'yr7', labelKey: 'yearLevel.yr7' },
  { value: 'yr8', labelKey: 'yearLevel.yr8' },
  { value: 'yr9', labelKey: 'yearLevel.yr9' },
  { value: 'yr10', labelKey: 'yearLevel.yr10' },
  { value: 'yr11', labelKey: 'yearLevel.yr11' },
  { value: 'yr12', labelKey: 'yearLevel.yr12' },
] as const;

export const PRIMARY_YEAR_LEVELS: readonly EntryYearLevel[] = ['gr4', 'gr5', 'gr6'] as const;
export const SECONDARY_YEAR_LEVELS: readonly EntryYearLevel[] = [
  'yr7',
  'yr8',
  'yr9',
  'yr10',
  'yr11',
  'yr12',
] as const;

export const ENTRY_TERM_OPTIONS: readonly FilterOption<EntryTerm>[] = [
  { value: 'term1', labelKey: 'entryTerm.term1' },
  { value: 'term2', labelKey: 'entryTerm.term2' },
  { value: 'term3', labelKey: 'entryTerm.term3' },
  { value: 'term4', labelKey: 'entryTerm.term4' },
] as const;

export const PROGRAM_TYPE_OPTIONS: readonly FilterOption<ProgramType>[] = [
  { value: 'australian-cert', labelKey: 'programType.australianCert' },
  { value: 'ib', labelKey: 'programType.ib' },
  { value: 'elicos', labelKey: 'programType.elicos' },
] as const;

export const ENGLISH_TEST_OPTIONS: readonly FilterOption<EnglishTestType>[] = [
  { value: 'aeas', labelKey: 'englishTest.aeas' },
  { value: 'idat', labelKey: 'englishTest.idat' },
  { value: 'duolingo', labelKey: 'englishTest.duolingo' },
  { value: 'ielts', labelKey: 'englishTest.ielts' },
  { value: 'pte', labelKey: 'englishTest.pte' },
  { value: 'cambridge', labelKey: 'englishTest.cambridge' },
] as const;

export const ENGLISH_TEST_CONFIG: Record<
  EnglishTestType,
  { min: number; max: number; step: number }
> = {
  aeas: { min: 1, max: 80, step: 1 },
  idat: { min: 1, max: 100, step: 1 },
  duolingo: { min: 10, max: 160, step: 5 },
  ielts: { min: 1.0, max: 9.0, step: 0.5 },
  pte: { min: 10, max: 90, step: 1 },
  cambridge: { min: 100, max: 230, step: 1 },
};

export const GENDER_OPTIONS: readonly FilterOption<Gender>[] = [
  { value: 'boys', labelKey: 'gender.boys' },
  { value: 'girls', labelKey: 'gender.girls' },
  { value: 'co-ed', labelKey: 'gender.coEd' },
] as const;

export const SCHOOL_LEVEL_OPTIONS: readonly FilterOption<SchoolLevel>[] = [
  { value: 'primary', labelKey: 'schoolLevel.primary' },
  { value: 'secondary', labelKey: 'schoolLevel.secondary' },
] as const;

export const QUICK_CHIP_OPTIONS: readonly FilterOption<QuickChipId>[] = [
  { value: 'boys', labelKey: 'quickChip.boys' },
  { value: 'girls', labelKey: 'quickChip.girls' },
  { value: 'co-ed', labelKey: 'quickChip.coEd' },
  { value: 'primary', labelKey: 'quickChip.primary' },
  { value: 'secondary', labelKey: 'quickChip.secondary' },
  { value: 'boarding', labelKey: 'quickChip.boarding' },
] as const;

export const STUDENT_AGE_MIN = 4;
export const STUDENT_AGE_MAX = 20;

export const FEE_MIN = 5000;
export const FEE_MAX = 60000;

export const COMPARE_MAX_BASIC = 3;
export const COMPARE_MAX_ADVANCED = 4;

export const BASIC_SORT_OPTIONS: readonly FilterOption<SortOption>[] = [
  { value: 'name-asc', labelKey: 'sort.nameAsc' },
  { value: 'tuition-asc', labelKey: 'sort.tuitionAsc' },
  { value: 'tuition-desc', labelKey: 'sort.tuitionDesc' },
  { value: 'state', labelKey: 'sort.state' },
] as const;

export const ADVANCED_SORT_OPTIONS: readonly FilterOption<SortOption>[] = [
  ...BASIC_SORT_OPTIONS,
  { value: 'name-desc', labelKey: 'sort.nameDesc' },
  { value: 'enrolment-status', labelKey: 'sort.enrolmentStatus' },
  { value: 'application-deadline-asc', labelKey: 'sort.applicationDeadlineAsc' },
  { value: 'school-size-asc', labelKey: 'sort.schoolSizeAsc' },
  { value: 'school-size-desc', labelKey: 'sort.schoolSizeDesc' },
  { value: 'international-pct-asc', labelKey: 'sort.internationalPctAsc' },
  { value: 'international-pct-desc', labelKey: 'sort.internationalPctDesc' },
] as const;

export const STATE_FILTER_ORDER: readonly AustralianState[] = [
  'QLD',
  'NSW',
  'VIC',
  'SA',
  'WA',
  'TAS',
  'NT',
  'ACT',
] as const;

export const STATE_FILTER_OPTIONS: readonly FilterOption<AustralianState>[] =
  STATE_FILTER_ORDER.map((value) => ({ value, labelKey: value }));
