import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

function formatAud(value: number | null | undefined): string | null {
  if (value == null) return null;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

export async function FeesSection({ school }: { school: SchoolDetail }) {
  const hasAnyFeeData =
    school.primaryAnnualTuition != null ||
    school.juniorSecAnnualTuition != null ||
    school.seniorSecAnnualTuition != null ||
    school.feeBoardingAnnual != null ||
    school.applicationFee != null ||
    school.enrolmentFee != null ||
    school.feeApplicationRefundable != null ||
    school.scholarshipAvailable != null ||
    school.intakePeriods != null ||
    school.applicationDeadline != null ||
    school.nextIntakeDate != null;

  if (!hasAnyFeeData) return null;

  const t = await getTranslations('SchoolDetail.fees');

  const feeCards: { label: string; value: string | null }[] = [
    { label: t('primary'), value: formatAud(school.primaryAnnualTuition) },
    { label: t('junior'), value: formatAud(school.juniorSecAnnualTuition) },
    { label: t('senior'), value: formatAud(school.seniorSecAnnualTuition) },
  ].filter((c) => c.value != null);

  const showBoardingHighlight = school.feeBoardingAnnual != null;
  const showTotalHighlight =
    school.seniorSecAnnualTuition != null && school.feeBoardingAnnual != null;
  const totalFee = showTotalHighlight
    ? (school.seniorSecAnnualTuition ?? 0) +
      (school.feeBoardingAnnual ?? 0) +
      (school.applicationFee ?? 0)
    : null;

  const highlightCount = (showBoardingHighlight ? 1 : 0) + (showTotalHighlight ? 1 : 0);

  const tableRows: { label: string; value: string | null }[] = [
    { label: t('applicationFee'), value: formatAud(school.applicationFee) },
    { label: t('enrolmentFee'), value: formatAud(school.enrolmentFee) },
    {
      label: t('refundable'),
      value:
        school.feeApplicationRefundable != null
          ? t(school.feeApplicationRefundable ? 'yes' : 'no')
          : null,
    },
    {
      label: t('scholarshipAvailable'),
      value:
        school.scholarshipAvailable != null
          ? t(school.scholarshipAvailable ? 'yes' : 'no')
          : null,
    },
    { label: t('intakePeriods'), value: school.intakePeriods },
    { label: t('applicationDeadline'), value: school.applicationDeadline },
    { label: t('nextIntake'), value: school.nextIntakeDate },
  ].filter((r) => r.value != null);

  return (
    <section
      id="fees"
      aria-labelledby="fees-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="fees-heading" className="text-2xl font-bold text-ink-900 mt-2 md:text-3xl">
        {t('heading')}
      </h2>
      {feeCards.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {feeCards.map((card) => (
            <div key={card.label} className="bg-muted rounded-lg p-5 text-center">
              <p className="text-caption font-semibold uppercase text-foggy">{card.label}</p>
              <p className="font-display text-2xl font-bold text-ink-900 mt-2 tabular-nums">{card.value}</p>
              <p className="text-caption text-foggy mt-2">{t('perYearTuition')}</p>
            </div>
          ))}
        </div>
      )}

      {highlightCount > 0 && (
        <div
          className={
            highlightCount === 1
              ? 'mt-6 grid gap-4'
              : 'mt-6 grid gap-4 sm:grid-cols-2'
          }
        >
          {showBoardingHighlight && (
            <div className="bg-ink-900 text-background rounded-lg p-5 text-center shadow-2">
              <p className="text-caption font-semibold uppercase text-background/70">
                {t('boardingAll')}
              </p>
              <p className="font-display text-2xl font-bold text-background mt-2 tabular-nums">
                {formatAud(school.feeBoardingAnnual)}
              </p>
              <p className="text-caption text-background/70 mt-2">{t('perYear')}</p>
            </div>
          )}
          {showTotalHighlight && totalFee != null && (
            <div className="bg-ink-900 text-background rounded-lg p-5 text-center shadow-2">
              <p className="text-caption font-semibold uppercase text-background/70">
                {t('totalSenior')}
              </p>
              <p className="font-display text-2xl font-bold text-background mt-2 tabular-nums">{formatAud(totalFee)}</p>
              <p className="text-caption text-background/70 mt-2">{t('perYear')}</p>
            </div>
          )}
        </div>
      )}

      {tableRows.length > 0 && (
        <dl className="mt-6">
          {tableRows.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 border-b border-divider py-3 last:border-b-0"
            >
              <dt className="text-body-sm text-foggy">{label}</dt>
              <dd className="max-w-xs text-right text-body-sm font-semibold text-ink-900">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

    </section>
  );
}
