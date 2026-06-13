import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Eyebrow } from '@/modules/design-system';
import { FOCUS_RING } from '@/modules/core';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

const formatLabel = (value: string | null | undefined): string | null => {
  if (!value) return null;
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const compactNumber = (value: number | null | undefined): string | null => {
  if (value == null) return null;
  return new Intl.NumberFormat('en-AU').format(value);
};

interface CompareSectionProps {
  similarSchools: SchoolDetail[];
  activePortal: Portal;
}

export async function CompareSection({ similarSchools, activePortal }: CompareSectionProps) {
  if (similarSchools.length === 0) return null;

  const t = await getTranslations('SchoolDetail.compare');
  const basePath = activePortal === 'parent' ? '/schools' : `/${activePortal}/schools`;

  return (
    <section
      id="compare"
      aria-labelledby="compare-heading"
      className="rounded-lg border border-divider bg-card py-10 px-6 shadow-2 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="compare-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-6 max-w-3xl text-body text-foggy">{t('intro')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {similarSchools.map((other) => (
          <Link
            key={other.documentId}
            href={`${basePath}/${other.slug}`}
            className={`block rounded-lg border border-divider bg-card p-5 shadow-2 transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-3 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
          >
            <p className="text-body-sm font-semibold text-ink-900">{other.name}</p>
            <p className="mt-1 text-caption text-foggy">
              {[other.suburb, other.state].filter(Boolean).join(', ')}
            </p>
            <dl className="mt-4 space-y-2">
              {formatLabel(other.sector) && (
                <div className="flex items-center justify-between">
                  <dt className="text-caption text-foggy">{t('sector')}</dt>
                  <dd className="text-caption font-medium text-ink-900">{formatLabel(other.sector)}</dd>
                </div>
              )}
              {compactNumber(other.totalEnrolment) && (
                <div className="flex items-center justify-between">
                  <dt className="text-caption text-foggy">{t('students')}</dt>
                  <dd className="text-caption font-medium text-ink-900">{compactNumber(other.totalEnrolment)}</dd>
                </div>
              )}
              {other.gender && (
                <div className="flex items-center justify-between">
                  <dt className="text-caption text-foggy">{t('gender')}</dt>
                  <dd className="text-caption font-medium text-ink-900">{formatLabel(other.gender)}</dd>
                </div>
              )}
              <div className="flex items-center justify-between">
                <dt className="text-caption text-foggy">{t('boarding')}</dt>
                <dd className="text-caption font-medium text-ink-900">
                  {t(other.boardingAvailable ? 'yes' : 'no')}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </section>
  );
}
