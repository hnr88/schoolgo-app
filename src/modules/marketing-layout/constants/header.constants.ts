import type { Portal } from '@/lib/portal-url';

export const SUB_MENUS = ['explore', 'resources', 'about'] as const;

export const SUB_MENU_ITEMS: Record<
  string,
  Array<{ key: string; href: string; icon: string }>
> = {
  explore: [
    { key: 'browseSchools', href: '/search', icon: 'search' },
    { key: 'compareSchools', href: '/launching-soon', icon: 'compare' },
    { key: 'schoolTypes', href: '/guides/school-types', icon: 'school' },
    { key: 'englishTests', href: '/guides/english-requirements', icon: 'languages' },
  ],
  resources: [
    { key: 'admissionsGuide', href: '/guides/choose-a-school', icon: 'book' },
    { key: 'schoolFees', href: '/guides/school-fees', icon: 'wallet' },
    { key: 'visaRequirements', href: '/guides/student-visa', icon: 'badge' },
    { key: 'allGuides', href: '/guides', icon: 'library' },
  ],
  about: [
    { key: 'aboutSchoolGo', href: '/launching-soon', icon: 'sparkles' },
    { key: 'contactUs', href: '/launching-soon', icon: 'message' },
    { key: 'forAgents', href: '/launching-soon', icon: 'users' },
    { key: 'forSchools', href: '/launching-soon', icon: 'school' },
  ],
};

export const PORTAL_NAV: Record<Portal, Array<{ labelKey: string; href: string }>> = {
  parent: [
    { labelKey: 'howItWorks', href: '/#how-it-works' },
    { labelKey: 'compare', href: '/#compare' },
    { labelKey: 'faq', href: '/#faq' },
  ],
  agent: [
    { labelKey: 'howItWorks', href: '/#how-it-works' },
    { labelKey: 'commission', href: '/#commission' },
    { labelKey: 'trust', href: '/#trust' },
  ],
  school: [
    { labelKey: 'howItWorks', href: '/#how-it-works' },
    { labelKey: 'pricing', href: '/#pricing' },
    { labelKey: 'faq', href: '/#faq' },
  ],
};
