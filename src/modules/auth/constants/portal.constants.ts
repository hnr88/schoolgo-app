import { Briefcase, GraduationCap, School } from 'lucide-react';

import type { Portal } from '@/lib/portal-url';
import type { PortalNavItem, PortalTheme, UserTypeOption } from '../types/component.types';

export const PORTAL_TABS: ReadonlyArray<{
  key: 'parents' | 'agents' | 'schools';
  portal: Portal;
}> = [
  { key: 'parents', portal: 'parent' },
  { key: 'agents', portal: 'agent' },
  { key: 'schools', portal: 'school' },
];

export const PORTAL_DOT: Record<Portal, string> = {
  parent: 'bg-rausch-400',
  agent: 'bg-babu-500',
  school: 'bg-arches-500',
};

export const PORTAL_NAV: Record<Portal, PortalNavItem[]> = {
  parent: [
    { labelKey: 'howItWorks', hash: '#how-it-works' },
    { labelKey: 'compare', hash: '#compare' },
    { labelKey: 'faq', hash: '#faq' },
  ],
  agent: [
    { labelKey: 'howItWorks', hash: '#how-it-works' },
    { labelKey: 'commission', hash: '#commission' },
    { labelKey: 'trust', hash: '#trust' },
  ],
  school: [
    { labelKey: 'howItWorks', hash: '#how-it-works' },
    { labelKey: 'pricing', hash: '#pricing' },
    { labelKey: 'faq', hash: '#faq' },
  ],
};

export const PORTAL_THEME: Record<Portal, PortalTheme> = {
  parent: {
    gradient: 'bg-gradient-to-br from-rausch-50/70 via-white to-babu-50/20',
    blob1: 'bg-rausch-200',
    blob2: 'bg-babu-100',
    image: '/images/auth/parent.jpg',
    overlayGradient: 'from-rausch-500/20 to-rausch-600/30',
    panelBg: 'bg-rausch-50/40',
    stats: [
      { valueKey: 'parent.stat1Value', labelKey: 'parent.stat1Label' },
      { valueKey: 'parent.stat2Value', labelKey: 'parent.stat2Label' },
      { valueKey: 'parent.stat3Value', labelKey: 'parent.stat3Label' },
    ],
  },
  agent: {
    gradient: 'bg-gradient-to-br from-babu-50/70 via-white to-babu-50/20',
    blob1: 'bg-babu-200',
    blob2: 'bg-babu-100',
    image: '/images/auth/agent.jpg',
    overlayGradient: 'from-babu-600/20 to-babu-700/30',
    panelBg: 'bg-babu-50/40',
    stats: [
      { valueKey: 'agent.stat1Value', labelKey: 'agent.stat1Label' },
      { valueKey: 'agent.stat2Value', labelKey: 'agent.stat2Label' },
      { valueKey: 'agent.stat3Value', labelKey: 'agent.stat3Label' },
    ],
  },
  school: {
    gradient: 'bg-gradient-to-br from-arches-50/70 via-white to-arches-50/20',
    blob1: 'bg-arches-200',
    blob2: 'bg-arches-100',
    image: '/images/auth/school.jpg',
    overlayGradient: 'from-arches-500/20 to-arches-600/30',
    panelBg: 'bg-arches-50/40',
    stats: [
      { valueKey: 'school.stat1Value', labelKey: 'school.stat1Label' },
      { valueKey: 'school.stat2Value', labelKey: 'school.stat2Label' },
      { valueKey: 'school.stat3Value', labelKey: 'school.stat3Label' },
    ],
  },
};

export const PORTAL_ACCENT_BAR: Record<Portal, string> = {
  parent: 'bg-rausch-400',
  agent: 'bg-babu-500',
  school: 'bg-arches-400',
};

export const PORTAL_LINK_COLOR: Record<Portal, string> = {
  parent: 'text-rausch-500 hover:text-rausch-600',
  agent: 'text-babu-600 hover:text-babu-700',
  school: 'text-arches-500 hover:text-arches-600',
};

export const USER_TYPES: UserTypeOption[] = [
  { type: 'parent', icon: GraduationCap },
  { type: 'agent', icon: Briefcase },
  { type: 'school', icon: School },
];
