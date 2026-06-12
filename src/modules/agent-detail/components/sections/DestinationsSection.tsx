import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { Destination } from '@/modules/agent-detail/types/agent-detail.types';

function parseLevels(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string');
  if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
  return [];
}

export async function DestinationsSection({ destinations }: { destinations?: Destination[] | null }) {
  const items = (destinations ?? []).filter((d) => d.country).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.destinations');

  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="destinations-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => {
          const levels = parseLevels(item.schoolLevels);
          return (
            <li key={i} className="rounded-lg border border-divider bg-muted p-5">
              <div className="flex items-center gap-2">
                {item.countryFlag ? (
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {item.countryFlag}
                  </span>
                ) : null}
                <p className="text-body-sm font-semibold text-ink-900">{item.country}</p>
                {item.isPrimaryDestination ? (
                  <span className="rounded-pill bg-babu-50 px-2 py-0.5 text-xs font-semibold text-babu-700">
                    {t('primary')}
                  </span>
                ) : null}
              </div>
              {item.australianStates ? (
                <p className="mt-3 text-body-sm text-foggy">
                  <span className="font-semibold text-ink-900">{t('statesLabel')}:</span>{' '}
                  {item.australianStates}
                </p>
              ) : null}
              {levels.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <span
                      key={level}
                      className="rounded-pill bg-card px-2.5 py-1 text-xs font-semibold text-ink-900"
                    >
                      {t(`level.${level}`)}
                    </span>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
