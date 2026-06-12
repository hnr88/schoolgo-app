import {
  CONTACT_CHANNEL_FALLBACK,
  CONTACT_CHANNEL_META,
  type ChannelMeta,
} from '@/modules/agent-detail/constants/contact-channels.constants';

export interface ResolvedChannel {
  meta: ChannelMeta;
  /** Actionable href, or null when the value is a non-clickable handle (e.g. a WeChat ID to add). */
  href: string | null;
}

function normaliseUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

/** Resolve a contact channel's icon/link behaviour and a clickable href (null for copy-only handles). */
export function resolveChannel(channelType: string | null | undefined, handleOrUrl: string | null | undefined): ResolvedChannel {
  const meta = (channelType && CONTACT_CHANNEL_META[channelType]) || CONTACT_CHANNEL_FALLBACK;
  const value = handleOrUrl?.trim();
  if (!value) return { meta, href: null };

  switch (meta.linkMode) {
    case 'url':
      return { meta, href: normaliseUrl(value) };
    case 'tel':
      return { meta, href: `tel:${value.replace(/\s+/g, '')}` };
    case 'mailto':
      return { meta, href: `mailto:${value}` };
    case 'handle':
    default:
      return { meta, href: /^https?:\/\//i.test(value) ? value : null };
  }
}
