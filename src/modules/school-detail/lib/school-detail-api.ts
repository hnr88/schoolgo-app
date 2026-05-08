import 'server-only';
import { env } from '@/lib/env';

interface StrapiMedia {
  url?: string | null;
  alternativeText?: string | null;
}

export interface SchoolDetail {
  documentId: string;
  name: string;
  slug: string;
  cricosCode: string | null;
  suburb: string | null;
  state: string | null;
  postcode: string | null;
  schoolType: string | null;
  sector: string | null;
  religiousAffiliation: string | null;
  gender: string | null;
  levelsOffered: string | null;
  curriculumOffered: string | null;
  languagesOffered: string | null;
  description: string | null;
  claimedAt: string | null;
  primaryAnnualTuition: number | null;
  juniorSecAnnualTuition: number | null;
  seniorSecAnnualTuition: number | null;
  applicationFee: number | null;
  scholarshipAvailable: boolean | null;
  boardingAvailable: boolean | null;
  totalEnrolment: number | null;
  internationalStudentPercentage: number | null;
  applicationDeadline: string | null;
  nextIntakeDate: string | null;
  intakePeriods: string | null;
  schoolHomepageUrl: string | null;
  internationalEnrolmentUrl: string | null;
  admissionsEmail: string | null;
  admissionsPhone: string | null;
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

export function mediaUrl(media?: StrapiMedia | null): string | null {
  const url = media?.url;
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${env.STRAPI_API_URL.replace(/\/+$/, '')}${url}`;
}

export async function getSchoolBySlug(slug: string): Promise<SchoolDetail | null> {
  const response = await fetch(
    `${env.STRAPI_API_URL}/api/schools?${buildSchoolQuery(slug)}`,
    {
      headers: {
        Authorization: `Bearer ${env.STRAPI_JWT}`,
      },
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as SchoolsResponse;
  return payload.data?.[0] ?? null;
}
