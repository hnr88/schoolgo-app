import { generateGradientPlaceholder } from '@/lib/schools/generate-school-placeholder';
import { BadgeCheck, LayoutGrid, ListChecks, Search } from 'lucide-react';

export const STEP_KEYS = ['browse', 'shortlist', 'prepare', 'apply'] as const;

export const ICONS = [Search, LayoutGrid, ListChecks, BadgeCheck];

export const STEP_IMAGES = [
  generateGradientPlaceholder('step-browse'),
  generateGradientPlaceholder('step-shortlist'),
  generateGradientPlaceholder('step-prepare'),
  generateGradientPlaceholder('step-apply'),
];
