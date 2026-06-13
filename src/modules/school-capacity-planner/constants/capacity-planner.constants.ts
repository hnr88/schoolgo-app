import type { WaitlistStatus } from '@/modules/school-capacity-planner/types/capacity-planner.types';

export const YIELD_PLAN_QUERY_KEY = ['school-capacity-planner', 'yield-plan'] as const;
export const WAITLIST_QUERY_KEY = ['school-capacity-planner', 'waitlist'] as const;

export const WAITLIST_STATUS_STYLES: Record<
  WaitlistStatus,
  { dot: string; bg: string; text: string }
> = {
  waiting: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-ink-900' },
  promoted: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint' },
  declined: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  expired: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
};

export const SCENARIO_ORDER = ['conservative', 'expected', 'optimistic'] as const;
