'use client';

import { useQuery } from '@tanstack/react-query';
import { privateApi } from '@/lib/axios';
import { resolveMediaUrl } from '@/modules/school-profile/lib/resolve-media-url';
import type {
  SchoolMedia,
  SchoolProfileDetails,
  StrapiEnvelope,
} from '@/modules/school-profile/types/school-profile.types';

export const SCHOOL_PROFILE_QUERY_KEY = ['school-profile'] as const;

interface RawSchool extends Omit<SchoolProfileDetails, 'logo' | 'coverImage'> {
  logo: { id?: number; url: string } | null;
  coverImage: { id?: number; url: string } | null;
}

const SCHOOL_FIELDS = [
  'documentId', 'name', 'cricosCode', 'suburb', 'state', 'postcode',
  'description', 'internationalStudentDescription',
  'schoolHomepageUrl', 'internationalEnrolmentUrl', 'admissionsEmail', 'admissionsPhone',
  'applicationFee', 'enrolmentFee', 'feeBoardingAnnual', 'boardingAvailable', 'feeApplicationRefundable',
  'ieltsMinScore', 'aeasMinScore', 'pteMinScore', 'duolingoMinScore',
  'curriculumOffered', 'levelsOffered', 'intakePeriods',
  'offerAcceptanceWindowDays', 'autoWaitlistEnabled', 'partnerAgentsOnly', 'oshcArrangement',
  'enrolmentStatus', 'applicationDeadline', 'nextIntakeDate',
  // keyFacts
  'welcomeMessage', 'schoolType', 'sector', 'gender', 'accommodation', 'religiousAffiliation',
  // scholarships
  'scholarshipAvailable',
  // location
  'latitude', 'longitude', 'distanceToCbd',
  // international students
  'cricosAgeRange', 'yearLevelsInternational', 'languagesOffered', 'elicosEslSupport',
  'internationalStudentCapacity', 'internationalStudentPercentage', 'totalEnrolment',
  'oshcPreferredProvider', 'atarAvailable', 'postSubmissionMessage', 'proposedEntryLevel',
  // co-curricular (backed by the programTypes JSON array)
  'programTypes',
  // boarding features (plain JSON string array)
  'boardingFeatures',
];

function buildQuery(documentId: string): string {
  const params = new URLSearchParams();
  params.set('filters[documentId][$eq]', documentId);
  SCHOOL_FIELDS.forEach((f, i) => params.set(`fields[${i}]`, f));
  params.set('populate[logo][fields][0]', 'url');
  params.set('populate[coverImage][fields][0]', 'url');
  params.set('populate[faqs][fields][0]', 'question');
  params.set('populate[faqs][fields][1]', 'answer');
  params.set('populate[faqs][fields][2]', 'topicTag');
  params.set('populate[faqs][fields][3]', 'order');
  params.set('populate[admissionsSteps][fields][0]', 'stepNumber');
  params.set('populate[admissionsSteps][fields][1]', 'title');
  params.set('populate[admissionsSteps][fields][2]', 'description');
  params.set('populate[admissionsSteps][fields][3]', 'order');
  params.set('pagination[pageSize]', '1');
  return params.toString();
}

function toMedia(raw: { id?: number; url: string } | null): SchoolMedia | null {
  if (!raw) return null;
  const url = resolveMediaUrl(raw.url);
  if (!url) return null;
  return { id: raw.id, url };
}

export function useSchool(documentId: string | undefined) {
  return useQuery<SchoolProfileDetails>({
    queryKey: [...SCHOOL_PROFILE_QUERY_KEY, documentId],
    enabled: Boolean(documentId),
    queryFn: async () => {
      const res = await privateApi.get<StrapiEnvelope<RawSchool[]>>(
        `/api/schools?${buildQuery(documentId as string)}`,
      );
      const raw = res.data.data[0];
      if (!raw) throw new Error('School not found');
      return {
        ...raw,
        logo: toMedia(raw.logo),
        coverImage: toMedia(raw.coverImage),
      };
    },
  });
}
