export type Sector = 'gov' | 'non_gov' | 'catholic';

export type Accommodation = 'boarding' | 'homestay' | 'both' | 'none';

export type ReligiousAffiliation =
  | 'non_denominational'
  | 'anglican'
  | 'baptist'
  | 'lutheran'
  | 'uniting_church'
  | 'presbyterian'
  | 'islamic'
  | 'jewish'
  | 'buddhist'
  | 'coptic_orthodox'
  | 'greek_orthodox'
  | 'seventh_day_adventist'
  | 'quaker'
  | 'interdenominational_christian';

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

export type ProgramType = 'australian_cert' | 'ib' | 'elicos';

export type EnglishTestType =
  | 'aeas'
  | 'idat'
  | 'duolingo'
  | 'ielts'
  | 'pte'
  | 'cambridge';

export type Gender = 'boys' | 'girls' | 'co_ed';

export type SchoolLevel = 'primary' | 'secondary';

export type EnrolmentStatus = 'open' | 'limited' | 'waitlist' | 'closed';

export type CurriculumCode = 'VCE' | 'HSC' | 'QCE' | 'WACE' | 'SACE' | 'IB' | 'NTCET';

export type QuickChipId =
  | 'boys'
  | 'girls'
  | 'co_ed'
  | 'primary'
  | 'secondary'
  | 'boarding';

export type SortOption =
  | 'name_asc'
  | 'tuition_low_high'
  | 'tuition_high_low'
  | 'state_asc'
  | 'name_desc'
  | 'enrolment_open_first'
  | 'application_deadline_asc'
  | 'school_size_asc'
  | 'school_size_desc'
  | 'international_pct_asc'
  | 'international_pct_desc';

export interface EnglishTestScore {
  testType: EnglishTestType;
  score: number;
}
