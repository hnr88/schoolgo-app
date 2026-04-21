export type SchoolSector = 'Government' | 'Independent' | 'Catholic' | '';

export interface SchoolRecord {
  slug: string;
  name: string;
  cricosProviderCode: string;
  state: string;
  suburb: string;
  postcode: string;
  latitude: number | null;
  longitude: number | null;
  sector: SchoolSector;
  schoolType: string;
  totalEnrolment: number | null;
  icseaScore: number | null;
  annualFeeAud: string;
  schoolWebsiteUrl: string;
  mySchoolProfileLink: string;
  applicationUrl: string;
  intakePeriods: string;
  boardingAvailable: string;
  oshcArrangedBySchool: string;
  scholarshipAvailable: string;
  internationalContactEmail: string;
  schoolDescription: string;
  dataLastVerified: string;
}
