import type { Portal } from '@/lib/portal-url';

export type SearchAccess = 'public' | 'authenticated';

export type SearchMode = 'schools' | 'agents';

export interface SearchCapability {
  isAdvanced: boolean;
  canPersonalize: boolean;
  canContact: boolean;
  canMap: boolean;
  forceVerifiedOnly: boolean;
  resultCap: number | null;
}

export interface UnifiedSearchShellProps {
  activePortal: Portal;
  access: SearchAccess;
  defaultMode: SearchMode;
}
