import { FileSearch, Filter, Handshake, Headphones, Inbox, MessagesSquare, PiggyBank, Send, ShieldCheck } from 'lucide-react';

import type {
  CommissionBullet,
  HeroStatKey,
  MatchingStep,
  PainPointItem,
  QeacProfileStatKey,
  StatsBarItemKey,
  TestimonialKey,
} from '../types/agents-landing.types';

export const COMMISSION_BULLETS: CommissionBullet[] = [
  { key: 'zero', icon: PiggyBank },
  { key: 'direct', icon: Handshake },
  { key: 'audit', icon: FileSearch },
];

export const PAIN_POINT_ITEMS: PainPointItem[] = [
  { key: 'email', icon: Inbox },
  { key: 'status', icon: MessagesSquare },
  { key: 'trust', icon: ShieldCheck },
  { key: 'requirements', icon: FileSearch },
];

export const MATCHING_STEPS: MatchingStep[] = [
  { key: 'listen', icon: Headphones },
  { key: 'match', icon: Filter, comingSoon: true },
  { key: 'deliver', icon: Send, comingSoon: true },
];

export const TESTIMONIAL_KEYS: readonly TestimonialKey[] = ['a', 'b', 'c'];

export const HERO_STAT_KEYS: readonly HeroStatKey[] = ['schools', 'sectors', 'commission'];

export const STATS_BAR_ITEMS: readonly StatsBarItemKey[] = ['schools', 'requirements', 'tests', 'free'];

export const QEAC_PROFILE_STAT_KEYS: readonly QeacProfileStatKey[] = [
  'yearsActive',
  'students',
  'placements',
  'languages',
];

export const AGENTS_FAQ_KEYS = [
  'find',
  'englishTests',
  'verifyScores',
  'becomeAgent',
  'fees',
  'manage',
] as const;
