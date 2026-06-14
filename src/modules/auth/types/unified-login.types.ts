import type { Portal } from '@/lib/portal-url';

export type UnifiedLoginStep = 'email' | 'password';

export interface UnifiedSignInCardProps {
  currentPortal: Portal;
}

export interface UnifiedSignInPageContentProps {
  currentPortal: Portal;
}
