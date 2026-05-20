import type { Portal } from '@/lib/portal-url';
import type { AudienceKey } from '@/modules/marketing-layout/types/header.types';

export const SUB_MENUS = ['findSchools', 'guides', 'resources', 'explore', 'about'] as const;

export const SUB_MENU_ITEMS: Record<
  string,
  Array<{ key: string; href: string; icon: string }>
> = {
  findSchools: [
    { key: 'searchAllSchools', href: '/search', icon: 'search' },
    { key: 'compareSchools', href: '/search', icon: 'compare' },
    { key: 'schoolTypes', href: '/school-search/religious-and-independent-schools', icon: 'school' },
    { key: 'englishRequirements', href: '/international/english-test-pathways', icon: 'languages' },
  ],
  guides: [
    { key: 'chooseSchool', href: '/guides/choose-a-school', icon: 'book' },
    { key: 'understandFees', href: '/guides/school-fees', icon: 'wallet' },
    { key: 'visaGuide', href: '/guides/student-visa', icon: 'badge' },
    { key: 'allGuides', href: '/guides', icon: 'library' },
  ],
  resources: [
    { key: 'admissionsGuide', href: '/admissions/admissions-hub-australian-schools', icon: 'book' },
    { key: 'schoolFees', href: '/fees/school-fees-planning', icon: 'wallet' },
    { key: 'visaRequirements', href: '/international/student-visa-overview', icon: 'badge' },
    { key: 'blockLibrary', href: '/resources/blocks', icon: 'sparkles' },
    { key: 'pageDesigns', href: '/resources/designs', icon: 'library' },
    { key: 'allGuides', href: '/resources', icon: 'library' },
  ],
  explore: [
    { key: 'browseSchools', href: '/search', icon: 'search' },
    { key: 'compareSchools', href: '/school-search/compare-schools-guide', icon: 'compare' },
    { key: 'schoolTypes', href: '/school-search/religious-and-independent-schools', icon: 'school' },
    { key: 'englishTests', href: '/international/english-test-pathways', icon: 'languages' },
  ],
  about: [
    { key: 'aboutSchoolGo', href: '/company/about-schoolgo', icon: 'sparkles' },
    { key: 'contactUs', href: '/company/contact-admissions-team', icon: 'message' },
    { key: 'forAgents', href: '/partners/agent-partner-overview', icon: 'users' },
    { key: 'forSchools', href: '/school-solutions/school-profile-claiming', icon: 'building' },
  ],
};

export const AUDIENCE_NAV: Array<{ key: AudienceKey; portal: Portal }> = [
  { key: 'parents', portal: 'parent' },
  { key: 'agents', portal: 'agent' },
  { key: 'schools', portal: 'school' },
];
