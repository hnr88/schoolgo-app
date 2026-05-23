import { CheckCircle2, FileText, Inbox, IdCard, ListChecks, School } from 'lucide-react';

import type { Plan, TimelineStep, ToolItem } from '../types/schools-landing.types';

export const FAQ_KEYS = ['attract', 'verify', 'agents', 'documents', 'cost', 'diversify'] as const;

export const PLANS: Plan[] = [
  { key: 'listing', featureKeys: ['a', 'b', 'c'], ctaHref: '/search' },
  { key: 'admissions', featured: true, featureKeys: ['a', 'b', 'c', 'd'], ctaHref: '/search' },
];

export const TOOLS: ToolItem[] = [
  { key: 'profile', icon: IdCard },
  { key: 'applications', icon: FileText },
  { key: 'inbox', icon: Inbox },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  { key: 'receive', icon: Inbox, comingSoon: true },
  { key: 'review', icon: ListChecks, comingSoon: true },
  { key: 'decide', icon: CheckCircle2, comingSoon: true },
  { key: 'onboard', icon: School, comingSoon: true },
];
