import 'server-only';
import { cache } from 'react';
import { env } from '@/lib/env';
import { publicApi } from '@/lib/axios';

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
  admissionsSteps?: unknown;
  boardingFeatures?: unknown;
  locationFeatures?: unknown;
  faqItems?: unknown;
  intlNoticeBody?: string | null;
  sourceNote?: string | null;
}

interface RawFaq {
  question?: string | null;
  answer?: string | null;
  topicTag?: string | null;
  order?: number | null;
}

interface RawAdmissionsStep {
  stepNumber?: number | null;
  title?: string | null;
  description?: string | null;
  order?: number | null;
}

interface RawSchoolDetail extends Omit<SchoolDetail, 'admissionsSteps' | 'boardingFeatures' | 'faqItems'> {
  faqs?: RawFaq[] | null;
  admissionsSteps?: RawAdmissionsStep[] | null;
  boardingFeatures?: string[] | null;
}

interface SchoolsResponse {
  data?: RawSchoolDetail[];
}

function byOrder<T extends { order?: number | null }>(a: T, b: T): number {
  return (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);
}

function mapFaqItems(faqs: RawFaq[] | null | undefined): { q: string; a: string }[] {
  if (!Array.isArray(faqs)) return [];
  return [...faqs]
    .sort(byOrder)
    .map((f) => ({ q: f.question ?? '', a: f.answer ?? '' }))
    .filter((f) => f.q && f.a);
}

function mapAdmissionsSteps(
  steps: RawAdmissionsStep[] | null | undefined,
): { title: string; desc: string }[] {
  if (!Array.isArray(steps)) return [];
  return [...steps]
    .sort((a, b) => (a.stepNumber ?? a.order ?? 0) - (b.stepNumber ?? b.order ?? 0))
    .map((s) => ({ title: s.title ?? '', desc: s.description ?? '' }))
    .filter((s) => s.title && s.desc);
}

function mapBoardingFeatures(features: string[] | null | undefined): string[] {
  if (!Array.isArray(features)) return [];
  return features.filter((f): f is string => typeof f === 'string' && f.trim().length > 0);
}

function normalizeSchoolDetail(raw: RawSchoolDetail): SchoolDetail {
  const { faqs, admissionsSteps, boardingFeatures, ...rest } = raw;
  return {
    ...rest,
    faqItems: mapFaqItems(faqs),
    admissionsSteps: mapAdmissionsSteps(admissionsSteps),
    boardingFeatures: mapBoardingFeatures(boardingFeatures),
  };
}

function buildSchoolQuery(slug: string): string {
  const params = new URLSearchParams();
  params.set('filters[slug][$eq]', slug);
  params.set('pagination[pageSize]', '1');
  params.set('populate[logo][fields][0]', 'url');
  params.set('populate[logo][fields][1]', 'alternativeText');
  params.set('populate[coverImage][fields][0]', 'url');
  params.set('populate[coverImage][fields][1]', 'alternativeText');
  params.set('populate[faqs][fields][0]', 'question');
  params.set('populate[faqs][fields][1]', 'answer');
  params.set('populate[faqs][fields][2]', 'topicTag');
  params.set('populate[faqs][fields][3]', 'order');
  params.set('populate[admissionsSteps][fields][0]', 'stepNumber');
  params.set('populate[admissionsSteps][fields][1]', 'title');
  params.set('populate[admissionsSteps][fields][2]', 'description');
  params.set('populate[admissionsSteps][fields][3]', 'order');
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
  try {
    const { data: payload } = await publicApi.get<SchoolsResponse>(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${buildSchoolQuery(slug)}`,
    );
    const raw = payload.data?.[0];
    return raw ? normalizeSchoolDetail(raw) : null;
  } catch {
    return null;
  }
});

export const getSimilarSchools = cache(async function getSimilarSchools(
  school: SchoolDetail,
): Promise<SchoolDetail[]> {
  if (!school.state) return [];
  try {
    const { data: payload } = await publicApi.get<SchoolsResponse>(
      `${env.NEXT_PUBLIC_API_URL}/api/schools?${buildSimilarSchoolsQuery(school)}`,
    );
    return (payload.data ?? []).map(normalizeSchoolDetail);
  } catch {
    return [];
  }
});
