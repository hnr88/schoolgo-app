import type { Portal } from '@/lib/portal-url';

export const COLUMNS = [
  {
    key: 'parents' as const,
    portal: 'parent' as Portal,
    links: [
      { key: 'findSchools', path: '/search' },
      { key: 'compare', path: '/search' },
      { key: 'scholarships', path: '/search' },
      { key: 'english', path: '/search' },
    ],
  },
  {
    key: 'agents' as const,
    portal: 'agent' as Portal,
    links: [
      { key: 'overview', path: '/' },
      { key: 'qeac', path: '/' },
      { key: 'pipeline', path: '/' },
      { key: 'login', path: '/sign-in' },
    ],
  },
  {
    key: 'schools' as const,
    portal: 'school' as Portal,
    links: [
      { key: 'overview', path: '/' },
      { key: 'claim', path: '/' },
      { key: 'login', path: '/sign-in' },
      { key: 'pricing', path: '/' },
    ],
  },
];

export const LANGUAGES: Array<{ code: string; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'ko', label: '한국어' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'th', label: 'ภาษาไทย' },
];
