import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

function formatLabel(value: string | null | undefined): string | null {
  if (!value) return null;
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface AdmissionsSectionProps {
  school: SchoolDetail;
}

export async function AdmissionsSection({ school }: AdmissionsSectionProps) {
  const t = await getTranslations('SchoolDetail.admissions');

  const steps = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'].map((k) => ({
    title: t(`steps.${k}.title`),
    desc: t(`steps.${k}.desc`, {
      name: school.name,
      email: school.admissionsEmail ?? '',
      applicationFee: school.applicationFee ?? '',
    }),
  }));

  const emailHref = school.admissionsEmail
    ? <a href={`mailto:${school.admissionsEmail}`} className="text-primary underline-offset-2 hover:underline">{school.admissionsEmail}</a>
    : null;

  const phoneHref = school.admissionsPhone
    ? <a href={`tel:${school.admissionsPhone}`} className="text-primary underline-offset-2 hover:underline">{school.admissionsPhone}</a>
    : null;

  type TableRow = { label: string; value: React.ReactNode | null };

  const tableRows: TableRow[] = [
    { label: t('visa'), value: t('visaValue') },
    ...(school.oshcArrangement ? [{ label: t('oshcRequired'), value: t('yes') }] : []),
    { label: t('oshcArrangement'), value: formatLabel(school.oshcArrangement) },
    { label: t('oshcProvider'), value: school.oshcPreferredProvider ?? null },
    { label: t('applicationDeadline'), value: school.applicationDeadline ?? null },
    {
      label: t('offerWindow'),
      value: school.offerAcceptanceWindowDays != null
        ? t('offerWindowValue', { days: school.offerAcceptanceWindowDays })
        : null,
    },
    { label: t('partnerAgentsOnly'), value: t(school.partnerAgentsOnly ? 'yes' : 'no') },
    { label: t('contactRoleLabel'), value: t('intlContact') },
    { label: t('emailLabel'), value: emailHref },
    { label: t('phoneLabel'), value: phoneHref },
  ];

  return (
    <section
      id="admissions"
      aria-labelledby="admissions-heading"
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="admissions-heading" className="text-2xl font-bold text-ink-900 mt-2 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-4 text-body text-foggy max-w-3xl">{t('intro')}</p>

      <ol className="mt-6 space-y-0">
        {steps.map((step, idx) => (
          <li key={idx} className="flex gap-4 border-b border-divider py-4 last:border-b-0">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rausch-50 text-body-sm font-semibold text-primary"
            >
              {idx + 1}
            </span>
            <div>
              <p className="text-body-sm font-semibold text-ink-900">{step.title}</p>
              <p className="mt-1 text-body-sm text-foggy leading-relaxed">{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <dl className="mt-8">
        {tableRows.map(
          ({ label, value }) =>
            value != null && (
              <div
                key={label}
                className="flex items-start justify-between gap-4 border-b border-divider py-3 last:border-b-0"
              >
                <dt className="text-body-sm text-foggy">{label}</dt>
                <dd className="text-body-sm font-semibold text-ink-900 text-right max-w-[60%]">{value}</dd>
              </div>
            ),
        )}
      </dl>

      <p className="mt-6 rounded-lg bg-muted p-4 text-body-sm text-foggy">{t('sourceNote')}</p>
    </section>
  );
}
