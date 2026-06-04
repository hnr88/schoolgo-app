import { BadgeCheck, LayoutGrid, ListChecks, Search } from 'lucide-react';

export const STEP_KEYS = ['browse', 'shortlist', 'prepare', 'apply'] as const;

export const ICONS = [Search, LayoutGrid, ListChecks, BadgeCheck];

export const STEP_IMAGES = [
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=600&h=400&q=80', // browse/search
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80', // shortlist/compare
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80', // prepare/documents
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80', // apply/submit
];
