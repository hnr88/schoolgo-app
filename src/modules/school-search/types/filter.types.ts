export type Sector = 'government' | 'non-government' | 'catholic';

export type Accommodation = 'boarding' | 'homestay' | 'both' | 'none';

export type ReligiousAffiliation =
  | 'non-denominational'
  | 'anglican'
  | 'baptist'
  | 'lutheran'
  | 'uniting-church'
  | 'presbyterian'
  | 'islamic'
  | 'jewish'
  | 'buddhist'
  | 'coptic-orthodox'
  | 'greek-orthodox'
  | 'seventh-day-adventist'
  | 'quaker'
  | 'interdenominational-christian';

export type EntryYearLevel =
  | 'gr4'
  | 'gr5'
  | 'gr6'
  | 'yr7'
  | 'yr8'
  | 'yr9'
  | 'yr10'
  | 'yr11'
  | 'yr12';

export type EntryTerm = 'term1' | 'term2' | 'term3' | 'term4';

export type ProgramType = 'australian-cert' | 'ib' | 'elicos';

export type EnglishTestType =
  | 'aeas'
  | 'idat'
  | 'duolingo'
  | 'ielts'
  | 'pte'
  | 'cambridge';

export type Gender = 'boys' | 'girls' | 'co-ed';

export type SchoolLevel = 'primary' | 'secondary';

export type EnrolmentStatus = 'open' | 'limited' | 'waitlist' | 'closed';

export type CurriculumCode =
  | 'VCE'
  | 'HSC'
  | 'QCE'
  | 'SACE'
  | 'WACE'
  | 'TCE'
  | 'NTCET'
  | 'BSSS'
  | 'IB';

export type QuickChipId =
  | 'boys'
  | 'girls'
  | 'co-ed'
  | 'primary'
  | 'secondary'
  | 'boarding';

export type SortOption =
  | 'name-asc'
  | 'tuition-asc'
  | 'tuition-desc'
  | 'state'
  | 'name-desc'
  | 'enrolment-status'
  | 'application-deadline-asc'
  | 'school-size-asc'
  | 'school-size-desc'
  | 'international-pct-asc'
  | 'international-pct-desc';

export interface EnglishTestScore {
  type: EnglishTestType;
  score: number;
}
