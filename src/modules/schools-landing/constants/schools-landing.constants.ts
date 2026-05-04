import { CheckCircle2, FileText, Inbox, IdCard, ListChecks, School } from 'lucide-react';

import type { HeroRow, Plan, TimelineStep, ToolItem } from '../types/schools-landing.types';

export const FAQ_KEYS = ['claim', 'agents', 'commission', 'data'] as const;

export const HERO_ROWS: HeroRow[] = [
  { key: 'a', tone: 'brand', image: 'https://images.unsplash.com/photo-1758518729459-235dcaadc611?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'b', tone: 'featured', image: 'https://images.unsplash.com/photo-1698047681452-08eba22d0c64?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'c', tone: 'trust', image: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?auto=format&fit=crop&w=160&h=160&q=80' },
];

export const PLANS: Plan[] = [
  { key: 'listing', featureKeys: ['a', 'b', 'c'], ctaHref: '/schools' },
  { key: 'admissions', featured: true, featureKeys: ['a', 'b', 'c', 'd'], ctaHref: '/schools' },
];

export const STATS_ITEMS = ['schools', 'states', 'sectors', 'feeRange'] as const;

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
