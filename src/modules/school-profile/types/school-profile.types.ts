export interface StrapiEnvelope<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface SchoolMedia {
  id?: number;
  url: string;
}

export type SchoolState =
  | 'VIC'
  | 'NSW'
  | 'QLD'
  | 'SA'
  | 'WA'
  | 'TAS'
  | 'ACT'
  | 'NT';

export type OshcArrangement = 'school_arranged' | 'agent_arranged' | 'either';

export type EnrolmentStatus = 'open' | 'limited' | 'waitlist' | 'closed';

export type SchoolType = 'combined' | 'primary' | 'secondary';

export type SchoolSector = 'government' | 'non-government' | 'catholic';

export type SchoolGender = 'co_ed' | 'boys' | 'girls';

export type SchoolAccommodation = 'boarding' | 'homestay' | 'both' | 'none';

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

export interface SchoolProfileDetails {
  documentId: string;
  name: string;
  cricosCode: string | null;
  suburb: string | null;
  state: SchoolState | null;
  postcode: string | null;
  description: string | null;
  internationalStudentDescription: string | null;
  schoolHomepageUrl: string | null;
  internationalEnrolmentUrl: string | null;
  admissionsEmail: string | null;
  admissionsPhone: string | null;
  applicationFee: number | null;
  enrolmentFee: number | null;
  feeBoardingAnnual: number | null;
  boardingAvailable: boolean;
  feeApplicationRefundable: boolean;
  ieltsMinScore: number | null;
  aeasMinScore: number | null;
  pteMinScore: number | null;
  duolingoMinScore: number | null;
  curriculumOffered: string | null;
  levelsOffered: string | null;
  intakePeriods: string | null;
  offerAcceptanceWindowDays: number | null;
  autoWaitlistEnabled: boolean;
  partnerAgentsOnly: boolean;
  oshcArrangement: OshcArrangement | null;
  enrolmentStatus: EnrolmentStatus | null;
  applicationDeadline: string | null;
  nextIntakeDate: string | null;
  welcomeMessage: string | null;
  schoolType: SchoolType | null;
  sector: SchoolSector | null;
  gender: SchoolGender | null;
  accommodation: SchoolAccommodation | null;
  religiousAffiliation: ReligiousAffiliation | null;
  scholarshipAvailable: boolean;
  latitude: number | null;
  longitude: number | null;
  distanceToCbd: number | null;
  cricosAgeRange: string | null;
  yearLevelsInternational: string[] | null;
  languagesOffered: string | null;
  elicosEslSupport: boolean;
  internationalStudentCapacity: number | null;
  internationalStudentPercentage: number | null;
  totalEnrolment: number | null;
  oshcPreferredProvider: string | null;
  atarAvailable: boolean;
  postSubmissionMessage: string | null;
  proposedEntryLevel: string | null;
  programTypes: string[] | null;
  logo: SchoolMedia | null;
  coverImage: SchoolMedia | null;
}

export type TuitionLevel =
  | 'gr4'
  | 'gr5'
  | 'gr6'
  | 'yr7'
  | 'yr8'
  | 'yr9'
  | 'yr10'
  | 'yr11'
  | 'yr12';

export interface SchoolTuition {
  documentId: string;
  level: TuitionLevel;
  annualAmountAud: number;
}

export interface SchoolCapacity {
  documentId: string;
  yearLevel: string;
  intakePeriod: string;
  totalPlaces: number | null;
  autoWaitlist: boolean;
}

export interface UpdateSchoolPayload {
  [key: string]: unknown;
}

export interface CreateTuitionPayload {
  level: TuitionLevel;
  annualAmountAud: number;
}

export interface UpdateTuitionPayload {
  documentId: string;
  annualAmountAud: number;
}

export interface CreateCapacityPayload {
  yearLevel: string;
  intakePeriod: string;
  totalPlaces: number;
  autoWaitlist: boolean;
}

export interface UpdateCapacityPayload {
  documentId: string;
  totalPlaces: number;
  autoWaitlist: boolean;
}
