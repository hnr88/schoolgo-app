import { AuthPageShell } from '@/modules/auth/components/AuthPageShell';
import { UnifiedSignInCard } from '@/modules/auth/components/UnifiedSignInCard';
import type { SignInPageContentProps } from '@/modules/auth/types/component.types';

export function SignInPageContent({ portal }: SignInPageContentProps) {
  return (
    <AuthPageShell portal={portal}>
      <UnifiedSignInCard currentPortal={portal} />
    </AuthPageShell>
  );
}
