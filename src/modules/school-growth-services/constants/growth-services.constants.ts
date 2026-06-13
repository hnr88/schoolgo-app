import {
  Megaphone,
  ShieldCheck,
  Sparkles,
  Star,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';

export const GROWTH_SERVICES_QUERY_KEY = ['school-growth-services'] as const;
export const GROWTH_ENGAGEMENTS_QUERY_KEY = ['school-growth-engagements'] as const;

export const GROWTH_SERVICE_CATEGORIES = [
  'profile',
  'featured_placement',
  'agent_activation',
  'compliance_audit',
  'marketing',
] as const;

export const GROWTH_BILLING_TYPES = ['oneoff', 'recurring'] as const;

export const GROWTH_ENGAGEMENT_STATUSES = [
  'requested',
  'active',
  'delivered',
  'cancelled',
] as const;

export const CATEGORY_ICON: Record<(typeof GROWTH_SERVICE_CATEGORIES)[number], LucideIcon> = {
  profile: Sparkles,
  featured_placement: Star,
  agent_activation: UserPlus,
  compliance_audit: ShieldCheck,
  marketing: Megaphone,
};

export const ENGAGEMENT_STATUS_STYLES: Record<
  string,
  { dot: string; bg: string; text: string }
> = {
  requested: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-vivid-amber' },
  active: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris' },
  delivered: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  cancelled: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
};
