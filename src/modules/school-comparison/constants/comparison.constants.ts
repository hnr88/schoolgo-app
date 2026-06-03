import type { CompareAttribute } from '@/modules/school-comparison/types/comparison.types';

export const COMPARE_MAX_COLUMNS = 3;

export const COMPARE_ATTRIBUTES: readonly CompareAttribute[] = [
  { key: 'state', labelKey: 'attrState', format: 'text' },
  { key: 'suburb', labelKey: 'attrSuburb', format: 'text' },
  { key: 'postcode', labelKey: 'attrPostcode', format: 'text' },
  { key: 'schoolType', labelKey: 'attrSchoolType', format: 'enum' },
  { key: 'sector', labelKey: 'attrSector', format: 'enum' },
  { key: 'gender', labelKey: 'attrGender', format: 'enum' },
  { key: 'religiousAffiliation', labelKey: 'attrReligiousAffiliation', format: 'enum' },
  { key: 'curriculumOffered', labelKey: 'attrCurriculum', format: 'text' },
  { key: 'levelsOffered', labelKey: 'attrLevelsOffered', format: 'text' },
  { key: 'lowestAnnualTuition', labelKey: 'attrLowestTuition', format: 'currency' },
  { key: 'highestAnnualTuition', labelKey: 'attrHighestTuition', format: 'currency' },
  { key: 'totalEnrolment', labelKey: 'attrTotalEnrolment', format: 'number' },
  {
    key: 'internationalStudentPercentage',
    labelKey: 'attrInternationalPct',
    format: 'number',
  },
  { key: 'boardingAvailable', labelKey: 'attrBoarding', format: 'boolean' },
  { key: 'scholarshipAvailable', labelKey: 'attrScholarship', format: 'boolean' },
  { key: 'hasOpenCapacity', labelKey: 'attrOpenCapacity', format: 'boolean' },
  {
    key: 'hasActiveApplicationTemplate',
    labelKey: 'attrAcceptingApplications',
    format: 'boolean',
  },
] as const;
