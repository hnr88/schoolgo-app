import 'server-only';
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

function breadcrumbLd(school: SchoolDetail, portal: Portal, locale?: string): Record<string, unknown> {
  const base = portalUrl(portal, locale);
  const searchPath = portal === 'parent' ? '/search' : `/${portal}/search`;
  const homePath = portal === 'parent' ? '' : `/${portal}`;
  const li = (position: number, name: string, item?: string): Record<string, unknown> =>
    item ? { '@type': 'ListItem', position, name, item } : { '@type': 'ListItem', position, name };
  let pos = 3;
  const items: Record<string, unknown>[] = [
    li(1, 'Home', `${base}${homePath}`),
    li(2, 'Schools', `${base}${searchPath}`),
    ...(school.state ? [li(pos++, school.state, `${base}${searchPath}?state=${encodeURIComponent(school.state.toLowerCase())}`)] : []),
    ...(school.suburb ? [li(pos++, school.suburb, `${base}${searchPath}?city=${encodeURIComponent(school.suburb.toLowerCase())}`)] : []),
    li(pos, school.name),
  ];
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

function parseCourses(school: SchoolDetail): Record<string, unknown>[] | null {
  if (!school.cricosCoursesCodes) return null;
  const courses: Record<string, unknown>[] = [];
  for (const line of school.cricosCoursesCodes.split('\n').map((l) => l.trim()).filter(Boolean)) {
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
      provider: { '@type': 'EducationalOrganization', name: school.name },
    });
  }
  return courses.length > 0 ? courses : null;
}

interface FaqItem { q: string; a: string }
interface StepItem { title: string; desc: string }

function parseFaqItems(raw: unknown): FaqItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((it): it is { q: unknown; a: unknown } => typeof it === 'object' && it !== null && 'q' in it && 'a' in it)
    .map((it) => ({ q: typeof it.q === 'string' ? it.q : '', a: typeof it.a === 'string' ? it.a : '' }))
    .filter((it) => it.q && it.a);
}

function parseSteps(raw: unknown): StepItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((s): s is { title: unknown; desc: unknown } => typeof s === 'object' && s !== null && 'title' in s && 'desc' in s)
    .map((s) => ({ title: typeof s.title === 'string' ? s.title : '', desc: typeof s.desc === 'string' ? s.desc : '' }))
    .filter((s) => s.title && s.desc);
}

function faqLd(school: SchoolDetail): Record<string, unknown> | null {
  const items = parseFaqItems(school.faqItems);
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function howToLd(school: SchoolDetail): Record<string, unknown> | null {
  const steps = parseSteps(school.admissionsSteps);
  if (steps.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to apply to ${school.name} as an international student`,
    step: steps.map((s) => ({ '@type': 'HowToStep', name: s.title, text: s.desc })),
  };
}

export async function StructuredData({ school, activePortal, locale }: Props) {
  const eduOrg = educationalOrgLd(school);
  const localBiz = localBusinessLd(school);
  const breadcrumb = breadcrumbLd(school, activePortal, locale);
  const courses = parseCourses(school);
  const faq = faqLd(school);
  const howTo = howToLd(school);

  const schemas: Record<string, unknown>[] = [];
  if (eduOrg) schemas.push(eduOrg);
  if (localBiz) schemas.push(localBiz);
  schemas.push(breadcrumb);
  if (courses) schemas.push(...courses);
  if (faq) schemas.push(faq);
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
