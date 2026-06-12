import {
  AtSign,
  Globe,
  Mail,
  MessageCircle,
  Music2,
  Phone,
  Send,
  Video,
  type LucideIcon,
} from 'lucide-react';

/** How a channel's handleOrUrl resolves to an actionable link. */
export type ChannelLinkMode = 'url' | 'tel' | 'mailto' | 'handle';

export interface ChannelMeta {
  icon: LucideIcon;
  linkMode: ChannelLinkMode;
}

/** Channel enum (shared.contact-channel.channelType) → icon + link behaviour. */
export const CONTACT_CHANNEL_META: Record<string, ChannelMeta> = {
  wechat: { icon: MessageCircle, linkMode: 'handle' },
  wechat_official: { icon: MessageCircle, linkMode: 'handle' },
  xiaohongshu: { icon: Globe, linkMode: 'url' },
  douyin: { icon: Music2, linkMode: 'url' },
  kakaotalk: { icon: MessageCircle, linkMode: 'handle' },
  zalo: { icon: MessageCircle, linkMode: 'url' },
  line: { icon: MessageCircle, linkMode: 'handle' },
  whatsapp: { icon: MessageCircle, linkMode: 'url' },
  facebook: { icon: Globe, linkMode: 'url' },
  instagram: { icon: Globe, linkMode: 'url' },
  tiktok: { icon: Music2, linkMode: 'url' },
  linkedin: { icon: Globe, linkMode: 'url' },
  youtube: { icon: Video, linkMode: 'url' },
  phone: { icon: Phone, linkMode: 'tel' },
  email: { icon: Mail, linkMode: 'mailto' },
  booking_link: { icon: Send, linkMode: 'url' },
};

export const CONTACT_CHANNEL_FALLBACK: ChannelMeta = { icon: AtSign, linkMode: 'handle' };
