import { BadgeCheck, FileCheck, FileSearch, Filter, Handshake, Headphones, Inbox, Lock, MessagesSquare, Network, PiggyBank, Send, ShieldCheck } from 'lucide-react';

import type {
  CommissionBullet,
  HeroStatKey,
  MatchingStep,
  PainPointItem,
  StatsBarItemKey,
  TestimonialKey,
} from '../types/agents-landing.types';

export const COMMISSION_BULLETS: CommissionBullet[] = [
  { key: 'free', icon: PiggyBank },
  { key: 'students', icon: ShieldCheck },
  { key: 'attribution', icon: Handshake },
  { key: 'approved', icon: BadgeCheck },
  { key: 'network', icon: Network },
  { key: 'privacy', icon: Lock },
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
  { key: 'connect', icon: Handshake },
  { key: 'apply', icon: FileCheck, comingSoon: true },
];

export const TESTIMONIAL_KEYS: readonly TestimonialKey[] = ['a', 'b', 'c'];

export const HERO_STAT_KEYS: readonly HeroStatKey[] = ['schools', 'sectors', 'commission'];

export const STATS_BAR_ITEMS: readonly StatsBarItemKey[] = ['schools', 'requirements', 'tests', 'free'];

export const QEAC_VISIBILITY_ROWS = ['public', 'optional', 'private'] as const;

export const AGENTS_FAQ_KEYS = [
  'free',
  'makesMoney',
  'contactStudents',
  'attribution',
  'interfere',
  'publicInfo',
  'competes',
  'howConnected',
  'futureCharging',
] as const;
