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

interface BoardingSectionProps {
  school: SchoolDetail;
}

export async function BoardingSection({ school }: BoardingSectionProps) {
  const acc = school.accommodation ?? '';
  if (!school.boardingAvailable && !['boarding', 'both'].includes(acc)) {
    return null;
  }

  const t = await getTranslations('SchoolDetail.boarding');

  const tableRows: { label: string; value: string | null }[] = [
    { label: t('accommodation'), value: school.accommodation },
    { label: t('fee'), value: formatAud(school.feeBoardingAnnual) },
    { label: t('years'), value: school.cricosAgeRange },
    { label: t('intake'), value: school.intakePeriods },
  ];

  const featureKeys = ['pastoralCare', 'academicSupport', 'weekendActivities', 'intlSupport'] as const;

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
      <p className="mt-4 max-w-3xl text-body text-foggy">
        {school.internationalStudentDescription ?? t('intro')}
      </p>

      <dl className="mt-6">
        {tableRows.map(
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

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {featureKeys.map((key) => (
          <div key={key} className="rounded-lg bg-muted p-4">
            <p className="text-body-sm font-semibold text-ink-900">
              {t(`features.${key}.title`)}
            </p>
            <p className="mt-1 text-body-sm leading-relaxed text-foggy">
              {t(`features.${key}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
