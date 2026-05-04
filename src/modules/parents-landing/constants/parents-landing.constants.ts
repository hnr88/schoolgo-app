import { Database, Lock, School, ShieldCheck } from 'lucide-react';
import type { IconComponent } from '@/modules/design-system';

export const ARTICLES_ITEMS: Array<{ key: 'intakes' | 'englishTests' | 'boarding'; image: string }> = [
  { key: 'intakes', image: 'https://images.unsplash.com/photo-1635821620693-b6863c79db72?auto=format&fit=crop&w=720&h=540&q=80' },
  { key: 'englishTests', image: 'https://images.unsplash.com/photo-1742549586702-c23994895082?auto=format&fit=crop&w=720&h=540&q=80' },
  { key: 'boarding', image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=720&h=540&q=80' },
];

export const FAQ_KEYS = [
  'free',
  'dataSource',
  'englishTests',
  'doINeedAgent',
  'updateFrequency',
] as const;

export const FEATURED_KEYS: Array<{ key: 'a' | 'b' | 'c'; image: string }> = [
  { key: 'a', image: 'https://images.unsplash.com/photo-1603437119287-4a3732b685f9?auto=format&fit=crop&w=720&h=540&q=80' },
  { key: 'b', image: 'https://images.unsplash.com/photo-1621241484978-6f60fdb68f1c?auto=format&fit=crop&w=720&h=540&q=80' },
  { key: 'c', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=720&h=540&q=80' },
];

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

export const VERIFIED_CARDS: Array<{ key: 'a' | 'b' | 'c' | 'd'; image: string }> = [
  { key: 'a', image: 'https://images.unsplash.com/photo-1603437119287-4a3732b685f9?auto=format&fit=crop&w=640&h=480&q=80' },
  { key: 'b', image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=640&h=480&q=80' },
  { key: 'c', image: 'https://images.unsplash.com/photo-1651313976327-f10851420a08?auto=format&fit=crop&w=640&h=480&q=80' },
  { key: 'd', image: 'https://images.unsplash.com/photo-1751510397614-e289eb4ce57a?auto=format&fit=crop&w=640&h=480&q=80' },
];
