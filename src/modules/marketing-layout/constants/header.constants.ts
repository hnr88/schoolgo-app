import type { Portal } from '@/lib/portal-url';
import type { AudienceKey } from '@/modules/marketing-layout/types/header.types';

export const SUB_MENUS = ['findSchools', 'guides'] as const;

export const SUB_MENU_ITEMS: Record<
  string,
  Array<{ key: string; href: string; icon: string }>
> = {
  findSchools: [
    { key: 'searchAllSchools', href: '/search', icon: 'search' },
    { key: 'compareSchools', href: '/launching-soon', icon: 'compare' },
    { key: 'schoolTypes', href: '/guides/school-types', icon: 'school' },
    { key: 'englishRequirements', href: '/guides/english-requirements', icon: 'languages' },
  ],
  guides: [
    { key: 'chooseSchool', href: '/guides/choose-a-school', icon: 'book' },
    { key: 'understandFees', href: '/guides/school-fees', icon: 'wallet' },
    { key: 'visaGuide', href: '/guides/student-visa', icon: 'badge' },
    { key: 'allGuides', href: '/guides', icon: 'library' },
  ],
};

export const AUDIENCE_NAV: Array<{ key: AudienceKey; portal: Portal }> = [
  { key: 'parents', portal: 'parent' },
  { key: 'agents', portal: 'agent' },
  { key: 'schools', portal: 'school' },
];
