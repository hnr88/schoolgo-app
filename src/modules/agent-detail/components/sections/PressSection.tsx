import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ExternalLink, Newspaper } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { PressItem } from '@/modules/agent-detail/types/agent-detail.types';

function PressCard({ item, visitLabel }: { item: PressItem; visitLabel: string }) {
  const logo = mediaUrl(item.logo);
  const meta = [item.organisation, item.date].filter(Boolean).join(' · ');

  const inner = (
    <div className="flex h-full flex-col rounded-lg border border-divider bg-muted p-5">
      <div className="flex h-12 items-center">
        {logo ? (
          <Image src={logo} alt={item.organisation ?? ''} width={120} height={48} className="h-12 w-auto object-contain" />
        ) : (
          <Newspaper className="h-7 w-7 text-foggy" aria-hidden="true" />
        )}
      </div>
      {item.title ? <p className="mt-4 text-body-sm font-semibold text-ink-900">{item.title}</p> : null}
      {meta ? <p className="mt-1 text-caption text-foggy">{meta}</p> : null}
      {item.url ? (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-body-sm font-semibold text-primary">
          {visitLabel}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      ) : null}
    </div>
  );

  if (!item.url) return inner;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {inner}
    </a>
  );
}

export async function PressSection({ pressItems }: { pressItems?: PressItem[] | null }) {
  const items = (pressItems ?? []).filter((p) => p.title || p.organisation || p.logo).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.press');

  return (
    <section
      id="pressItems"
      aria-labelledby="pressItems-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="pressItems-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={i}>
            <PressCard item={item} visitLabel={t('visitLink')} />
          </li>
        ))}
      </ul>
    </section>
  );
}
