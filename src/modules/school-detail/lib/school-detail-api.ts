import 'server-only';
import { cache } from 'react';
import { env } from '@/lib/env';

interface StrapiMedia {
  url?: string | null;
  alternativeText?: string | null;
}

export interface SchoolDetail {
  id?: number;
  documentId: string;
  name: string;
  slug: string;
  cricosCode: string | null;
  acaraId: string | null;
  suburb: string | null;
  state: string | null;
  postcode: string | null;
  schoolType: string | null;
  sector: string | null;
  religiousAffiliation: string | null;
  gender: string | null;
  accommodation: string | null;
  tier: string | null;
  claimed: boolean | null;
  levelsOffered: string | null;
  hasPrimary: boolean | null;
  hasJuniorSecondary: boolean | null;
  hasSeniorSecondary: boolean | null;
  cricosAgeRange: string | null;
  cricosMinAge: number | null;
  cricosMaxAge: number | null;
  cricosStatus: string | null;
  cricosCoursesCodes: string | null;
  parentSchoolId: string | null;
  yearLevelsInternational: unknown | null;
  proposedEntryLevel: string | null;
  proposedEntryTerm: string | null;
  programType: string | null;
  programTypes: unknown | null;
  curriculumOffered: string | null;
  curriculumCodes: unknown | null;
  atarAvailable: boolean | null;
  languagesOffered: string | null;
  elicosEslSupport: boolean | null;
  description: string | null;
  welcomeMessage: string | null;
  postSubmissionMessage: string | null;
  claimedAt: string | null;
  primaryAnnualTuition: number | null;
  juniorSecAnnualTuition: number | null;
  seniorSecAnnualTuition: number | null;
  applicationFee: number | null;
  enrolmentFee: number | null;
  feeBoardingAnnual: number | null;
  feeApplicationRefundable: boolean | null;
  scholarshipAvailable: boolean | null;
  boardingAvailable: boolean | null;
  totalEnrolment: number | null;
  internationalStudentCapacity: number | null;
  internationalStudentPercentage: number | null;
  internationalStudentDescription: string | null;
  applicationDeadline: string | null;
  nextIntakeDate: string | null;
  intakePeriods: string | null;
  offerAcceptanceWindowDays: number | null;
  enrolmentStatus: string | null;
  enrolmentStatusDetail: string | null;
  oshcArrangement: string | null;
  oshcPreferredProvider: string | null;
  partnerAgentsOnly: boolean | null;
  schoolHomepageUrl: string | null;
  internationalEnrolmentUrl: string | null;
  admissionsEmail: string | null;
  admissionsPhone: string | null;
  latitude: number | null;
  longitude: number | null;
  distanceToCbd: number | null;
  aeasMinScore: number | string | null;
  idatMinScore: number | string | null;
  duolingoMinScore: number | string | null;
  ieltsMinScore: number | string | null;
  pteMinScore: number | string | null;
  cambridgeMinScore: number | string | null;
  logo?: StrapiMedia | null;
  coverImage?: StrapiMedia | null;
}

interface SchoolsResponse {
  data?: SchoolDetail[];
}

function buildSchoolQuery(slug: string): string {
  const params = new URLSearchParams();
  params.set('filters[slug][$eq]', slug);
  params.set('pagination[pageSize]', '1');
  params.set('populate[logo][fields][0]', 'url');
  params.set('populate[logo][fields][1]', 'alternativeText');
  params.set('populate[coverImage][fields][0]', 'url');
  params.set('populate[coverImage][fields][1]', 'alternativeText');
  return params.toString();
}

function buildSimilarSchoolsQuery(school: SchoolDetail): string {
  const params = new URLSearchParams();
  if (school.state) params.set('filters[state][$eq]', school.state);
  if (school.documentId) params.set('filters[documentId][$ne]', school.documentId);
  if (school.sector) params.set('filters[sector][$eq]', school.sector);
  params.set('pagination[pageSize]', '3');
  params.set('sort[0]', 'tier:desc');
  params.set('populate[logo][fields][0]', 'url');
  params.set('populate[logo][fields][1]', 'alternativeText');
  params.set('populate[coverImage][fields][0]', 'url');
  params.set('populate[coverImage][fields][1]', 'alternativeText');
  return params.toString();
}

export function mediaUrl(media?: StrapiMedia | null): string | null {
  const url = media?.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}${url}`;
}

export const getSchoolBySlug = cache(async function getSchoolBySlug(
  slug: string,
): Promise<SchoolDetail | null> {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/api/schools?${buildSchoolQuery(slug)}`,
    {
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as SchoolsResponse;
  return payload.data?.[0] ?? null;
});

export const getSimilarSchools = cache(async function getSimilarSchools(
  school: SchoolDetail,
): Promise<SchoolDetail[]> {
  if (!school.state) return [];
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${buildSimilarSchoolsQuery(school)}`,
      {
        next: { revalidate: 600 },
      },
    );
    if (!response.ok) return [];
    const payload = (await response.json()) as SchoolsResponse;
    return payload.data ?? [];
  } catch {
    return [];
  }
});
