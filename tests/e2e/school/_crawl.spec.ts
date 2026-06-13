import { runCrawl } from '../_shared/crawl';

const ROUTES = [
  '/en/school/dashboard',
  '/en/school/dashboard/agent-performance',
  '/en/school/dashboard/analytics',
  '/en/school/dashboard/applications',
  '/en/school/dashboard/capacity',
  '/en/school/dashboard/document-requests',
  '/en/school/dashboard/invoices',
  '/en/school/dashboard/messages',
  '/en/school/dashboard/notes',
  '/en/school/dashboard/notifications',
  '/en/school/dashboard/offers',
  '/en/school/dashboard/partnerships',
  '/en/school/dashboard/payouts',
  '/en/school/dashboard/pre-enrolment',
  '/en/school/dashboard/profile',
  '/en/school/dashboard/settings',
  '/en/school/dashboard/staff',
  '/en/school/dashboard/templates',
  '/en/school/dashboard/tuition',
];

runCrawl('school', ROUTES);
