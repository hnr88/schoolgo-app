import {
  HandHeart,
  Home,
  Plane,
  ShieldCheck,
  Share2,
  Stethoscope,
  Users,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';

/** shared.welfare-capability.capability enum (in display order). */
export const WELFARE_CAPABILITY_ORDER = [
  'guardianship',
  'homestay',
  'caaw_coordination',
  'airport_pickup',
  'oshc_setup',
  'pre_departure',
  'settlement_aftercare',
  'welfare_checkins',
] as const;

export type WelfareCapabilityKey = (typeof WELFARE_CAPABILITY_ORDER)[number];

export const WELFARE_CAPABILITY_ICONS: Record<WelfareCapabilityKey, LucideIcon> = {
  guardianship: ShieldCheck,
  homestay: Home,
  caaw_coordination: Users,
  airport_pickup: Plane,
  oshc_setup: Stethoscope,
  pre_departure: UserCheck,
  settlement_aftercare: HandHeart,
  welfare_checkins: HandHeart,
};

export const WELFARE_CAPABILITY_FALLBACK_ICON: LucideIcon = ShieldCheck;

export function isWelfareCapabilityKey(value: string | null | undefined): value is WelfareCapabilityKey {
  return value != null && (WELFARE_CAPABILITY_ORDER as readonly string[]).includes(value);
}

/** shared.welfare-capability.framing enum → honest-framing badge tone (we own / we coordinate / we refer out). */
export const WELFARE_FRAMING_KEYS = ['we_arrange', 'we_coordinate', 'we_refer'] as const;
export type WelfareFramingKey = (typeof WELFARE_FRAMING_KEYS)[number];

export const WELFARE_FRAMING_ICON: Record<WelfareFramingKey, LucideIcon> = {
  we_arrange: HandHeart,
  we_coordinate: Users,
  we_refer: Share2,
};

export const WELFARE_FRAMING_BADGE: Record<WelfareFramingKey, string> = {
  we_arrange: 'bg-babu-50 text-babu-700',
  we_coordinate: 'bg-arches-50 text-arches-700',
  we_refer: 'bg-muted text-foggy',
};

export function isWelfareFramingKey(value: string | null | undefined): value is WelfareFramingKey {
  return value != null && (WELFARE_FRAMING_KEYS as readonly string[]).includes(value);
}
