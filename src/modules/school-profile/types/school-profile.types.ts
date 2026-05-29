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
