import { runCrawl } from '../_shared/crawl';

const ROUTES = [
  '/en/parent/dashboard',
  '/en/parent/students',
  '/en/parent/applications',
  '/en/parent/offers',
  '/en/parent/messages',
  '/en/parent/settings',
  '/en/parent/payments',
  '/en/parent/documents',
  '/en/parent/saved-schools',
  '/en/parent/saved-searches',
  '/en/parent/search',
  '/en/parent/agents',
  '/en/parent/calendar',
  '/en/parent/compare',
  '/en/parent/cost-estimator',
  '/en/parent/family-overview',
  '/en/parent/fit-report',
  '/en/parent/interviews',
  '/en/parent/enrolment-readiness',
  '/en/parent/tests',
  '/en/parent/results',
  '/en/parent/tours',
  '/en/parent/notifications',
];

runCrawl('parent', ROUTES);
