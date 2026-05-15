import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

const formatAud = (value: number | null): string | null => {
  if (value == null) return null;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
};

interface BoardingFeature {
  title: string;
  desc: string;
}

function parseFeatures(raw: unknown): BoardingFeature[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((f): f is { title: unknown; desc: unknown } => typeof f === 'object' && f !== null && 'title' in f && 'desc' in f)
      .map((f) => ({
        title: typeof f.title === 'string' ? f.title : '',
        desc: typeof f.desc === 'string' ? f.desc : '',
      }))
      .filter((f) => f.title && f.desc);
  }
  if (typeof raw === 'object') {
    return Object.values(raw as Record<string, unknown>)
      .filter((f): f is { title: unknown; desc: unknown } => typeof f === 'object' && f !== null && 'title' in f && 'desc' in f)
      .map((f) => ({
        title: typeof f.title === 'string' ? f.title : '',
        desc: typeof f.desc === 'string' ? f.desc : '',
      }))
      .filter((f) => f.title && f.desc);
  }
  return [];
}

interface BoardingSectionProps {
  school: SchoolDetail;
}

export async function BoardingSection({ school }: BoardingSectionProps) {
  const acc = school.accommodation ?? '';
  const tableRows: { label: string; value: string | null }[] = [];
  const features = parseFeatures(school.boardingFeatures);
  const hasTableData = tableRows.some((r) => r.value != null) || school.internationalStudentDescription;

  if (!school.boardingAvailable && !['boarding', 'both'].includes(acc) && !hasTableData && features.length === 0) {
    return null;
  }

  const t = await getTranslations('SchoolDetail.boarding');

  const rows: { label: string; value: string | null }[] = [
    { label: t('accommodation'), value: school.accommodation },
    { label: t('fee'), value: formatAud(school.feeBoardingAnnual) },
    { label: t('years'), value: school.cricosAgeRange },
    { label: t('intake'), value: school.intakePeriods },
  ];

  if (!school.internationalStudentDescription && rows.every((r) => r.value == null) && features.length === 0) {
    return null;
  }

  return (
    <section
      id="boarding"
      aria-labelledby="boarding-heading"
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="boarding-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      {school.internationalStudentDescription && (
        <p className="mt-4 max-w-3xl text-body text-foggy">
          {school.internationalStudentDescription}
        </p>
      )}

      <dl className="mt-6">
        {rows.map(
          ({ label, value }) =>
            value != null && (
              <div
                key={label}
                className="flex items-start justify-between gap-4 border-b border-divider py-3 last:border-b-0"
              >
                <dt className="text-body-sm text-foggy">{label}</dt>
                <dd className="max-w-[60%] text-right text-body-sm font-semibold text-ink-900">
                  {value}
                </dd>
              </div>
            ),
        )}
      </dl>

      {features.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="rounded-lg bg-muted p-4">
              <p className="text-body-sm font-semibold text-ink-900">{f.title}</p>
              <p className="mt-1 text-body-sm leading-relaxed text-foggy">{f.desc}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
