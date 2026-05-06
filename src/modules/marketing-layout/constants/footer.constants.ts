import type { Portal } from '@/lib/portal-url';

type FooterLink =
  | { label: string; path: string }
  | { columnKey: 'parents' | 'agents' | 'schools'; linkKey: string; path: string };

type FooterColumn = {
  portal?: Portal;
  links: FooterLink[];
};

const PARENT_PRIMARY_COLUMN: FooterColumn = {
  portal: 'parent',
  links: [
    { columnKey: 'parents', linkKey: 'findSchools', path: '/search' },
    { columnKey: 'parents', linkKey: 'compare', path: '/#compare' },
    { columnKey: 'parents', linkKey: 'english', path: '/search' },
    { columnKey: 'parents', linkKey: 'scholarships', path: '/search' },
  ],
};

const PARENT_SECONDARY_COLUMN: FooterColumn = {
  portal: 'parent',
  links: [
    { label: 'How it works', path: '/#how-it-works' },
    { label: 'Trusted agents', path: '/#trusted-agents' },
    { label: 'FAQ', path: '/#faq' },
    { label: 'Parent sign in', path: '/sign-in' },
  ],
};

const AGENT_PRIMARY_COLUMN: FooterColumn = {
  portal: 'agent',
  links: [
    { columnKey: 'agents', linkKey: 'overview', path: '/' },
    { columnKey: 'agents', linkKey: 'qeac', path: '/#trust' },
    { columnKey: 'agents', linkKey: 'pipeline', path: '/#how-it-works' },
    { label: 'Zero commission', path: '/#commission' },
  ],
};

const AGENT_SECONDARY_COLUMN: FooterColumn = {
  portal: 'agent',
  links: [
    { label: 'How it works', path: '/#how-it-works' },
    { label: 'Agent profile', path: '/#trust' },
    { columnKey: 'agents', linkKey: 'login', path: '/sign-in' },
    { label: 'Create agent account', path: '/sign-up' },
  ],
};

const SCHOOL_PRIMARY_COLUMN: FooterColumn = {
  portal: 'school',
  links: [
    { columnKey: 'schools', linkKey: 'overview', path: '/' },
    { columnKey: 'schools', linkKey: 'claim', path: '/#how-it-works' },
    { columnKey: 'schools', linkKey: 'pricing', path: '/#pricing' },
    { label: 'Admissions tools', path: '/#how-it-works' },
  ],
};

const SCHOOL_SECONDARY_COLUMN: FooterColumn = {
  portal: 'school',
  links: [
    { label: 'How it works', path: '/#how-it-works' },
    { label: 'FAQ', path: '/#faq' },
    { columnKey: 'schools', linkKey: 'login', path: '/sign-in' },
    { label: 'Create school account', path: '/sign-up' },
  ],
};

export const FOOTER_COLUMNS_BY_PORTAL = {
  parent: [PARENT_PRIMARY_COLUMN, PARENT_SECONDARY_COLUMN],
  agent: [AGENT_PRIMARY_COLUMN, AGENT_SECONDARY_COLUMN],
  school: [SCHOOL_PRIMARY_COLUMN, SCHOOL_SECONDARY_COLUMN],
} satisfies Record<Portal, FooterColumn[]>;

export const LANGUAGES: Array<{ code: string; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'ko', label: '한국어' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ภาษาไทย' },
];
