import 'server-only';
import type { Metadata } from 'next';
import { mediaUrl } from '@/modules/school-detail/lib/school-detail-api';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import { portalUrl } from '@/lib/portal-url';
import type { Portal } from '@/lib/portal-url';
import { routing } from '@/i18n/routing';

function lowestTuition(school: SchoolDetail): number | null {
  const values = [
    school.primaryAnnualTuition,
    school.juniorSecAnnualTuition,
    school.seniorSecAnnualTuition,
  ].filter((v): v is number => typeof v === 'number');
  return values.length ? Math.min(...values) : null;
}

function clamp(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;
}

export function buildSchoolMetadata(
  school: SchoolDetail,
  activePortal: Portal,
  locale: string,
): Metadata {
  const year = new Date().getFullYear();
  const location = [school.suburb, school.state].filter(Boolean).join(', ');
  const tuition = lowestTuition(school);

  const baseTitle = `${school.name} | International Student Fees & Admissions ${year} | SchoolGo Australia`;
  const title = clamp(baseTitle, 70);

  const parts: string[] = [
    `International student guide to ${school.name}${location ? `, ${location}` : ''}.`,
  ];
  if (school.cricosCode) parts.push(`CRICOS ${school.cricosCode}`);
  if (tuition) parts.push(`Fees from $${tuition.toLocaleString('en-AU')}/yr`);
  if (school.curriculumOffered) parts.push(school.curriculumOffered);
  parts.push('Visa 500 | SchoolGo Australia.');
  const description = clamp(parts.join(' | '), 160);

  const pathSegment =
    activePortal === 'parent'
      ? `/schools/${school.slug}`
      : `/${activePortal}/schools/${school.slug}`;

  const baseUrl = portalUrl(activePortal, locale);
  const canonical = `${baseUrl}${pathSegment}`;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${portalUrl(activePortal, loc)}${pathSegment}`;
  }

  const coverUrl = mediaUrl(school.coverImage);
  const images = coverUrl
    ? [{ url: coverUrl, width: 1200, height: 630, alt: school.name }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      siteName: 'SchoolGo Australia',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: coverUrl ? [coverUrl] : undefined,
    },
    robots: { index: true, follow: true },
  };
}
