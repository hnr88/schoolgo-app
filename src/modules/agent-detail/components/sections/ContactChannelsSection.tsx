import { getTranslations } from 'next-intl/server';
import { ExternalLink, MessageCircle, Star } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { sortByOrder } from '@/modules/agent-detail/lib/section-utils';
import { resolveChannel } from '@/modules/agent-detail/lib/contact-channel-href';
import { CONTACT_CHANNEL_META } from '@/modules/agent-detail/constants/contact-channels.constants';
import type { ContactChannel } from '@/modules/agent-detail/types/agent-detail.types';

interface ContactChannelsSectionProps {
  channels?: ContactChannel[];
}

function channelLabel(channel: ContactChannel, fallback: string): string {
  return channel.displayLabel?.trim() || channel.handleOrUrl?.trim() || fallback;
}

export async function ContactChannelsSection({ channels }: ContactChannelsSectionProps) {
  const items = Array.isArray(channels)
    ? sortByOrder(channels).filter((c) => Boolean(c.handleOrUrl?.trim()))
    : [];
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.contactChannels');

  return (
    <section
      id="contact-channels"
      aria-labelledby="contact-channels-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="contact-channels-heading" className="mt-2 flex items-center gap-2 text-2xl font-bold text-ink-900 md:text-3xl">
        <MessageCircle className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('heading')}
      </h2>
      <p className="mt-2 text-body-sm text-foggy">{t('subheading')}</p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((channel, i) => {
          const { meta, href } = resolveChannel(channel.channelType, channel.handleOrUrl);
          const Icon = meta.icon;
          const typeName =
            channel.channelType && CONTACT_CHANNEL_META[channel.channelType]
              ? t(`type.${channel.channelType}`)
              : t('type.other');
          const label = channelLabel(channel, typeName);
          const isExternal = href != null && /^https?:\/\//i.test(href);

          const inner = (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="text-body-sm font-semibold text-ink-900">{typeName}</span>
                  {channel.isPrimary ? (
                    <Star className="h-3.5 w-3.5 text-arches-700" aria-hidden="true" />
                  ) : null}
                </span>
                <span className="block truncate text-caption text-foggy">{label}</span>
              </span>
              {href ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-primary px-3 py-1.5 text-caption font-semibold text-on-primary">
                  {t('connect')}
                  {isExternal ? <ExternalLink className="h-3 w-3" aria-hidden="true" /> : null}
                </span>
              ) : (
                <span className="shrink-0 rounded-pill border border-divider px-3 py-1.5 text-caption font-medium text-foggy">
                  {t('addByHandle')}
                </span>
              )}
            </>
          );

          return (
            <li key={`${channel.channelType ?? 'channel'}-${i}`}>
              {href ? (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer noopener' : undefined}
                  className="flex items-center gap-3 rounded-lg border border-divider bg-card p-4 transition-colors hover:border-primary"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-divider bg-card p-4">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
