import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

function formatLabel(value: string | null | undefined): string | null {
  if (!value) return null;
  return value
    .split(/[_-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function searchHref(portal: Portal): string {
  return portal === 'parent' ? '/search' : `/${portal}/search`;
}

interface RowProps {
  label: string;
  children: React.ReactNode;
}

function FactRow({ label, children }: RowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-background/10 py-3 last:border-b-0">
      <dt className="text-body-sm text-background/70">{label}</dt>
      <dd className="text-body-sm font-semibold text-right max-w-[60%]">{children}</dd>
    </div>
  );
}

export async function KeyFactsCard({ school, activePortal }: { school: SchoolDetail; activePortal: Portal }) {
  const t = await getTranslations('SchoolDetail.sidebar.keyFacts');
  const ts = await getTranslations('SchoolDetail.stats');

  const genderValue =
    school.gender === 'co_ed'
      ? ts('coed')
      : school.gender === 'boys'
        ? ts('boys')
        : school.gender === 'girls'
          ? ts('girls')
          : null;

  const base = searchHref(activePortal);

  return (
    <section aria-labelledby="key-facts-heading" className="bg-ink-900 text-background border border-ink-900 rounded-xl p-5 shadow-2">
      <h2 id="key-facts-heading" className="text-xl font-semibold text-background mb-5">{t('heading')}</h2>
      <dl>
        {formatLabel(school.schoolType) && (
          <FactRow label={t('schoolType')}>{formatLabel(school.schoolType)}</FactRow>
        )}
        {formatLabel(school.religiousAffiliation) && (
          <FactRow label={t('religion')}>{formatLabel(school.religiousAffiliation)}</FactRow>
        )}
        {genderValue && (
          <FactRow label={t('gender')}>{genderValue}</FactRow>
        )}
        {school.cricosCode && (
          <FactRow label={t('cricos')}>
            <span className="text-primary">{school.cricosCode}</span>
          </FactRow>
        )}
        {school.curriculumOffered && (
          <FactRow label={t('curriculum')}>
            <Link href={`${base}?curriculum=${encodeURIComponent(school.curriculumOffered)}`} className="underline underline-offset-2">
              {school.curriculumOffered}
            </Link>
          </FactRow>
        )}
        {formatLabel(school.accommodation) && (
          <FactRow label={t('accommodation')}>{formatLabel(school.accommodation)}</FactRow>
        )}
        {formatLabel(school.sector) && (
          <FactRow label={t('sector')}>{formatLabel(school.sector)}</FactRow>
        )}
        {school.distanceToCbd != null && (
          <FactRow label={t('distance')}>{school.distanceToCbd} km</FactRow>
        )}
      </dl>
    </section>
  );
}
