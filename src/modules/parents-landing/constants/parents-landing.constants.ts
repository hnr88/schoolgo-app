import { Database, Lock, School, ShieldCheck } from 'lucide-react';
import type { IconComponent } from '@/modules/design-system';

export const FAQ_KEYS = ['enrol', 'cost', 'englishTest', 'visa', 'agent', 'schoolTypes', 'free'] as const;

export const PICK_A_TEST_FEATURED: Array<'aeas' | 'idat' | 'duolingo' | 'ielts'> = [
  'aeas',
  'idat',
  'duolingo',
  'ielts',
];

export const PICK_A_TEST_SECONDARY: Array<'pte' | 'cambridge' | 'toefl'> = ['pte', 'cambridge', 'toefl'];

export const LANGS: Array<{ code: string; key: string }> = [
  { code: 'en', key: 'en' },
  { code: 'zh', key: 'zh' },
  { code: 'ko', key: 'ko' },
  { code: 'ms', key: 'ms' },
  { code: 'vi', key: 'vi' },
  { code: 'th', key: 'th' },
  { code: 'id', key: 'id' },
];

export const TRUST_BAR_ITEMS: Array<{ key: 'cricos' | 'datagov' | 'acara' | 'esos'; icon: IconComponent }> = [
  { key: 'cricos', icon: ShieldCheck },
  { key: 'datagov', icon: Database },
  { key: 'acara', icon: School },
  { key: 'esos', icon: Lock },
];

export const FEATURED_SCHOOL_SLUGS: readonly string[] = [
  'shore-sydney-church-of-england-grammar-school-north-sydney',
  'melbourne-grammar-school-melbourne',
  'brisbane-grammar-school-brisbane',
];
