import { getTranslations } from 'next-intl/server';
import { ExternalLink, Plane, Bus, HeartPulse, MapPin } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface LocationTile {
  key: string;
  title: string;
  desc: string;
}

const ICON_MAP: Record<string, typeof Plane> = {
  airport: Plane,
  transport: Bus,
  healthcare: HeartPulse,
};

function parseTiles(raw: unknown): LocationTile[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((t): t is { title: unknown; desc: unknown; key?: unknown } => typeof t === 'object' && t !== null && 'title' in t && 'desc' in t)
      .map((t, i) => ({
        key: typeof t.key === 'string' ? t.key : `t${i}`,
        title: typeof t.title === 'string' ? t.title : '',
        desc: typeof t.desc === 'string' ? t.desc : '',
      }))
      .filter((t) => t.title && t.desc);
  }
  if (typeof raw === 'object') {
    type RawEntry = { title: unknown; desc: unknown };
    const isRawEntry = (val: unknown): val is RawEntry =>
      typeof val === 'object' && val !== null && 'title' in val && 'desc' in val;
    return Object.entries(raw as Record<string, unknown>)
      .filter(([, val]) => isRawEntry(val))
      .map(([k, val]) => {
        const entry = val as RawEntry;
        return {
          key: k,
          title: typeof entry.title === 'string' ? entry.title : '',
          desc: typeof entry.desc === 'string' ? entry.desc : '',
        };
      })
      .filter((t) => t.title && t.desc);
  }
  return [];
}

interface LocationSectionProps {
  school: SchoolDetail;
}

export async function LocationSection({ school }: LocationSectionProps) {
  const hasCoords = school.latitude != null && school.longitude != null;
  const tiles = parseTiles(school.locationFeatures);
  if (!hasCoords && school.distanceToCbd == null && tiles.length === 0) return null;

  const t = await getTranslations('SchoolDetail.location');
  const suburb = school.suburb ?? '';

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="rounded-lg border border-divider bg-card py-10 px-6 shadow-2 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="location-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading', { suburb })}
      </h2>

      {tiles.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {tiles.map((tile) => {
            const Icon = ICON_MAP[tile.key] ?? MapPin;
            return (
              <div key={tile.key} className="rounded-lg bg-muted p-5 text-center">
                <Icon className="mx-auto mb-2 h-6 w-6 text-primary" aria-hidden="true" />
                <p className="text-body-sm font-semibold text-ink-900">{tile.title}</p>
                <p className="mt-1 text-caption text-foggy">{tile.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {hasCoords && (
        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-divider bg-card p-4">
          <p className="text-body-sm text-foggy">
            {t('coordinates')}:{' '}
            <span className="font-mono text-ink-900">
              {school.latitude!.toFixed(4)}, {school.longitude!.toFixed(4)}
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
        <p className="mt-4 text-body-sm text-foggy">
          {t('distanceLabel')}:{' '}
          <span className="font-semibold text-ink-900">
            {t('kmFromCbd', { km: school.distanceToCbd })}
          </span>
        </p>
      )}
    </section>
  );
}
