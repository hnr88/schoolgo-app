import type { DecisionStatus } from '@/modules/parent-shortlist/types/shortlist.types';

export const DECISION_STATUS_STYLES: Record<
  DecisionStatus,
  { dot: string; bg: string; text: string }
> = {
  considering: { dot: 'bg-foggy/60', bg: 'bg-muted', text: 'text-foggy' },
  visiting: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris-strong' },
  applying: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-vivid-mint-strong' },
  rejected: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};
