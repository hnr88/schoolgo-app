import { runCrawl } from '../_shared/crawl';

const ROUTES = [
  '/en/agent/dashboard',
  '/en/agent/dashboard/activity',
  '/en/agent/dashboard/analytics',
  '/en/agent/dashboard/applications',
  '/en/agent/dashboard/compliance',
  '/en/agent/dashboard/documents',
  '/en/agent/dashboard/follow-ups',
  '/en/agent/dashboard/leads',
  '/en/agent/dashboard/messages',
  '/en/agent/dashboard/notifications',
  '/en/agent/dashboard/offers',
  '/en/agent/dashboard/partnerships',
  '/en/agent/dashboard/pipeline',
  '/en/agent/dashboard/profile',
  '/en/agent/dashboard/results',
  '/en/agent/dashboard/saved-schools',
  '/en/agent/dashboard/saved-searches',
  '/en/agent/dashboard/search',
  '/en/agent/dashboard/settings',
  '/en/agent/dashboard/students',
];

runCrawl('agent', ROUTES);
