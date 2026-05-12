import type {
  Accommodation,
  CurriculumCode,
  EnglishTestType,
  EnrolmentStatus,
  EntryTerm,
  EntryYearLevel,
  ProgramType,
  ReligiousAffiliation,
  Sector,
} from '@/modules/school-search/types/filter.types';

export interface TuitionByLevel {
  level: EntryYearLevel;
  annualAmountAud: number;
}

export interface CricosAgeRange {
  min: number;
  max: number;
}

export interface CompareSchoolHit {
  id: string;
  name: string;
  photoUrl: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  suburb: string;
  state: string;
  lat: number;
  lng: number;
  enrolmentStatus: EnrolmentStatus;
  sector: Sector;
  curriculumCodes: CurriculumCode[];
  accommodation: Accommodation;
  annualTuitionFrom: number | null;
  tuitionByLevel: TuitionByLevel[];
  religiousAffiliation: ReligiousAffiliation | null;
  programTypes: ProgramType[];
  englishTestMinimums: Partial<Record<EnglishTestType, number | null>>;
  cricosAgeRange: CricosAgeRange | null;
  applicationDeadline: string | null;
  schoolSize: number | null;
  internationalStudentPct: number | null;
  atarAvailable: boolean;
  englishLanguageSupport: boolean;
  entryTerms: EntryTerm[];
}

export interface CompareSchoolsResponse {
  data: CompareSchoolHit[];
  missing: string[];
  error?: null | { status: number; message: string };
}
