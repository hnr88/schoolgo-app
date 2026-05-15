import { getTranslations } from 'next-intl/server';
import { Bus, ExternalLink, HeartPulse, Plane } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface LocationSectionProps {
  school: SchoolDetail;
}

export async function LocationSection({ school }: LocationSectionProps) {
  const t = await getTranslations('SchoolDetail.location');

  const suburb = school.suburb ?? '';

  const tiles = [
    { icon: Plane, titleKey: 'airport.title', descKey: 'airport.desc' },
    { icon: Bus, titleKey: 'transport.title', descKey: 'transport.desc' },
    { icon: HeartPulse, titleKey: 'healthcare.title', descKey: 'healthcare.desc' },
  ] as const;

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="location-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading', { suburb })}
      </h2>
      <p className="mt-4 max-w-3xl text-body text-foggy">{t('intro', { suburb })}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {tiles.map(({ icon: Icon, titleKey, descKey }) => (
          <div key={titleKey} className="rounded-lg bg-muted p-4 text-center">
            <Icon className="mx-auto mb-2 h-6 w-6 text-primary" aria-hidden="true" />
            <p className="text-body-sm font-semibold text-ink-900">{t(titleKey)}</p>
            <p className="mt-1 text-caption text-foggy">{t(descKey)}</p>
          </div>
        ))}
      </div>

      {school.latitude != null && school.longitude != null && (
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-divider bg-card p-4">
          <p className="text-body-sm text-foggy">
            {t('coordinates')}:{' '}
            <span className="font-mono text-ink-900">
              {school.latitude.toFixed(4)}, {school.longitude.toFixed(4)}
            </span>
          </p>
          <a
            href={`https://www.google.com/maps?q=${school.latitude},${school.longitude}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-pill bg-primary px-4 py-2 text-body-sm font-semibold text-on-primary hover:bg-rausch-600"
          >
            {t('viewOnMap')} <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}

      {school.distanceToCbd != null && (
        <p className="mt-3 text-body-sm text-foggy">
          {t('distanceLabel')}:{' '}
          <span className="font-semibold text-ink-900">
            {t('kmFromCbd', { km: school.distanceToCbd })}
          </span>
        </p>
      )}
    </section>
  );
}
