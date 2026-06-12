import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

function formatLabel(value: string | null | undefined): string | null {
  if (!value) return null;
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface StepItem { title: string; desc: string }

function parseSteps(raw: unknown): StepItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((s): s is { title: unknown; desc: unknown } => typeof s === 'object' && s !== null && 'title' in s && 'desc' in s)
    .map((s) => ({
      title: typeof s.title === 'string' ? s.title : '',
      desc: typeof s.desc === 'string' ? s.desc : '',
    }))
    .filter((s) => s.title && s.desc);
}

interface AdmissionsSectionProps {
  school: SchoolDetail;
  activePortal?: Portal;
}

export async function AdmissionsSection({ school, activePortal }: AdmissionsSectionProps) {
  const steps = parseSteps(school.admissionsSteps);
  const showContact = activePortal === 'agent';

  const hasTableData = Boolean(
    school.oshcArrangement ||
      school.oshcPreferredProvider ||
      school.applicationDeadline ||
      school.offerAcceptanceWindowDays != null ||
      school.partnerAgentsOnly != null ||
      (showContact && (school.admissionsEmail || school.admissionsPhone)),
  );

  if (steps.length === 0 && !hasTableData) return null;

  const t = await getTranslations('SchoolDetail.admissions');

  const emailHref = showContact && school.admissionsEmail
    ? <a href={`mailto:${school.admissionsEmail}`} className="text-primary underline-offset-2 hover:underline">{school.admissionsEmail}</a>
    : null;

  const phoneHref = showContact && school.admissionsPhone
    ? <a href={`tel:${school.admissionsPhone}`} className="text-primary underline-offset-2 hover:underline">{school.admissionsPhone}</a>
    : null;

  type TableRow = { label: string; value: React.ReactNode | null };

  const tableRows: TableRow[] = [
    { label: t('oshcArrangement'), value: formatLabel(school.oshcArrangement) },
    { label: t('oshcProvider'), value: school.oshcPreferredProvider ?? null },
    { label: t('applicationDeadline'), value: school.applicationDeadline ?? null },
    {
      label: t('offerWindow'),
      value: school.offerAcceptanceWindowDays != null
        ? t('offerWindowValue', { days: school.offerAcceptanceWindowDays })
        : null,
    },
    {
      label: t('partnerAgentsOnly'),
      value: school.partnerAgentsOnly != null ? t(school.partnerAgentsOnly ? 'yes' : 'no') : null,
    },
    { label: t('emailLabel'), value: emailHref },
    { label: t('phoneLabel'), value: phoneHref },
  ];

  return (
    <section
      id="admissions"
      aria-labelledby="admissions-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="admissions-heading" className="text-2xl font-bold text-ink-900 mt-2 md:text-3xl">
        {t('heading')}
      </h2>

      {steps.length > 0 && (
        <ol className="mt-6 space-y-0">
          {steps.map((step, idx) => (
            <li key={idx} className="flex gap-4 border-b border-divider py-4 last:border-b-0">
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rausch-50 text-body-sm font-semibold text-primary">
                {idx + 1}
              </span>
              <div>
                <p className="text-body-sm font-semibold text-ink-900">{step.title}</p>
                <p className="mt-1 text-body-sm text-foggy leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {hasTableData && (
        <dl className="mt-6">
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
      )}
    </section>
  );
}
