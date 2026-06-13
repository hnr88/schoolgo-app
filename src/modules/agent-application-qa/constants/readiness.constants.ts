import { CheckCircle2, AlertTriangle, ShieldX, type LucideIcon } from 'lucide-react';
import type { ReadinessVerdict } from '@/modules/agent-application-qa/types/readiness.types';

// Max schools the backend accepts per readiness check (MAX_SCHOOLS_PER_CHECK).
export const MAX_READINESS_SCHOOLS = 25;

// Minimum characters before the school autocomplete fires.
export const SCHOOL_SEARCH_MIN_CHARS = 1;

// Severity ordering used to sort the results (block first, then warn, then ready).
export const VERDICT_RANK: Record<ReadinessVerdict, number> = {
  block: 0,
  warn: 1,
  ready: 2,
};

// StatusBadge style map keyed by verdict.
export const VERDICT_BADGE_STYLES: Record<
  ReadinessVerdict,
  { dot: string; bg: string; text: string }
> = {
  ready: { dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  warn: { dot: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
  block: { dot: 'bg-rose-500', bg: 'bg-rose-50', text: 'text-rose-700' },
};

export const VERDICT_ICON: Record<ReadinessVerdict, LucideIcon> = {
  ready: CheckCircle2,
  warn: AlertTriangle,
  block: ShieldX,
};

export const VERDICT_CARD_ACCENT: Record<ReadinessVerdict, string> = {
  ready: 'border-l-emerald-500',
  warn: 'border-l-amber-500',
  block: 'border-l-rose-500',
};
