import { getTranslations } from 'next-intl/server';
import { ShieldCheck } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { sortByOrder } from '@/modules/agent-detail/lib/section-utils';
import {
  WELFARE_CAPABILITY_FALLBACK_ICON,
  WELFARE_CAPABILITY_ICONS,
  WELFARE_FRAMING_BADGE,
  WELFARE_FRAMING_ICON,
  isWelfareCapabilityKey,
  isWelfareFramingKey,
} from '@/modules/agent-detail/constants/welfare.constants';
import type { WelfareCapability } from '@/modules/agent-detail/types/agent-detail.types';

interface WelfareSectionProps {
  capabilities?: WelfareCapability[];
}

export async function WelfareSection({ capabilities }: WelfareSectionProps) {
  const items = Array.isArray(capabilities)
    ? sortByOrder(capabilities).filter((c) => Boolean(c.capability?.trim()))
    : [];
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.welfare');

  return (
    <section
      id="welfare"
      aria-labelledby="welfare-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="welfare-heading" className="mt-2 flex items-center gap-2 text-2xl font-bold text-ink-900 md:text-3xl">
        <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('heading')}
      </h2>
      <p className="mt-2 text-body-sm text-foggy">{t('subheading')}</p>
      <p className="mt-2 rounded-lg border border-divider bg-muted px-4 py-3 text-caption text-foggy">
        {t('caawNote')}
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((capability, i) => {
          const key = capability.capability;
          const Icon = isWelfareCapabilityKey(key)
            ? WELFARE_CAPABILITY_ICONS[key]
            : WELFARE_CAPABILITY_FALLBACK_ICON;
          const capabilityLabel = isWelfareCapabilityKey(key)
            ? t(`capability.${key}`)
            : t('capability.other');
          const framing = capability.framing;

          return (
            <li
              key={`${key ?? 'capability'}-${i}`}
              className="flex flex-col rounded-lg border border-divider bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-body-sm font-semibold text-ink-900">{capabilityLabel}</p>
                </div>
                {isWelfareFramingKey(framing) ? (
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-pill px-2.5 py-0.5 text-caption font-semibold ${WELFARE_FRAMING_BADGE[framing]}`}
                  >
                    {(() => {
                      const FramingIcon = WELFARE_FRAMING_ICON[framing];
                      return <FramingIcon className="h-3 w-3" aria-hidden="true" />;
                    })()}
                    {t(`framing.${framing}`)}
                  </span>
                ) : null}
              </div>
              {capability.description ? (
                <p className="mt-3 text-body-sm text-foggy">{capability.description}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
