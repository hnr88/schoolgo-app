import type { Portal } from '@/lib/portal-url';

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
