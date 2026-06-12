import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { MarketServed } from '@/modules/agent-detail/types/agent-detail.types';

export async function MarketsSection({ markets }: { markets?: MarketServed[] | null }) {
  const items = (markets ?? []).filter((m) => m.sourceCountry).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.markets');

  return (
    <section
      id="markets"
      aria-labelledby="markets-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="markets-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-lg border border-divider bg-muted p-4"
          >
            {item.countryFlag ? (
              <span className="text-2xl leading-none" aria-hidden="true">
                {item.countryFlag}
              </span>
            ) : null}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-body-sm font-semibold text-ink-900">{item.sourceCountry}</p>
                {item.isPrimary ? (
                  <span className="rounded-pill bg-babu-50 px-2 py-0.5 text-xs font-semibold text-babu-700">
                    {t('primary')}
                  </span>
                ) : null}
              </div>
              {item.regions ? <p className="mt-0.5 text-body-sm text-foggy">{item.regions}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
