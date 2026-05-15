import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system/components/SectionContainer';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

function formatAud(value: number | null | undefined): string | null {
  if (value == null) return null;
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value);
}

function compactNumber(value: number | null | undefined): string | null {
  if (value == null) return null;
  return new Intl.NumberFormat('en-AU').format(value);
}

function formatLabel(value: string | null | undefined): string | null {
  if (!value) return null;
  return value
    .split(/[_-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function lowestTuition(school: SchoolDetail): number | null {
  const values = [school.primaryAnnualTuition, school.juniorSecAnnualTuition, school.seniorSecAnnualTuition].filter(
    (v): v is number => v != null,
  );
  return values.length > 0 ? Math.min(...values) : null;
}

interface CellProps {
  label: string;
  value: string;
  note?: string | null;
  ariaLabel: string;
}

function StatCell({ label, value, note, ariaLabel }: CellProps) {
  return (
    <div className="p-4 md:p-6 text-center" aria-label={ariaLabel}>
      <p className="text-caption font-semibold uppercase text-foggy">{label}</p>
      <p className="text-xl font-bold text-ink-900 mt-1">{value}</p>
      {note && <p className="text-body-sm text-foggy mt-1">{note}</p>}
    </div>
  );
}

export async function StatsStrip({ school }: { school: SchoolDetail }) {
  const t = await getTranslations('SchoolDetail.stats');

  const tuition = lowestTuition(school);

  const genderValue =
    school.gender === 'co_ed'
      ? t('coed')
      : school.gender === 'boys'
        ? t('boys')
        : school.gender === 'girls'
          ? t('girls')
          : '—';

  const boardingNote =
    school.accommodation === 'boarding' || school.accommodation === 'both' ? t('dayAndBoarding') : null;

  const boardingValue = school.boardingAvailable
    ? (school.cricosAgeRange ?? t('available'))
    : t('notOffered');

  return (
    <SectionContainer size="wide" className="-mt-10 md:-mt-12 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-5 bg-card border border-divider rounded-lg shadow-2 overflow-hidden divide-x divide-y divide-divider md:divide-y-0">
        <StatCell
          label={t('type')}
          value={formatLabel(school.schoolType) ?? '—'}
          note={formatLabel(school.sector)}
          ariaLabel={`${t('type')}: ${formatLabel(school.schoolType) ?? '—'}`}
        />
        <StatCell
          label={t('students')}
          value={compactNumber(school.totalEnrolment) ?? '—'}
          note={school.levelsOffered ? school.levelsOffered.slice(0, 28) : null}
          ariaLabel={`${t('students')}: ${compactNumber(school.totalEnrolment) ?? '—'}`}
        />
        <StatCell
          label={t('gender')}
          value={genderValue}
          note={boardingNote}
          ariaLabel={`${t('gender')}: ${genderValue}`}
        />
        <StatCell
          label={t('tuitionFrom')}
          value={formatAud(tuition) ?? t('notListed')}
          note={tuition != null ? t('perYear') : null}
          ariaLabel={`${t('tuitionFrom')}: ${formatAud(tuition) ?? t('notListed')}`}
        />
        <StatCell
          label={t('boarding')}
          value={boardingValue}
          note={formatAud(school.feeBoardingAnnual)}
          ariaLabel={`${t('boarding')}: ${boardingValue}`}
        />
      </div>
    </SectionContainer>
  );
}
