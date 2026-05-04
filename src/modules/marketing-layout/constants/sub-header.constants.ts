import {
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  GitCompare,
  Languages,
  MessageCircle,
  School,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import type { Portal } from '@/lib/portal-url';
import type { AudienceKey } from '@/modules/marketing-layout/types/header.types';

export const ICONS = {
  award: Award,
  badge: BadgeCheck,
  book: BookOpen,
  building: Building2,
  compare: GitCompare,
  languages: Languages,
  message: MessageCircle,
  school: School,
  search: Search,
  sparkles: Sparkles,
  users: Users,
} as const;

export const AUDIENCES: Array<{ key: AudienceKey; portal: Portal }> = [
  { key: 'parents', portal: 'parent' },
  { key: 'agents', portal: 'agent' },
  { key: 'schools', portal: 'school' },
];
