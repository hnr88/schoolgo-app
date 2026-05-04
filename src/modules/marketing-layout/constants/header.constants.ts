import type { Portal } from '@/lib/portal-url';

export const SUB_MENUS = ['explore', 'resources', 'about'] as const;

export const SUB_MENU_ITEMS: Record<
  string,
  Array<{ key: string; href: string; icon: string }>
> = {
  explore: [
    { key: 'browseSchools', href: '/search', icon: 'search' },
    { key: 'compareSchools', href: '#compare', icon: 'compare' },
    { key: 'scholarships', href: '#faq', icon: 'award' },
    { key: 'englishTests', href: '#faq', icon: 'languages' },
  ],
  resources: [
    { key: 'admissionsGuide', href: '#how-it-works', icon: 'book' },
    { key: 'boardingSchools', href: '#faq', icon: 'building' },
    { key: 'visaRequirements', href: '#faq', icon: 'badge' },
  ],
  about: [
    { key: 'aboutSchoolGo', href: '#faq', icon: 'sparkles' },
    { key: 'contactUs', href: '#faq', icon: 'message' },
    { key: 'forAgents', href: '#faq', icon: 'users' },
    { key: 'forSchools', href: '#faq', icon: 'school' },
  ],
};

export const PORTAL_NAV: Record<Portal, Array<{ labelKey: string; href: string }>> = {
  parent: [
    { labelKey: 'howItWorks', href: '#how-it-works' },
    { labelKey: 'compare', href: '#compare' },
    { labelKey: 'faq', href: '#faq' },
  ],
  agent: [
    { labelKey: 'howItWorks', href: '#how-it-works' },
    { labelKey: 'commission', href: '#commission' },
    { labelKey: 'trust', href: '#trust' },
  ],
  school: [
    { labelKey: 'howItWorks', href: '#how-it-works' },
    { labelKey: 'pricing', href: '#pricing' },
    { labelKey: 'faq', href: '#faq' },
  ],
};
