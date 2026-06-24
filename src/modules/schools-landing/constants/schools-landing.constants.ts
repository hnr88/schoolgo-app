import {
  BedDouble,
  Building2,
  Handshake,
  IdCard,
  Languages,
  ListChecks,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  Wallet,
} from 'lucide-react';

import type {
  AgentRelationshipBullet,
  AppQualityItem,
  Plan,
  TimelineStep,
  ToolItem,
} from '../types/schools-landing.types';

export const FAQ_KEYS = [
  'claim',
  'whoCreated',
  'charge',
  'verifyAgents',
  'interfere',
  'beforeClaim',
  'studentData',
  'replaceAdmissions',
  'openClosed',
  'capacity',
] as const;

export const PLANS: Plan[] = [
  { key: 'listing', featureKeys: ['a', 'b', 'c'], ctaHref: '/school/sign-up' },
  { key: 'admissions', featured: true, featureKeys: ['a', 'b', 'c', 'd'], ctaHref: '/school/sign-up' },
];

export const TOOLS: ToolItem[] = [
  { key: 'profile', icon: IdCard },
  { key: 'requirements', icon: ListChecks },
  { key: 'agents', icon: UserCheck },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  { key: 'find', icon: Search },
  { key: 'understand', icon: ListChecks },
  { key: 'connect', icon: Handshake },
  { key: 'apply', icon: Send },
];

export const APPLICATION_QUALITY_ITEMS: AppQualityItem[] = [
  { key: 'english', icon: Languages },
  { key: 'costs', icon: Wallet },
  { key: 'accommodation', icon: BedDouble },
  { key: 'agents', icon: UserCheck },
];

export const AGENT_RELATIONSHIP_BULLETS: AgentRelationshipBullet[] = [
  { key: 'approve', icon: UserCheck },
  { key: 'connect', icon: Handshake },
  { key: 'agreements', icon: ShieldCheck },
  { key: 'performance', icon: SlidersHorizontal },
  { key: 'remove', icon: Building2 },
];
