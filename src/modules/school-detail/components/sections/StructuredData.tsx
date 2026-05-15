import 'server-only';
import { getTranslations } from 'next-intl/server';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';
import { portalUrl } from '@/lib/portal-url';

interface Props {
  school: SchoolDetail;
  activePortal: Portal;
  locale?: string;
}

function safeJson(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

function formatAud(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

function lowestTuition(school: SchoolDetail): number | null {
  const values = [
    school.primaryAnnualTuition,
    school.juniorSecAnnualTuition,
    school.seniorSecAnnualTuition,
  ].filter((v): v is number => typeof v === 'number');
  return values.length > 0 ? Math.min(...values) : null;
}

function postalAddress(school: SchoolDetail): Record<string, unknown> {
  return {
    '@type': 'PostalAddress',
    streetAddress: '',
    addressLocality: school.suburb ?? '',
    addressRegion: school.state ?? '',
    postalCode: school.postcode ?? '',
    addressCountry: 'AU',
  };
}

function educationalOrgLd(school: SchoolDetail): Record<string, unknown> | null {
  if (!school.name) return null;
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: school.name,
    address: postalAddress(school),
  };
  if (school.schoolHomepageUrl) {
    obj.url = school.schoolHomepageUrl;
    obj.sameAs = school.schoolHomepageUrl;
  }
  if (school.description) obj.description = school.description;
  if (school.cricosCode) {
    obj.identifier = {
      '@type': 'PropertyValue',
      name: 'CRICOS',
      value: school.cricosCode,
    };
  }
  return obj;
}

function localBusinessLd(school: SchoolDetail): Record<string, unknown> | null {
  if (!school.name) return null;
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: school.name,
    address: postalAddress(school),
  };
  if (school.schoolHomepageUrl) obj.url = school.schoolHomepageUrl;
  if (school.admissionsPhone) obj.telephone = school.admissionsPhone;
  if (school.latitude != null && school.longitude != null) {
    obj.geo = {
      '@type': 'GeoCoordinates',
      latitude: school.latitude,
      longitude: school.longitude,
    };
  }
  return obj;
}

function breadcrumbLd(
  school: SchoolDetail,
  portal: Portal,
  locale?: string,
): Record<string, unknown> {
  const base = portalUrl(portal, locale);
  const searchPath = portal === 'parent' ? '/search' : `/${portal}/search`;
  const homePath = portal === 'parent' ? '' : `/${portal}`;
  const items: Record<string, unknown>[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${base}${homePath}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Schools',
      item: `${base}${searchPath}`,
    },
  ];
  let pos = 3;
  if (school.state) {
    items.push({
      '@type': 'ListItem',
      position: pos++,
      name: school.state,
      item: `${base}${searchPath}?state=${encodeURIComponent(school.state.toLowerCase())}`,
    });
  }
  if (school.suburb) {
    items.push({
      '@type': 'ListItem',
      position: pos++,
      name: school.suburb,
      item: `${base}${searchPath}?city=${encodeURIComponent(school.suburb.toLowerCase())}`,
    });
  }
  items.push({
    '@type': 'ListItem',
    position: pos,
    name: school.name,
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function parseCourses(
  school: SchoolDetail,
): Record<string, unknown>[] | null {
  if (!school.cricosCoursesCodes) return null;
  const lines = school.cricosCoursesCodes.split('\n').map((l) => l.trim()).filter(Boolean);
  const courses: Record<string, unknown>[] = [];
  for (const line of lines) {
    const sep = line.includes(' – ') ? ' – ' : line.includes(' - ') ? ' - ' : null;
    if (!sep) continue;
    const parts = line.split(sep);
    if (parts.length < 2) continue;
    const first = parts[0].trim();
    const second = parts.slice(1).join(sep).trim();
    const isCodeFirst = /^[A-Z0-9]{3,}/.test(first);
    const courseCode = isCodeFirst ? first : second;
    const courseName = isCodeFirst ? second : first;
    if (!courseCode || !courseName) continue;
    courses.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: courseName,
      courseCode,
      provider: {
        '@type': 'EducationalOrganization',
        name: school.name,
      },
    });
  }
  return courses.length > 0 ? courses : null;
}

async function faqLd(
  school: SchoolDetail,
): Promise<Record<string, unknown> | null> {
  try {
    const t = await getTranslations('SchoolDetail.faq.items');
    const tuition = lowestTuition(school);
    const vars = {
      name: school.name,
      cricos: school.cricosCode ?? '—',
      suburb: school.suburb ?? '—',
      state: school.state ?? '—',
      tuition: tuition != null ? formatAud(tuition) : '—',
      boardingFee:
        school.feeBoardingAnnual != null ? formatAud(school.feeBoardingAnnual) : '—',
      applicationFee:
        school.applicationFee != null ? formatAud(school.applicationFee) : '—',
      curriculum: school.curriculumOffered ?? '—',
      sector: school.sector ?? '—',
    };
    const entries: Record<string, unknown>[] = [];
    for (const key of ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const) {
      try {
        const q = t(`${key}.q`, vars);
        const a = t(`${key}.a`, vars);
        entries.push({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        });
      } catch {
        // skip missing key
      }
    }
    if (entries.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: entries,
    };
  } catch {
    return null;
  }
}

async function howToLd(
  school: SchoolDetail,
): Promise<Record<string, unknown> | null> {
  try {
    const tJld = await getTranslations('SchoolDetail.jsonLd');
    const tAdm = await getTranslations('SchoolDetail.admissions.steps');
    const steps: Record<string, unknown>[] = [];
    for (const key of ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'] as const) {
      try {
        const title = tAdm(`${key}.title`);
        const desc = tAdm(`${key}.desc`);
        steps.push({ '@type': 'HowToStep', name: title, text: desc });
      } catch {
        // skip missing step
      }
    }
    if (steps.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: tJld('howToName', { name: school.name }),
      step: steps,
    };
  } catch {
    return null;
  }
}

export async function StructuredData({ school, activePortal, locale }: Props) {
  const eduOrg = educationalOrgLd(school);
  const localBiz = localBusinessLd(school);
  const breadcrumb = breadcrumbLd(school, activePortal, locale);
  const courses = parseCourses(school);
  const [faq, howTo] = await Promise.all([faqLd(school), howToLd(school)]);

  const schemas: (Record<string, unknown> | Record<string, unknown>[])[] = [];
  if (eduOrg) schemas.push(eduOrg);
  if (localBiz) schemas.push(localBiz);
  schemas.push(breadcrumb);
  if (faq) schemas.push(faq);
  if (courses) schemas.push(...courses);
  if (howTo) schemas.push(howTo);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJson(schema) }}
        />
      ))}
    </>
  );
}
