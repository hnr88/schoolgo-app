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
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="fees-heading" className="text-2xl font-bold text-ink-900 mt-2 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-4 text-body text-foggy max-w-3xl">{t('intro')}</p>

      {feeCards.length > 0 ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {feeCards.map((card) => (
            <div key={card.label} className="bg-muted rounded-lg p-4 text-center">
              <p className="text-caption font-semibold uppercase text-foggy">{card.label}</p>
              <p className="text-2xl font-bold text-ink-900 mt-1">{card.value}</p>
              <p className="text-caption text-foggy mt-1">{t('perYearTuition')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-body-sm text-foggy">{t('feesNotListed')}</p>
      )}

      {highlightCount > 0 && (
        <div
          className={
            highlightCount === 1
              ? 'mt-4 grid gap-3'
              : 'mt-4 grid gap-3 sm:grid-cols-2'
          }
        >
          {showBoardingHighlight && (
            <div className="bg-ink-900 text-white rounded-lg p-4 text-center">
              <p className="text-caption font-semibold uppercase text-white/70">
                {t('boardingAll')}
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                {formatAud(school.feeBoardingAnnual)}
              </p>
              <p className="text-caption text-white/70 mt-1">{t('perYear')}</p>
            </div>
          )}
          {showTotalHighlight && totalFee != null && (
            <div className="bg-ink-900 text-white rounded-lg p-4 text-center">
              <p className="text-caption font-semibold uppercase text-white/70">
                {t('totalSenior')}
              </p>
              <p className="text-2xl font-bold text-white mt-1">{formatAud(totalFee)}</p>
              <p className="text-caption text-white/70 mt-1">{t('perYear')}</p>
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

      <p className="mt-6 rounded-lg bg-muted p-4 text-body-sm text-foggy">{t('sourceNote')}</p>
    </section>
  );
}
