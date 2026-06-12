import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Trophy, ExternalLink } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { Award } from '@/modules/agent-detail/types/agent-detail.types';

export async function AwardsSection({ awards }: { awards?: Award[] | null }) {
  const items = (awards ?? []).filter((a) => a.awardName).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.awards');

  return (
    <section
      id="awards"
      aria-labelledby="awards-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="awards-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ul className="mt-6 space-y-4">
        {items.map((item, i) => {
          const logo = mediaUrl(item.logo);
          const recipient =
            item.recipientType && item.recipientName
              ? t(`recipient.${item.recipientType}`, { name: item.recipientName })
              : null;
          const meta = [item.awardingBody, item.year].filter(Boolean).join(' · ');
          return (
            <li
              key={i}
              className="flex items-start gap-4 rounded-lg border border-divider bg-muted p-5"
            >
              {logo ? (
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-card">
                  <Image src={logo} alt={item.awardName ?? ''} fill sizes="48px" className="object-contain" />
                </span>
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-featured-soft text-featured-ink">
                  <Trophy className="h-6 w-6" aria-hidden="true" />
                </span>
              )}
              <div className="min-w-0">
                <p className="text-body-sm font-semibold text-ink-900">{item.awardName}</p>
                {meta ? <p className="mt-0.5 text-body-sm text-foggy">{meta}</p> : null}
                {recipient ? <p className="mt-0.5 text-caption uppercase text-foggy">{recipient}</p> : null}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-body-sm font-semibold text-babu-700 hover:underline"
                  >
                    {t('learnMore')}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
