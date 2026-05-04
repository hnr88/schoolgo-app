import { FileSearch, Filter, Handshake, Headphones, Inbox, MessagesSquare, PiggyBank, Send, ShieldCheck } from 'lucide-react';

import type {
  CommissionBullet,
  HeroStatKey,
  InboxRow,
  MatchingStep,
  PainPointItem,
  QeacProfileStatKey,
  ScaleAgent,
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

export const INBOX_ROWS: InboxRow[] = [
  { key: 'scotch', image: 'https://images.unsplash.com/photo-1603437119287-4a3732b685f9?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'brisbane', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'sydney', image: 'https://images.unsplash.com/photo-1621241484978-6f60fdb68f1c?auto=format&fit=crop&w=160&h=160&q=80' },
];

export const SCALE_AGENTS: ScaleAgent[] = [
  { key: 'a', image: 'https://images.unsplash.com/photo-1698047681452-08eba22d0c64?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'b', image: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'c', image: 'https://images.unsplash.com/photo-1696603865152-74514c198a07?auto=format&fit=crop&w=160&h=160&q=80' },
  { key: 'd', image: 'https://images.unsplash.com/photo-1573496527892-904f897eb744?auto=format&fit=crop&w=160&h=160&q=80' },
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

export const QEAC_PROFILE_STAT_VALUES: Partial<Record<QeacProfileStatKey, string>> = {
  yearsActive: '8',
  students: '143',
  placements: '37',
};
