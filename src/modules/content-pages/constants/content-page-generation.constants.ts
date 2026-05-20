import type { ContentPageType } from '@/modules/content-pages/types/content-pages.types';

export const CONTENT_PAGE_SIZE = 12;

export const contentPageTypeEyebrows: Record<ContentPageType, string> = {
  overview: 'Overview',
  admissions: 'Admissions',
  fees: 'Fees',
  curriculum: 'Curriculum',
  'student-life': 'Student life',
  boarding: 'Boarding',
  international: 'International families',
  agents: 'Agent resources',
  schools: 'School resources',
  events: 'Events',
  faq: 'FAQ',
  directory: 'Directory',
};
